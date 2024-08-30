import BigCommerceApi from './BigCommerceApi';
import {Promotion} from '../models';
import IBigCommerceQavajsConfig from "../../IBigCommerceQavajsConfig";

export default class PromotionsApi extends BigCommerceApi {
  constructor(context: IBigCommerceQavajsConfig) {
    super(context);
  }

  /**
   * Returns a list of promotions.
   * The response includes the display name and other details
   * about each promotion, and lists the promotions ordered by ID by default.
   * @param queryParams {string} - optional param to make the response more specific
   * https://developer.bigcommerce.com/docs/rest-management/promotions/promotions-bulk#get-all-promotions
   */
  async getPromotions(queryParams = ''): Promise<Array<Promotion>> {
    return (await (
      await fetch(this.promotionsUrl + queryParams, {
        ...this.bigCommerceHeaders,
        method: 'GET',
      })
    ).json()).data;
  }

  /**
   * Creates a single promotion and returns its details.
   * https://developer.bigcommerce.com/docs/rest-management/promotions/promotions-single#create-promotion
   */
  async createPromotion(promotionObject: Promotion): Promise<Promotion> {
    return (await (
      await fetch(this.promotionsUrl, {
        ...this.bigCommerceHeaders,
        method: 'POST',
        body: JSON.stringify(promotionObject),
      })
    ).json()).data;
  }

  /**
   * Updated a single promotion and returns its details.
   * https://developer.bigcommerce.com/docs/rest-management/promotions/promotions-single#update-promotion
   */
  async updatePromotion(id: number, payload: any): Promise<Promotion> {
    return (await (
      await fetch(`${this.promotionsUrl}/${id}`, {
        ...this.bigCommerceHeaders,
        method: 'PUT',
        body: JSON.stringify(payload),
      })
    ).json()).data;
  }
}
