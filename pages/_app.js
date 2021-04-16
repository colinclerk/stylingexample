import { ClerkProvider } from "@clerk/clerk-react";
import "../styles/globals.css";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider
      navigate={(to) => Router.push(to)}
      frontendApi="clerk.z09ah.qg0mp.lcl.dev"
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
