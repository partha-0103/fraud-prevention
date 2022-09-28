import { useFindMany, useFindFirst } from "@gadgetinc/react";
import {
  Card,
  Layout,
  Spinner,
  Page,
  Banner,
  DisplayText,
  Stack,
} from "@shopify/polaris";
import { api } from "../src/api";
const Dashboard = () => {
  const [result, refresh] = useFindMany(api.dashboard);
  const { data, error, fetching } = result;
  const [shopResult, refreshShop] = useFindFirst(api.shopifyShop, {
    select: {
      myshopifyDomain: true,
    },
  });
  const { data: shopData, fetching: shopDataFetching } = shopResult;

  function getTotalNoOfOrders() {
    return data?.find((d) => d.shop === shopData?.myshopifyDomain)?.totalorders;
  }
  function getTotalNoOFlaggedOrders() {
    return data?.find((d) => d.shop === shopData?.myshopifyDomain)
      ?.flaggedorders;
  }
  if (fetching || shopDataFetching) {
    return (
      <Page>
        <Spinner />
      </Page>
    );
  }
  return (
    <>
      <Banner title="" status="info" onDismiss={() => {}}>
        <p>
          Interested in RTO Guarantee - 100% protection against RTO Losses?
          Contact support@bureau.id
        </p>
      </Banner>
      <Page fullWidth title="Metrics View Of Dashboard">
        <Layout>
          <Layout.Section secondary>
            <Card title="Total no of orders processed" sectioned>
              <Stack alignment="center">
                <DisplayText size="extraLarge">
                  {getTotalNoOfOrders()}
                </DisplayText>
              </Stack>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card title="Total no of orders flagged" sectioned>
              <Stack alignment="center">
                <DisplayText size="extraLarge">
                  {getTotalNoOFlaggedOrders()}
                </DisplayText>
              </Stack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default Dashboard;
