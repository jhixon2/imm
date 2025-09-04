import { GetStaticProps } from 'next'
import client from '../lib/sanity'

interface HomepageData {
  title: string
  aboutText: string
  heroImageUrl: string
}

interface HomePageProps {
  data: HomepageData
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const data: HomepageData = await client.fetch(
    `*[_type == "homepage"][0]{
      title,
      aboutText,
      "heroImageUrl": heroImage.asset->url
    }`
  )

  return {
    props: { data },
    revalidate: 60, // optional ISR
  }
}

export default function HomePage({ data }: HomePageProps) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.aboutText}</p>
      {data.heroImageUrl && <img src={data.heroImageUrl} alt={data.title} />}
    </div>
  )
}