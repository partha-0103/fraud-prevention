import {
  BrowserSessionStorageType,
  Client,
} from "@gadget-client/bureau-fraud-prevention";

// export an instance of the API client for this application
export const api = new Client({
  authenticationMode: {
    browserSession: {
      storageType: BrowserSessionStorageType.Temporary,
    },
  },
});
