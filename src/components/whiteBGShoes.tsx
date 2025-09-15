"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/sanity.image";
import { Photo } from "../types";

export default function WhiteBGShoes() {
    const [shoes, setShoes] = useState<Photo[]>([]);
  
    useEffect(() => {
      fetch(`/api/sanity?type=whiteBG&category=shoes`)
        .then((res) => res.json())
        .then(setShoes)
        .catch(console.error);
    }, []);
    
    return (
      <div className="white-bg-shoes-row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "1rem",
          padding: "2rem",
          height: "auto",
          margin: "0 auto"
        }}
      >
      {shoes.map((photo) => {
        const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
        const randomOffset = isMobile ? 0 : Math.floor(Math.random() * 100);
        return (
            <div
            key={photo._id}
            style={{
                display: "flex",
                flex: isMobile ? "0 0 100%" : "1 1 100px",
                maxWidth: isMobile ? "100%" : `${100 / shoes.length - 2}%`,
                height: isMobile ? "auto" : "200px",
                transform: `translateY(${randomOffset}px)`,
                marginTop: isMobile ? "0rem" : "4rem",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            {isMobile ? (
                <Image
                src={urlFor(photo.mainImage).url()}
                alt={photo.title}
                width={200}
                height={200}
                style={{ objectFit: "cover", maxHeight: "150px"}}
                />
            ) : (
                <Image
                src={urlFor(photo.mainImage).url()}
                alt={photo.title}
                fill
                style={{ objectFit: "cover" }}
                />
            )}
            </div>
        );
        })}
      </div>
    );
  }