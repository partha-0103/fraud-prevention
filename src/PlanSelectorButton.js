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
  console.log(data); //=> a string
  console.log(data); //=> a Date object

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
