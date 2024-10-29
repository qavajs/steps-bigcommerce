import {When} from '@cucumber/cucumber';
import {CreateCompanyResponse} from '../models';
import {type MemoryValue} from '@qavajs/core';

When('I create company via BigCommerce API and save response as {value}:', async function (key: MemoryValue, multilineString: string) {
  const transformedString = await this.getValue(multilineString);
  const inputObject = JSON.parse(transformedString);
  const company: CreateCompanyResponse = await this.config.bigCommerce.b2bEditionApi.createCompany(inputObject);
  key.set(company);
});

When('I create company address via BigCommerce API:', async function (multilineString: string) {
  const transformedString = await this.getValue(multilineString);
  const inputObject = JSON.parse(transformedString);
  await this.config.bigCommerce.b2bEditionApi.createAddress(inputObject);
});

When('I get {value} attribute of company with {value} id via BigCommerce API and save as {value}', async function (attributeAlias: MemoryValue, companyIdAlias: MemoryValue, key: MemoryValue) {
  const attributeName = await attributeAlias.value();
  const companyId = await companyIdAlias.value();
  const company = await this.config.bigCommerce.b2bEditionApi.getCompanyDetails(companyId);
  const value = company.extraFields.find((a: any) => a.fieldName === attributeName)?.fieldValue;
  key.set(value);
});

/**
 * Set attribute value to a company.
 * @param attributeAlias {string} - company attribute name
 * @param valueAlias {string} - attribute value
 * @param companyIdAlias {string} - identifier of the company
 * @example When I set 'taxExemptRequestStatus' attribute value to 'approved' for company with '$currentCompanyId' id via BigCommerce API
 */
When('I set {value} attribute value to {value} for company with {value} id via BigCommerce API', async function (attributeAlias: MemoryValue, valueAlias: MemoryValue, companyIdAlias: MemoryValue) {
  const attributeId = await attributeAlias.value();
  const attributeValue = await valueAlias.value();
  const companyId = await companyIdAlias.value();
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
