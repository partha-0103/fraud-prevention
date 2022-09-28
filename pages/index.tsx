// import Gadget's react hooks for acce
import { Scalars } from "@gadget-client/bureau-fraud-prevention";
import { useRouter } from "next/router";
import { useAction, useFindFirst, useFindMany } from "@gadgetinc/react";
// import the Gadget<->Shopify bindings that manage the auth process with Shopify
import { useGadget } from "@gadgetinc/react-shopify-app-bridge";
// import and use Shopify's react components like you might in other Shopify app
import {
  Button as ButtonAction,
  Redirect,
  TitleBar,
} from "@shopify/app-bridge/actions";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Spinner,
  TextField,
  Page,
} from "@shopify/polaris";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { json } from "stream/consumers";
// import the instance of the Gadget API client for this app constructed in the other file
import { api } from "../src/api";

import useNavigationStore from "../src/hooks/useNavigation";

export interface CreateCustomerDetailsInput {
  name?: (Scalars["String"] | null) | null;

  email?: (Scalars["String"] | null) | null;

  phone?: (Scalars["String"] | null) | null;

  businessname?: (Scalars["String"] | null) | null;

  businessurl?: (Scalars["String"] | null) | null;
}

export interface CreateCustomerDetailsArguments {
  customerDetails?: CreateCustomerDetailsInput | null;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value, originalValue) => {
      return originalValue.trim();
    })
    .required("Required"),
  businessname: Yup.string()
    .transform((value, originalValue) => {
      return originalValue.trim();
    })
    .required("Required"),
  businessurl: Yup.string()
    .transform((value, originalValue) => {
      return originalValue.trim();
    })
    .required("Required"),
  phone: Yup.number()
    .transform((value, originalValue) => {
      return Number(originalValue.trim());
    })
    .required("Requried"),
  email: Yup.string()
    .transform((value, originalValue) => {
      return originalValue.trim();
    })
    .email("Invalid email")
    .required("Required"),
});

const Home: NextPage = () => {
  /* @ts-ignore */
  const { setShowNavigation, show: showNavigation } = useNavigationStore();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [result, createCustomerDetails] = useAction(api.customerdetails.create);
  const [customer, getCustomers] = useFindMany(api.customerdetails);
  const {
    data: customerDetailsData,
    error: customerDataError,
    fetching: customerDetailsFetching,
  } = customer;
  const [shopResult, refresh] = useFindFirst(api.shopifyShop, {
    select: {
      myshopifyDomain: true,
    },
  });
  const { data: shopData, fetching: shopDataFetching } = shopResult;
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      businessname: "",
      businessurl: "",
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        shopurl: shopData?.myshopifyDomain || "",
      };
      createCustomers(data);
    },
    validationSchema: SignupSchema,
  });
  useEffect(() => {
    const shopifyDomain = shopData?.myshopifyDomain;
    if (!customerDetailsData?.length || shopDataFetching) {
      return;
    }
    const currentDetails = customerDetailsData.find((details) => {
      return details.shopurl === shopData?.myshopifyDomain;
    });
    if (currentDetails) {
      router.push("/payment-confirmation");
    } else {
      setShow(true);
    }
  }, [shopData, customerDetailsData]);

  useEffect(() => {
    const shopifyDomain = shopData?.myshopifyDomain;
    if (!shopifyDomain || showNavigation) {
      return;
    }
    setShowNavigation(true);
  }, [shopData]);

  const createCustomers = async (
    customerDetailsData: CreateCustomerDetailsInput
  ) => {
    const _result = await createCustomerDetails({
      customerdetails: {
        ...customerDetailsData,
      },
    });
    if (_result.data) {
      router.push("/payment-confirmation");
    } else {
      console.log("error fetching data");
    }
  };
  const { loading, appBridge } = useGadget();
  // Loading or app bridge has not been set up yet
  if (
    loading ||
    !appBridge ||
    customerDetailsFetching ||
    shopDataFetching ||
    !show
  ) {
    return <Spinner />;
  }

  // Set up a title bar for my embedded app
  // const breadcrumb = ButtonAction.create(appBridge, { label: "My breadcrumb" });
  // breadcrumb.subscribe(ButtonAction.Action.CLICK, () => {
  //   appBridge.dispatch(Redirect.toApp({ path: "/breadcrumb-link" }));
  // });

  // const titleBarOptions = {
  //   title: "My page title",
  //   breadcrumbs: breadcrumb,
  // };
  // TitleBar.create(appBridge, titleBarOptions);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card title="Onboarding Details" sectioned>
            {loading && <span>Loading...</span>}
            {!loading && (
              <Form onSubmit={formik.handleSubmit}>
                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      name="name"
                      onChange={(e) => {
                        formik.handleChange({
                          target: {
                            value: e,
                            name: "name",
                          },
                        });
                      }}
                      value={formik.values.name}
                      label="Name"
                      autoComplete="off"
                      error={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                      onChange={(e) => {
                        formik.handleChange({
                          target: {
                            value: e,
                            name: "email",
                          },
                        });
                      }}
                      value={formik.values.email}
                      label="Email"
                      autoComplete="email"
                      error={formik.touched.email && formik.errors.email}
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                      onChange={(e) => {
                        formik.handleChange({
                          target: {
                            value: e,
                            name: "phone",
                          },
                        });
                      }}
                      value={formik.values.phone}
                      label="Phone"
                      autoComplete="off"
                      error={formik.touched.phone && formik.errors.phone}
                    />
                    <TextField
                      onChange={(e) => {
                        formik.handleChange({
                          target: {
                            value: e,
                            name: "businessname",
                          },
                        });
                      }}
                      value={formik.values.businessname}
                      autoComplete="off"
                      label="Business Name"
                      error={
                        formik.touched.businessname &&
                        formik.errors.businessname
                      }
                    />
                  </FormLayout.Group>

                  <TextField
                    onChange={(e) => {
                      formik.handleChange({
                        target: {
                          value: e,
                          name: "businessurl",
                        },
                      });
                    }}
                    value={formik.values.businessurl}
                    autoComplete="off"
                    label="Business Website"
                    error={
                      formik.touched.businessurl && formik.errors.businessurl
                    }
                  />
                  <Button submit primary loading={formik.isSubmitting}>
                    Submit
                  </Button>
                </FormLayout>
              </Form>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
