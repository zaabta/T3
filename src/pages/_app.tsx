import { SessionProvider } from "next-auth/react";
import { api } from "y/utils/api";
import "y/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { type AppPropsWithAuth } from "y/types";
import Auth  from "y/pages/components/layout/Auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}:AppPropsWithAuth) => {
  return (
    <SessionProvider session={session}>
      <Navbar/>
      {
        Component.requireAuth ? (
          <Auth>
              <Component {...pageProps} />
          </Auth>
        ): (<Component {...pageProps} />)
      }
      <Footer/>
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
