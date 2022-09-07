// import Gadget's react hooks for accessing data from your Gadget app
import { useAction, useFindMany } from "@gadgetinc/react";
// import the Gadget<->Shopify bindings that manage the auth process with Shopify
import {
  AppType,
  Provider as GadgetProvider,
  useGadget,
} from "@gadgetinc/react-shopify-app-bridge";
// import and use Shopify's react components like you might in other Shopify app
import { Button, Redirect, TitleBar } from "@shopify/app-bridge/actions";
import React from "react";
// import the instance of the Gadget API client for this app constructed in the other file
import { api } from "./api";

export default function App() {
  return (
    // Wrap our main application's react components in the `<GadgetProvider/>` component to interface with Shopify
    // This wrapper sets up the Shopify App Bridge, and will automatically redirect to perform the OAuth authentication if the shopify shop doesn't yet have the store installed.
    <GadgetProvider
      type={AppType.Embedded}
      shopifyApiKey="REPLACE ME with api key from Shopify partners dashboard"
      api={api}
    >
      <ProductManager />
    </GadgetProvider>
  );
}

// An example component that uses the Gadget React hooks to work with data in the Shopify backend
function ProductManager() {
  const { loading, appBridge, isRootFrameRequest, isAuthenticated } =
    useGadget();
  const [, deleteProduct] = useAction(api.shopifyProduct.delete);
  const [{ data, fetching, error }, refresh] = useFindMany(api.shopifyProduct);

  if (error) return <>Error: {error.toString()}</>;
  if (fetching) return <>Fetching...</>;
  if (!data) return <>No products found</>;

  // Set up a title bar for my embedded app
  const breadcrumb = Button.create(appBridge, { label: "My breadcrumb" });
  breadcrumb.subscribe(Button.Action.CLICK, () => {
    appBridge.dispatch(Redirect.toApp({ path: "/breadcrumb-link" }));
  });

  const titleBarOptions = {
    title: "My page title",
    breadcrumbs: breadcrumb,
  };
  TitleBar.create(appBridge, titleBarOptions);

  return (
    <>
      {loading && <span>Loading...</span>}
      {/* A user is viewing this page from a direct link so show them the home page! */}
      {!loading && isRootFrameRequest && (
        <div>Welcome to my cool app's webpage!</div>
      )}
      {!loading &&
        isAuthenticated &&
        data.map((product) => (
          <button
            onClick={(event) => {
              event.preventDefault();
              void deleteProduct({ id: product.id }).then(() => refresh());
            }}
          >
            Delete {product.name}
          </button>
        ))}
    </>
  );
}
