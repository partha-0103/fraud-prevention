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
  return (
    <button
      onClick={() => {
        console.log(data?.confirmationurl);
        window.location.href = data?.confirmationurl;
      }}
      // disabled={fetching}
    >
      Basic
    </button>
  );
};
