import BackgroundContainer from '@/components/background-container';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import '@/styles/globals.css';
import {SessionProvider} from 'next-auth/react';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SessionProvider session={session}>
            <BackgroundContainer>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </BackgroundContainer>
        </SessionProvider>
    );
}
