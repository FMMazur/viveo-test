import { Html, Head, Main, NextScript } from 'next/document';
import { Provider as JotaiProvider } from 'jotai';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <JotaiProvider>
          <Main />
        </JotaiProvider>
        <NextScript />
      </body>
    </Html>
  );
}
