// src/app/about/page.tsx
import { client } from '../../../lib/sanity';
import Image from 'next/image';
import { urlFor } from '../../../lib/sanity.image';
import Link from 'next/link';
import { Photo } from '../../types';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const externalButtonStyle = {
    marginTop: "1rem",
    width: "10rem",
    height: "2.5rem",
    background: "none",
    padding: "0",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    gap: "5px",
    textDecoration: "underline",
    alignItems: "center",
  };

export default async function AboutPage() {
  const profilePhoto: Photo = await client.fetch(`
    *[_type == "photo" && category == "ibi"][0]{
      _id,
      title,
      description,
      mainImage{
        asset->{_id, url}
      }
    }`,
    {},
    { next: { revalidate: 0 } }
    );

  return (
    <main style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto', textAlign: 'center' }}>
      <h1>ABOUT</h1>
      <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5rem",
            margin: "1rem auto",
          }}>
        {profilePhoto?.mainImage?.asset?.url && (
            <Image
                src={urlFor(profilePhoto.mainImage).url()}
                alt={profilePhoto.title}
                width={1536}
                height={2047}
                style={{
                    display: 'block',
                    margin: '1rem auto',
                    width: '100%',
                    height: 'auto',
                    maxWidth: '400px',
                }}
            />
        )}
        <div>
            {profilePhoto?.description && (
                <p style={{ maxWidth: "1536px", textAlign: "left", whiteSpace: "pre-line", fontSize: "20px", lineHeight: "32px", marginBottom: "32px"}}>
                {profilePhoto.description}
                </p>
            )}
            <div>
                <Link href="https://www.instagram.com/isabelmonikamarchand">
                <button style={externalButtonStyle}><FaInstagram size={28} /> INSTAGRAM</button>
                </Link>
                <Link href="https://www.linkedin.com/in/isabel-marchand-45b885271">
                <button style={externalButtonStyle}><FaLinkedin size={28} />  LINKEDIN</button>
                </Link>
            </div>
        </div>
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