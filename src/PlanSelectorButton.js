import { useCallback, useEffect, useState } from "react";
import { useAction, useFindFirst } from "@gadgetinc/react";
import { Layout, Card, Button, Page, List } from "@shopify/polaris";
import { api } from "./api";
export const PlanSelectorButton = (props) => {
  const [result, refresh] = useFindFirst(api.shopifyShop, {
    select: {
      confirmationurl: true,
    },
  });
  const { data, error, fetching } = result;

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Product Pricing Information">
            <p>INR 10 per order</p>
            <p>Services Included</p>
            <List type="bullet">
              <List.Item>Address COmpleteness Scoring</List.Item>
              <List.Item>RTO risk flagging Red/Green</List.Item>
              <List.Item>Rules Customization for your business</List.Item>
              <List.Item>Pincode correctness Check</List.Item>
              <List.Item>Cod order frequency</List.Item>
            </List>
            <Button
              onClick={() => {
                window.open(data?.confirmationurl);
                window.close();
              }}
              disabled={fetching}
              primary
            >
              Accept
            </Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
