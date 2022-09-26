import { useFindMany, useFindFirst } from "@gadgetinc/react";
import { Card, Layout, Spinner, List, Page } from "@shopify/polaris";
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

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card title="Matrics view of Dashboard" sectioned>
            {fetching || shopDataFetching ? (
              <Spinner />
            ) : (
              <List type="bullet">
                <List.Item>
                  Total no of orders processed: {getTotalNoOfOrders()}
                </List.Item>
                <List.Item>
                  Total No of orders flagged: {getTotalNoOFlaggedOrders()}
                </List.Item>
              </List>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Dashboard;
