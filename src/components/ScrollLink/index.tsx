import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface ScrollLinkProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export default function ScrollLink({ id, children, className }: ScrollLinkProps) {
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const handleClick = (event: Event) => {
            event.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        const anchor = ref.current;
        if (!anchor) {
            return;
        }
        anchor.addEventListener('click', handleClick);
        return () => anchor.removeEventListener('click', handleClick);
    }, [id]);

    return (
        <Link href={`#${id}`} className={className} ref={ref}>
            {children}
        </Link>
    );
}
