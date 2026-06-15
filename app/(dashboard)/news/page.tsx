"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function NewsPage() {

  const [news, setNews] =
    useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchNews() {

      const response =
        await fetch(
          "https://tradingcrmbackend-1.onrender.com/news"
        );

      const data =
        await response.json();
      console.log(data)
      setLoading(false)

      setNews(data);
    }

    fetchNews();

  }, []);

  if (loading) {
      return (
        <Loader />
      );
    }

  return (
    <div className="p-6">


      <h1
        className="
        mb-6
        text-3xl
        font-bold
        bg-gradient-to-r
          from-violet-500
          to-purple-500
          bg-clip-text
          text-transparent
          inline-block
        "
      >
        News
      </h1>

      <div className="space-y-4">

        {news.map(
          (article, index) => (
            <div
              key={index}
              className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              "
            >
              <h2
                className="
                text-lg
                font-semibold
                "
              >
                {article.headline}
              </h2>

              <p>{new Date(
                article.datetime * 1000
                ).toLocaleString("en-SG")}</p>

              <a
                href={article.url}
                target="_blank"
                className="
                mt-3
                inline-block
                text-sm
                text-[#845eed]
                "
              >
                Read More →
              </a>
            </div>
          )
        )}

      </div>

    </div>
  );
}