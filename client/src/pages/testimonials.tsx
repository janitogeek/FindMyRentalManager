import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building2, Users, Star } from "lucide-react";

export default function Testimonials() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Building2 className="w-20 h-20 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Testimonials Coming Soon
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're building our testimonials section as property owners find and work with PMCs through our platform.
          </p>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-8 mb-8">
          <CardContent className="text-center">
            <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Real Success Stories
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Once property owners start finding PMCs through our directory, we'll showcase their experiences and success stories here.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Property Owners</h3>
                <p className="text-sm text-gray-600">Share their PMC experiences</p>
              </div>
              <div>
                <Building2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">PMCs</h3>
                <p className="text-sm text-gray-600">Showcase their success stories</p>
              </div>
              <div>
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Verified Reviews</h3>
                <p className="text-sm text-gray-600">Authentic feedback and ratings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What to Expect
            </h3>
            <p className="text-gray-600 mb-4">
              Our testimonials will include real stories from property owners who found their perfect PMC through our platform, 
              along with success metrics and detailed feedback.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/search-pmc">
                Find a PMC Now
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/list-your-pmc">
                List Your PMC
              </Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Check back soon for real testimonials from our growing community!
          </p>
        </div>
      </div>
    </div>
  );
}
