"use client";
import ButtonLogout from "@/components/ButtonLogout";
import { signIn, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, {
  Fragment,
  Suspense,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { BookUser } from "lucide-react";
import { LogIn } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";
import LogoMobile from "./LogoMobile"
import Menu from "./Menu";
import Theme from "./Theme";
import Cart from "./Cart";
import MobileMotionNav from "./MobileMotionNav";

type Props = {};

const Navbar = (props: Props) => {
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

  const isHome = pathname === "/";

  const isPageLogin = pathname === "/login";

  const isPageRegister = pathname === "/register";

  const isPageDonate = pathname === "/takeaction/selfdonate";

  const isPageDetailsCareer =
    /^\/joinourmovement\/behumanitarianworker\/[^/]+$/.test(pathname || "");

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
          <Logo />
          <Menu/>
          <div className="sm:hidden w-full flex flex-row justify-between ">
            <MobileMotionNav/>
            <LogoMobile/>
            <div className="flex sm:hidden flex-row gap-x-4 justify-center items-start">
              <div className="flex shrink-0 items-center gap-x-4 hidden">
                <Theme/>
                <Cart/>
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
              <Theme/>
              <Cart/>
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
