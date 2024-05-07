import type { Metadata } from 'next';

import { Lora } from 'next/font/google';
import '../styles/app.scss';
import StoreProvider from './StoreProvider';

// Style
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import HeaderComponent from './components/navbars/HeaderComponent';
import FooterComponent from './components/navbars/FooterComponent';
library.add(fas);
config.autoAddCss = false;
const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lora',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }:Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${lora.variable} tw-font-lora`}>
                <StoreProvider>
                    <HeaderComponent />
                    {children}
                <FooterComponent />
                </StoreProvider>
            </body>
        </html>
    );
}
