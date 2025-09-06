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
    }
  `);

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>ABOUT</h1>
      {profilePhoto?.mainImage?.asset?.url && (
        <div style={{ position: 'relative', width: '100%', paddingTop: '100%', marginTop: '1rem' }}>
          <Image
            src={urlFor(profilePhoto.mainImage).width(600).height(600).url()}
            alt={profilePhoto.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
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