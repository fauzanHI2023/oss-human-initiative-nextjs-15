"use client";
import ButtonLogout from "@/components/ButtonLogout";
import { signIn, useSession } from "next-auth/react";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import { useRouter, usePathname } from "next/navigation";
import React, {
  Fragment,
  Suspense,
  useEffect,
  useState,
  useRef,
  CSSProperties,
} from "react";
import Link from "next/link";
import { menuItems } from "@/data/data";
import SubMenu from "@/components/SubMenu";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { MdMenu, MdClose } from "react-icons/md";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Moon, Sun, BookUser } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { fetchCampaign } from "@/lib/donation/campaign/auth-campaign";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  const callbackUrl = "/dashboard";
  const user: any = session?.user;
  const pathname = usePathname();
  const [showPwlogin, setShowPwLogin] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formFilled, setFormFilled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { cartItems, cartCount } = useCart();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        // Step 1: Fetch all campaigns data
        const allCampaigns = await fetchCampaign(); // Mengambil semua data campaign

        // Step 2: Match cartItems with campaigns data
        const updatedCartItems = cartItems.map((item) => {
          const campaignData = allCampaigns.data.find(
            (campaign: { id: number }) => campaign.id === item.campaign_id
          ); // Mencocokkan campaign_id
          console.log("Matching campaignData:", campaignData); // Debug log

          return {
            ...item,
            campaign_name: campaignData?.campaign_name || "Unknown Campaign",
            campaign_img: campaignData?.campaign_img || "/default-image.jpg",
            slug: campaignData?.slug || "not-found",
          };
        });

        console.log("Updated Cart Items:", updatedCartItems); // Debug log
        setCartDetails(updatedCartItems); // Set state dengan data yang diperbarui
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchCartDetails();
    }
  }, [cartItems]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { username, password } = formData;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        usernameOrEmail: username,
        password: password,
      });
      if (!res?.error) {
        setShowModal(false);
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#75C8FB",
          title: "Successfull Login",
          showConfirmButton: false,
          timer: 2500,
        });
        router.push(callbackUrl);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid Login",
          text: "Check Username/Email or Password",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Updating field: ${name} -> Value: ${value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Cek apakah form telah diisi
    if (formData.username.trim() && formData.password.trim()) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [formData]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const togglePasswordVisibility = () => {
    setShowPwLogin(!showPwlogin);
  };

  const formatPrice = (amount: number) => {
    return `Rp ${Number(amount)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const isHome = pathname === "/";

  const isPageLogin = pathname === "/login";

  const isPageRegister = pathname === "/register";

  const isPageDonate = pathname === "/takeaction/selfdonate";

  const isPageDetailsCareer =
    /^\/joinourmovement\/behumanitarianworker\/[^/]+$/.test(pathname || "");

  const navVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const sidebarVariants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(20px at 40px 40px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  interface PathProps {
    d?: string;
    variants: Variants;
    transition?: { duration: number };
  }

  const Path = (props: PathProps) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  );

  const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button style={toggleContainer} onClick={toggle} className="bg-white">
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );

  const container: React.CSSProperties = {
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: 1,
    width: 500,
    maxWidth: "100%",
    height: 400,
    backgroundColor: "var(--accent)",
    borderRadius: 20,
    overflow: "hidden",
  };

  const nav: React.CSSProperties = {
    width: 300,
  };

  const background: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 90,
    bottom: 0,
    width: 300,
  };

  const toggleContainer: React.CSSProperties = {
    outline: "none",
    border: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    cursor: "pointer",
    position: "absolute",
    top: 18,
    left: 15,
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const list: React.CSSProperties = {
    listStyle: "none",
    padding: 25,
    margin: 0,
    position: "absolute",
    top: 80,
    width: 230,
  };

  const listItem: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    listStyle: "none",
    marginBottom: 20,
    cursor: "pointer",
  };

  const iconPlaceholder: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    flex: "40px 0",
    marginRight: 20,
  };

  const textPlaceholder: React.CSSProperties = {
    borderRadius: 5,
    width: 200,
    height: 20,
    flex: 1,
  };

  return (
    <>
      {" "}
      <header
        className={`absolute text-slate-700 dark:text-white ${
          isHome ? "" : ""
        } ${isPageLogin ? "hidden" : "flex"} ${
          isPageRegister ? "hidden" : "flex"
        } ${isPageDonate ? "sm:bg-transparent" : ""} ${
          isPageDetailsCareer ? "sm:bg-transparent text-white" : ""
        } ${
          isScrolled
            ? "sticky text-slate-700 dark:text-white dark:bg-slate-800 bg-white/75 shadow transition duration-300 z-[100]"
            : "bg-transparent z-[100]"
        } flex-center top-0 z-30 py-1 w-full body-font`}
      >
        <nav className="container w-full justify-between mx-auto flex flex-wrap py-4 px-4 sm:py-4 sm:px-5 sm:flex-row flex-row items-center">
          <Link
            href="/"
            className={`${
              isHome ? "bg-logo-blue" : "bg-logo-blue"
            } hidden sm:flex w-32 h-12 bg-no-repeat bg-contain title-font font-medium items-center text-gray-900 mb-0`}
          ></Link>
          <ul
            className={`hidden sm:flex flex-row relative mt-4 w-auto px-4 gap-x-6`}
          >
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="relative group text-base font-normal pb-2"
              >
                <Link
                  href={item.url}
                  className="flex flex-row dark:hover:text-slate-200 dark:text-slate-300 hover:text-slate-700 hover:font-semibold transition duration-200 ease-in text-slate-500 text-base font-semibold"
                >
                  {item.label} <ChevronDown className="text-sm w-4" />
                </Link>
                {item.subMenu && <SubMenu items={item.subMenu} />}
              </li>
            ))}
          </ul>
          <div className="sm:hidden w-full flex flex-row justify-between ">
            <div style={container} className="sm:hidden flex">
              <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}
                style={nav}
                className="flex"
              >
                <motion.div
                  style={background}
                  variants={sidebarVariants}
                  className="bg-gradient-to-r from-sky-500 to-sky-800"
                />
                <motion.ul
                  style={list}
                  variants={navVariants}
                  className={`flex flex-col`}
                >
                  {menuItems.map((item) => (
                    <motion.li
                      style={listItem}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      key={item.id}
                      className="relative group text-base font-normal pb-2"
                    >
                      <Link
                        href={item.url}
                        className="flex flex-row dark:hover:text-slate-200 dark:text-slate hover:text-slate-700 hover:font-semibold transition duration-200 ease-in text-slate-200 text-base font-semibold"
                      >
                        {item.label} <ChevronDown className="text-sm w-4" />
                      </Link>
                      {item.subMenu && <SubMenu items={item.subMenu} />}
                    </motion.li>
                  ))}
                </motion.ul>
                <MenuToggle toggle={() => setIsOpen(!isOpen)} />
              </motion.nav>
            </div>
            <Link
              href="/"
              className={`${
                isHome ? "bg-logo-blue" : "bg-logo-blue"
              } sm:hidden flex w-32 h-12 bg-no-repeat bg-contain title-font font-medium items-center text-gray-900 mb-0`}
            ></Link>
            <div className="flex sm:hidden flex-row gap-x-4 justify-center items-start">
              <div className="flex shrink-0 items-center gap-x-4 hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="z-[99999] bg-slate-200 text-slate-700 dark:text-white hover:bg-slate-300 dark:bg-slate-700 focus:outline-none relative"
                  >
                    <Button size="icon">
                      <Sun className="h-[1.2rem] text-slate-700 dark:text-slate-100 w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div
                  className="relative flex justify-center items-center bg-slate-200 dark:bg-slate-700 py-2 px-2 rounded"
                  onMouseEnter={() => setShowCartDropdown(true)}
                  onMouseLeave={() => setShowCartDropdown(false)}
                >
                  <AiOutlineShoppingCart className="text-2xl cursor-pointer" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-amber-400 dark:bg-red-500 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                  {showCartDropdown && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-75 z-10 top-0 left-0 transition-opacity duration-200 ease-in w-full h-full"
                      style={{ top: "84px" }}
                    >
                      <div
                        className="absolute top-0 right-0 bg-gray-50 dark:bg-slate-900 w-96 rounded-xl border-slate-100 shadow-2xl"
                        style={{ right: "4rem", top: "-20px" }}
                      >
                        <div className="flex flex-row justify-between items-center border-b">
                          <h3 className="text-base font-semibold p-4">
                            Cart{" "}
                            <span className="text-sm pl-2">{cartCount}</span>
                          </h3>
                          {cartItems.length > 0 && (
                            <div className="p-4 border-t">
                              <Link href="/checkout">
                                <button className="w-full text-sky-600">
                                  See All
                                </button>
                              </Link>
                            </div>
                          )}
                        </div>
                        <ul className="p-4 flex flex-col gap-y-5">
                          {cartDetails.length > 0 ? (
                            cartDetails.map((item) => (
                              <li
                                key={item.campaign_id}
                                className="flex flex-row w-full mb-2 justify-between items-center"
                              >
                                <Link href={`/campaign/${item.slug}`}>
                                  <div className="flex items-center gap-4">
                                    <Image
                                      src={`https://cdnx.human-initiative.org/image/${item.campaign_img}`}
                                      alt={
                                        item.campaign_name || "Campaign Image"
                                      }
                                      width={100}
                                      height={100}
                                      className="w-12 h-12 rounded-md object-cover"
                                    />
                                    <div>
                                      <h4 className="text-sm font-medium">
                                        {item.campaign_name}
                                      </h4>
                                      <p className="text-xs text-slate-700 dark:text-slate-300 ">
                                        {formatPrice(item.amount)}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="text-center text-gray-500">
                              Keranjang kosong.
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Suspense fallback="loading">
                <div className="flex flex-wrap items-center text-base justify-center gap-6">
                  {session ? (
                    <Fragment>
                      <Link
                        href="/dashboard"
                        className={`${isHome ? "" : ""} flex`}
                      >
                        Hi, {user?.full_name}
                      </Link>
                      <ButtonLogout />
                    </Fragment>
                  ) : (
                    <div className="flex flex-row justify-center items-center">
                      <button
                        onClick={() => setShowModal(true)}
                        className="h-full font-semibold inline-flex items-center bg-sky-600 border-0 py-2 px-4 focus:outline-none rounded-xl text-sm text-white mt-0 sm:mt-0 mr-2"
                      >
                        Log In <LogIn className="pl-2 w-8" />
                      </button>
                      <p>|</p>
                      <Link
                        href="/register"
                        className="h-full inline-flex items-center  border-0 py-2 px-2 focus:outline-none rounded text-sm text-slate-600 dark:text-white mt-0 sm:mt-0"
                      >
                        <BookUser />
                      </Link>
                    </div>
                  )}
                </div>
              </Suspense>
            </div>
          </div>
          <div className="hidden sm:flex flex-row gap-x-4 ">
            <div className="flex shrink-0 items-center gap-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="z-[99999] bg-slate-200 text-slate-700 dark:text-white hover:bg-slate-300 dark:bg-slate-700 focus:outline-none relative"
                >
                  <Button size="icon">
                    <Sun className="h-[1.2rem] text-slate-700 dark:text-slate-100 w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div
                className="relative flex justify-center items-center bg-slate-200 dark:bg-slate-700 py-2 px-2 rounded"
                onMouseEnter={() => setShowCartDropdown(true)}
                onMouseLeave={() => setShowCartDropdown(false)}
              >
                <AiOutlineShoppingCart className="text-2xl cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-400 dark:bg-red-500 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
                {showCartDropdown && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-75 z-10 top-0 left-0 transition-opacity duration-200 ease-in w-full h-full"
                    style={{ top: "84px" }}
                  >
                    <div
                      className="absolute top-0 right-0 bg-gray-50 dark:bg-slate-900 w-96 rounded-xl border-slate-100 shadow-2xl"
                      style={{ right: "4rem", top: "-20px" }}
                    >
                      <div className="flex flex-row justify-between items-center border-b">
                        <h3 className="text-base font-semibold p-4">
                          Cart <span className="text-sm pl-2">{cartCount}</span>
                        </h3>
                        {cartItems.length > 0 && (
                          <div className="p-4 border-t">
                            <Link href="/checkout">
                              <button className="w-full text-sky-600">
                                See All
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                      <ul className="p-4 flex flex-col gap-y-5">
                        {cartDetails.length > 0 ? (
                          cartDetails.map((item) => (
                            <li
                              key={item.campaign_id}
                              className="flex flex-row w-full mb-2 justify-between items-center"
                            >
                              <Link href={`/campaign/${item.slug}`}>
                                <div className="flex items-center gap-4">
                                  <Image
                                    src={`https://cdnx.human-initiative.org/image/${item.campaign_img}`}
                                    alt={item.campaign_name || "Campaign Image"}
                                    width={100}
                                    height={100}
                                    className="w-12 h-12 rounded-md object-cover"
                                  />
                                  <div>
                                    <h4 className="text-sm font-medium">
                                      {item.campaign_name}
                                    </h4>
                                    <p className="text-xs text-slate-700 dark:text-slate-300 ">
                                      {formatPrice(item.amount)}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li className="text-center text-gray-500">
                            Keranjang kosong.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Suspense fallback="loading">
              <div className="flex flex-wrap items-center text-base justify-center gap-6">
                {session ? (
                  <Fragment>
                    <Link
                      href="/dashboard"
                      className={`${isHome ? "" : ""} flex`}
                    >
                      Hi, {user?.full_name}
                    </Link>
                    <ButtonLogout />
                  </Fragment>
                ) : (
                  <div className="flex flex-row justify-center items-center">
                    <button
                      onClick={() => setShowModal(true)}
                      className="h-full font-semibold inline-flex items-center bg-sky-600 border-0 py-2 px-4 focus:outline-none rounded-xl text-sm text-white mt-0 sm:mt-0 mr-2"
                    >
                      Log In <LogIn className="pl-2 w-8" />
                    </button>
                    <p>|</p>
                    <Link
                      href="/register"
                      className="h-full inline-flex items-center  border-0 py-2 px-2 focus:outline-none rounded text-sm text-slate-600 dark:text-white mt-0 sm:mt-0"
                    >
                      <BookUser />
                    </Link>
                  </div>
                )}
              </div>
            </Suspense>
          </div>
        </nav>
      </header>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden dark:bg-slate-800/75 bg-black/75 overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-96">
              <div className="border-0 rounded-lg shadow-lg relative bg-background flex flex-col w-full outline-none focus:outline-none">
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                  <h3 className="w-full text-center text-3xl font-semibold">
                    Login
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    id="login-form"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      name="username"
                      className="w-full autofill:bg-background focus:bg-background bg-background text-slate-800 dark:text-slate-200 border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB] focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                      placeholder="Username or Email"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <div className="relative">
                      <input
                        name="password"
                        className="w-full bg-background text-slate-800 dark:text-slate-200 border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB] focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                        placeholder="Password"
                        type={showPwlogin ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPwlogin ? <PiEye /> : <PiEyeClosed />}
                      </button>
                    </div>
                  </form>
                  <div className="flex-col items-center justify-center space-y-4 mt-6">
                    <a href="#" className="w-full text-sm mb-2">
                      Forgot Password?
                    </a>
                    <button
                      form="login-form"
                      className={`text-center w-full ${
                        formFilled
                          ? "bg-sky-600 text-white"
                          : "bg-slate-400 text-white cursor-not-allowed"
                      } border-0 py-3 px-4 focus:outline-none rounded text-base ${
                        formFilled ? "" : "pointer-events-none"
                      }`}
                      type="submit"
                      disabled={!formFilled}
                    >
                      Login
                    </button>
                    <div className="flex flex-row text-center my-4">
                      <p className="text-stone-400 text-base">
                        Don&apos;t have an account yet?{" "}
                      </p>
                      <Link
                        href="/register"
                        className="text-sky-500"
                        onClick={() => setShowModal(false)}
                      >
                        Register
                      </Link>
                    </div>
                    <button
                      className="w-full border border-black px-4 py-3 flex flex-row items-center justify-center"
                      onClick={handleLoginGoogle}
                    >
                      <span className="pr-2 text-xl">
                        <FcGoogle />
                      </span>
                      Sign in with Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Navbar;

const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
