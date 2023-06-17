import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/utils/useTheme';
import { Navbar } from '@/components/navbar';
// import { DevTools as JotaiDevtools } from 'jotai-devtools';
import { useUser } from '@/hooks/user/useUser';
import { ToastContainer } from 'react-toastify';
import { Loading } from '@/components/ui/loading';
import { useTimer } from '@/hooks/utils/useTimer';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

const UserProvider = () => {
  const { isLoading } = useUser();
  const { enabled, start } = useTimer(300);

  useEffect(() => {
    if (!isLoading) return;

    start();
  }, [isLoading, start]);

  return isLoading || enabled ? (
    <div className="flex items-center justify-center fixed z-10 top-0 left-0 w-screen h-screen bg-white dark:bg-black">
      <Loading />
    </div>
  ) : null;
};

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
