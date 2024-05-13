import type { Metadata } from 'next';

import { Lora } from 'next/font/google';
import '../styles/app.scss';
import StoreProvider from './StoreProvider';

// Style
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
library.add(fas);
config.autoAddCss = false;
const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lora',
});

export const metadata: Metadata = {
    title: 'Travel App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }:Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="https://res.cloudinary.com/thodo2001/image/upload/v1714020433/travel/festival/z1dplr4wbqglgxtrp1du.jpg" />
            <body className={`${lora.variable} tw-font-lora`}>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
