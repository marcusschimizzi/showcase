'use client';

import Image from 'next/image';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

interface Post {
    title: string;
    content: string;
}

const PostTemplate = ({ params }: { params: { slug: string } }) => {
    const [post, setPost] = useState<Post | null>(null);
    const slug = params.slug;

    useEffect(() => {
        fetch(`/api/posts/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
            });
    }, [slug]);

    if (!post) return <p>Loading...</p>;

    return (
        <article>
            <h1>{post.title}</h1>
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    );
};

export default PostTemplate;
