import { useCallback, useEffect } from "react";
import { useAction } from "@gadgetinc/react";
import { api } from "./api";
export const PlanSelectorButton = (props) => {
  // const [{ fetching, error, data }, createSubscription] = useAction(
  //   api.shopifyShop.subscribe
  // );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subscribe = useCallback(async (plan) => {
    // create the resource in the backend
    const shop = await createSubscription(theShopId, { plan });
    // redirect the merchant to accept the charge within Shopify's interface
    window.location.href = shop.confirmationUrl;
  });

  useEffect(() => {
    api.shopifyShop
      .findMany()
      .then((data) => console.log(data, "data"))
      .catch((e) => console.log(e, "error"));
  }, []);

  return (
    <button
      onClick={() => {
        subscribe("basic");
      }}
      // disabled={fetching}
    >
      Basic
    </button>
  );
};
