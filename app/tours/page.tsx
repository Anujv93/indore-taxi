"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  MapPin,
  Clock,
  ArrowRight,
  IndianRupee,
  Check,
  X,
  Calendar,
  Users,
  Phone,
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsUp,
} from "lucide-react";
import TourGallery from "@components/tour-package/tour-gallery";
import RecommendedTours from "@components/tour-package/recommended-tour";
import { createClient } from "@/utils/supabase/client";

import { BookNowCard } from "../../components/tour-package/bookingcard";

type TravelPackage = {
  id: string;
  org_id: string;
  title: string;
  slug: string;
  duration: string;
  start_location: string;
  end_location: string;
  route: string[] | null;
  short_description: string;
  full_description: string | null;
  itinerary: ItineraryItem[] | null;
  base_price: number | null;
  per_person_cost: number | null;
  include_gst: boolean;
  discount_percentage: number;
  inclusions: string[] | null;
  exclusions: string[] | null;
  thumbnail_image: string | null;
  gallery_images: string[] | null;
  cover_image: string | null;
  status: "draft" | "published" | "unpublished";
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

interface ItineraryItem {
  day: string;
  title: string;
  description: string;
}

export default function TourPackageDetail() {
  const [package_data, setPackageData] = useState<TravelPackage | null>(null);
  const [relatedPackages, setRelatedPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();

  useEffect(() => {
    loadPackageDetail();
  }, []);

  const loadPackageDetail = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const slug = urlParams.get("slug");

      if (!slug) {
        setLoading(false);
        return;
      }

      const { data: packages, error } = await supabase
        .from("travel_packages")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) {
        console.error("Error fetching package:", error);
        setLoading(false);
        return;
      }

      if (packages) {
        const pkg = packages;

        setPackageData(pkg);

        // Load related packages based on location and similar characteristics
        const { data: allPackages, error: relatedError } = await supabase
          .from("travel_packages")
          .select("*")
          .eq("is_published", true);

        if (relatedError) {
          console.error("Error fetching related packages:", relatedError);
          return;
        }
        if (!allPackages || allPackages.length === 0) {
          setRelatedPackages([]);
          setLoading(false);
          return;
        }
        const related = allPackages
          .filter(
            (p) =>
              p.id !== pkg.id &&
              (p.start_location === pkg.start_location ||
                p.end_location === pkg.end_location ||
                p.route?.some((route: string) => pkg.route?.includes(route)))
          )
          .slice(0, 6);
        setRelatedPackages(related);
      }
    } catch (error) {
      console.error("Error loading package detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (package_data: TravelPackage): number => {
    const basePrice = package_data.base_price || 0;
    const discount = package_data.discount_percentage || 0;
    const discountedPrice = basePrice - (basePrice * discount) / 100;
    return package_data.include_gst ? discountedPrice * 1.18 : discountedPrice;
  };

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-b from-slate-50 to-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!package_data) {
    return (
      <div className="py-20 bg-gradient-to-b from-slate-50 to-white min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Package Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The tour package you're looking for doesn't exist or has been
            removed.
          </p>
          {/* <Link to={createPageUrl("TourPackages")}>
            <Button>Browse All Packages</Button>
          </Link> */}
        </div>
      </div>
    );
  }

  const images =
    package_data.gallery_images?.filter(
      (img): img is string => typeof img === "string" && !!img
    ) ||
    [package_data.cover_image || package_data.thumbnail_image].filter(
      (img): img is string => typeof img === "string" && !!img
    );
  const finalPrice = calculateDiscountedPrice(package_data);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative">
        <div className="h-[60vh] lg:h-[70vh] relative overflow-hidden">
          <img
            src={
              package_data.cover_image ||
              package_data.thumbnail_image ||
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=500&fit=crop"
            }
            alt={package_data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Floating Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <Button
              size="icon"
              variant="outline"
              className="bg-white/90 hover:bg-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="bg-white/90 hover:bg-white"
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white max-w-4xl"
              >
                <div className="flex flex-wrap gap-3 mb-6">
                  {package_data.discount_percentage > 0 && (
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 px-4 py-2 animate-pulse">
                      {package_data.discount_percentage}% OFF - Limited Time
                    </Badge>
                  )}
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-4 py-2">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    4.8/5 Rating
                  </Badge>
                </div>

                <h1 className="text-3xl lg:text-6xl font-bold mb-6 leading-tight">
                  {package_data.title}
                </h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Route</p>
                      <p className="font-semibold">
                        {package_data.start_location} →{" "}
                        {package_data.end_location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Duration</p>
                      <p className="font-semibold">{package_data.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <IndianRupee className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Starting from</p>
                      <p className="text-xl font-bold">
                        ₹{finalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">About This Package</h2>
                <p className="text-slate-700">
                  {package_data.full_description ||
                    package_data.short_description}
                </p>
              </div>

              {package_data.route && (
                <div className="bg-white rounded-xl p-6 mt-6">
                  <h2 className="text-2xl font-bold mb-4">Route</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    {package_data.route.map((location, index) => (
                      <React.Fragment key={index}>
                        <Badge className="bg-blue-50 text-blue-700 px-3 py-1">
                          {location}
                        </Badge>
                        {index < package_data.route!.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Itinerary Section */}
            {package_data.itinerary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Day by Day Itinerary
                  </h2>
                  <div className="space-y-6">
                    {package_data.itinerary.map((item, index) => (
                      <div key={index} className="relative pl-8 pb-6">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-100">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600" />
                        </div>
                        <div className="ml-6">
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            Day {index + 1}: {item.title}
                          </h3>
                          <p className="text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Inclusions & Exclusions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {package_data.inclusions &&
                package_data.inclusions.length > 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-green-50">
                      <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        What's Included
                      </h2>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {package_data.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

              {package_data.exclusions &&
                package_data.exclusions.length > 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-red-50">
                      <h2 className="text-2xl font-bold text-red-800 flex items-center gap-2">
                        <X className="w-5 h-5" />
                        What's Not Included
                      </h2>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {package_data.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
            </motion.div>

            {/* Gallery Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <TourGallery images={images} title={package_data.title} />
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <BookNowCard
                basePrice={package_data.base_price ?? 0}
                finalPrice={finalPrice}
                discountPercentage={package_data.discount_percentage}
                includeGst={package_data.include_gst}
                duration={package_data.duration}
                startLocation={package_data.start_location}
                endLocation={package_data.end_location}
                onBookNow={() => {
                  /* Handle booking */
                }}
                onGroupBooking={() => {
                  /* Handle group booking */
                }}
                onCall={() => {
                  /* Handle call */
                }}
                onChat={() => {
                  /* Handle chat */
                }}
              />
            </motion.div>

            {/* Quick Contact */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-center">
                  Need Help?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-slate-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-slate-600">Quick Response</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Recommended Tours */}
      {relatedPackages.length > 0 && (
        <RecommendedTours
          packages={relatedPackages}
          currentPackageId={package_data.id}
          title="You Might Also Like"
        />
      )}
    </div>
  );
}
