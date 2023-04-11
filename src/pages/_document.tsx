import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
import Link from "next/link";

import { OG_TAGS } from "@/constants";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/images/favicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="128x128"
          href="/images/favicon.png"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <meta name="og:title" content={OG_TAGS.title} />
        <meta property="og:url" content={OG_TAGS.url} />
        <meta name="description" content={OG_TAGS.description} />
        <meta property="og:image" content={OG_TAGS.image.url} />
        <meta
          property="og:image:secure_url"
          content={OG_TAGS.image.secure_url}
        />
        <meta property="og:image:alt" content={OG_TAGS.image.alt} />
        <meta name="twitter:card" content={OG_TAGS.twitterCard} />
        <meta name="twitter:description" content={OG_TAGS.description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
