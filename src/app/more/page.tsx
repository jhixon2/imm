"use client";

import { client } from "../../../lib/sanity";
import { urlFor } from "../../../lib/sanity.image";
import { getMultiCategoryItems } from "../../../lib/queries";
import Image from "next/image";
import Link from 'next/link';
import { Photo } from '../../types';
import { useState, useEffect} from "react";
import Lightbox from "../../components/lightbox";

export default function MorePage() {
  const [more, setMore] = useState<Photo[]>([]);
  const [selectedMore, setSelectedMore] = useState<Photo | null>(null);

  useEffect(() => {
    fetch('/api/sanity?multi=clothing%2Cother%2Csketches')
    .then((res) => res.json())
    .then(setMore)
    .catch(console.error);
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>ADDITIONAL</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {more.map((photo) => (
            <div key={photo._id} style={{ cursor: "pointer", position: "relative", height: "300px"}}
                onClick={() => setSelectedMore(photo)}
            >  
            <Image
              src={urlFor(photo.mainImage).url()}
              alt={photo.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              style={{ objectFit: "cover"}}
            />
            <p style={{ textAlign: "center", marginTop: "0.5rem" }}>{photo.title}</p>
          </div>
        ))}
      </div>

      {selectedMore && <Lightbox item={selectedMore} onClose={() => setSelectedMore(null)} />}

      <Link
        href="/"
        style={{
            position: 'absolute',
            top: '1.5rem',
            left: '1rem',
            padding: '0',
            background: 'none',
            textDecoration: 'none',
            color: '#84916d',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
        }}
      >
        ← BACK
      </Link>
    </main>
  );
}