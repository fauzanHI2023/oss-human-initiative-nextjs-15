"use client"
import React, { useEffect } from "react";
import { programCard } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import 'aos/dist/aos.css';

const OurProgram = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section
      className={`relative flex flex-col w-full sm:px-32 sm:py-20 p-6`}
    >
      <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
        <div
          className={`flex flex-col gap-y-1 sm:w-1/2 w-full pr-28 sm:pb-0 pb-4`}
        >
          <h5 className={` font-bold sm:text-3xl text-2xl`} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700">
            Welcome to <span className="text-sky-500">Human Initiative</span>
          </h5>
          <h5 className={` font-bold sm:text-3xl text-2xl`} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700">
            Together We Create Real Change for Humanity
          </h5>
        </div>
        <p className={` font-base text-normal sm:w-1/2 w-full pr-6`} data-aos="fade-right" data-aos-easing="linear" data-aos-duration="1000"
        >
          Human Initiative is here to provide sustainable solutions for the humanitarian movement, creating real change that restores hope, empowers communities, and builds a better future for all.
        </p>
      </div>
      <div
        className={`grid sm:grid-cols-4 grid-cols-1 sm:gap-x-6`}
      >
        {programCard.map((program, index) => (
          <div
            key={index}
            className={`rounded-xl bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 transition duration-300 ease-in dark:bg-slate-900 sm:pb-0 pb-6 hover:`}
          >
            <div data-aos="flip-down" data-aos-duration="1500"  className={`flex flex-col justify-between items-center gap-y-4 py-4 px-6 rounded-xl h-full`}>
              <div className="flex flex-col justify-center items-center">
                <div className={`pb-4`}><span className={`text-4xl text-sky-300 round `}>{program.icon}</span></div>
                <h3 className={`flex items-center sm:text-xl text-lg text-center font-semibold sm:pb-6 pb-3 h-[70px]`}>{program.label}</h3>
                <p className={`text-sm text-center`}>{program.text}</p>
              </div>
              <Link href={program.url} className={`flex flex-row items-start w-[40px] bg-slate-100 dark:bg-slate-800 rounded-lg p-2 inline-block bg-transparent text-2xl p-1 transition ease-in-out hover:w-full dark:hover:bg-slate-700 hover:bg-sky-500 hover:text-white overflow-hidden relative`}>
                <FaArrowRightLong className="hover:transition hover:ease-in-out hover:duration-300 w-16"/>
                {/* <span className="w-32">Full Story</span> */}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProgram;
