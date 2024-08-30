@skip
# This feature is skipped since we don't have B2B Edition account
Feature: Companies

  Scenario: create company
    When I create company via BigCommerce API and save response as 'currentCompany':
    """
    {
      "companyName": "{$uniqueCompanyName}",
      "companyPhone": "+15235551234",
      "companyEmail": "fake@{$uniqueCompanyName}.com",
      "country": "US",
      "adminFirstName": "Agent",
      "adminLastName": "Smith",
      "adminEmail": "admin@{$uniqueCompanyName}.com",
      "addressLine1": "123 Main Street",
      "state": "AZ"
    }
    """
    Then I expect '$currentCompany.companyId' to have type 'number'

  Scenario: add company address
    When I create company address via BigCommerce API:
    """
    {
     "companyId": "6255801",
     "countryName": "United States",
     "countryCode": "US",
     "stateCode": "AZ",
     "city": "Phoenix",
     "addressLine1": "123 Main Street",
     "firstName": "Agent",
     "lastName": "Smith"
    }
    """

  Scenario: get and set company attribute
    When I set 'taxExemptRequestStatus' attribute value to 'approved' for company with '6255801' id via BigCommerce API
    Then I get 'taxExemptRequestStatus' attribute of company with '6255801' id via BigCommerce API and save as 'status'
    And I expect '$status' to equal 'approved'
