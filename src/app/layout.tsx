import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from './ThemeProvider';
import Nav from './components/Nav';
import StyledComponentsRegistry from './lib/registry';

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
