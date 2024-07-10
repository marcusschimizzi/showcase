import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import ThemeProvider from './ThemeProvider';
import Nav from '@/components/Nav';
import StyledComponentsRegistry from '@/lib/registry';
import ApolloProvider from './ApolloProvider';
import Fathom from '@/lib/Fathom';

const roboto = Roboto({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#232323',
};

export const metadata: Metadata = {
    title: 'Marcus Schimizzi',
    description: 'Personal website and portfolio for Marcus Schimizzi.',
    applicationName: 'Marcus Schimizzi',
    creator: 'Marcus Schimizzi',
    publisher: 'Marcus Schimizzi',
    openGraph: {
        title: 'Marcus Schimizzi',
        description: 'Personal website and portfolio for Marcus Schimizzi.',
        type: 'website',
        url: 'https://schimizzi.io',
        locale: 'en_US',
        siteName: 'Marcus Schimizzi',
        images: [
            {
                url: 'https://schimizzi.io/images/portrait.jpg',
                width: 800,
                height: 600,
                alt: 'Marcus Schimizzi',
            },
        ],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Fathom />
                <StyledComponentsRegistry>
                    <ThemeProvider>
                        <ApolloProvider>
                            <Nav />
                            {children}
                        </ApolloProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
