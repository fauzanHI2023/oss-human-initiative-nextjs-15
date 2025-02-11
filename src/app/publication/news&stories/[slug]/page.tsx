"use client";

import React, { useEffect, useState, CSSProperties } from "react";
import { useParams } from "next/navigation";
import { fetchNews } from "@/lib/publication/auth-news";
import HashLoader from "react-spinners/HashLoader";
import Image from "next/image";

interface News {
  id: number;
  post_title: string;
  post_content: string;
  post_date_gmt: string;
  guid: string;
  slug: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const PostDetail: React.FC = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState<News | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState("#209ce2");

  const stripHtml = (html: string) => {
    if (typeof window !== "undefined") {
      // Untuk lingkungan client-side
      const doc = new DOMParser().parseFromString(html, "text/html");
      const text = doc.body.textContent || "";

      // Hapus karakter "rn" atau variasinya
      return text.replace(/(\r\n|\n|\r|rn)+/g, " ").trim();
    }

    // Fallback untuk SSR (menghapus HTML tag dan karakter \r\n)
    return html
      .replace(/<[^>]*>?/gm, "") // Hapus semua tag HTML
      .replace(/(\r\n|\n|\r|rn)+/g, " ") // Hapus karakter \r\n dan variasinya
      .trim(); // Hapus spasi ekstra di awal/akhir
  };

  useEffect(() => {
    const fetchPost = async () => {
      // console.log("Params from URL:", params); // Debug log
      if (!slug) {
        console.warn("Missing slug in URL");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchNews();
        // console.log("Fetched data:", data); // Debug log
        if (data?.status === "200") {
          const posts: News[] = data.data.map((post: News) => ({
            ...post,
            post_content: stripHtml(post.post_content),
          }));
          const foundPost = posts.find((post) => post.slug === slug);
          // console.log("Found post:", foundPost); // Debug log
          setPost(foundPost || null);
        } else {
          console.error("Invalid response status:", data.status);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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

  if (!post) {
    return <p>Post not found. Please check the URL or slug.</p>;
  }

  const processContent = (html: string) => {
    let processedHtml = html.replace(/(\r\n|\r|\n)+/g, "<br>"); // Replace all line breaks with <br>
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      `<div style="text-align: center;"><img$1 style="margin: 1rem auto; max-width: 100%; height: auto;" /></div>`
    ); // Center <img> tags
    return processedHtml;
  };

  return (
    <main className="flex flex-col text-center justify-center items-center sm:py-36 py-12 w-full">
      <header className="flex justify-center items-center w-full h-[500px] px-12 relative">
        <Image
          src={post.guid}
          alt={post.post_title}
          width={500}
          height={300}
          className="rounded-t-xl w-11/12 h-[500px] object-cover absolute"
        />
        <div className="absolute inset-0 bg-black opacity-50" ></div>
        <h1 className="text-4xl font-semibold z-[100] text-sky-900 dark:text-white leading-[3.5rem] mb-4">
          {post.post_title}
        </h1>
      </header>
      <div className="sm:w-8/12 sm:max-w-[1430px] mx-auto mx-16 mt-8">
        <p className="text-gray-600 dark:text-slate-300 text-sm mb-6">
          {new Date(post.post_date_gmt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div
          className="prose text-justify max-w-none leading-9 text-base text-[#666] dark:text-white"
          dangerouslySetInnerHTML={{
            __html: processContent(post.post_content),
          }}
        />
      </div>
    </main>
  );
};

export default PostDetail;
