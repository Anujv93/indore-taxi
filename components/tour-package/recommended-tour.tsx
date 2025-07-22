import React from "react";
import { motion } from "framer-motion";
import TourPackagePreviewCard from "./preview-tour-card";

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

interface RecommendedToursProps {
  packages: TravelPackage[];
  currentPackageId: string;
  title: string;
}

export default function RecommendedTours({
  packages,
  currentPackageId,
  title = "Recommended Tours",
}: RecommendedToursProps) {
  const filteredPackages = packages.filter(
    (pkg) => pkg.id !== currentPackageId
  );

  if (filteredPackages.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover more amazing destinations and experiences curated just for
            you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.slice(0, 3).map((pkg, index) => (
            <TourPackagePreviewCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
