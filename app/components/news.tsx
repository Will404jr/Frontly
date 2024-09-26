"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const News = () => {
  const [data, setData] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const useAutoScroll = (scrollRef: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

          // Incrementally scroll the container
          scrollRef.current.scrollLeft += clientWidth;

          // If it reaches the end, reset the scroll position
          if (scrollLeft + clientWidth >= scrollWidth) {
            scrollRef.current.scrollLeft = 0;
          }
        }
      }, 5000); // Scroll every 5 seconds

      return () => clearInterval(interval);
    }, [scrollRef]);
  };

  useAutoScroll(scrollRef);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_KEY = "OGXlWqkGC3XvmmuKgVM3rRiG5KLfZeAs";
        const URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const result = await response.json();
        if (result && result.results) {
          setData(result.results);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setData([]); // Optional: set an empty array in case of an error
      }
    };

    fetchNews();
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto space-x-4 p-4 bg-slate-50"
      style={{ scrollBehavior: "smooth" }}
    >
      {Array.isArray(data) && data.length > 0 ? (
        data.map((story: any) => (
          <div key={story.url} className="min-w-[300px] flex-shrink-0">
            <div className="w-60">
              {story.multimedia && story.multimedia.length > 0 && (
                <Image
                  src={story.multimedia[0].url}
                  alt={story.title}
                  width={story.multimedia[0].width || 300} // Use width from API or fallback
                  height={story.multimedia[0].height || 200} // Use height from API or fallback
                  className="mt-2 w-full h-60 object-cover"
                />
              )}
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                <h2 className="font-bold text-lg text-black text-center">
                  {story.title}
                </h2>
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No news stories available.</p>
      )}
    </div>
  );
};

export default News;
