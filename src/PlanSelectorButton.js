import { useCallback, useEffect, useState } from "react";
import { useAction, useFindMany } from "@gadgetinc/react";
import { api } from "./api";
export const PlanSelectorButton = (props) => {
  const [data, setData] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    api.shopifyCustomer
      .findFirst()
      .then((data) => console.log(setData(data)))
      .catch((e) => console.log(e));
  }, []);
  console.log(data);
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
