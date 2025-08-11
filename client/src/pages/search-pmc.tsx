import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, X, Building2, Globe, Star, Users } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { airtableService } from "@/lib/airtable";
import { getActiveCountries, getSubmissionsForCountry } from "@/lib/submission-processor";
import { getCountryCode } from "@/lib/geonames";
import { slugify } from "@/lib/utils";

export default function SearchPMC() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch active countries (countries that have approved PMC submissions)
  const { data: activeCountryNames = [], isLoading: isCountriesLoading } = useQuery({
    queryKey: ["/api/active-countries"],
    queryFn: () => getActiveCountries(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Transform active country names into country objects with metadata
  const countries = activeCountryNames.map((countryName, index) => {
    const countryCode = getCountryCode(countryName) || "XX";
    const slug = slugify(countryName);
    
    return {
      id: index + 1,
      name: countryName,
      slug: slug,
      code: countryCode,
    };
  });

  // Fetch PMC submission counts for each active country
  const { data: countriesWithCounts = [], isLoading: isCountsLoading } = useQuery({
    queryKey: ["/api/countries-with-counts", activeCountryNames],
    queryFn: async () => {
      const countriesWithCounts = [];
      
      for (const country of countries) {
        const submissions = await getSubmissionsForCountry(country.name);
        countriesWithCounts.push({
          ...country,
          listingCount: submissions.length
        });
      }
      
      return countriesWithCounts.sort((a, b) => b.listingCount - a.listingCount);
    },
    enabled: activeCountryNames.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  console.log('🌍 Search PMC - Active countries:', activeCountryNames);
  console.log('📊 Search PMC - Countries with counts:', countriesWithCounts);

  const isLoading = isCountriesLoading || isCountsLoading;

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return countriesWithCounts;
    }
    
    return countriesWithCounts.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [countriesWithCounts, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Find a PMC by Country
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Select a country to discover verified property management companies
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p className="text-lg">
                <span className="font-semibold text-blue-200">500+</span> verified PMCs across{" "}
                <span className="font-semibold text-blue-200">50+</span> countries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading PMCs...</p>
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No PMCs Found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? `No countries found matching "${searchQuery}"` : "No PMCs available yet"}
              </p>
              {searchQuery && (
                <Button onClick={clearSearch} variant="outline">
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "Browse PMCs by Country"}
                </h2>
                <p className="text-gray-600">
                  {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'} with verified PMCs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCountries.map((country) => (
                  <Link key={country.id} href={`/country/${country.slug}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{getFlagEmoji(country.code)}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {country.name}
                        </h3>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                          <Building2 className="w-4 h-4" />
                          <span>{country.listingCount} PMC{country.listingCount !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="mt-3">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            View PMCs
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find a PMC in Your Area?
            </h2>
            <p className="text-gray-600 mb-6">
              If you're a PMC and want to be listed in our directory, or if you need help finding the right property manager, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
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
      </section>
    </main>
  );
}
