import { useCallback, useEffect, useState } from "react";
import { useAction, useFindFirst } from "@gadgetinc/react";
import { api } from "./api";
export const PlanSelectorButton = (props) => {
  const [result, refresh] = useFindFirst(api.shopifyShop, {
    select: {
      confirmationurl: true,
    },
  });
  const { data, error, fetching } = result;
  console.log(data?.confirmationurl); //=> a string
  console.log(data); //=> a Date object

  return (
    <button
      onClick={() => {
        console.log(data?.confirmationurl);
        window.open(data?.confirmationurl, "_self");
      }}
      // disabled={fetching}
    >
      Basic
    </button>
  );
};
