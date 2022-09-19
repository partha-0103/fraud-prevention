import { useCallback, useEffect } from "react";
import { useAction, useFindMany } from "@gadgetinc/react";
import { api } from "./api";
export const PlanSelectorButton = (props) => {
  const [result, refresh] = useFindMany(api.shopifyShop);
  const { data, error, fetching } = result;
  console.log(data?.length); //=> a number
  console.log(data?.[0].length); //=> a string

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subscribe = useCallback(async (plan) => {
    // create the resource in the backend
    const shop = await createSubscription(theShopId, { plan });
    // redirect the merchant to accept the charge within Shopify's interface
    window.location.href = shop.confirmationUrl;
  });

  // useEffect(() => {
  //   api.shopifyShop
  //     .findMany()
  //     .then((data) => console.log(data, "data"))
  //     .catch((e) => console.log(e, "error"));
  // }, []);

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
