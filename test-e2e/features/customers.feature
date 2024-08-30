Feature: Customers

  Scenario: create customer
    When I create customer with '$customerProps' properties via BigCommerce API and save as 'currentCustomer'
    Then I expect '$currentCustomer.id' to have type 'number'

  Scenario: create customer from multiline
    When I create customer via BigCommerce API and save as 'currentCustomer':
    """
    {
      "email": "{$randomName(6)}+test_mode@gmail.com",
      "first_name": "Agent",
      "last_name": "Smith",
      "authentication":
        {
        "new_password": "AAAaaa11",
        "force_password_reset": false
        }
    }
    """
    Then I expect '$currentCustomer.id' to have type 'number'

  Scenario: get customer
    When I get customer with email '$customerEmail' via BigCommerce API and save as 'currentCustomer'
    Then I expect '$currentCustomer.email' to equal '$customerEmail'

  Scenario: set customer's password
    When I set password 's3qur1+y===a@f3+y' for customer '$customerEmail' via BigCommerce API
#    Not possible to verify new password, since it cannot be obtained through API

  Scenario: get customer's attribute
    When I get '$customerType' attribute for '$customerEmail' customer via BigCommerce API and save it as 'customerTypeValue'
    Then I expect '$customerTypeValue' to equal 'B2B'

  Scenario: set customer's attribute
    Given I save '$timeStampString' to memory as 'timePoint'
    When I set '$passwordResetCode' attribute value to '$timePoint' for '$customerEmail' customer via BigCommerce API
    Then I get '$passwordResetCode' attribute for '$customerEmail' customer via BigCommerce API and save it as 'passwordResetCode'
    And I expect '$passwordResetCode' to equal '$timePoint'

  Scenario: delete customer
    When I create customer with '$customerProps' properties via BigCommerce API and save as 'currentCustomer'
    And I delete customer with email '$currentCustomer.email' via BigCommerce API
    Then I expect there is no customer with email '$currentCustomer.email'
