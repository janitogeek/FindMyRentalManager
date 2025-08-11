import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Users, Globe, Shield, Zap, BarChart3, Calendar, DollarSign, Target } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  // Stats for property owners
  const ownerStats = [
    { number: "10-30%", label: "Average Revenue Increase", icon: TrendingUp, color: "text-green-600" },
    { number: "15%", label: "OTA Commission Eliminated", icon: DollarSign, color: "text-blue-600" },
    { number: "40%", label: "Higher Guest Satisfaction", icon: Users, color: "text-purple-600" },
    { number: "1000+", label: "Properties Already Listed", icon: Globe, color: "text-orange-600" }
  ];

  // Benefits for property owners
  const ownerBenefits = [
    {
      icon: Shield,
      title: "Full Control Over Guest Experience",
      description: "Manage bookings, pricing, and policies without OTA restrictions or commission fees."
    },
    {
      icon: Zap,
      title: "Direct Guest Communication",
      description: "Build relationships with guests directly, leading to higher satisfaction and repeat bookings."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics & Insights",
      description: "Track performance, optimize pricing, and understand your market better than ever."
    },
    {
      icon: Calendar,
      title: "Flexible Availability Management",
      description: "Update calendars, block dates, and manage multiple properties from one dashboard."
    },
    {
      icon: Target,
      title: "Targeted Marketing Tools",
      description: "Reach your ideal guests with precision marketing and promotional campaigns."
    },
    {
      icon: TrendingUp,
      title: "Revenue Optimization",
      description: "Dynamic pricing, seasonal adjustments, and demand-based rate optimization."
    }
  ];

  // Success stories for property owners
  const successStories = [
    {
      name: "Maria Santos",
      property: "Villa Marbella",
      location: "Spain",
      story: "Since switching to direct bookings, we've increased our revenue by 28% and eliminated €15,000 in annual OTA fees.",
      avatar: "MS"
    },
    {
      name: "James Wilson",
      property: "Mountain Lodge",
      location: "Canada",
      story: "Direct bookings give us control over guest experience. Our satisfaction scores jumped from 4.2 to 4.8.",
      avatar: "JW"
    },
    {
      name: "Sophie Chen",
      property: "Urban Apartments",
      location: "Singapore",
      story: "We now have 65% direct bookings vs 20% before. The platform helped us build a loyal guest base.",
      avatar: "SC"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Property Owner Focused */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Increase Your Direct Bookings
            </h1>
            <p className="text-3xl lg:text-4xl mb-8">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-bold">Eliminate OTA fees,</span> 
              <span className="text-white"> boost revenue,</span> 
              <span className="text-white"> and take control</span>
            </p>
            <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto font-medium">
              Join 1000+ property owners who've increased revenue by 10-30% by reducing dependency on Airbnb, Booking.com, and other OTAs.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={() => setLocation("/list-property")}
                className="w-full sm:w-auto py-3 px-8 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all shadow-xl text-lg font-semibold"
              >
                Start Listing Now
              </Button>
              <Button 
                onClick={() => setLocation("/pricing")}
                variant="outline"
                className="w-full sm:w-auto py-3 px-8 rounded-full border-white text-white hover:bg-white hover:text-gray-900 transition-all text-lg font-semibold"
              >
                View Pricing
              </Button>
            </div>

            {/* Key Stats - Owner Focused */}
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {ownerStats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.number}</div>
                    <div className="text-xs font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Direct Bookings Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Property Owners Choose Direct Bookings
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take control of your business and maximize your profits by reducing dependency on third-party platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ownerBenefits.map((benefit, index) => (
              <div key={index} className="text-center group hover:bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Comparison Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                💰 See the Real Revenue Difference
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Compare how much more you can earn with direct bookings vs OTA platforms
              </p>
            </div>

            {/* Revenue Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {/* OTA Booking */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="inline-block bg-red-100 px-4 py-2 rounded-full mb-4">
                    <span className="text-red-700 font-semibold">❌ OTA Platform (Airbnb/Booking.com)</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">€1,000</div>
                    <div className="text-sm text-gray-600">Guest pays per night</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>OTA Commission (15%)</span>
                      <span className="font-semibold text-red-600">-€150</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Fees (3%)</span>
                      <span className="font-semibold text-red-600">-€30</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payment Processing (2.9%)</span>
                      <span className="font-semibold text-red-600">-€29</span>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold">
                      <span>You receive</span>
                      <span className="text-red-600">€791</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Booking */}
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="inline-block bg-green-100 px-4 py-2 rounded-full mb-4">
                    <span className="text-green-700 font-semibold">✅ Direct Booking</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">€1,000</div>
                    <div className="text-sm text-gray-600">Guest pays per night</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>OTA Commission</span>
                      <span className="font-semibold text-green-600">€0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Fees</span>
                      <span className="font-semibold text-green-600">€0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payment Processing (2.9%)</span>
                      <span className="font-semibold text-green-600">-€29</span>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold">
                      <span>You receive</span>
                      <span className="text-green-600">€971</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="text-center">
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="text-4xl font-bold text-green-600 mb-2">€180 More Per Night</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">That's 23% More Revenue</div>
                <div className="text-green-600 font-medium">By eliminating OTA fees and commissions</div>
                <div className="mt-4 text-sm text-gray-600">
                  *Based on €1,000 per night booking. Actual savings vary by property and market.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Success Stories from Property Owners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how other property owners have transformed their business with direct bookings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="font-semibold text-blue-600">{story.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{story.name}</div>
                      <div className="text-sm text-gray-600">{story.property}, {story.location}</div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed">
                    "{story.story}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools property owners need to maximize direct bookings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Listing Pages</h3>
              <p className="text-gray-600 text-sm">Beautiful, SEO-optimized pages that convert visitors into guests</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Calendar Management</h3>
              <p className="text-gray-600 text-sm">Sync with your existing calendars and manage availability effortlessly</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600 text-sm">Track performance, understand your market, and optimize pricing</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Tools</h3>
              <p className="text-gray-600 text-sm">Reach your ideal guests with targeted campaigns and promotions</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">Professional payment processing with fraud protection and security</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Management</h3>
              <p className="text-gray-600 text-sm">Streamlined communication and guest experience management</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Increase Your Revenue?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of property owners who've already increased their profits by reducing OTA dependency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setLocation("/list-property")}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold"
              >
                Start Your Free Trial
              </Button>
              <Button 
                onClick={() => setLocation("/pricing")}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold"
              >
                View Pricing Plans
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
