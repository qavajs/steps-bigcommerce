import {When} from '@cucumber/cucumber';
import {type MemoryValue} from '@qavajs/core';

When('I create customer with {value} properties via BigCommerce API and save as {value}', async function (propsAlias: MemoryValue, key: MemoryValue) {
  const value = await propsAlias.value();
  const inputObject = JSON.parse(value);
  const createdCustomerArray = await this.config.bigCommerce.customersApi.registerCustomers([inputObject]);
  key.set(createdCustomerArray[0]);
});

When('I create customer via BigCommerce API and save as {value}:', async function ( key: MemoryValue, multilineString: string) {
  const value = await this.getValue(multilineString);
  const inputObject = JSON.parse(value);
  const createdCustomerArray = await this.config.bigCommerce.customersApi.registerCustomers([inputObject]);
  key.set(createdCustomerArray[0]);
});

When('I set password {value} for customer {value} via BigCommerce API', async function (passwordAlias: MemoryValue, customerEmailAlias: MemoryValue) {
  const password = await passwordAlias.value();
  const email =  await customerEmailAlias.value();
  const customer = (await this.config.bigCommerce.customersApi.getCustomers(`?email:in=${encodeURIComponent(email)}`))[0];
  await this.config.bigCommerce.customersApi.setPassword(customer.id, password);
});

When('I delete customer with email {value} via BigCommerce API', async function (customerEmailAlias: MemoryValue) {
  const email =  await customerEmailAlias.value();
  await this.config.bigCommerce.customersApi.removeCustomersByEmail([email]);
});

When(
  'I get customer with email {value} via BigCommerce API and save as {value}',
  async function (emailAlias: MemoryValue, key: MemoryValue) {
    const email: string = await emailAlias.value();
    const customer = (await this.config.bigCommerce.customersApi.getCustomers(`?email:in=${encodeURIComponent(email)}`))[0];
    key.set(customer);
  },
);

When(
  'I get {value} attribute for {value} customer via BigCommerce API and save it as {value}',
  async function (attributeAlias: MemoryValue, emailAlias: MemoryValue, key: MemoryValue) {
    const attributeId = await attributeAlias.value();
    const email = await emailAlias.value();
    const attributes = await this.config.bigCommerce.customersApi.getCustomerAttributes(email);
    const attribute = attributes.find((attr: any) => attr.attribute_id === attributeId);
    if (!attribute) throw new Error(`There is no attribute with id "${attributeId}" for the client "${email}"`);
    key.set(attribute.attribute_value);
  },
);

When(
  'I set {value} attribute value to {value} for {value} customer via BigCommerce API',
  async function (attributeAlias: MemoryValue, valueAlias: MemoryValue, emailAlias: MemoryValue) {
    const attributeId = await attributeAlias.value();
    const email = await emailAlias.value();
    const value = await valueAlias.value();
    const customerId = (await this.config.bigCommerce.customersApi.getCustomers(`?email:in=${encodeURIComponent(email)}`))[0].id;
    if (!customerId) throw new Error(`Customer with email "${email}" not found`);
    await this.config.bigCommerce.customersApi.putAttributeValue([customerId], attributeId, value);
  },
);
