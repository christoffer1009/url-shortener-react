// src/components/UrlForm.tsx

import React, { useEffect, useState } from "react";
import * as crypto from "crypto";

interface ShortenUrlResponse {
  shortUrl: string;
}

interface GetIpResponse {
  ip:string
}

const ShortenUrlComponent: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const shortenUrl = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: originalUrl,
        }),
      });

      if (response.ok) {
        const data: ShortenUrlResponse = await response.json();
        setShortenedUrl(data.shortUrl);
      } else {
        console.error("Erro ao encurtar URL");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto p-4 border rounded shadow-md">
        <label className="block mb-2">
          Insira a URL:
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full py-2 px-3 border rounded mt-1"
          />
        </label>
        <button
          onClick={shortenUrl}
          disabled={loading}
          className={`bg-green-500 text-white py-2 px-3 rounded ${
            loading && "cursor-not-allowed"
          }`}
        >
          {loading ? "Encurtando..." : "Encurtar URL"}
        </button>
        {shortenedUrl && (
          <div className="mt-4">
            <p className="text-blue-500">URL encurtada:</p>
            <a
              href={`http://${shortenedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-200 border border-gray-400 rounded  py-2 px-3 text-blue-700 text-center hover:underline"
            >
              {shortenedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenUrlComponent;
