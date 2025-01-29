import React from "react";
import Banner from "@/components/ui/banner/Banner";
import { Flame, TimerReset, BedDouble } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";
import Image from "next/image";

const InitiativeForDisaster = () => {
  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <Banner
        title="Initiative For Disaster"
        description="Being an initiator in building community resilience to disasters and climate change​"
        image="/rightholders33.png"
      />
      <section className="relative overflow-hidden flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            Initiative for <span className="text-sky-600">Disaster</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base">
            Initiative for Disaster is a collection of various programs aimed at
            reducing the impact of disasters, through empowering the potential
            and capacity of the community to recognize potential disasters, and
            making preparations for disasters. In addition to preventive
            actions, the preparation of teams that will be deployed in the event
            of a disaster is also a concern in various disaster programs.​
          </p>
        </div>
        {/* <div className="flex flex-row gap-x-16 justify-center items-center w-2/3">
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-green-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Baby className="text-green-500 text-xl w-8 h-8" />
            </span>
            <h5>Perlindungan Anak</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-sky-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <TimerReset className="text-sky-500 text-xl w-8 h-8" />
            </span>
            <h5>Pendidikan Anak Yatim dan Duafa</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-pink-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <BedDouble className="text-pink-500 text-xl w-8 h-8" />
            </span>
            <h5>Pemenuhan Kebutuhan Dasar</h5>
          </div>
        </div> */}
        <Tabs defaultValue="penguranganresikobencana" className="w-full">
          <TabsList className="flex flex-row justify-start items-center gap-x-8 relative z-20">
            <TabsTrigger
              value="penguranganresikobencana"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Flame className="text-sky-600" /> Disaster Risk Reduction
            </TabsTrigger>
            <TabsTrigger
              value="tanggapdarurat"
              className="w-max-content flex flex-row gap-x-2"
            >
              <BedDouble className="text-sky-600" /> Emergency Response
            </TabsTrigger>
            <TabsTrigger
              value="pemulihanpascabencana"
              className="w-max-content flex flex-row gap-x-2"
            >
              <TimerReset className="text-sky-600" /> Post Disaster Recovery
            </TabsTrigger>
          </TabsList>
          <TabsContent value="penguranganresikobencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Aims to reduce the threat of disaster and mitigate the adverse
                effects of a disaster threat by educating a person or a
                community.
              </p>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Among the programs are:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Resilient Village​
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Safe School
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Information Communication and Education
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Early Warning System
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Planet Volunteer
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Disaster Response Family
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Climate Change
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="tanggapdarurat">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                A series of activities carried out immediately at the time of
                the disaster to deal with the adverse effects caused, including
                rescue and evacuation of victims, property, fulfillment of basic
                needs, protection, refugee management, rescue, and restoration
                of infrastructure and facilities. (Law No. 24 of 2007 concerning
                Disaster Management)​
              </p>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Among the programs is Rescue SAR, namely activities and efforts
                to search, help, and save human lives that are lost or feared
                lost or facing dangers caused by natural disasters / non-natural
                disasters.​
              </p>
            </div>
          </TabsContent>
          <TabsContent value="pemulihanpascabencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                A process through which basic needs are met after a disaster,
                both natural and social disasters, will be carried out by the
                disaster recovery team.​
              </p>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                There are various activities carried out by the recovery team,
                including Psychosocial Support Assistance provided to
                individuals and communities experiencing psychological
                disorders, where this assistance is carried out continuously and
                mutually influences between psychological aspects and social
                aspects in the environment where individuals or communities
                are.​
              </p>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Then there is also Emergency Relief, which is a program to
                fulfill basic needs for residents affected by disasters during
                emergency response quickly, precisely, and with dignity with a
                scope:​
              </p>
              <ul className="list-disc list-inside">
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Shelter
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Water, Sanitation and Health Promotion
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Food Security/Nutrition
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Family Needs
                </li>
              </ul>
              <div className="w-full relative z-20">
                <Image
                  src="/IMG_5460_11zon.jpg"
                  width={400}
                  height={400}
                  alt="Human Initiative Disaster"
                  className="w-[400px] rounded-xl"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <section className="flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-28 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-slate-50 relative z-20">
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            <span className="text-sky-600">Publikasi</span> Terkait
          </h5>
        </div>
        <div className="flex flex-row gap-x-16 w-full">
          <div className="w-1/4 flex flex-col gap-y-4">
            <div className="w-full relative z-20">
              <Image
                src="/water-well.jpg"
                width={400}
                height={400}
                alt="Human Initiative Disaster"
                className="w-[400px] rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-y-6 relative z-20">
              <h5 className="text-slate-700 font-semibold text-lg">
                Water Well, Kolaborasi Kebaikan Human Initiative bersama
              </h5>
              <p className="text-slate-600 font-normal text-base">
                Serang, Banten – Salah satu program sarana air bersih Human
                Initiative, Water Well, kembali hadir di pelosok Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InitiativeForDisaster;
