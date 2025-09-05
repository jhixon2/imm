import { client } from "../../../lib/sanity";
import { urlFor } from "../../../lib/sanity.image";
import { getCategoryItems } from "../../../lib/queries";
import Image from "next/image";
import Link from 'next/link';
import { Photo } from '../../types';

export default async function ShoesPage() {
  const shoes: Photo[] = await client.fetch(getCategoryItems("shoes"));

  return (
    <main style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Shoes</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {shoes.map((photo) => (
          <div key={photo._id} style={{ cursor: "pointer", position: "relative", height: "300px"}}>
            <Image
              src={urlFor(photo.mainImage).width(300).height(300).url()}
              alt={photo.title}
              fill
              style={{ objectFit: "cover", borderRadius: "0.5rem" }}
            />
            <p style={{ textAlign: "center", marginTop: "0.5rem" }}>{photo.title}</p>
          </div>
        ))}
      </div>
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          background: '#eee',
          textDecoration: 'none',
          color: '#84916d',
        }}
      >
        ← Back
      </Link>
    </main>
  );
}