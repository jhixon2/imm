import { client } from '../../lib/sanity';
import './globals.css';

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
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{data?.title || 'Title goes here'}</h1>
      {data?.heroImageUrl && (
        <img src={data.heroImageUrl} alt="Hero" className="w-full h-auto rounded-md mb-6" />
      )}
      <p className="text-lg">{data?.aboutText || 'About text goes here'}</p>
    </main>
  );
}