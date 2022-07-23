import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark">
      <Head />
      <body className="bg-white dark:bg-gray-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
