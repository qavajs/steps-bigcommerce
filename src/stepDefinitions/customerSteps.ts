import {When} from '@cucumber/cucumber';

When('I create customer with {string} properties via BigCommerce API and save as {string}', async function (propsAlias: string, key: string) {
  const value = await this.getValue(propsAlias)
  const inputObject = JSON.parse(value);
  const createdCustomerArray = await this.config.bigCommerce.customersApi.registerCustomers([inputObject]);
  await this.setValue(key, createdCustomerArray[0]);
});

When('I create customer via BigCommerce API and save as {string}:', async function ( key: string, multilineString: string) {
  const value = await this.getValue(multilineString);
  const inputObject = JSON.parse(value);
  const createdCustomerArray = await this.config.bigCommerce.customersApi.registerCustomers([inputObject]);
  await this.setValue(key, createdCustomerArray[0]);
});

When('I set password {string} for customer {string} via BigCommerce API', async function (passwordAlias: string, customerEmailAlias: string) {
  const password = await this.getValue(passwordAlias);
  const email =  await this.getValue(customerEmailAlias);
  const customer = (await this.config.bigCommerce.customersApi.getCustomers(`?email:in=${encodeURIComponent(email)}`))[0];
  await this.config.bigCommerce.customersApi.setPassword(customer.id, password);
});

When('I delete customer with email {string} via BigCommerce API', async function (customerEmailAlias: string) {
  const email =  await this.getValue(customerEmailAlias);
  await this.config.bigCommerce.customersApi.removeCustomersByEmail([email]);
});

When(
  'I get customer with email {string} via BigCommerce API and save as {string}',
  async function (emailAlias: string, key: string) {
    const email: string = await this.getValue(emailAlias);
    const customer = (await this.config.bigCommerce.customersApi.getCustomers(`?email:in=${encodeURIComponent(email)}`))[0];
    await this.setValue(key, customer);
  },
);

When(
  'I get {string} attribute for {string} customer via BigCommerce API and save it as {string}',
  async function (attributeAlias: string, emailAlias: string, key: string) {
    const attributeId = await this.getValue(attributeAlias);
    const email = await this.getValue(emailAlias);
    const attributes = await this.config.bigCommerce.customersApi.getCustomerAttributes(email);
    const attribute = attributes.find((attr: any) => attr.attribute_id === attributeId);
    if (!attribute) throw new Error(`There is no attribute with id "${attributeId}" for the client "${email}"`);
    await this.setValue(key, attribute.attribute_value);
  },
);

When(
  'I set {string} attribute value to {string} for {string} customer via BigCommerce API',
  async function (attributeAlias: string, valueAlias: string, emailAlias: string) {
    const attributeId = await this.getValue(attributeAlias);
    const email = await this.getValue(emailAlias);
    const value = await this.getValue(valueAlias);
    const customerId = (await this.config.bigCommerce.customersApi.getCustomers(`?email:in=${encodeURIComponent(email)}`))[0].id;
    if (!customerId) throw new Error(`Customer with email "${email}" not found`);
    await this.config.bigCommerce.customersApi.putAttributeValue([customerId], attributeId, value);
  },
);
