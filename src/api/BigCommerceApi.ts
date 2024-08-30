import IBigCommerceQavajsConfig from "../../IBigCommerceQavajsConfig";

export default class BigCommerceApi {
  bcStoreHash: string;
  bcAccessToken: string;
  bcB2bAccessToken: string;
  bigCommerceBaseUrl: string;
  customersUrl: string;
  customerAttributesUrl: string;
  promotionsUrl: string;
  b2bEditionBaseUrl: string;
  companiesUrl: string;
  addressesUrl: string;
  b2bEditionHeaders: Record<string, unknown>;
  bigCommerceHeaders: Record<string, unknown>;

  constructor(context: IBigCommerceQavajsConfig) {
    this.bcStoreHash = context.config.bigCommerce.storeHash ?? 'accessToken is not set';
    this.bcAccessToken = context.config.bigCommerce.accessToken ?? 'accessToken is not set';
    this.bcB2bAccessToken = context.config.bigCommerce.b2bAccessToken ?? 'b2bAccessToken is not set';
    this.bigCommerceBaseUrl = `https://api.bigcommerce.com/stores/${this.bcStoreHash}/v3`;
    this.customersUrl = `${this.bigCommerceBaseUrl}/customers`;
    this.customerAttributesUrl = `${this.customersUrl}/attribute-values`;
    this.promotionsUrl = `${this.bigCommerceBaseUrl}/promotions`;
    this.b2bEditionBaseUrl = `https://api-b2b.bigcommerce.com/api/v3/io`;
    this.companiesUrl = `${this.b2bEditionBaseUrl}/companies`;
    this.addressesUrl = `${this.b2bEditionBaseUrl}/addresses`;
    this.b2bEditionHeaders = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, 200-Response-IncludeExtraFields, 200-Standard Response',
        authToken: this.bcB2bAccessToken,
      },
    };
    this.bigCommerceHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': this.bcAccessToken,
      },
    };
  }
}
