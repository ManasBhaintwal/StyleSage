import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteConfig from "@/lib/models/SiteConfig";
import { NextRequest } from "next/server";
import { getUserFromToken } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } },
) {
  try {
    await dbConnect();
    const config = await SiteConfig.findOne({ type: params.type });
    return NextResponse.json({ config });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { type: string } },
) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 },
      );
    }
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    await dbConnect();
    const data = await request.json();

    const config = await SiteConfig.findOneAndUpdate(
      { type: params.type },
      {
        type: params.type,
        content: data.content,
      },
      { new: true, upsert: true },
    );

    return NextResponse.json({ config });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
