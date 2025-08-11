import { faqs as staticFaqs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FAQ() {
  // Owner-focused FAQ questions about FindMyRentalManager
  const ownerFaqs = [
    {
      id: "owner-1",
      question: "What is FindMyRentalManager?",
      answer: "FindMyRentalManager is a comprehensive directory that connects property owners with verified Property Management Companies (PMCs) specializing in Short-Term Rentals (STR) and vacation rentals. We help you find the perfect PMC to manage your property and maximize your rental income."
    },
    {
      id: "owner-2", 
      question: "How do I find a PMC for my property?",
      answer: "Simply browse our directory by country or city, or use our search filters to find PMCs that match your property type, location, and requirements. Each PMC profile includes detailed information about their services, portfolio, and contact details."
    },
    {
      id: "owner-3",
      question: "Are all PMCs on your platform verified?",
      answer: "Yes, all PMCs listed on our platform undergo a thorough verification process. We review their business credentials, portfolio, and track record to ensure they meet our quality standards before listing them."
    },
    {
      id: "owner-4",
      question: "What types of properties do your PMCs manage?",
      answer: "Our PMCs specialize exclusively in STR and vacation rental properties, including apartments, villas, cabins, chalets, and other vacation accommodations. We do not list PMCs for residential or commercial properties."
    },
    {
      id: "owner-5",
      question: "How much do PMCs typically charge?",
      answer: "PMC fees vary based on services offered and property type, typically ranging from 15-25% of gross rental revenue. Some PMCs offer tiered pricing based on property value or rental income. Contact individual PMCs for specific pricing."
    },
    {
      id: "owner-6",
      question: "What services do PMCs typically provide?",
      answer: "Most PMCs offer comprehensive property management including guest communication, booking management, maintenance coordination, housekeeping, revenue optimization, and 24/7 support. Services vary by PMC, so review individual profiles for details."
    },
    {
      id: "owner-7",
      question: "Can I contact multiple PMCs to compare?",
      answer: "Absolutely! We encourage you to reach out to multiple PMCs to compare services, fees, and find the best fit for your property. Each PMC profile includes direct contact information for easy communication."
    },
    {
      id: "owner-8",
      question: "Do you help with the PMC selection process?",
      answer: "While we provide the directory and verification, the final selection is between you and the PMC. We recommend reviewing multiple options, asking detailed questions, and checking references before making your decision."
    }
  ];

  // PMC-focused FAQ questions
  const pmcFaqs = [
    {
      id: "pmc-1",
      question: "How can I list my PMC on FindMyRentalManager?",
      answer: "To list your PMC, simply fill out our submission form with your company details, services, portfolio information, and contact details. We'll review your submission and approve it within 24-48 hours if it meets our standards."
    },
    {
      id: "pmc-2",
      question: "What are the requirements to be listed?",
      answer: "We require PMCs to have a proven track record in STR/vacation rental management, valid business credentials, and a portfolio of managed properties. We also verify your business practices and customer satisfaction."
    },
    {
      id: "pmc-3",
      question: "Is there a fee to be listed on your platform?",
      answer: "Yes, we offer two listing tiers: Basic (€99.99/year) and Premium (€499.99/year). Premium listings receive enhanced visibility and additional features to help you stand out to property owners."
    },
    {
      id: "pmc-4",
      question: "How do property owners contact me?",
      answer: "Property owners can contact you directly through the contact information you provide in your listing. We also display your website, social media, and other contact methods to facilitate direct communication."
    },
    {
      id: "pmc-5",
      question: "Can I update my listing information?",
      answer: "Yes, you can update your listing information at any time through our admin portal. We recommend keeping your portfolio, services, and contact information current to maximize your visibility to property owners."
    },
    {
      id: "pmc-6",
      question: "What types of properties should I list?",
      answer: "We only accept PMCs that manage STR and vacation rental properties. This includes vacation homes, holiday rentals, short-term accommodations, and similar properties. We do not list PMCs for residential or commercial properties."
    },
    {
      id: "pmc-7",
      question: "How do you verify PMC listings?",
      answer: "Our verification process includes reviewing business credentials, checking portfolio authenticity, verifying customer reviews, and ensuring compliance with local regulations. We maintain high standards to protect property owners."
    },
    {
      id: "pmc-8",
      question: "Can I showcase my portfolio and success stories?",
      answer: "Absolutely! Your listing includes sections for portfolio highlights, success metrics, property types managed, and customer testimonials. Premium listings receive additional space to showcase your expertise and achievements."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">
          Find answers to common questions about FindMyRentalManager.com
        </p>

        <Tabs defaultValue="owner" className="mb-12">
          <TabsList className="w-full mb-6 grid grid-cols-2">
            <TabsTrigger value="owner">For Property Owners</TabsTrigger>
            <TabsTrigger value="pmc">For PMCs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="owner">
            <Accordion type="single" collapsible className="w-full">
              {ownerFaqs.map((faq: any) => (
                <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="pmc">
            <Accordion type="single" collapsible className="w-full">
              {pmcFaqs.map((faq: any) => (
                <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Have more questions?</h2>
          <p className="mb-4">
            If you can't find the answer you're looking for, please contact our support team or
            consider listing your PMC in our directory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/list-your-pmc">
                List Your PMC
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/support">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
