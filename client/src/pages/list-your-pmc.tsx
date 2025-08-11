import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CountryMultiSelect } from "../components/country-multi-select";
import { FileDrop } from "../components/file-drop";
import { CityRegionAsyncMultiSelect } from "../components/city-region-async-multi-select";
import { SimpleMultiSelect } from "../components/simple-multi-select";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import { Tooltip } from "@/components/ui/tooltip";
import { CheckboxGroup } from "../components/checkbox-group";
import { SearchableMultiSelect } from "../components/searchable-multi-select";
import { airtableService } from "@/lib/airtable";
import { createCheckoutSession } from "@/lib/stripe";

const planEnum = z.enum(["Basic (€99.99/year)", "Premium (€499.99/year)"]);
const formSchema = z.object({
  "Brand Name": z.string().min(2),
  "PMC General Website": z.string().url("Please enter a valid URL"),
  "Direct Booking Engine URL": z.string().url("Please enter a valid URL"),
  "PMS/Channel Manager": z.string().min(1, "Please select your PMS/Channel Manager"),
  "Number of Listings": z.coerce.number().min(1),
  "Countries": z.array(z.string()).min(1),
  "Cities / Regions": z.array(z.object({ name: z.string(), displayName: z.string(), geonameId: z.number() })).min(1),
  "Logo Upload": z.object({
    url: z.string().url(),
    name: z.string()
  }).optional(),
  "Highlight Image": z.object({
    url: z.string().url(),
    name: z.string()
  }).optional(),
  "Rating (X/5) & Reviews (#) Screenshot": z.object({
    url: z.string().url(),
    name: z.string()
  }).optional(),
  "One-line Description": z.string().min(5).max(70),
  "Why Book With You?": z.string().min(50, "Please provide at least 50 characters explaining why guests should book with you"),
  "Top Stats": z.string().min(1, "Please share your top stats (e.g., average rating, number of reviews, etc.)"),
  "Currency": z.string().min(1, "Please select a currency"),
  "Min Price": z.string().min(1, "Please enter a minimum price"),
  "Max Price": z.string().min(1, "Please enter a maximum price"),
  "Types of Stays": z.array(z.string()).optional(),
  "Ideal For": z.array(z.string()).optional(),
  "Is your brand pet-friendly?": z.boolean().optional(),
  "Properties Features": z.array(z.string()).optional(),
  "Services & Convenience": z.array(z.string()).optional(),
  "Lifestyle & Values": z.array(z.string()).optional(),
  "Eco-Conscious Stay?": z.boolean().optional(),
  "Remote-Work Friendly?": z.boolean().optional(),
  "Design Styles": z.array(z.string()).optional(),
  "Atmospheres": z.array(z.string()).optional(),
  "Settings/Locations": z.array(z.string()).optional(),
  "Instagram": z.string().url().optional().or(z.literal("")),
  "Facebook": z.string().url().optional().or(z.literal("")),
  "LinkedIn": z.string().url().optional().or(z.literal("")),
  "TikTok": z.string().url().optional().or(z.literal("")),
  "YouTube / Video Tour": z.string().url().optional().or(z.literal("")),
  "Choose Your Listing Type": planEnum,
  "Submitted By (Email)": z.string().email(),
});

type FormValues = z.infer<typeof formSchema>;

const COUNTRIES = [
  "USA", "Spain", "UK", "Germany", "France", "Australia", "Canada", "Italy", "Portugal", "Thailand", "Greece"
];
const CITIES = [
  "New York", "Paris", "Bali", "Lisbon", "Dolomites", "Rome", "Bangkok", "Athens"
];
const TYPES_OF_STAYS = [
  "Apartments", "Bungalows", "Cabins", "Campervans", "Chalets", "Condos", "Domes", "Guesthouses", "Hostels", "Hotels", "Houses", "Rooms", "Tents", "Villas"
];
const IDEAL_FOR = [
  "Companies", "Couples", "Digital Nomads", "Families", "Groups", "Retreats", "Seniors/Elderly", "Solo travelers"
];
// Perks/Amenities split into 3 groups
const PROPERTIES_FEATURES = [
  "Air Conditioning", "Balcony/Terrace", "BBQ/Grill", "Dedicated workspace", "Dishwasher", 
  "Dryer", "EV Charging", "Fireplace", "Garage", "Garden/Outdoor Space", "Hair dryer", "Heating", 
  "Hot Tub/Jacuzzi", "Iron", "Kitchen/Kitchenette", "Parking", "Pool", "Washer", "WiFi"
];

const SERVICES_CONVENIENCE = [
  "24/7 Support", "Airport transfer", "Bike rental", "Breakfast included", "Car rental", "Concierge", 
  "Early check-in", "Grocery delivery", "Late check-out", "Luggage storage", "Mid-stay cleaning", 
  "Room service", "Self check-in"
];

const LIFESTYLE_VALUES = [
  "Sustainability", "Luxury", "Family-Friendly", "Business-Focused", "Adventure", "Wellness", "Cultural", "Accessibility", "Innovation", "Community"
];

const DESIGN_STYLES = [
  "Modern", "Traditional", "Minimalist", "Bohemian", "Industrial", "Scandinavian", "Mediterranean", "Tropical", "Mountain", "Urban", "Rural", "Coastal"
];

const ATMOSPHERES = [
  "Relaxing", "Energetic", "Romantic", "Family-Oriented", "Luxurious", "Adventurous", "Cultural", "Business", "Wellness", "Party", "Quiet", "Social"
];

const LOCATIONS = [
  "City Center", "Suburban", "Rural", "Beachfront", "Mountain", "Forest", "Lakefront", "Historic District", "Business District", "Residential Area", "Tourist Area", "Remote"
];

const PMS_OPTIONS = [
  "Lodgify", "OwnerRez", "Hostfully", "Your Porter", "Hostfully", "OwnerRez", "Lodgify", "Your Porter", "Hostfully", "OwnerRez", "Lodgify", "Your Porter"
];

const CURRENCIES = [
  "USD", "EUR", "GBP", "CAD", "AUD", "CHF", "SEK", "NOK", "DKK", "JPY", "SGD", "HKD", "NZD", "MXN", "BRL", "ARS", "CLP", "PEN", "COP", "UYU", "PYG", "BOB", "GTQ", "HNL", "NIO", "CRC", "PAB", "BZD", "JMD", "TTD", "BBD", "XCD", "AWG", "ANG", "SRD", "GYD", "VEF", "VES", "TRY", "ILS", "EGP", "ZAR", "NGN", "KES", "UGX", "TZS", "GHS", "MAD", "TND", "DZD", "LYD", "SDG", "ETB", "DJF", "KMF", "MUR", "SCR", "SOS", "SLL", "GNF", "CVE", "GMD", "BIF", "RWF", "MWK", "ZMW", "ZWL", "BWP", "NAD", "SZL", "LSL", "MOP", "KHR", "LAK", "MMK", "BDT", "LKR", "NPR", "PKR", "AFN", "TJS", "UZS", "KGS", "TMT", "AZN", "GEL", "AMD", "BYN", "MDL", "XOF", "XAF", "CDF", "GQE", "STN", "ERN", "SSP", "SHP", "FKP", "GIP", "IMP", "JEP", "GGP", "AOA", "CUC", "CUP", "BMD", "BAM", "ALL", "RSD", "MKD", "HRK", "BGN", "RON", "PLN", "CZK", "HUF", "BGN", "BAM", "ALL", "RSD", "MKD", "HRK", "BGN", "RON", "PLN", "CZK", "HUF"
];

const RequiredAsterisk = () => (
  <span className="text-red-500 ml-1">*</span>
);

export default function ListYourPMC() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "Brand Name": "",
      "PMC General Website": "",
      "Direct Booking Engine URL": "",
      "PMS/Channel Manager": "",
      "Number of Listings": 1,
      "Countries": [],
      "Cities / Regions": [],
      "One-line Description": "",
      "Why Book With You?": "",
      "Top Stats": "",
      "Currency": "",
      "Min Price": "",
      "Max Price": "",
      "Types of Stays": [],
      "Ideal For": [],
      "Is your brand pet-friendly?": false,
      "Properties Features": [],
      "Services & Convenience": [],
      "Lifestyle & Values": [],
      "Eco-Conscious Stay?": false,
      "Remote-Work Friendly?": false,
      "Design Styles": [],
      "Atmospheres": [],
      "Settings/Locations": [],
      "Instagram": "",
      "Facebook": "",
      "LinkedIn": "",
      "TikTok": "",
      "YouTube / Video Tour": "",
      "Choose Your Listing Type": "Basic (€99.99/year)",
      "Submitted By (Email)": "",
    },
  });

  const onInvalid = (errors: any) => {
    console.log("Form validation errors:", errors);
    toast({
      title: "Validation Error",
      description: "Please check the form and try again.",
      variant: "destructive",
    });
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await processFormSubmission(values);
      toast({
        title: "Success!",
        description: "Your PMC has been submitted successfully. We'll review and approve it within 24-48 hours.",
      });
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your PMC. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const processFormSubmission = async (values: FormValues) => {
    try {
      // Convert form data to Airtable format
      const airtableData = {
        "Brand Name": values["Brand Name"],
        "PMC General Website": values["PMC General Website"],
        "Direct Booking Engine URL": values["Direct Booking Engine URL"],
        "PMS/Channel Manager": values["PMS/Channel Manager"],
        "Number of Listings": values["Number of Listings"],
        "Countries": values["Countries"].join(", "),
        "Cities / Regions": values["Cities / Regions"].map(city => city.displayName).join(", "),
        "One-line Description": values["One-line Description"],
        "Why Book With You?": values["Why Book With You?"],
        "Top Stats": values["Top Stats"],
        "Currency": values["Currency"],
        "Min Price": values["Min Price"],
        "Max Price": values["Max Price"],
        "Types of Stays": values["Types of Stays"]?.join(", ") || "",
        "Ideal For": values["Ideal For"]?.join(", ") || "",
        "Is your brand pet-friendly?": values["Is your brand pet-friendly?"] || false,
        "Properties Features": values["Properties Features"]?.join(", ") || "",
        "Services & Convenience": values["Services & Convenience"]?.join(", ") || "",
        "Lifestyle & Values": values["Lifestyle & Values"]?.join(", ") || "",
        "Eco-Conscious Stay?": values["Eco-Conscious Stay?"] || false,
        "Remote-Work Friendly?": values["Remote-Work Friendly?"] || false,
        "Design Styles": values["Design Styles"]?.join(", ") || "",
        "Atmospheres": values["Atmospheres"]?.join(", ") || "",
        "Settings/Locations": values["Settings/Locations"]?.join(", ") || "",
        "Instagram": values["Instagram"] || "",
        "Facebook": values["Facebook"] || "",
        "LinkedIn": values["LinkedIn"] || "",
        "TikTok": values["TikTok"] || "",
        "YouTube / Video Tour": values["YouTube / Video Tour"] || "",
        "Choose Your Listing Type": values["Choose Your Listing Type"],
        "Submitted By (Email)": values["Submitted By (Email)"],
        "Status": "Pending Review",
        "Submission Date": new Date().toISOString(),
        "Plan": "PMC Directory", // Mark as PMC submission
      };

      // Submit to Airtable
      const record = await airtableService.createSubmission(airtableData);
      console.log("PMC submitted successfully:", record);

      // Handle file uploads if any
      if (values["Logo Upload"]) {
        // Handle logo upload
      }
      if (values["Highlight Image"]) {
        // Handle highlight image upload
      }
      if (values["Rating (X/5) & Reviews (#) Screenshot"]) {
        // Handle rating screenshot upload
      }

    } catch (error) {
      console.error("Error processing PMC submission:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">🏢 List Your PMC</h1>
        <p className="text-gray-600 mb-8">Join our directory and connect with property owners looking for professional management services.</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">

            {/* Section 1: Brand Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">🏢 Brand Info</h2>
              
              <FormField control={form.control} name="Brand Name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name<RequiredAsterisk /></FormLabel>
                  <FormControl><Input {...field} placeholder="e.g. Elite Property Management" className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="PMC General Website" render={({ field }) => (
                <FormItem>
                  <FormLabel>PMC General Website<RequiredAsterisk /></FormLabel>
                  <FormControl><Input {...field} placeholder="e.g. https://elitepropertymgmt.com" className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Direct Booking Engine URL" render={({ field }) => (
                <FormItem>
                  <FormLabel>Direct Booking Engine URL<RequiredAsterisk /></FormLabel>
                  <FormControl><Input {...field} placeholder="e.g. https://book.elitepropertymgmt.com" className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="PMS/Channel Manager" render={({ field }) => (
                <FormItem>
                  <FormLabel>PMS/Channel Manager<RequiredAsterisk /></FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your PMS/Channel Manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {PMS_OPTIONS.map((pms) => (
                          <SelectItem key={pms} value={pms}>
                            {pms}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Number of Listings" render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Listings<RequiredAsterisk /></FormLabel>
                  <FormControl><Input type="number" min="1" {...field} className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Countries" render={({ field }) => (
                <FormItem>
                  <FormLabel>Countries<RequiredAsterisk /></FormLabel>
                  <FormControl>
                    <CountryMultiSelect
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Cities / Regions" render={({ field }) => (
                <FormItem>
                  <FormLabel>Cities / Regions<RequiredAsterisk /></FormLabel>
                  <FormControl>
                    <CityRegionAsyncMultiSelect
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Section 2: Brand Story & Guest Value */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">📝 Brand Story & Guest Value</h2>
              
              <FormField control={form.control} name="One-line Description" render={({ field }) => (
                <FormItem>
                  <FormLabel>One-line Description<RequiredAsterisk /></FormLabel>
                  <FormControl><Input {...field} placeholder="e.g. Professional property management for luxury vacation rentals" maxLength={70} className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Why Book With You?" render={({ field }) => (
                <FormItem>
                  <FormLabel>Why Book With You?<RequiredAsterisk /></FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Explain what makes your PMC unique, your experience, and why property owners should choose you..."
                      className={field.value ? 'border-blue-500 bg-blue-50' : ''}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Top Stats" render={({ field }) => (
                <FormItem>
                  <FormLabel>Top Stats<RequiredAsterisk /></FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="e.g., 95% client satisfaction, 15+ years experience, 500+ properties managed..."
                      className={field.value ? 'border-blue-500 bg-blue-50' : ''}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Section 3: Pricing */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">💰 Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="Currency" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency<RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="Min Price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Price<RequiredAsterisk /></FormLabel>
                    <FormControl><Input {...field} placeholder="e.g. 50" className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="Max Price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Price<RequiredAsterisk /></FormLabel>
                    <FormControl><Input {...field} placeholder="e.g. 500" className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Section 4: Perks & Positioning */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">🎁 Perks & Positioning</h2>
              
              <FormField control={form.control} name="Types of Stays" render={({ field }) => (
                <FormItem>
                  <FormLabel>Types of Stays</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={TYPES_OF_STAYS}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select types of stays..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Ideal For" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ideal For</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={IDEAL_FOR}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select ideal guests..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Properties Features" render={({ field }) => (
                <FormItem>
                  <FormLabel>Properties Features</FormLabel>
                  <FormControl>
                    <CheckboxGroup
                      options={PROPERTIES_FEATURES}
                      selected={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Services & Convenience" render={({ field }) => (
                <FormItem>
                  <FormLabel>Services & Convenience</FormLabel>
                  <FormControl>
                    <CheckboxGroup
                      options={SERVICES_CONVENIENCE}
                      selected={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Lifestyle & Values" render={({ field }) => (
                <FormItem>
                  <FormLabel>Lifestyle & Values</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={LIFESTYLE_VALUES}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select lifestyle values..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="Is your brand pet-friendly?" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is your brand pet-friendly?</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="Eco-Conscious Stay?" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eco-Conscious Stay?</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="Remote-Work Friendly?" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remote-Work Friendly?</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="Design Styles" render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Styles</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={DESIGN_STYLES}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select design styles..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Atmospheres" render={({ field }) => (
                <FormItem>
                  <FormLabel>Atmospheres</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={ATMOSPHERES}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select atmospheres..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Settings/Locations" render={({ field }) => (
                <FormItem>
                  <FormLabel>Settings/Locations</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={LOCATIONS}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select settings/locations..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Section 5: Social Media & Contact */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">📱 Social Media & Contact</h2>
              
              <FormField control={form.control} name="Submitted By (Email)" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email<RequiredAsterisk /></FormLabel>
                  <FormControl><Input type="email" {...field} placeholder="e.g. john@yourcompany.com" className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="Instagram" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl><Input {...field} placeholder="https://instagram.com/yourcompany" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="Facebook" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl><Input {...field} placeholder="https://facebook.com/yourcompany" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="LinkedIn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl><Input {...field} placeholder="https://linkedin.com/company/yourcompany" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="TikTok" render={({ field }) => (
                  <FormItem>
                    <FormLabel>TikTok</FormLabel>
                    <FormControl><Input {...field} placeholder="https://tiktok.com/@yourcompany" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="YouTube / Video Tour" render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube / Video Tour</FormLabel>
                    <FormControl><Input {...field} placeholder="https://youtube.com/yourcompany" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Section 6: Listing Type */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">📋 Choose Your Listing Type</h2>
              
              <FormField control={form.control} name="Choose Your Listing Type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Your Listing Type<RequiredAsterisk /></FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your listing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic (€99.99/year)">Basic (€99.99/year)</SelectItem>
                        <SelectItem value="Premium (€499.99/year)">Premium (€499.99/year)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Your PMC"}
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                We'll review and approve your submission within 24-48 hours.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
