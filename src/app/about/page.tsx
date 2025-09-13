// src/app/about/page.tsx
import { client } from '../../../lib/sanity';
import Image from 'next/image';
import { urlFor } from '../../../lib/sanity.image';
import Link from 'next/link';
import { Photo } from '../../types';

export default async function AboutPage() {
  const profilePhoto: Photo = await client.fetch(`
    *[_type == "photo" && category == "ibi"][0]{
      _id,
      title,
      mainImage{
        asset->{_id, url}
      }
    }`,
    {},
    { next: { revalidate: 0 } }
    );

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>ABOUT</h1>
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
      {profilePhoto?.title && <p style={{ marginTop: '1rem' }}>{profilePhoto.title}</p>}
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