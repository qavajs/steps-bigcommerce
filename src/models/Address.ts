export interface Address {
  companyId: string;
  countryName: string;
  countryCode: string;
  stateName?: string;
  stateCode: string;
  city: string;
  zipCode?: string;
  addressLine1: string;
  addressLine2?: string;
  firstName: string;
  lastName: string;
  isBilling?: boolean;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
}
