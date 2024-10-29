import {When} from '@cucumber/cucumber';
import {Promotion} from "../models";
import {MemoryValue} from "@qavajs/core";

/**
 * Saves an array of all promotions to memory.
 * @param key {string} - alias to save the array of Promotions
 */
When('I get all promotions via BigCommerce API and save as {string}', async function (key: MemoryValue) {
  const promotions = await this.config.bigCommerce.promotionsApi.getPromotions() as Array<Required<Promotion>>;
  key.set(promotions);
});

/**
 * Deactivates all promotions.
 */
When('I deactivate all promotions via BigCommerce API', async function () {
  const promotions = await this.config.bigCommerce.promotionsApi.getPromotions();
  const ids = promotions.filter((p: Promotion) => p.status === 'ENABLED').map((p: Required<Promotion>) => p.id);
  if (ids.length) await Promise.allSettled(ids.map((id: number) => this.config.bigCommerce.promotionsApi.updatePromotion(id, {status: 'DISABLED'})));
});

/**
 * Activates a promotion. If the promotion is not found it is created through API.
 * @param promotionAlias {string} alias of the Promotion memory value
 */
When('I activate {string} promotion via BigCommerce API', async function (promotionAlias: MemoryValue) {
  const promotionObject = await promotionAlias.value();
  const promotions = await this.config.bigCommerce.promotionsApi.getPromotions();
  const isPromotionFound = promotions.find((p: Promotion) => p.name === promotionObject.name);
  if (!isPromotionFound) await this.config.bigCommerce.promotionsApi.createPromotion(promotionObject);
  else await this.config.bigCommerce.promotionsApi.updatePromotion(isPromotionFound.id, {status: 'ENABLED'});
});
