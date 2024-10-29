import {Then} from "@cucumber/cucumber";
import * as assert from "assert";
import {MemoryValue} from "@qavajs/core";

Then('I expect there is no customer with email {value}', async function (emailAlias: MemoryValue){
  const email = await emailAlias.value();
  const customerSearchResult = await this.config.bigCommerce.customersApi.getCustomers(`?email:in=${encodeURIComponent(email)}`);
  assert.ok(customerSearchResult.length === 0);
});