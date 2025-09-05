export type Photo = {
    _id: string;
    title: string;
    description: string;
    mainImage: { asset: { _id: string; url: string } };
    images: { asset: { _id: string; url: string } }[];
  };
  