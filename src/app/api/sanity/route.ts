import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../lib/sanity";
import { getCategoryItems, getShoesWhiteBG, getMultiCategoryItems } from "../../../../lib/queries";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const type = req.nextUrl.searchParams.get("type");
  const multi = req.nextUrl.searchParams.get("multi");

  let query = "";

  try {
    if (type === "whiteBG" && category === "shoes") {
      query = getShoesWhiteBG();
    } else if (multi) {
      const categories = multi.split(",").map((c: string) => c.trim());
      query = getMultiCategoryItems(categories);
    } else if (category) {
      query = getCategoryItems(category);
    } else {
      return NextResponse.json({ error: "No valid query parameters" }, { status: 400 });
    }

    const data = await client.fetch(query);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}