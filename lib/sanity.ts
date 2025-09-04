import sanityClient from '@sanity/client'

const client: any = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})

export default client