import {Address, Company, CreateCompanyResponse} from '../models';
import {httpMethods} from "../constants";
import BigCommerceApi from './BigCommerceApi';
import IBigCommerceQavajsConfig from "../../IBigCommerceQavajsConfig";

const {GET, POST, PUT, DELETE} = httpMethods;

export default class B2bEditionApi extends BigCommerceApi {
  constructor(context: IBigCommerceQavajsConfig) {
    super(context);
  }

  /**
   * Returns all companies list. Pass queryParams to make response more specific.
   * @param queryParams {string} - param to precise search result
   * https://developers.bundleb2b.com/docs/openapi/rest-management/company/operations/list-companies
   */
  async getCompanies(queryParams = ''): Promise<Array<Required<Company>>> {
    const response = await fetch(this.companiesUrl + queryParams, {
      ...this.b2bEditionHeaders,
      method: GET,
    });
    return (await response.json()).data;
  }

  async getCompanyDetails(companyId: string): Promise<Required<Company>> {
    const response = await fetch(`${this.companiesUrl}/${companyId}`, {
      ...this.b2bEditionHeaders,
      method: GET,
    });
    return (await response.json()).data;
  }

  /**
   * Creates a company
   * @param data {Company} - company details.
   * @returns Promise<CreateCompanyResponse> response with ids of company and users created.
   */
  async createCompany(data: Company): Promise<CreateCompanyResponse> {
    const response = await fetch(this.companiesUrl, {
      ...this.b2bEditionHeaders,
      method: POST,
      body: JSON.stringify(data),
    });
    let responseObject;
    try {
      responseObject = await response.json();
    } catch (e) {
      throw new Error(`"Create company" response is text: ${await response.text()}`);
    }
    return responseObject.data
  }

  async updateCompany(companyId: string, data: Partial<Company>): Promise<CreateCompanyResponse> {
    const response = await fetch(`${this.companiesUrl}/${companyId}`, {
      ...this.b2bEditionHeaders,
      method: PUT,
      body: JSON.stringify(data),
    });
    let responseObject;
    try {
      responseObject = await response.json();
    } catch (e) {
      throw new Error(`"Update company" response is text: ${await response.text()}`);
    }
    return responseObject.data;
  }

  /**
   * Creates a company's address
   * @param data {Address} - address details
   * https://developers.bundleb2b.com/docs/openapi/rest-management/address/operations/create-a-address
   */
  async createAddress(data: Address): Promise<{ addressId: number }> {
    const response = await fetch(this.companiesUrl, {
      ...this.b2bEditionHeaders,
      method: POST,
      body: JSON.stringify(data),
    });
    return (await response.json()).data;
  }

  /**
   * Deletes a company
   * https://developers.bundleb2b.com/docs/openapi/rest-management/company/operations/delete-a-company
   * @param id {number} - company's id for deletion
   */
  async deleteCompany(id: number): Promise<void> {
    await fetch(`${this.companiesUrl}/${id}`, {
      ...this.b2bEditionHeaders,
      method: DELETE,
    });
  }
}