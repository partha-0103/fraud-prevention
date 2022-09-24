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
        <Card title="Online store dashboard" sectioned>
          <p>View a summary of your online store’s performance.</p>
        </Card>
        <Button
          onClick={() => {
            window.open(data?.confirmationurl);
          }}
          disabled={fetching}
          primary
        >
          Basic
        </Button>
      </Layout.Section>
    </Layout>
  );
};
