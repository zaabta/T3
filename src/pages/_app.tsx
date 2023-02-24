import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "y/utils/api";
import "y/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { AppPropsWithAuth } from "y/types";
import { Auth } from "y/pages/components/layout/Auth";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}:AppPropsWithAuth) => {
  return (
    <SessionProvider session={session}>
      {
        Component.requireAuth ? (
          <Auth>
              <Component {...pageProps} />
          </Auth>
        ): (<Component {...pageProps} />)
      }
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
