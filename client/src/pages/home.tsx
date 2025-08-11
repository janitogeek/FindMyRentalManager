import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Users, Globe, Shield, Zap, BarChart3, Calendar, DollarSign, Target, Building2, Handshake, Search, Home as HomeIcon, Star } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  // Stats for property owners
  const ownerStats = [
    { value: "1000+", label: "Verified PMCs", icon: Building2, color: "text-blue-600" },
    { value: "50+", label: "Countries Covered", icon: Globe, color: "text-green-600" },
    { value: "10,000+", label: "Properties Managed", icon: HomeIcon, color: "text-purple-600" }
  ];

  // Benefits for property owners
  const ownerBenefits = [
    {
      icon: Search,
      title: "Find the Perfect PMC",
      description: "Browse verified property management companies that match your property type, location, and requirements."
    },
    {
      icon: Handshake,
      title: "Direct Communication",
      description: "Connect directly with PMCs to discuss management terms, fees, and services without intermediaries."
    },
    {
      icon: Shield,
      title: "Verified & Trusted",
      description: "All PMCs are thoroughly vetted with proven track records and positive owner reviews."
    },
    {
      icon: BarChart3,
      title: "Compare & Choose",
      description: "Compare PMC services, fees, and performance metrics to make informed decisions."
    },
    {
      icon: Calendar,
      title: "Quick Onboarding",
      description: "Streamlined process to get your property listed and managed by professionals quickly."
    },
    {
      icon: Users,
      title: "Owner Community",
      description: "Connect with other property owners and learn from their PMC experiences."
    }
  ];

  // Success stories for property owners
  const successStories = [
    {
      name: "Sarah Johnson",
      property: "Beach Condo",
      location: "Miami, FL",
      story: "Found an amazing PMC through this platform. They increased my rental income by 35% and handle everything professionally.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      property: "Mountain Cabin",
      location: "Aspen, CO",
      story: "The PMC I found here transformed my property management. No more stress about bookings, maintenance, or guest issues.",
      avatar: "MC"
    },
    {
      name: "Emma Rodriguez",
      property: "City Apartment",
      location: "New York, NY",
      story: "This platform helped me find a PMC that specializes in my property type. My rental income doubled in the first year.",
      avatar: "ER"
    }
  ];

  // PMC categories
  const pmcCategories = [
    {
      icon: Building2,
      title: "Residential",
      description: "Apartments, houses, condos"
    },
    {
      icon: Building2,
      title: "Vacation Rentals",
      description: "Short-term, holiday homes"
    },
    {
      icon: Building2,
      title: "Commercial",
      description: "Office spaces, retail"
    },
    {
      icon: Building2,
      title: "Luxury",
      description: "High-end properties"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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
              Find Your Perfect Property Manager
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Connect with verified Property Management Companies specializing in Short-Term Rentals and vacation properties
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation("/search-pmc")}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold"
              >
                Find a PMC Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {ownerStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Professional PMCs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Property Owners Choose Professional PMCs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional property management companies offer expertise, efficiency, and peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {ownerBenefits.map((benefit, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Success Stories from Property Owners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how other property owners found their perfect PMC through our platform
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

      {/* Featured PMCs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Featured PMCs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover top-rated Property Management Companies trusted by property owners worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-lg transition-shadow duration-200 border border-gray-200 bg-white relative h-full">
              {/* Featured Badge */}
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-yellow-500 text-yellow-900 font-semibold">
                  Featured
                </Badge>
              </div>

              <CardContent className="p-6 flex flex-col h-full">
                {/* Header Image with Logo Overlay */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-blue-600" />
                  </div>
                </div>

                {/* Brand Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
                    Elite Property Management
                  </h3>
                  
                  {/* One-line Description */}
                  <div className="min-h-[3rem]">
                    <p className="text-sm italic text-gray-600 leading-relaxed line-clamp-2">
                      Professional property management for luxury vacation rentals across Europe
                    </p>
                  </div>
                </div>

                {/* Property Count & Pricing */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>150+ properties</span>
                  </div>
                  
                  <div className="flex items-center gap-1 font-medium text-blue-600">
                    <span className="text-gray-500">💰</span>
                    <span>from €200 to €2000</span>
                  </div>
                </div>

                {/* Types of Stays */}
                <div className="mb-4 min-h-[2.5rem]">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      Villas
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Apartments
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Chalets
                    </Badge>
                  </div>
                </div>

                {/* Countries */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>🇫🇷 🇮🇹 🇪🇸 🇬🇷</span>
                  </div>
                </div>

                {/* Why Rent With CTA */}
                <div className="mb-6 mt-auto">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/search-pmc">
                      Why rent with Elite Property Management?
                    </Link>
                  </Button>
                </div>

                {/* Bottom Section: Social Links Left, Visit Website Right */}
                <div className="flex items-center justify-between mt-auto pt-4">
                  {/* Social Links - Left */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-xs">📱</span>
                    </div>
                  </div>

                  {/* Visit Website - Right */}
                  <div className="flex items-center gap-2">
                    <Button 
                      asChild 
                      variant="default" 
                      size="sm"
                    >
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-200 border border-gray-200 bg-white relative h-full">
              {/* Featured Badge */}
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-yellow-500 text-yellow-900 font-semibold">
                  Featured
                </Badge>
              </div>

              <CardContent className="p-6 flex flex-col h-full">
                {/* Header Image with Logo Overlay */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-green-600" />
                  </div>
                </div>

                {/* Brand Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
                    Coastal Properties Group
                  </h3>
                  
                  {/* One-line Description */}
                  <div className="min-h-[3rem]">
                    <p className="text-sm italic text-gray-600 leading-relaxed line-clamp-2">
                      Specializing in beachfront vacation homes and coastal properties
                    </p>
                  </div>
                </div>

                {/* Property Count & Pricing */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>75+ properties</span>
                  </div>
                  
                  <div className="flex items-center gap-1 font-medium text-blue-600">
                    <span className="text-gray-500">💰</span>
                    <span>from €150 to €1500</span>
                  </div>
                </div>

                {/* Types of Stays */}
                <div className="mb-4 min-h-[2.5rem]">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      Beach Houses
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Condos
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Cottages
                    </Badge>
                  </div>
                </div>

                {/* Countries */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>🇺🇸 🇪🇸 🇵🇹 🇬🇷</span>
                  </div>
                </div>

                {/* Why Rent With CTA */}
                <div className="mb-6 mt-auto">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/search-pmc">
                      Why rent with Coastal Properties Group?
                    </Link>
                  </Button>
                </div>

                {/* Bottom Section: Social Links Left, Visit Website Right */}
                <div className="flex items-center justify-between mt-auto pt-4">
                  {/* Social Links - Left */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs">📱</span>
                    </div>
                  </div>

                  {/* Visit Website - Right */}
                  <div className="flex items-center gap-2">
                    <Button 
                      asChild 
                      variant="default" 
                      size="sm"
                    >
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-200 border border-gray-200 bg-white relative h-full">
              {/* Featured Badge */}
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-yellow-500 text-yellow-900 font-semibold">
                  Featured
                </Badge>
              </div>

              <CardContent className="p-6 flex flex-col h-full">
                {/* Header Image with Logo Overlay */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-purple-600" />
                  </div>
                </div>

                {/* Brand Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
                    Mountain Retreat Management
                  </h3>
                  
                  {/* One-line Description */}
                  <div className="min-h-[3rem]">
                    <p className="text-sm italic text-gray-600 leading-relaxed line-clamp-2">
                      Expert in alpine and mountain properties with year-round optimization
                    </p>
                  </div>
                </div>

                {/* Property Count & Pricing */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>120+ properties</span>
                  </div>
                  
                  <div className="flex items-center gap-1 font-medium text-blue-600">
                    <span className="text-gray-500">💰</span>
                    <span>from €100 to €1200</span>
                  </div>
                </div>

                {/* Types of Stays */}
                <div className="mb-4 min-h-[2.5rem]">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      Cabins
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Chalets
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Lodges
                    </Badge>
                  </div>
                </div>

                {/* Countries */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>🇨🇭 🇦🇹 🇫🇷 🇮🇹</span>
                  </div>
                </div>

                {/* Why Rent With CTA */}
                <div className="mb-6 mt-auto">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/search-pmc">
                      Why rent with Mountain Retreat Management?
                    </Link>
                  </Button>
                </div>

                {/* Bottom Section: Social Links Left, Visit Website Right */}
                <div className="flex items-center justify-between mt-auto pt-4">
                  {/* Social Links - Left */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xs">📱</span>
                    </div>
                  </div>

                  {/* Visit Website - Right */}
                  <div className="flex items-center gap-2">
                    <Button 
                      asChild 
                      variant="default" 
                      size="sm"
                    >
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => setLocation("/search-pmc")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              View All PMCs
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Find Your Perfect PMC?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of property owners who've found reliable property managers through our platform.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => setLocation("/search-pmc")}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold"
              >
                Find a PMC Now
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Free to search • No hidden fees • Verified PMCs only
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
