import { Layout, Page, Card, Button } from "@shopify/polaris";
import { useRouter } from "next/router";
const Cancellation = () => {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Cancellation screen">
            <p>
              If you changed your mind please click the billing page in side
              menu
            </p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Cancellation;
