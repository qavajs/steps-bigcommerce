import {Then} from "@cucumber/cucumber";
import * as assert from "assert";

Then('I expect there is no customer with email {string}', async function (emailAlias: string){
  const email = await emailAlias.value();
  const customerSearchResult = await this.config.bigCommerce.customersApi.getCustomers(`?email:in=${encodeURIComponent(email)}`);
  assert.ok(customerSearchResult.length === 0);
});