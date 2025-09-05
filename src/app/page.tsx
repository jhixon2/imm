import client from '../../lib/sanity';

type HomepageData = {
  title?: string;
  aboutText?: string;
  heroImageUrl?: string;
};

export default async function Home() {
  // Fetch data directly in the Server Component
  const data: HomepageData = await client.fetch(`*[_type == "homepage"][0]{
    title,
    aboutText,
    "heroImageUrl": heroImage.asset->url
  }`);

  return (
    <main className="p-8">
      <h1>{data?.title || 'Title goes here'}</h1>
      {data?.heroImageUrl && <img src={data.heroImageUrl} alt="Hero" />}
      <p>{data?.aboutText || 'About text goes here'}</p>
    </main>
  );
}