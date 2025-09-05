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
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', textAlign: 'center', color: "#84916d", backgroundColor: "#e3ddda" }}>
      <h1>{data?.title || 'Isabel Monika Marchand'}</h1>

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
            width: '5rem',
            height: '2rem',
            backgroundColor: '#b08b8b',
            color: 'white',
            borderRadius: '0.575rem',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          Shoes
        </button>
      </Link>

      <Link href="/bags">
        <button
          style={{
            marginTop: '6rem',
            width: '5rem',
            height: '2rem',
            backgroundColor: '#b08b8b',
            color: 'white',
            borderRadius: '0.575rem',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          Bags
        </button>
      </Link>

      <Link href="/more">
        <button
          style={{
            marginTop: '6rem',
            width: '5rem',
            height: '2rem',
            backgroundColor: '#b08b8b',
            color: 'white',
            borderRadius: '0.575rem',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          More
        </button>
      </Link>

      <Link href="/about">
        <button
          style={{
            marginTop: '6rem',
            width: '5rem',
            height: '2rem',
            backgroundColor: '#b08b8b',
            color: 'white',
            borderRadius: '0.575rem',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          About
        </button>
      </Link>

    </main>
  );
}