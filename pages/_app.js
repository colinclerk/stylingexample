import { ClerkProvider } from "@clerk/clerk-react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider frontendApi="clerk.z09ah.qg0mp.lcl.dev">
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
