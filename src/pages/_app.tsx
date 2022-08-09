import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/tailwind.css";
import { ContextProvider } from "../contexts/ContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TailwindCSS TypeScript Starter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
