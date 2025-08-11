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
  // For now, just use static FAQs directly to ensure they show up
  const faqData = staticFaqs;
  const isLoading = false;

  // Group FAQs by category - updated for PMC directory
  const ownerFaqs = faqData?.filter((faq: any) => faq.category === "traveler") || [];
  const pmcFaqs = faqData?.filter((faq: any) => faq.category === "host") || [];

  console.log("FAQ Data:", faqData);
  console.log("Owner FAQs:", ownerFaqs);
  console.log("PMC FAQs:", pmcFaqs);

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
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mb-4">
                  <Skeleton className="h-10 w-full mb-2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))
            ) : (
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
            )}
          </TabsContent>
          
          <TabsContent value="pmc">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mb-4">
                  <Skeleton className="h-10 w-full mb-2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))
            ) : (
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
            )}
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
