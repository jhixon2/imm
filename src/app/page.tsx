import { client } from '../../lib/sanity';
import { urlFor } from '../../lib/sanity.image';
import Image from 'next/image';
import { getCategoryItems } from "../../lib/queries";
import Link from 'next/link';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import WhiteBGShoes from '../components/whiteBGShoes';


type HomepageData = {
  title?: string;
  aboutText?: string;
  heroImageUrl?: string;
};

const pageButtonStyle = {
  width: "10rem",
  height: "2.5rem",
  background: "none",
  padding: "0",
  textDecoration: "underline",
  color: "#b08b8b",
  border: "none",
  cursor: "pointer",
  fontSize: "24px",
};

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

export default async function Page() {
  client.fetch('*[_type == "photo"][0]{_id, title}').then(console.log).catch(console.error);
  const data = await client.fetch<HomepageData>(
    `*[_type == "homepage"][0]{
      title,
      aboutText,
      "heroImageUrl": heroImage.asset->url
    }`,
    {},
    { next: { revalidate: 0 } }
  );
  return (
    <main style={{ padding: '2rem', margin: 'auto', textAlign: 'center'}}>
      <h1>{data?.title || 'ISABEL MONIKA MARCHAND'}</h1>
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '130%',
          height: '110%',
          backgroundImage: "url('/IMM_bg_sketch.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: '0.3',
          zIndex: '-1',
        }}
      > 
      </div>
      {data?.heroImageUrl && (
        <div style={{ position: 'relative', width: '100%', height: '400px', margin: '1rem 0' }}>
          <Image
            src={data.heroImageUrl}
            alt="Hero"
            fill
            style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
          />
        </div>
      )}

      <p>{data?.aboutText || ''}</p>

      {/* Buttons linking to other pages */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", 
          gap: "6rem",
          marginTop: "6rem",
        }}
      >
        <Link href="/shoes">
          <button style={pageButtonStyle}>FOOTWEAR</button>
        </Link>
        <Link href="/bags">
          <button style={pageButtonStyle}>HANDBAGS</button>
        </Link>
        <Link href="/more">
          <button style={pageButtonStyle}>ADDITIONAL</button>
        </Link>
        <Link href="/about">
          <button style={pageButtonStyle}>ABOUT</button>
        </Link>
      </div>

      {/* Shoes with white background */}
      <WhiteBGShoes />

      {/* Buttons linking to external pages at bottom */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Link href="https://www.instagram.com/isabelmonikamarchand">
          <button style={externalButtonStyle}><FaInstagram size={28} /> INSTAGRAM</button>
        </Link>
        <Link href="https://www.linkedin.com/in/isabel-marchand-45b885271">
          <button style={externalButtonStyle}><FaLinkedin size={28} />  LINKEDIN</button>
        </Link>
      </div>

    </main>
  );
}