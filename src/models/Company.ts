export interface Company {
  companyId?: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  country: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  extraFields?: Array<{ fieldName: string; fieldValue: string }>;
  userExtraFields?: Array<{ fieldName: string; fieldValue: string }>;
  addressLine1: string;
  addressLine2?: string;
  state: string;
  city?: string;
  zipCode?: string;
  adminPhoneNumber?: string;
}
