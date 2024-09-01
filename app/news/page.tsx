// app/news/page.tsx

import React from "react";

const News = async () => {
  const API_KEY = "OGXlWqkGC3XvmmuKgVM3rRiG5KLfZeAs";
  const URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
  const response = await fetch(URL);
  const data = await response.json();

  return (
    <div>
      <h1>Top Stories</h1>
      <ul>
        {data.results.map((story: any) => (
          <li key={story.url} className="mb-4">
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              <h2 className="font-bold text-lg">{story.title}</h2>
            </a>
            {story.multimedia && story.multimedia.length > 0 && (
              <img
                src={story.multimedia[0].url}
                alt={story.title}
                className="mt-2"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
