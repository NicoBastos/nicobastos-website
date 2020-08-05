import { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";
import "../styles/notion.css";
import "../styles/styles.css";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nico Bastos</title>
      </Head>
      <nav className="flex flex-row notion m-6 border ">
        <div className="mr-auto">
          <Link href="/">
            <a className="text-lg sm:text-base m-5">Nicolas Bastos</a>
          </Link>
        </div>
        <div>
          <Link href="/projects">
            <a className="text-lg m-3">Projects</a>
          </Link>
          <Link href="/blog">
            <a className="text-lg m-3">Blog</a>
          </Link>
          <Link href="contact-me">
            <a className="text-lg m-3">Contact Me</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
