"use client";

import React, { useEffect, useState, CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import { FaClock, FaRegCopy } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";
import PopupNotif from "@/components/ui/utility/PopupNotif";
import Countdown from "react-countdown";
import { fetchConfirmStatus } from "@/lib/donation/payment/auth-confirm-payment";
import { MdConfirmationNumber } from "react-icons/md";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const PaymentBankTransfer: React.FC = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams?.get("transaction_id") || "";
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [notifMessage, setNotifMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  let [color, setColor] = useState("#209ce2");

  const formatToRupiah = (
    amount: number
  ): { main: string; lastThree: string } => {
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);

    const cleanAmount = formatted.replace(",00", "");
    const lastThree = cleanAmount.slice(-3);
    const main = cleanAmount.slice(0, -3);
    return { main, lastThree };
  };

  const handleCopyAccountNo = () => {
    if (transactionDetails?.payment_channel?.account_no) {
      navigator.clipboard.writeText(
        transactionDetails.payment_channel.account_no
      );
      setNotifMessage("Copied");
    }
  };

  useEffect(() => {
    if (transactionId) {
      const fetchTransactionDetails = async () => {
        try {
          const response = await fetch(
            `https://adminx.human-initiative.org/donation/create-transaction-api/get-transaction-bank?transaction_id=${transactionId}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setTransactionDetails(data.data);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError("Error fetching transaction details");
        } finally {
          setLoading(false);
        }
      };

      fetchTransactionDetails();
    } else {
      setLoading(false);
      setError("Transaction ID is missing");
    }

    AOS.init();
  }, [transactionId]);

  const handleConfirmPayment = async () => {
    if (!transactionId) return;

    setIsConfirming(true);
    try {
      const response = await fetchConfirmStatus(transactionId);
      if (response.success) {
        setNotifMessage("Pembayaran berhasil dikonfirmasi!");
        setTimeout(() => {
          window.location.reload(); // Refresh halaman untuk update status
        }, 1500);
      } else {
        setNotifMessage(response.message || "Gagal mengonfirmasi pembayaran.");
      }
    } catch (error) {
      setNotifMessage("Terjadi kesalahan saat konfirmasi pembayaran.");
    } finally {
      setIsConfirming(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:bg-slate-900 bg-gray-50">
        <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </main>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-red-500">Expired</span>;
    } else {
      return (
        <span className="bg-sky-300 rounded p-[2px] text-xs">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  let expirationTime = new Date();
  let expirationTimeWIB = new Date();
  let dueDateFormatted = "";

  if (transactionDetails && transactionDetails.transaction_date) {
    const parsedDate = Date.parse(transactionDetails.transaction_date);
    if (!isNaN(parsedDate)) {
      expirationTime = new Date(parsedDate);
      expirationTime.setHours(expirationTime.getHours() + 24);

      const utcOffset = expirationTime.getTimezoneOffset() * 60000;
      expirationTimeWIB = new Date(
        expirationTime.getTime() + utcOffset + 7 * 3600000
      );

      dueDateFormatted = expirationTimeWIB.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
    } else {
      console.error("Invalid date format in transaction_date");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:bg-slate-900">
      <div className="h-full h-96 w-1/2 py-4 pb-0 mt-12 shadow-xl rounded-sm">
        {transactionDetails && (
          <>
            {transactionDetails.status === "unpaid" && (
              <div
                data-aos="fade-down"
                className="flex flex-col justify-center items-center gap-2 mb-6"
              >
                <span className="flex justify-center items-center bg-sky-100 w-36 h-36 rounded-full">
                  <FaClock
                    size={24}
                    className="text-sky-400 text-5xl w-20 h-20"
                    data-aos="fade-down"
                  />
                </span>
                <h5 className="text-lg font-medium text-sky-600">
                  Awaiting Payment{" "}
                  <Countdown
                    className="font-bold bg-sky-200 text-slate-800 p-2 rounded"
                    date={expirationTime}
                    renderer={renderer}
                  />
                </h5>
                <p className="text-gray-500 text-sm">
                  Due on {dueDateFormatted}
                </p>
                <div className="flex flex-row justify-center items-center mb-3">
                  <h1 className="text-xl font-bold dark:text-sky-600 text-sky-700">
                    Thank you {transactionDetails.full_name}
                  </h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-4 mb-6 w-3/5">
                  <div className="flex flex-row w-full justify-center items-center">
                    <span className="mr-2 font-base dark:text-white text-zinc-800">
                      Your Transaction ID
                    </span>
                    <span>{transactionDetails.transaction_no}</span>
                  </div>
                  <div className="flex flex-row w-full justify-center items-center">
                    <span className="text-3xl font-bold">
                      {formatToRupiah(Number(transactionDetails.amount)).main}
                      <span className="text-sky-600">
                        {
                          formatToRupiah(Number(transactionDetails.amount))
                            .lastThree
                        }
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-2 w-4/5 justify-center items-center p-8 border rounded-xl shadow-xl">
                    <span className="mr-2 font-semibold text-2xl dark:text-white text-slate-700">
                      {transactionDetails.payment_channel.name}
                    </span>
                    <div className="flex flex-row w-full justify-between text-xl text-slate-600 dark:text-slate-300 font-semibold">
                      <span className="font-semibold">
                        {transactionDetails.payment_channel.account_name}
                      </span>
                      <span>
                        {transactionDetails.payment_channel.account_no}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyAccountNo}
                      className="w-full flex flex-row justify-center gap-x-4 items-center mt-2 px-4 py-2 bg-gray-200 text-slate-700 rounded-md transition duration-300 ease-in hover:bg-slate-600 hover:text-white"
                    >
                      Copy <FaRegCopy />
                    </button>
                  </div>
                  <button
                    onClick={handleConfirmPayment}
                    className="w-full flex flex-row justify-center gap-x-4 items-center mt-2 px-4 py-2 bg-sky-600 text-slate-700 rounded-md transition duration-300 ease-in hover:bg-slate-600 hover:text-white"
                  >
                    Konfirmasi Pembayaran
                  </button>
                </div>
              </div>
            )}
            {transactionDetails.status === "paid" && (
              <div
                data-aos="fade-down"
                className="flex flex-col relative justify-center items-center gap-2"
              >
                <div className="flex flex-col relative justify-center items-center py-4">
                  <MdConfirmationNumber
                    size={24}
                    className="text-sky-700 text-2xl w-20 h-20"
                    data-aos="fade-down"
                  />
                  <h5 className="text-sm font-medium text-slate-400">
                    Your transaction will be confirmed soon
                  </h5>
                  <div className="flex flex-row justify-center items-center mb-3">
                    <h1 className="text-2xl font-bold dark:text-sky-600 text-sky-800">
                      Thank you {transactionDetails.full_name}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-y-4 mb-6">
                    <div className="flex flex-row w-full justify-center items-center text-slate-500 dark:text-white">
                      <span className="mr-2 text-sm font-base dark:text-white">
                        Your Transaction ID
                      </span>
                      <span>{transactionDetails.transaction_no}</span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-center items-center">
                    <span className="text-3xl text-slate-800 font-bold">
                      {formatToRupiah(Number(transactionDetails.amount)).main}
                      <span className="text-slate-800">
                        {
                          formatToRupiah(Number(transactionDetails.amount))
                            .lastThree
                        }
                      </span>
                    </span>
                  </div>
                  <Link
                    href="/"
                    className="mt-8 mb-12 py-2 px-4 bg-slate-200 rounded-2xl text-slate-600 text-sm hover:bg-sky-500 hover:text-white transition duration-300 ease-in"
                  >
                    Go Home
                  </Link>
                </div>
                <div className="fixed bottom-0 text-sm text-slate-700 flex flex-row justify-center py-2 px-4 gap-x-1 w-full bg-gradient-to-l from-sky-200 to-blue-300">
                  <p>If you want to see your transaction history, please</p>
                  <Link
                    href="/login"
                    className="text-slate-900 font-semibold hover:text-sky-900 hover:underline transition duration-300 ease-in"
                  >
                    login first
                  </Link>
                </div>
              </div>
            )}
            {transactionDetails.status === "confirmed" && (
              <div
                data-aos="fade-down"
                className="flex flex-col justify-center items-center gap-2"
              >
                <div className="flex flex-col justify-center items-center">
                  <FaClipboardCheck
                    size={24}
                    className="text-sky-500 text-2xl w-20 h-20 mb-6"
                  />
                  <h5 className="text-sm font-medium text-gray-400">
                    Your Transaction is successful
                  </h5>
                  <div className="flex flex-row justify-center items-center mb-3">
                    <h1 className="text-2xl font-bold dark:text-sky-600 text-sky-800">
                      Thank you {transactionDetails.full_name}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-y-4 mb-6">
                    <div className="flex flex-row w-full justify-center items-center text-slate-500 dark:text-white">
                      <span className="mr-2 font-base dark:text-white">
                        Your Transaction ID
                      </span>
                      <span>{transactionDetails.transaction_no}</span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-center items-center">
                    <span className="text-3xl text-slate-800 font-bold">
                      {formatToRupiah(Number(transactionDetails.amount)).main}
                      <span className="text-slate-800">
                        {
                          formatToRupiah(Number(transactionDetails.amount))
                            .lastThree
                        }
                      </span>
                    </span>
                  </div>
                  <Link
                    href="/"
                    className="mt-6 mb-14 py-2 px-4 bg-slate-200 rounded-2xl text-slate-600 text-sm hover:bg-sky-500 hover:text-white transition duration-300 ease-in"
                  >
                    Go Home
                  </Link>
                </div>
                <div className="fixed bottom-0 text-sm text-slate-700 flex flex-row justify-center py-2 px-4 gap-x-1 w-full bg-gradient-to-l from-sky-200 to-blue-300">
                  <p>If you want to see your transaction history, please</p>
                  <Link
                    href="/login"
                    className="text-slate-900 font-semibold hover:text-sky-900 hover:underline transition duration-300 ease-in"
                  >
                    login first
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage("")}
      />
    </main>
  );
};

export default PaymentBankTransfer;
