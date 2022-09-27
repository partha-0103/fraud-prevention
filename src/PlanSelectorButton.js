import { useCallback, useEffect, useState } from "react";
import { useFindMany, useFindFirst } from "@gadgetinc/react";
import {
  Layout,
  Card,
  Button,
  Page,
  List,
  ButtonGroup,
} from "@shopify/polaris";
import { api } from "./api";
import { useRouter } from "next/router";
export const PlanSelectorButton = (props) => {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const [result, refresh] = useFindFirst(api.shopifyShop, {
    select: {
      confirmationurl: true,
      myshopifyDomain: true,
    },
  });
  const { data, error, fetching } = result;

  const [subscriptionResult, subscriptionRefresh] = useFindMany(
    api.shopifyAppSubscription
  );
  const { data: subscriptionData } = subscriptionResult;

  useEffect(() => {
    if (!data || !subscriptionData) {
      return;
    }
    const currentStore = subscriptionData.find((sub) =>
      sub.returnUrl.includes(result.myshopifyDomain)
    );
    console.log(currentStore);
    if (currentStore) {
      setShow(false);
    }
  }, [data, subscriptionData]);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Product Pricing Information">
            <p>INR 10 per order</p>
            <br></br>
            <br></br>
            <p>Services Included</p>
            <List type="bullet">
              <List.Item>Address COmpleteness Scoring</List.Item>
              <List.Item>RTO risk flagging Red/Green</List.Item>
              <List.Item>Rules Customization for your business</List.Item>
              <List.Item>Pincode correctness Check</List.Item>
              <List.Item>Cod order frequency</List.Item>
            </List>
            <br></br>
            {show ? (
              <ButtonGroup>
                <Button
                  onClick={() => {
                    router.push("/cancellation");
                  }}
                  disabled={fetching}
                >
                  Cancel
                </Button>
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
              </ButtonGroup>
            ) : (
              <>
                <br></br>
                <br></br>
                <p>You have already subscribed to the plan</p>
              </>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
