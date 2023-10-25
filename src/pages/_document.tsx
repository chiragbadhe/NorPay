import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="NorPay is a user-friendly payment app that allows users to seamlessly purchase tokens using Indian Rupees (INR). It simplifies the process of acquiring digital assets, making it accessible and convenient for users to invest and transact in the cryptocurrency and token space."
          />
          <title>Norpay - Nordeks Payment App</title>
          {/* Add Open Graph Protocol meta tags for social sharing */}
          <meta property="og:title" content="Norpay - Nordeks Payment App" />
          <meta
            property="og:description"
            content="NorPay is a user-friendly payment app that allows users to seamlessly purchase tokens using Indian Rupees (INR). It simplifies the process of acquiring digital assets, making it accessible and convenient for users to invest and transact in the cryptocurrency and token space."
          />
          <meta property="og:image" content="/banner.jpg" />{" "}
          {/* Replace with the actual image URL */}
          <meta property="og:image:alt" content="Image Alt Text" />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
