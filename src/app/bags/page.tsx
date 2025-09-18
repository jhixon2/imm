"use client";

import { client } from "../../../lib/sanity";
import { urlFor } from "../../../lib/sanity.image";
import { getCategoryItems } from "../../../lib/queries";
import Image from "next/image";
import Link from 'next/link';
import { Photo } from '../../types';
import { useState, useEffect} from "react";
import Lightbox from "../../components/lightbox";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const externalButtonStyle = {
    width: "10rem",
    height: "2.5rem",
    background: "none",
    padding: "0",
    color: "#b08b8b",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    gap: "5px",
    textDecoration: "underline",
    alignItems: "center",
  };

  export default function BagsPage() {
    const [bags, setBags] = useState<Photo[]>([]);
    const [selectedBag, setSelectedBag] = useState<Photo | null>(null);

  useEffect(() => {
    fetch(`/api/sanity?category=bags`)
        .then((res) => res.json())
        .then(setBags)
        .catch(console.error);
    }, []);    
  
  return (
    <main style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>HANDBAGS</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {bags.map((photo) => (
          <div key={photo._id} style={{ cursor: "pointer", position: "relative", height: "300px"}}
            onClick={() => setSelectedBag(photo)}
          >
            <Image
              src={urlFor(photo.mainImage).url()}
              alt={photo.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              style={{ objectFit: "cover" }}
            />
            <p style={{ textAlign: "center", marginTop: "0.5rem" }}>{photo.title}</p>
          </div>
        ))}
      </div>

      {selectedBag && <Lightbox item={selectedBag} onClose={() => setSelectedBag(null)} />}

      <div className="external-buttons"
        style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                flexDirection: "column",
                marginLeft: "1rem",
              }}
      >
        <Link href="https://www.instagram.com/isabelmonikamarchand">
          <button style={externalButtonStyle}><FaInstagram size={28} /> INSTAGRAM</button>
        </Link>
        <Link href="https://www.linkedin.com/in/isabel-marchand-45b885271">
          <button style={externalButtonStyle}><FaLinkedin size={28} />  LINKEDIN</button>
        </Link>
      </div>

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