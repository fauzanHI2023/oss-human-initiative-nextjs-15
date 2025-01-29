"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import WorldMap from "@/components/ui/world-map";

const OurImpact: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <HeroHighlight className="relative flex flex-col w-full sm:p-24 p-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
          <h5
            className="text font-bold sm:text-3xl text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <span className="text-sky-500">Human Initiative</span> impact
          </h5>
          <p
            className="text-slate-600 dark:text-slate-300 font-base text-sm sm:w-1/2 w-full pr-6"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            Through innovative humanitarian programs, we have become a beacon of
            hope for millions of lives, turning crisis into opportunity and
            building a better future for communities around the world.​
          </p>
        </div>
        <div className="flex flex-row justify-start items-center gap-x-4 py-6">
          <h5 className="text-sky-700 text-base font-lg">Select Year</h5>
          <form action="">
            <select
              value="Pilih Tahun"
              className="bg-sky-100 text-slate-700 py-2 px-6 rounded-xl"
            >
              <option value="2002">2002</option>
              <option value="2004">2004</option>
              <option value="2008">2008</option>
              <option value="2020">2020</option>
            </select>
          </form>
        </div>
        <div className="flex flex-row">
          <div className="w-1/4 flex flex-col gap-x-4">
            <h5 className="text-sky-500 font-bold text-3xl">3.783.423</h5>
            <h6 className="dark:text-white text-slate-800 font-semibold text-base">
              Rightholders
            </h6>
          </div>
          <div className="w-1/4 flex flex-col gap-x-4">
            <h5 className="text-sky-500 font-bold text-3xl">3200</h5>
            <h6 className="dark:text-white text-slate-800 font-semibold text-base">
              Volunteer
            </h6>
          </div>
          <div className="w-1/4 flex flex-col gap-x-4">
            <h5 className="text-sky-500 font-bold text-3xl">100+</h5>
            <h6 className="dark:text-white text-slate-800 font-semibold text-base">
              Programs
            </h6>
          </div>
          <div className="w-1/4 flex flex-col gap-x-4">
            <h5 className="text-sky-500 font-semibold text-3xl">
              Rp. 113.969.507.912
            </h5>
            <h6 className="dark:text-white text-slate-800 font-semibold text-base">
              Donations Distributed
            </h6>
          </div>
        </div>
        <div className="relative flex justify-center"></div>
      </motion.h1>
      <div className=" py-40 dark:bg-slate-900 bg-white w-full">
        <WorldMap
          dots={[
            {
              start: {
                lat: -23.1404,
                lng: 109.8166,
              }, // Indonesia
              end: {
                lat: 27.652,
                lng: 140.8394,
              }, // Jepang
            },
            {
              start: { lat: -23.1404, lng: 109.8166 }, // Indonesia
              end: { lat: 25.5326, lng: 127.0246 }, // Korea
            },
            {
              start: { lat: -23.1404, lng: 109.8166 }, // Indonesia
              end: { lat: -45.8651, lng: 145.2099 }, // Australia
            },
            {
              start: { lat: -23.1404, lng: 109.8166 }, // Indonesia
              end: { lat: 51.5152, lng: -2.1297 }, // UK
            },
            {
              start: { lat: -23.1404, lng: 109.8166 }, // Indonesia
              end: { lat: 42.7678, lng: 7.4439 }, // Germany
            },
            {
              start: { lat: -23.1404, lng: 109.8166 }, // Indonesia
              end: { lat:	25.2675, lng: 32.4150 }, // Turkey
            },
            {
              start: { lat: -23.1404, lng: 109.8166 }, // Indonesia
              end: { lat:	11.7742, lng: 42.4150 }, // Arab Saudi
            },
            {
              start: { lat: -23.1404, lng: 109.8166 }, // Indonesia
              end: { lat:	38.0000, lng: -75.0000, label: "Amerika Serikat" }, // Amerika Serikat
            },
          ]}
        />
      </div>
    </HeroHighlight>
  );
};

export default OurImpact;
