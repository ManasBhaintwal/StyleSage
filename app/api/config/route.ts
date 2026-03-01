import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteConfig from '@/lib/models/SiteConfig';
import { NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { type: string } }
) {
    // In app directory, dynamic params are part of the second arg, but here the type is part of the URL path name if using [type] folder
    // BUT we are using generic /api/config/navbar so we need [type] folder structure or check URL
    // Let's assume folder structure: app/api/config/[type]/route.ts
    // Wait, I am writing to app/api/config/navbar (single file? No, better use [type]).
    // Proceeding with [type] approach as per plan.

    return NextResponse.json({ error: "Use specific endpoints" });
}
