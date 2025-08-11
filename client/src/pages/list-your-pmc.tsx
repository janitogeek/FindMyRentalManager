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

const formSchema = z.object({
  "Company Name": z.string().min(2),
  "Company Website": z.string().url("Please enter a valid URL"),
  "Direct Booking Engine URL": z.string().url("Please enter a valid URL"),
  "PMS/Channel Manager": z.string().min(1, "Please select your PMS/Channel Manager"),
  "Number of Properties Managed": z.coerce.number().min(1),
  "Countries": z.array(z.string()).min(1),
  "Cities / Regions": z.array(z.object({ name: z.string(), displayName: z.string(), geonameId: z.number() })).min(1),
  "Company Logo": z.object({
    url: z.string().url(),
    name: z.string()
  }).optional(),
  "Company Highlight Image": z.object({
    url: z.string().url(),
    name: z.string()
  }).optional(),
  "Company Rating & Reviews Screenshot": z.object({
    url: z.string().url(),
    name: z.string()
  }).optional(),
  "One-line Company Description": z.string().min(5).max(70),
  "Why Choose Your PMC?": z.string().min(50, "Please provide at least 50 characters explaining why property owners should choose your PMC"),
  "Company Stats": z.string().min(1, "Please share your company stats (e.g., properties managed, client satisfaction, etc.)"),
  "Management Fee Structure": z.string().min(1, "Please describe your fee structure"),
  "Property Types Managed": z.array(z.string()).optional(),
  "Target Property Owners": z.array(z.string()).optional(),
  "Pet-friendly Properties?": z.boolean().optional(),
  "Property Features Managed": z.array(z.string()).optional(),
  "Services Offered": z.array(z.string()).optional(),
  "Company Values": z.array(z.string()).optional(),
  "Eco-Conscious Properties?": z.boolean().optional(),
  "Remote-Work Friendly Properties?": z.boolean().optional(),
  "Design Styles Managed": z.array(z.string()).optional(),
  "Property Atmospheres": z.array(z.string()).optional(),
  "Property Locations": z.array(z.string()).optional(),
  "Instagram": z.string().url().optional().or(z.literal("")),
  "Facebook": z.string().url().optional().or(z.literal("")),
  "LinkedIn": z.string().url().optional().or(z.literal("")),
  "TikTok": z.string().url().optional().or(z.literal("")),
  "YouTube / Company Video": z.string().url().optional().or(z.literal("")),
  "Submitted By (Email)": z.string().email(),
});

type FormValues = z.infer<typeof formSchema>;

const COUNTRIES = [
  "USA", "Spain", "UK", "Germany", "France", "Australia", "Canada", "Italy", "Portugal", "Thailand", "Greece"
];

const CITIES = [
  "New York", "Paris", "Bali", "Lisbon", "Dolomites", "Rome", "Bangkok", "Athens"
];

const PROPERTY_TYPES = [
  "Apartments", "Bungalows", "Cabins", "Campervans", "Chalets", "Condos", "Domes", "Guesthouses", "Hostels", "Hotels", "Houses", "Rooms", "Tents", "Villas"
];

const TARGET_OWNERS = [
  "Individual Investors", "Real Estate Companies", "Property Developers", "Family Offices", "Institutional Investors", "Retirement Communities", "Luxury Property Owners"
];

const PROPERTY_FEATURES = [
  "Air Conditioning", "Balcony/Terrace", "BBQ/Grill", "Dedicated workspace", "Dishwasher", 
  "Dryer", "EV Charging", "Fireplace", "Garage", "Garden/Outdoor Space", "Hair dryer", "Heating", 
  "Hot Tub/Jacuzzi", "Iron", "Kitchen/Kitchenette", "Parking", "Pool", "Washer", "WiFi"
];

const SERVICES_OFFERED = [
  "24/7 Support", "Property Marketing", "Guest Communication", "Maintenance Management", "Revenue Optimization", 
  "Channel Management", "Financial Reporting", "Legal Compliance", "Insurance Management", "Property Inspections", 
  "Guest Screening", "Emergency Response", "Housekeeping Management"
];

const COMPANY_VALUES = [
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

const RequiredAsterisk = () => (
  <span className="text-red-500 ml-1">*</span>
);

export default function ListYourPMC() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "Company Name": "",
      "Company Website": "",
      "Direct Booking Engine URL": "",
      "PMS/Channel Manager": "",
      "Number of Properties Managed": 1,
      "Countries": [],
      "Cities / Regions": [],
      "One-line Company Description": "",
      "Why Choose Your PMC?": "",
      "Company Stats": "",
      "Management Fee Structure": "",
      "Property Types Managed": [],
      "Target Property Owners": [],
      "Pet-friendly Properties?": false,
      "Property Features Managed": [],
      "Services Offered": [],
      "Company Values": [],
      "Eco-Conscious Properties?": false,
      "Remote-Work Friendly Properties?": false,
      "Design Styles Managed": [],
      "Property Atmospheres": [],
      "Property Locations": [],
      "Instagram": "",
      "Facebook": "",
      "LinkedIn": "",
      "TikTok": "",
      "YouTube / Company Video": "",
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
      // Convert form data to Airtable format - using existing field names
      const airtableData = {
        "Brand Name": values["Company Name"],
        "PMC General Website": values["Company Website"],
        "Direct Booking Engine URL": values["Direct Booking Engine URL"],
        "PMS Used": values["PMS/Channel Manager"],
        "Number of Listings": values["Number of Properties Managed"],
        "Countries": values["Countries"].join(", "),
        "Cities / Regions": values["Cities / Regions"].map(city => city.displayName).join(", "),
        "One-line Description": values["One-line Company Description"],
        "Why Book With You": values["Why Choose Your PMC?"],
        "Top Stats": values["Company Stats"],
        "Types of Stays": values["Property Types Managed"]?.join(", ") || "",
        "Ideal For": values["Target Property Owners"]?.join(", ") || "",
        "Properties Features": values["Property Features Managed"]?.join(", ") || "",
        "Services & Convenience": values["Services Offered"]?.join(", ") || "",
        "Lifestyle & Values": values["Company Values"]?.join(", ") || "",
        "Design Style": values["Design Styles Managed"]?.join(", ") || "",
        "Atmospheres": values["Property Atmospheres"]?.join(", ") || "",
        "Settings/Locations": values["Property Locations"]?.join(", ") || "",
        "Instagram": values["Instagram"] || "",
        "Facebook": values["Facebook"] || "",
        "LinkedIn": values["LinkedIn"] || "",
        "TikTok": values["TikTok"] || "",
        "YouTube / Video Tour": values["YouTube / Company Video"] || "",
        "Email": values["Submitted By (Email)"],
        "Status": "Pending Review",
        "Submission Date": new Date().toISOString(),
        "Plan": "PMC Directory", // Mark as PMC submission
      };

      // Submit to Airtable
      const record = await airtableService.createSubmission(airtableData);
      console.log("PMC submitted successfully:", record);

      // Handle file uploads if any
      if (values["Company Logo"]) {
        // Handle logo upload
      }
      if (values["Company Highlight Image"]) {
        // Handle highlight image upload
      }
      if (values["Company Rating & Reviews Screenshot"]) {
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

            {/* Section 1: Company Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">🏢 Company Information</h2>
              
              <FormField control={form.control} name="Company Name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name<RequiredAsterisk /></FormLabel>
                  <FormControl><Input {...field} placeholder="e.g. Elite Property Management" className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Company Website" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website<RequiredAsterisk /></FormLabel>
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

              <FormField control={form.control} name="Number of Properties Managed" render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Properties Managed<RequiredAsterisk /></FormLabel>
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

            {/* Section 2: Company Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">📝 Company Description</h2>
              
              <FormField control={form.control} name="One-line Company Description" render={({ field }) => (
                <FormItem>
                  <FormLabel>One-line Company Description<RequiredAsterisk /></FormLabel>
                  <FormControl><Input {...field} placeholder="e.g. Professional property management for luxury vacation rentals" maxLength={70} className={field.value ? 'border-blue-500 bg-blue-50' : ''} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Why Choose Your PMC?" render={({ field }) => (
                <FormItem>
                  <FormLabel>Why Choose Your PMC?<RequiredAsterisk /></FormLabel>
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

              <FormField control={form.control} name="Company Stats" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Stats<RequiredAsterisk /></FormLabel>
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

              <FormField control={form.control} name="Management Fee Structure" render={({ field }) => (
                <FormItem>
                  <FormLabel>Management Fee Structure<RequiredAsterisk /></FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="e.g., 15% of gross revenue, no setup fees, transparent pricing..."
                      className={field.value ? 'border-blue-500 bg-blue-50' : ''}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Section 3: Services & Specializations */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">🎯 Services & Specializations</h2>
              
              <FormField control={form.control} name="Property Types Managed" render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Types Managed</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={PROPERTY_TYPES}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select property types you manage..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Target Property Owners" render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Property Owners</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={TARGET_OWNERS}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select your target property owners..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Services Offered" render={({ field }) => (
                <FormItem>
                  <FormLabel>Services Offered</FormLabel>
                  <FormControl>
                    <CheckboxGroup
                      options={SERVICES_OFFERED}
                      selected={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Section 4: Property Features */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">🏠 Property Features You Manage</h2>
              
              <FormField control={form.control} name="Property Features Managed" render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Features Managed</FormLabel>
                  <FormControl>
                    <CheckboxGroup
                      options={PROPERTY_FEATURES}
                      selected={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Design Styles Managed" render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Styles Managed</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={DESIGN_STYLES}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select design styles you manage..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Property Atmospheres" render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Atmospheres</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={ATMOSPHERES}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select atmospheres you manage..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="Property Locations" render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Locations</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={LOCATIONS}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select locations you manage..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Section 5: Company Values */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">💎 Company Values & Specializations</h2>
              
              <FormField control={form.control} name="Company Values" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Values</FormLabel>
                  <FormControl>
                    <SimpleMultiSelect
                      options={COMPANY_VALUES}
                      selected={field.value || []}
                      onSelect={field.onChange}
                      placeholder="Select your company values..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="Pet-friendly Properties?" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet-friendly Properties?</FormLabel>
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

                <FormField control={form.control} name="Eco-Conscious Properties?" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eco-Conscious Properties?</FormLabel>
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

                <FormField control={form.control} name="Remote-Work Friendly Properties?" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remote-Work Friendly Properties?</FormLabel>
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
            </div>

            {/* Section 6: Social Media & Contact */}
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

                <FormField control={form.control} name="YouTube / Company Video" render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube / Company Video</FormLabel>
                    <FormControl><Input {...field} placeholder="https://youtube.com/yourcompany" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
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
