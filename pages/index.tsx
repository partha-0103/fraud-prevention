// import Gadget's react hooks for accessing data from your Gadget app
import { Scalars } from "@gadget-client/fraud-fe";
import { useRouter } from "next/router";
import { useAction, useFindMany } from "@gadgetinc/react";
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
} from "@shopify/polaris";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { json } from "stream/consumers";
// import the instance of the Gadget API client for this app constructed in the other file
import { api } from "../src/api";
import { PlanSelectorButton } from "../src/PlanSelectorButton";

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

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const router = useRouter();
  const [result, createCustomerDetails] = useAction(api.customerDetails.create);
  console.log(result);
  const { data, error, fetching } = result;
  const [customer, getCustomers] = useFindMany(api.customerDetails);
  const {
    data: customerDetailsData,
    error: customerDataError,
    fetching: customerDetailsFetching,
  } = customer;
  console.log(customerDetailsData, "details"); //=> a number

  const handleSubmit = () => {
    const data = {
      name,
      email,
      phone,
      businessname: businessName,
      businessurl: businessWebsite,
    };
    createCustomers(data);
  };

  const createCustomers = async (
    customerDetailsData: CreateCustomerDetailsInput
  ) => {
    const _result = await createCustomerDetails({
      customerDetails: {
        ...customerDetailsData,
      },
    });
    if (_result.data) {
      router.push("/payment-confirmation");
    }
  };
  console.log(data);
  const handleNameChange = useCallback((value: string) => setName(value), []);
  const handleEmailChange = useCallback((value: string) => setEmail(value), []);
  const handlePhoneChange = useCallback((value: string) => setPhone(value), []);
  const handleBusinessName = useCallback(
    (value: string) => setBusinessName(value),
    []
  );
  const handleBusinessWebsite = useCallback(
    (value: string) => setBusinessWebsite(value),
    []
  );
  const { loading, appBridge } = useGadget();
  // Loading or app bridge has not been set up yet
  if (loading || !appBridge) {
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
    <Layout>
      <Layout.Section>
        {loading && <span>Loading...</span>}
        {!loading && (
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={name}
                label="Name"
                onChange={handleNameChange}
                autoComplete="off"
              />
              <TextField
                value={email}
                label="Email"
                type="email"
                onChange={handleEmailChange}
                autoComplete="email"
              />
              <TextField
                value={phone}
                label="Phone"
                onChange={handlePhoneChange}
                autoComplete="off"
              />
              <TextField
                value={businessName}
                label="Business Name"
                onChange={handleBusinessName}
                autoComplete="off"
              />
              <TextField
                value={businessWebsite}
                label="Business Website"
                onChange={handleBusinessWebsite}
                autoComplete="off"
              />
              <Button submit>Submit</Button>
            </FormLayout>
          </Form>
        )}
      </Layout.Section>
    </Layout>
  );
};

export default Home;
