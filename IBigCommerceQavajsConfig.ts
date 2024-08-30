import {IQavajsConfig} from "@qavajs/cli";
import CustomersApi from "./src/api/CustomersApi";
import B2bEditionApi from "./src/api/B2bEditionApi";
import PromotionsApi from "./src/api/PromotionsApi";

export default interface IBigCommerceQavajsConfig extends Partial<IQavajsConfig> {
  config: {
    bigCommerce:
      {
        promotionsApi: PromotionsApi;
        b2bEditionApi: B2bEditionApi;
        customersApi: CustomersApi;
        storeHash: string,
        accessToken: string,
        b2bAccessToken?: string,
        defaultUserPassword?: string
      }
  }
}