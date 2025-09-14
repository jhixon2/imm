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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          marginTop: "4rem",
          alignItems: "flex-start",
          height: "400px",
        }}
      >
      {shoes.map((photo) => {
        const randomOffset = Math.floor(Math.random() * 100);
        return (
            <div
            key={photo._id}
            style={{
                flex: "1 1 0",
                maxWidth: "200px",
                height: "200px",
                position: "relative",
                transform: `translateY(${randomOffset}px)`,
            }}
            >
            <Image
                src={urlFor(photo.mainImage).url()}
                alt={photo.title}
                fill
                style={{ objectFit: "cover" }}
            />
            </div>
        );
        })}
      </div>
    );
  }