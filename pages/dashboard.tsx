import { useFindMany, useFindFirst } from "@gadgetinc/react";
import { Card, Layout, Spinner, Page, Banner } from "@shopify/polaris";
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
    return data?.find((d) => d.shop === shopData?.myshopifyDomain)?.totalorders;
  }
  if (fetching || shopDataFetching) {
    return (
      <Page>
        <Spinner />
      </Page>
    );
  }
  return (
    <Page fullWidth title="Metrics View Of Dashboard">
      <Layout>
        <Banner title="" status="info" onDismiss={() => {}}>
          <p>
            Interested in RTO Guarantee - 100% protection against RTO Losses?
            ontact support@bureau.id
          </p>
        </Banner>
        <Layout.Section>
          <Card title="Total no of orders processed" sectioned>
            {getTotalNoOfOrders()}
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Total No of orders flagged" sectioned>
            {getTotalNoOFlaggedOrders()}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Dashboard;
