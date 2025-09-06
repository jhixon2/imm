import { client } from "../../../lib/sanity";
import { urlFor } from "../../../lib/sanity.image";
import { getMultiCategoryItems } from "../../../lib/queries";
import Image from "next/image";
import Link from 'next/link';
import { Photo } from '../../types';

export default async function MorePage() {
  const more: Photo[] = await client.fetch(getMultiCategoryItems(["clothing", "other", "sketches"]));

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
          <div key={photo._id} style={{ cursor: "pointer", position: "relative", height: "300px"}}>
            <Image
              src={urlFor(photo.mainImage).width(300).height(300).url()}
              alt={photo.title}
              fill
              style={{ objectFit: "cover"}}
            />
            <p style={{ textAlign: "center", marginTop: "0.5rem" }}>{photo.title}</p>
          </div>
        ))}
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