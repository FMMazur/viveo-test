import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { useState } from 'react';
import { useTheme } from '@/hooks/utils/useTheme';
import { Navbar } from '@/components/navbar';
// import { DevTools as JotaiDevtools } from 'jotai-devtools';
import { ToastContainer } from 'react-toastify';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { UserProvider } from '@/components/provider/user';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const theme = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <DefaultSeo
          defaultTitle="Viveo Test"
          titleTemplate="%s | Viveo Test"
          description="random user list"
        />

        <UserProvider />

        <Navbar />
        <Component {...pageProps} />

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          theme={theme || 'light'}
        />
        {/* <JotaiDevtools /> */}
      </Hydrate>
    </QueryClientProvider>
  );
}
