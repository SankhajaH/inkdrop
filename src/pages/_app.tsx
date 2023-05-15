import BackgroundContainer from '@/components/background-container';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import '@/styles/globals.css';
import SEO from '@bradgarropy/next-seo';
import {SessionProvider} from 'next-auth/react';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <>
            <SEO
                title='Inkdrop'
                description='Inkdrop is a elegant blogging platform built with love❤️. It allows bloggers to create, edit, and publish blog posts, as well as browse and search for posts created by other bloggers.'
                keywords={['blog', 'website', 'inkdrop', 'micro-blogging', '#blogging']}
                icon='/favicon.ico'
            />
            <SessionProvider session={session}>
                <BackgroundContainer>
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                </BackgroundContainer>
            </SessionProvider>
        </>
    );
}
