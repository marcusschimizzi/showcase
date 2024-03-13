import { getPostBySlug } from '@/app/lib/blog';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;

    const post = getPostBySlug(slug, ['title', 'date', 'content']);
    return Response.json(post);
}
