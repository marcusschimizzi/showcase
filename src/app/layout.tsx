import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from './ThemeProvider';
import Nav from './components/Nav';
import StyledComponentsRegistry from './lib/registry';
import ApolloProvider from './ApolloProvider';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#232323',
}

export const metadata: Metadata = {
    title: 'Marcus Schimizzi',
    description: 'Personal website and portfolio for Marcus Schimizzi.',
    applicationName: 'Marcus Schimizzi',
    creator: 'Marcus Schimizzi',
    publisher: 'Marcus Schimizzi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
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
