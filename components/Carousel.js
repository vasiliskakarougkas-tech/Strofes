"use client";

import { useState } from "react";
import { urlFor } from "../lib/sanity";

export default function Carousel({ images }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const total = images.length;
  const current = images[index];

  function goPrev() {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === total - 1 ? 0 : i + 1));
  }

  return (
    <div className="carousel">
      <div className="carousel-frame">
        <img
          src={urlFor(current).width(1200).url()}
          alt={current.alt || ""}
          className="carousel-image"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              className="carousel-btn carousel-btn-prev"
              onClick={goPrev}
              aria-label="Προηγούμενη φωτογραφία"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-btn carousel-btn-next"
              onClick={goNext}
              aria-label="Επόμενη φωτογραφία"
            >
              ›
            </button>
            <div className="carousel-counter mono">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </>
        )}
      </div>

      {current.alt && <p className="carousel-caption">{current.alt}</p>}

      {total > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Πήγαινε στη φωτογραφία ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
