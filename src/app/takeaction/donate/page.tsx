"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  CSSProperties,
} from "react";
import { MoveRight } from "lucide-react";
import { publicDonate, joinProject } from "@/data/data";
import { Progress } from "@/components/ui/progress_fe";
import { fetchCampaign } from "@/lib/donation/campaign/auth-campaign";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { Heart } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";
import HashLoader from "react-spinners/HashLoader";

const ITEMS_PER_PAGE = 8;

const override: CSSProperties = {
  display: "block",
  margin: "0 block",
  borderColor: "red",
};

const Donate = () => {
  const { scrollYProgress } = useScroll();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let [color, setColor] = useState("#209ce2");

  useEffect(() => {
    const getProjects = async () => {
      try {
        setIsLoading(true);
        const campaigns = await fetchCampaign();
        setProjects(campaigns.data || []); // Pastikan campaigns adalah array
      } catch (err) {
        setError("Failed to load campaigns");
      } finally {
        setIsLoading(false);
      }
    };

    getProjects();
  }, []);
  // Function to filter collection items by type
  const filterCollectionByType = (tipe: string) => {
    return joinProject.filter((item) => item.tipe === tipe);
  };

  const texts = [
    "Your Donation, Change the World Now",
    "Small Steps, Big Impact Together",
  ];

  const wordFlips = [
    "Your Donation, Change the World Now",
    "Small Steps, Big Impact Together",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 11000); // Setiap 11 detik: 5 detik animasi + 6 detik delay

    return () => clearInterval(interval); // Bersihkan interval ketika komponen tidak lagi dirender
  }, []);

  useEffect(() => {
    AOS.init();
  });

  const calculateProgress = (grossAmount: any): any => {
    const min = 50000;
    const max = 100000000;
    return ((grossAmount - min) / (max - min)) * 100;
  };

  const stripHtml = (html: string) => {
    if (typeof window !== "undefined") {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    }
    return html;
  };

  const truncateAndStripHtml = (html: string, wordLimit: number) => {
    const plainText = stripHtml(html);
    const words = plainText.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:bg-slate-900 bg-gray-50">
        <HashLoader
          color={color}
          loading={isLoading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </main>
    );
  }

  if (error) {
    return (
      <div className="p-24 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-24 text-center">
        <p>No campaigns found.</p>
      </div>
    );
  }

  const formatCurrency = (value: string) => {
    const parsedValue = parseInt(value || "0");
    return `Rp ${parsedValue.toLocaleString("id-ID")}`;
  };

  return (
    <main className="">
      <section className="flex flex-row w-full h-screen sm:p-24 p-6 sm:pt-34 pt-24 dark:bg-slate-900 bg-sky-50 sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-row flex-col justify-center items-center w-full">
          <div
            className="flex flex-col gap-y-6 sm:w-3/5 w-full justify-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col gap-y-4 pr-16">
              <motion.h3
                key={currentTextIndex}
                className="font-semibold sm:text-[52px] text-2xl pb-3 dark:text-white text-slate-800 leading-tight"
              >
                <FlipWords words={wordFlips} />
              </motion.h3>
            </div>
            <h6
              className="text-base font-light text-slate-600"
              data-aos="fade-left"
            >
              With small steps, you can make a big difference. Donate now and
              help those in need.
            </h6>
            <button className="bg-sky-600 rounded-xl hover:bg-sky-500 transition duration-200 ease-in dark:bg-sky-500 dark:text-white text-white py-4 px-6 w-[200px]">
              Lets Donate
            </button>
          </div>
          <div
            className="animation-banner-donate flex sm:w-2/5 w-full items-center justify-center"
            data-aos="fade-right"
          >
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                className="col-span-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/rightholders1.jpg"
                  alt="image 1"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/rightholders2.jpg"
                  alt="image 2"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/rightholders3.jpg"
                  alt="image 3"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/rightholders4.jpg"
                  alt="image 4"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/rightholders2.jpg"
                  alt="image 4"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/rightholders4.jpg"
                  alt="image 5"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/rightholders1.jpg"
                  alt="image 4"
                  width={200}
                  height={200}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`relative flex flex-col w-full sm:px-32 sm:py-20 p-6 bg-white dark:bg-slate-900`}
      >
        <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
          <h5
            className={`font-semibold sm:text-[54px] text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            Good Helping <span className="text-sky-600">Humanity</span>
          </h5>
          <p
            className={`flex justify-end items-center font-normal text-slate-600 dark:text-slate-200 text-base sm:w-1/2 w-full pr-6`}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            We help survivors of war rebuild their lives and choose their own
            futures
          </p>
        </div>
        <div className="flex flex-row gap-x-8">
          <Tabs defaultValue="all">
            <TabsList className="pb-6">
              <TabsTrigger
                value="all"
                data-aos="fade-left"
                data-aos-duration="300"
              >
                Lihat Semua
              </TabsTrigger>
              <TabsTrigger
                value="children"
                data-aos="fade-left"
                data-aos-duration="300"
              >
                Children
              </TabsTrigger>
              <TabsTrigger
                value="empowerment"
                data-aos="fade-left"
                data-aos-duration="300"
              >
                Empowerment
              </TabsTrigger>
              <TabsTrigger
                value="disaster"
                data-aos="fade-left"
                data-aos-duration="300"
              >
                Disaster
              </TabsTrigger>
              <TabsTrigger
                value="infrastrukturprogram"
                data-aos="fade-left"
                data-aos-duration="300"
              >
                Infrastruktur Program
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="flex flex-col sm:grid sm:grid-cols-4 gap-x-8 gap-y-8 flex-wrap">
                {projects.map((projectItem: any) => (
                  <div
                    key={projectItem.id}
                    className="h-full flex flex-col justify-between rounded-2xl mb-6"
                  >
                    <Link href={`/campaign/${projectItem.slug}`}>
                      <div className="publikasi-card flex flex-col gap-y-4 h-[200px]">
                        <Image
                          src={`https://cdnx.human-initiative.org/image/${projectItem.campaign_img}`}
                          alt={projectItem.campaign_name}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col py-4 px-6 dark:bg-slate-900 bg-white">
                      <div className="flex flex-col gap-y-4">
                        <span className="flex text-sky-500 dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">
                          {projectItem.core_program}
                        </span>
                        <Link href={`/campaign/${projectItem.slug}`}>
                          <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">
                            {projectItem.campaign_name}
                          </h6>
                        </Link>
                        <h6 className="text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">
                          {truncateAndStripHtml(
                            projectItem.campaign_description,
                            5
                          )}
                        </h6>
                        <Progress
                          value={calculateProgress(
                            projectItem.donation_collected || 0
                          )}
                        />
                      </div>
                      <p className="text-sm text-sky-700 dark:text-white text-center flex flex-row gap-x-2 py-4">
                        <span>
                          <Heart className="text-red-500" />
                        </span>
                        {projectItem.support} people give support
                      </p>
                      <div className="flex flex-row gap-x-8">
                        <div className="w-2/3 flex flex-col justify-between items-start">
                          <h6 className="text-sky-500 dark:text-sky-500 text-lg font-medium">
                            {formatCurrency(projectItem.donation_collected)}
                          </h6>
                          <h6 className="hidden text-slate-500 dark:text-slate-200 text-sm">
                            {formatCurrency(projectItem.target_donation)}
                          </h6>
                        </div>
                        <Link
                          href={`/campaign/${projectItem.slug}`}
                          className="w-1/3 bg-sky-700 hover:bg-sky-600 transition duration-200 ease-in text-white dark:text-white py-3 px-4 rounded-xl"
                        >
                          Donate
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            {/* Annual Report Tab */}
            <TabsContent value="children">
              <div className="flex flex-row gap-x-8">
                {filterCollectionByType("Children").map((projectItem) => (
                  <div
                    key={projectItem.nama}
                    className="h-full flex flex-col justify-between rounded-2xl w-1/4"
                  >
                    <div
                      className="flex flex-col gap-y-4 h-[200px] py-4 px-6"
                      style={{
                        backgroundImage: `url(${projectItem.image})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div className="flex flex-col py-4 px-6 dark:bg-slate-900 bg-white">
                      <div className="flex flex-col gap-y-4">
                        <span className="flex text-sky-500 dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">
                          {projectItem.tipe}
                        </span>
                        <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">
                          {projectItem.nama}
                        </h6>
                        <h6 className="text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">
                          {projectItem.deskrispi}
                        </h6>
                        <Progress
                          value={calculateProgress(projectItem.donasi)}
                        />
                        <div className="flex flex-row justify-between items-center">
                          <h6 className="text-sky-500 dark:text-sky-500">
                            {projectItem.donasi}
                          </h6>
                          <h6 className="text-green-500 dark:text-green-500">
                            {projectItem.goals}
                          </h6>
                        </div>
                      </div>
                      {/* <p className="text-sky-700 dark:text-white text-center flex flex-row gap-x-2 py-4"><span><Heart className="text-red-500"/></span> {projectItem.dukungan} orang memberi dukungan</p> */}
                      <button className="bg-sky-700 text-white dark:text-white py-3 px-4 w-full rounded-xl">
                        Donate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="empowerment">
              <div className="flex flex-row gap-x-8">
                {filterCollectionByType("Empowerment").map((projectItem) => (
                  <div
                    key={projectItem.nama}
                    className="h-full flex flex-col justify-between rounded-2xl w-1/4"
                  >
                    <div
                      className="flex flex-col gap-y-4 h-[200px] py-4 px-6"
                      style={{
                        backgroundImage: `url(${projectItem.image})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div className="flex flex-col py-4 px-6 dark:bg-slate-900 bg-white">
                      <div className="flex flex-col gap-y-4">
                        <span className="flex text-sky-500 dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">
                          {projectItem.tipe}
                        </span>
                        <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">
                          {projectItem.nama}
                        </h6>
                        <h6 className="text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">
                          {projectItem.deskrispi}
                        </h6>
                        <Progress
                          value={calculateProgress(projectItem.donasi)}
                        />
                      </div>
                      <p className="text-sky-700 dark:text-white text-center flex flex-row gap-x-2 py-4">
                        <span>
                          <Heart className="text-red-500" />
                        </span>{" "}
                        {projectItem.dukungan} orang memberi dukungan
                      </p>
                      <div className="flex flex-row gap-x-8">
                        <div className="w-2/3 flex flex-col justify-between items-start">
                          <h6 className="text-sky-500 dark:text-sky-500 text-lg font-medium">
                            Rp {projectItem.donasi}
                          </h6>
                          <h6 className="text-slate-500 dark:text-slate-200 text-sm">
                            Rp {projectItem.goals} target
                          </h6>
                        </div>
                        <button className="w-1/3 bg-sky-700 text-white dark:text-white py-3 px-4 rounded-xl">
                          Donate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="disaster">
              <div className="flex flex-row gap-x-8">
                {filterCollectionByType("Disaster").map((projectItem) => (
                  <div
                    key={projectItem.nama}
                    className="h-full flex flex-col justify-between rounded-2xl w-1/4"
                  >
                    <div
                      className="flex flex-col gap-y-4 h-[200px] py-4 px-6"
                      style={{
                        backgroundImage: `url(${projectItem.image})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div className="flex flex-col py-4 px-6 dark:bg-slate-900 bg-white">
                      <div className="flex flex-col gap-y-4">
                        <span className="flex text-sky-500 dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">
                          {projectItem.tipe}
                        </span>
                        <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">
                          {projectItem.nama}
                        </h6>
                        <h6 className="text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">
                          {projectItem.deskrispi}
                        </h6>
                        <Progress
                          value={calculateProgress(projectItem.donasi)}
                        />
                      </div>
                      <p className="text-sky-700 dark:text-white text-center flex flex-row gap-x-2 py-4">
                        <span>
                          <Heart className="text-red-500" />
                        </span>{" "}
                        {projectItem.dukungan} orang memberi dukungan
                      </p>
                      <div className="flex flex-row gap-x-8">
                        <div className="w-2/3 flex flex-col justify-between items-start">
                          <h6 className="text-sky-500 dark:text-sky-500 text-lg font-medium">
                            Rp {projectItem.donasi}
                          </h6>
                          <h6 className="text-slate-500 dark:text-slate-200 text-sm">
                            Rp {projectItem.goals} target
                          </h6>
                        </div>
                        <button className="w-1/3 bg-sky-700 text-white dark:text-white py-3 px-4 rounded-xl">
                          Donate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="infrastrukturprogram">
              <div className="flex flex-row gap-x-8">
                {filterCollectionByType("Infrastruktur").map((projectItem) => (
                  <div
                    key={projectItem.nama}
                    className="h-full flex flex-col justify-between rounded-2xl w-1/4"
                  >
                    <div
                      className="flex flex-col gap-y-4 h-[200px] py-4 px-6"
                      style={{
                        backgroundImage: `url(${projectItem.image})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div className="flex flex-col py-4 px-6 dark:bg-slate-900 bg-white">
                      <div className="flex flex-col gap-y-4">
                        <span className="flex text-sky-500 dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">
                          {projectItem.tipe}
                        </span>
                        <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">
                          {projectItem.nama}
                        </h6>
                        <h6 className="text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">
                          {projectItem.deskrispi}
                        </h6>
                        <Progress
                          value={calculateProgress(projectItem.donasi)}
                        />
                      </div>
                      <p className="text-sky-700 dark:text-white text-center flex flex-row gap-x-2 py-4">
                        <span>
                          <Heart className="text-red-500" />
                        </span>{" "}
                        {projectItem.dukungan} orang memberi dukungan
                      </p>
                      <div className="flex flex-row gap-x-8">
                        <div className="w-2/3 flex flex-col justify-between items-start">
                          <h6 className="text-sky-500 dark:text-sky-500 text-lg font-medium">
                            Rp {projectItem.donasi}
                          </h6>
                          <h6 className="text-slate-500 dark:text-slate-200 text-sm">
                            Rp {projectItem.goals} target
                          </h6>
                        </div>
                        <button className="w-1/3 bg-sky-700 text-white dark:text-white py-3 px-4 rounded-xl">
                          Donate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Donate;
