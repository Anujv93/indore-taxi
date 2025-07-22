"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, ArrowRight, IndianRupee } from "lucide-react";
import Link from "next/link";

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
  base_price: number | null;
  per_person_cost: number | null;
  include_gst: boolean;
  discount_percentage: number;
  thumbnail_image: string | null;
  featured?: boolean;
};

interface TourPackagePreviewCardProps {
  pkg: TravelPackage;
  index?: number;
}

const calculateDiscountedPrice = (package_data: TravelPackage) => {
  const basePrice = package_data.base_price || 0;
  const discount = package_data.discount_percentage || 0;
  const discountedPrice = basePrice - (basePrice * discount) / 100;
  return package_data.include_gst ? discountedPrice * 1.18 : discountedPrice;
};

export default function TourPackagePreviewCard({
  pkg,
  index = 0,
}: TourPackagePreviewCardProps) {
  const finalPrice = calculateDiscountedPrice(pkg);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-white p-0">
        <div className="relative overflow-hidden">
          <img
            src={
              pkg.thumbnail_image ||
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop"
            }
            alt={pkg.title}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {pkg.featured && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            )}
            {pkg.discount_percentage > 0 && (
              <Badge className="bg-red-500 text-white border-0 text-xs">
                {pkg.discount_percentage}% OFF
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {pkg.title}
          </h3>

          {/* Location & Duration */}
          <div className="flex items-center gap-4 mb-3 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{pkg.start_location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-green-500" />
              <span>{pkg.duration}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
            {pkg.short_description}
          </p>

          {/* Route */}
          {pkg.route && pkg.route.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {pkg.route.slice(0, 2).map((location, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {location}
                  </Badge>
                ))}
                {pkg.route.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{pkg.route.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Pricing & Button */}
          <div className="flex items-center justify-between">
            <div>
              {pkg.discount_percentage > 0 && (
                <p className="text-xs text-slate-500 line-through">
                  ₹{pkg.base_price?.toLocaleString()}
                </p>
              )}
              <div className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <span className="text-xl font-bold text-green-600">
                  {Math.round(finalPrice).toLocaleString()}
                </span>
              </div>
              {pkg.include_gst && (
                <p className="text-xs text-slate-500">Inc. GST</p>
              )}
            </div>

            <Link href={`/tours?slug=${pkg.slug}`}>
              <Button
                size="sm"
                className="rounded-[8px] text-white bg-blue-600 hover:bg-blue-700"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
