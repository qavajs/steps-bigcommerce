import {When} from '@cucumber/cucumber';
import {CreateCompanyResponse} from '../models';

When('I create company via BigCommerce API and save response as {string}:', async function (key: string, multilineString: string) {
  const transformedString = await this.getValue(multilineString);
  const inputObject = JSON.parse(transformedString);
  const company: CreateCompanyResponse = await this.config.bigCommerce.b2bEditionApi.createCompany(inputObject);
  await this.setValue(key, company);
});

When('I create company address via BigCommerce API:', async function (multilineString: string) {
  const transformedString = await this.getValue(multilineString);
  const inputObject = JSON.parse(transformedString);
  await this.config.bigCommerce.b2bEditionApi.createAddress(inputObject);
});

When('I get {string} attribute of company with {string} id via BigCommerce API and save as {string}', async function (attributeAlias: string, companyIdAlias: string, key: string) {
  const attributeName = await this.getValue(attributeAlias);
  const companyId = await this.getValue(companyIdAlias);
  const company = await this.config.bigCommerce.b2bEditionApi.getCompanyDetails(companyId);
  const value = company.extraFields.find(a => a.fieldName === attributeName)?.fieldValue;
  this.setValue(key, value);
});

/**
 * Set attribute value to a company.
 * @param attributeAlias {string} - company attribute name
 * @param valueAlias {string} - attribute value
 * @param companyIdAlias {string} - identifier of the company
 * @example When I set 'taxExemptRequestStatus' attribute value to 'approved' for company with '$currentCompanyId' id via BigCommerce API
 */
When('I set {string} attribute value to {string} for company with {string} id via BigCommerce API', async function (attributeAlias: string, valueAlias: string, companyIdAlias: string) {
  const attributeId = await this.getValue(attributeAlias);
  const attributeValue = await this.getValue(valueAlias);
  const companyId = await this.getValue(companyIdAlias);
  const attributePayload = {
    extraFields: [
      {
        fieldName: attributeId,
        fieldValue: attributeValue,
      },
    ],
  }
  await this.config.bigCommerce.b2bEditionApi.updateCompany(companyId, attributePayload);
});
