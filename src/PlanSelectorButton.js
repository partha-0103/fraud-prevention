import { useEffect, useState } from "react";
import { useFindMany, useFindFirst } from "@gadgetinc/react";
import {
  Layout,
  Card,
  Button,
  Page,
  List,
  ButtonGroup,
  Spinner,
} from "@shopify/polaris";
import { api } from "./api";
import { useRouter } from "next/router";
import useNavigationStore from "../src/hooks/useNavigation";
import { useAppBridge } from "@gadgetinc/react-shopify-app-bridge";
import { Redirect, Button as ShopifyButton } from "@shopify/app-bridge/actions";

export const PlanSelectorButton = (props) => {
  /* @ts-ignore */
  const { setShowNavigation, show: showNavigation } = useNavigationStore();
  const [show, setShow] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const router = useRouter();
  const [result, refresh] = useFindFirst(api.shopifyShop, {
    select: {
      confirmationurl: true,
      myshopifyDomain: true,
    },
  });
  const { data, error, fetching } = result;
  // const { loading, appBridge, isRootFrameRequest } = useGadget();
  // const redirectButton = Button.create(appBridge, { label: "Accept" });
  // const navigate = appBridge.useNavigate();
  // console.log(navigate);
  const app = useAppBridge();
  console.log(app, "appBridge");
  const [subscriptionResult, subscriptionRefresh] = useFindMany(
    api.shopifyAppSubscription
  );
  const { data: subscriptionData } = subscriptionResult;

  useEffect(() => {
    setShowSpinner(false);
    if (!data || !subscriptionData) {
      return;
    }
    const currentStore = subscriptionData.find(
      (sub) =>
        sub.returnUrl.includes(data.myshopifyDomain) && sub.status === "ACTIVE"
    );

    if (currentStore) {
      router.push("/dashboard");
      setShow(false);
    } else {
      if (!showNavigation) {
        setShowNavigation(true);
      }
      setShowSpinner(false);
    }
  }, [data, subscriptionData]);

  if (showSpinner || !showNavigation) {
    return <Spinner />;
  }
  // redirectButton.subscribe(ShopifyButton.Action.CLICK, () => {
  //   appBridge.dispatch(Redirect.Action.REMOTE({ path: data?.confirmationurl }));
  // });
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Product Pricing Information">
            <p>USD 0.12 per order</p>
            <br></br>
            <h3>Services Included:</h3>
            <List type="bullet">
              <List.Item>Address Completeness Scoring</List.Item>
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
                    appBridge.navigate(data?.confirmationurl);
                    // navigate(data?.confirmationurl);
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
