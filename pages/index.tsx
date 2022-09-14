// import Gadget's react hooks for accessing data from your Gadget app
import { Scalars } from "@gadget-client/fraud-fe";
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

  useEffect(() => {
    // api.customerDetails
    //   .findFirst()
    //   .then((data) => console.log(data))
    //   .catch((e) => console.log(e));
    // console.log(api);
    // api.shopifyCustomer
    //   .findFirst()
    //   .then((data) => console.log(data))
    //   .catch((e) => console.log(e));
    //   .catch((e) => console.log(e));
  }, []);

  const handleSubmit = () => {
    const data = {
      name,
      email,
      phone,
      businessName,
      businessWebsite,
    };
    let recordObject = {
      records: [
        {
          value: data,
        },
      ],
    };

    api.customerDetails
      .findFirst()
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
    api.shopifyShop
      .findFirst()
      .then((data) => console.log(data, "dataaaaaa"))
      .catch((e) => console.log(e, "errorrrrrrr"));
    api.shopifyCustomer
      .findFirst()
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
    // axios({
    //   url: "https://bfp.stg.bureau.id/topics/shopify-merchant-onboard",
    //   headers: {
    //     "Content-Type": "application/vnd.kafka.json.v2+json",
    //     "x-api-key": "XKrvMkvkHeaWBcGRCa24CxdJXV2Gh6B6oDyfq6mj",
    //   },
    //   method: "POST",
    //   data: JSON.stringify(recordObject),
    // })
    //   .then(({ data }) => console.log(data, "success"))
    //   .catch((e) => console.log(e, "error"));
  };

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
  const [, deleteCustomer] = useAction(api.shopifyCustomer.delete);
  // Loading or app bridge has not been set up yet
  if (loading || !appBridge) {
    return <Spinner />;
  }

  // Set up a title bar for my embedded app
  const breadcrumb = ButtonAction.create(appBridge, { label: "My breadcrumb" });
  breadcrumb.subscribe(ButtonAction.Action.CLICK, () => {
    appBridge.dispatch(Redirect.toApp({ path: "/breadcrumb-link" }));
  });

  const titleBarOptions = {
    title: "My page title",
    breadcrumbs: breadcrumb,
  };
  TitleBar.create(appBridge, titleBarOptions);

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
        <PlanSelectorButton />
      </Layout.Section>
    </Layout>
  );
};

export default Home;
