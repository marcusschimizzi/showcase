'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from './ThemeProvider';
import Nav from './components/Nav';
import StyledComponentsRegistry from './lib/registry';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Marcus Schimizzi',
    description: 'Personal website and portfolio for Marcus Schimizzi.',
    viewport: 'width=device-width, initial-scale=1',
    applicationName: 'Marcus Schimizzi',
    creator: 'Marcus Schimizzi',
    publisher: 'Marcus Schimizzi',
    themeColor: '#232323',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (url.includes('#')) {
                const hash = url.split('#')[1];
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    return (
        <html lang="en">
            <body className={inter.className}>
                <StyledComponentsRegistry>
                    <ThemeProvider>
                        <Nav />
                        {children}
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
