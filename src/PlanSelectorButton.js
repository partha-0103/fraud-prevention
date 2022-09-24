import { useCallback, useEffect, useState } from "react";
import { useAction, useFindFirst } from "@gadgetinc/react";
import { Layout, Card, Button } from "@shopify/polaris";
import { api } from "./api";
export const PlanSelectorButton = (props) => {
  const [result, refresh] = useFindFirst(api.shopifyShop, {
    select: {
      confirmationurl: true,
    },
  });
  const { data, error, fetching } = result;

  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <p>Product Pricing Information</p>
          <div>Inr 10 per order</div>
        </Card>
        <Button
          onClick={() => {
            window.open(data?.confirmationurl);
            setTimeout(() => {
              window.close();
            }, 1000);
          }}
          disabled={fetching}
          primary
        >
          Accept
        </Button>
      </Layout.Section>
    </Layout>
  );
};
