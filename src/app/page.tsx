import { client } from '../../lib/sanity';

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
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>{data?.title || 'Title goes here'}</h1>
      {data?.heroImageUrl && <img src={data.heroImageUrl} alt="Hero" style={{ width: '100%' }} />}
      <p>{data?.aboutText || 'About text goes here'}</p>
    </main>
  );
}