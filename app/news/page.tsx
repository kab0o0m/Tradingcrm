"use client";

import { useEffect, useState } from "react";

export default function NewsPage() {

  const [news, setNews] =
    useState<any[]>([]);

  useEffect(() => {

    async function fetchNews() {

      const response =
        await fetch(
          "http://127.0.0.1:8000/news"
        );

      const data =
        await response.json();
      console.log(data)

      setNews(data);
    }

    fetchNews();

  }, []);

  return (
    <div className="p-6">

      <h1
        className="
        mb-6
        text-3xl
        font-bold
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