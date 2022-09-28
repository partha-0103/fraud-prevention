import {
  AppType,
  Provider as GadgetProvider,
} from "@gadgetinc/react-shopify-app-bridge";
import { AppProvider, Page } from "@shopify/polaris";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import type { AppProps } from "next/app";
import React from "react";
import { api } from "../src/api";
import "../styles/globals.css";
import Navbar from "../src/Navbar";
import useNavigationStore from "../src/hooks/useNavigation";

function AppContainer({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  /* @ts-ignore */
  const { show: showNavigation } = useNavigationStore();
  return (
    // wrap the application in the Gadget provider, which manages OAuthing with Shopify, creating a session with the Gadget backend, and creating an instance of the Shopify App Bridge
    // learn more at https://www.npmjs.com/package/@gadgetinc/react-shopify-app-bridge
    <QueryClientProvider client={queryClient}>
      <GadgetProvider
        type={AppType.Embedded}
        shopifyApiKey={process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!}
        api={api}
      >
        {/* 
      Wrap the application in the Shopify Polaris app provider, which makes Polaris components like Button and Card work.
      Learn more about Polaris at https://www.npmjs.com/package/@shopify/polaris
      */}
        {/* @ts-ignore */}
        <AppProvider i18n={enTranslations}>
          <Page fullWidth>
            {showNavigation ? <Navbar /> : null}
            <Component {...pageProps} />
          </Page>
        </AppProvider>
      </GadgetProvider>
    </QueryClientProvider>
  );
}

export default AppContainer;
