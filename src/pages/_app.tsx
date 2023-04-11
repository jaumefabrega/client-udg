import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { getCookie, setCookies } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";

import ProtectedPage from "@/modules/general/ProtectedPage/ProtectedPage";

import { unprotectedURLs } from "@/constants";
import { UserContext } from "@/context";
import { useAuth } from "@/hooks/useAuth";

import "@/styles/globals.css";
import BasePage from "@/modules/general/BasePage/BasePage";

export default function App({
  Component,
  pageProps,
}: AppProps & { colorScheme: ColorScheme }) {
  const auth = useAuth();
  const router = useRouter();
  const queryClient = new QueryClient();

  const innerComponent = !unprotectedURLs.includes(router.pathname) ? (
    <ProtectedPage>
      <Component {...pageProps} />
    </ProtectedPage>
  ) : (
    <Component {...pageProps} />
  );

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    pageProps?.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <UserContext.Provider value={auth}>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              colorScheme,
              fontFamily: "Inter",
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <BasePage>{innerComponent}</BasePage>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
