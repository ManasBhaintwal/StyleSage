import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CollectionConfig from '@/lib/models/CollectionConfig';
import { NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await dbConnect();
        const config = await CollectionConfig.findOne({ slug: params.slug });
        return NextResponse.json({ config });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await dbConnect();
        const data = await request.json();

        const config = await CollectionConfig.findOneAndUpdate(
            { slug: params.slug },
            { ...data, slug: params.slug }, // Ensure slug doesn't change implicitly
            { new: true, upsert: true }
        );

        return NextResponse.json({ config });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
