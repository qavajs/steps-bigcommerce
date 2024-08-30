import {httpMethods} from '../constants';
import BigCommerceApi from './BigCommerceApi';
import {splitArray} from '../utils';
import {CustomerAttribute, Customer} from '../models';
import IBigCommerceQavajsConfig from "../../IBigCommerceQavajsConfig";

const {GET, POST, PUT, DELETE} = httpMethods;

export default class CustomersApi extends BigCommerceApi {
  constructor(context: IBigCommerceQavajsConfig) {
    super(context);
  }

  /**
   * Returns a list of Customers. Optional filter parameters can be passed in.
   * The response includes the display name and other details
   * about each promotion, and lists the promotions ordered by ID by default.
   * @param queryParams {string} - optional filter parameter to make the response more specific
   * https://developer.bigcommerce.com/docs/rest-management/customers#get-all-customers
   */
  async getCustomers(queryParams: string): Promise<Required<Array<Customer>>> {
    return (await (
      await fetch(this.customersUrl + queryParams, {
        ...this.bigCommerceHeaders,
        method: GET,
      })
    ).json()).data;
  }

  /**
   * Creates a list of Customers.
   * @param customersData {Array<Customer>} - list of customers to create.
   * @returns an array of created customers including their ids.
   * https://developer.bigcommerce.com/docs/rest-management/customers#create-customers
   */
  async registerCustomers(customersData: Array<Customer>): Promise<Required<Array<Customer>> | void> {
    const emails: Array<string> = customersData.map((item) => item.email);
    const queryParams: string = `?email:in=${emails.map((e) => encodeURIComponent(e)).join()}`;
    const existingCustomers: Array<Customer> = await this.getCustomers(queryParams);
    if (existingCustomers.length < emails.length) {
      const customersToCreate: Array<Customer> = customersData.filter(
        (customer) =>
          !existingCustomers.find(
            (existingCustomer: { email: string }) => existingCustomer.email === customer.email,
          ),
      );
      const response = await (
        await fetch(this.customersUrl, {
          ...this.bigCommerceHeaders,
          method: POST,
          body: JSON.stringify(customersData),
        })
      ).json();
      return response.data;
    }
  }

  /**
   * Returns a list of Customer Attribute Values.
   * @param email {string} - customer's email .
   * @returns Promise<Array<CustomerAttribute>> - an array of customer's attributes
   */
  async getCustomerAttributes(email: string): Promise<Array<CustomerAttribute>> {
    const emailQueryParams = `?email:in=${encodeURIComponent(email)}`;
    let customer;
    customer = (await this.getCustomers(emailQueryParams))[0];
    if (!customer) {
      const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
      const formatter = new Intl.DateTimeFormat('en-CA', options);
      const formattedDate = formatter.format(new Date());
      const createdToday = `?date_created:min=${formattedDate}&limit=1000`;
      const customers = await this.getCustomers(createdToday);
      customer = customers.find((c: any) => c.email === email) as Required<Customer>;
    }
    const idQueryParams = `?customer_id:in=${customer.id}`;
    const response = await (
      await fetch(this.customerAttributesUrl + idQueryParams, {
        ...this.bigCommerceHeaders,
        method: GET,
      })
    ).json();
    return response.data;
  }

  /**
   * Upserts Customer Attribute Values. Updates the attribute values on the Customer.
   * @param customerIds {Array<number>} - list of customers' ids to upsert an attribute.
   * @param attributeId {number} - attribute identifier to be set or update if already exists.
   * @param value {string} - string attribute value to be set to the attribute.
   */
  async putAttributeValue(customerIds: Array<number>, attributeId: number, value: string): Promise<void> {
    const payloadArray = customerIds.map((id: number) => ({attribute_id: attributeId, value, customer_id: id}));
    await Promise.allSettled(
      payloadArray.map((payload) =>
        fetch(this.customerAttributesUrl, {
          ...this.bigCommerceHeaders,
          method: PUT,
          body: JSON.stringify([payload]),
        }),
      ),
    );
  }

  /**
   * Removes customers by their ids.
   * @param ids {Array<number>} - list of customers' ids to delete.
   * https://developer.bigcommerce.com/docs/rest-management/customers#delete-customers
   */
  async removeCustomersById(ids: Array<number>): Promise<void> {
    const splitByTen = splitArray(10);
    const groupedIds = splitByTen(ids);
    await Promise.allSettled(
      groupedIds.map(async (idsArray: Array<number>) => {
        const queryParams = `?id:in=${idsArray.join()}`;
        return fetch(this.customersUrl + queryParams, {
          ...this.bigCommerceHeaders,
          method: DELETE,
        });
      }),
    );
  }

  /**
   * Removes customers by their email.
   * @param emails {Array<string>} - list of customers' email to delete.
   * https://developer.bigcommerce.com/docs/rest-management/customers#delete-customers
   */
  async removeCustomersByEmail(emails: Array<string>): Promise<void> {
    const queryParams = `?email:in=${emails.map((e) => encodeURIComponent(e)).join()}`;
    const customersToDelete = await this.getCustomers(queryParams);
    if (customersToDelete.length) {
      const customersIds = customersToDelete.map((customer: Customer) => customer.id) as Array<number>;
      await this.removeCustomersById(customersIds);
    }
  }

  /**
   * Setups a password for an existing customer.
   * @param customerId {number} id of a Customer to be set a password.
   * @param password {string} - optional password value to be set.
   * https://developer.bigcommerce.com/docs/rest-management/customers#update-customers
   */
  async setPassword(customerId: number, password: string): Promise<any> {
    const body = [
      {
        id: customerId,
        authentication: {new_password: password},
      },
    ];
    let json;
    const response = await fetch(this.customersUrl, {
      ...this.bigCommerceHeaders,
      method: PUT,
      body: JSON.stringify(body),
    });
    try {
      json = await response.json();
    } catch (e) {
      throw new Error(`"Set password" response is text: ${await response.text()}`);
    }
    return json;
  }
}
