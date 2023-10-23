
import { NextResponse } from "next/server"
import { customSort, readFromFile, readFromUrl } from './utils'

export async function POST(request) {
    try {
        const files = await readFromUrl();
        const { sort_by } = await request.json();
        let result;

        switch (sort_by) {
            case 'created_at':
                result = files.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break
            case 'a-z':
                result = customSort(files);
                break
            case 'z-a':
                result = customSort(files).reverse();
                break
            default:
                result = files;
        }

        return NextResponse.json({ success: true, sorted_files: result });

    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

