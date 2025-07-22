"use client";
import { HomeProps, TravelPackage } from "@types";
import { CarCard, Hero, Footer, NavBar } from "@components/index";
import TourPackagePreviewCard from "@components/tour-package/preview-tour-card";
import { useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@firebase/config";
import { createClient } from "@utils/supabase/client";
import MapDetail from "@components/MapBox";

export default function Home() {
  const [allCars, setallCars] = useState<DocumentData | []>([]);
  const [allPackages, setAllPackages] = useState<TravelPackage[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [isPackagesLoading, setIsPackagesLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setisLoading(true);

    const q = query(collection(db, "cars"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carData: DocumentData = [];
      snapshot.forEach((car) => {
        carData.push({ id: car.id, ...car.data() });
      });

      // Custom sorting function based on category order: sedan, MUV, bus, luxury
      const sortedCars = carData.sort((a, b) => {
        const categoryOrder = ["SEDAN", "MUV", "SUV", "BUS", "LUXURY"];
        return (
          categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
        );
      });

      setallCars(sortedCars);
      setisLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTravelPackages = async () => {
      setIsPackagesLoading(true);
      try {
        const { data: packages, error } = await supabase
          .from("travel_packages")
          .select("*")
          .eq("is_published", true)
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) {
          console.error("Error fetching travel packages:", error);
        } else {
          setAllPackages(packages || []);
        }
      } catch (error) {
        console.error("Error fetching travel packages:", error);
      } finally {
        setIsPackagesLoading(false);
      }
    };

    fetchTravelPackages();
  }, []);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  const isPackagesEmpty = !Array.isArray(allPackages) || allPackages.length < 1;

  return (
    <div>
      <main className="overflow-hidden">
        <NavBar></NavBar>
        <Hero />

        {/* Travel Packages Section */}

        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
            <p>Explore out cars you might like</p>
          </div>

          {/* <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <CustomFilter title="fuel" options={fuels} />
              <CustomFilter title="year" options={yearsOfProduction} />
            </div>
          </div> */}

          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard key={car.id} car={car} isAdmin={false} />
                ))}
              </div>
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            </div>
          )}
        </div>
        <div className="mt-12 padding-x padding-y max-width">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Featured Tour Packages</h1>
            <p>Explore our amazing travel packages and destinations</p>
          </div>

          {!isPackagesEmpty ? (
            <section className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPackages.map((pkg, index) => (
                  <TourPackagePreviewCard
                    key={pkg.id}
                    pkg={pkg}
                    index={index}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">
                No travel packages available
              </h2>
            </div>
          )}
        </div>

        <MapDetail />
      </main>
      <Footer />
    </div>
  );
}
