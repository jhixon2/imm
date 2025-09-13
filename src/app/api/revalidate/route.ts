import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Webhook hit");
  try {
    const secret = req.nextUrl.searchParams.get("secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
      return new Response("Invalid token", { status: 401 });
    }

    const pathsToRevalidate = ["/", "/shoes", "/bags", "/more", "/about"];

    for (const path of pathsToRevalidate) {
      await fetch(`${req.nextUrl.origin}/api/revalidatePath?path=${path}`);
    }

    return new Response(
      JSON.stringify({ revalidated: true, now: Date.now() }),
      { status: 200 }
    );
  } catch (err) {
    return new Response("Error revalidating", { status: 500 });
  }
}


import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (path) {
    revalidatePath(path);
    return new Response(
      JSON.stringify({ revalidated: true, path }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify({ revalidated: false }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}