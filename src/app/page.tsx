import { client } from '../../lib/sanity';
import { urlFor } from '../../lib/sanity.image';
import Image from 'next/image';
import Link from 'next/link';

type HomepageData = {
  title?: string;
  aboutText?: string;
  heroImageUrl?: string;
};

export default async function Page() {
  const data = await client.fetch<HomepageData>(
    `*[_type == "homepage"][0]{
      title,
      aboutText,
      "heroImageUrl": heroImage.asset->url
    }`
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
          opacity: '0.2',
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

      <p>{data?.aboutText || 'homepage text'}</p>

      <Link href="/shoes">
        <button
          style={{
            marginTop: '6rem',
            width: '6rem',
            height: '2.5rem',
            background: 'none',
            padding: '0',
            textDecoration: 'underline',
            color: '#b08b8b',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
            fontSize: '16px',
          }}
        >
          FOOTWEAR
        </button>
      </Link>

      <Link href="/bags">
        <button
          style={{
            marginTop: '6rem',
            width: '6rem',
            height: '2.5rem',
            background: 'none',
            padding: '0',
            textDecoration: 'underline',
            color: '#b08b8b',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
            fontSize: '16px',
          }}
        >
          HANDBAGS
        </button>
      </Link>

      <Link href="/more">
        <button
          style={{
            marginTop: '6rem',
            width: '6rem',
            height: '2.5rem',
            background: 'none',
            padding: '0',
            textDecoration: 'underline',
            color: '#b08b8b',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
            fontSize: '16px',
          }}
        >
          ADDITIONAL
        </button>
      </Link>

      <Link href="/about">
        <button
          style={{
            marginTop: '6rem',
            width: '6rem',
            height: '2.5rem',
            background: 'none',
            padding: '0',
            textDecoration: 'underline',
            color: '#b08b8b',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
            fontSize: '16px',
          }}
        >
          ABOUT
        </button>
      </Link>

    </main>
  );
}