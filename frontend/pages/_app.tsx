import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../styles/css/bootstrap.min.css";

// import { Carousel, initTE } from "tw-elements";

// initTE({ Carousel });

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import SidebarProvider from "../context/toggle.context";
// @ts-ignore
export default function App({ Component, pageProps, session }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <Component {...pageProps} />
        <Toaster position="top-center" reverseOrder={false} />
      </SidebarProvider>
    </SessionProvider>
  );
}
