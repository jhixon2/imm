import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../lib/sanity";
import { getCategoryItems, getShoesWhiteBG, getMultiCategoryItems } from "../../../../lib/queries";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const type = req.nextUrl.searchParams.get("type");

  let query = "";
  let data;

  try {
    if (type === "whiteBG" && category === "shoes") {
      query = getShoesWhiteBG();
      data = await client.fetch(query);
    } else if (category) {
        const collectionQuery = `*[_type == "photoCollectionType" && title match $category][0]{
            items[]->{
            _id,
            title,
            description,
            category,
            mainImage{
                asset->{
                  _id,
                  url
                }
              },
            images[]{
                  asset->{
                    _id,
                    url
                  }
              },
            hide,
            whiteBG
            }
        }`;
        const collection = await client.fetch(collectionQuery, { category });
        if (collection?.items?.length) {
            data = collection.items;
        }
        else if (category === "other") {
            // in case it breaks just get from photos like before w/o ordering (multicategories)
            data = await client.fetch(getMultiCategoryItems(["sketches", "clothing", "other"]));
        } else {
            // same as above but when just one category
            data = await client.fetch(getCategoryItems(category));
        }
    } else {
      return NextResponse.json({ error: "No valid query parameters" }, { status: 400 });
    }
  return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}