@parallelDisabled
Feature: Promotions

  Scenario: get all promotions
    When I get all promotions via BigCommerce API and save as 'promotions'
    Then I expect '$promotions[0].id' to have type 'number'

  Scenario: activate promotion
    When I activate '$tenPercentDiscount' promotion via BigCommerce API
    And I get all promotions via BigCommerce API and save as 'promotions'
    Then I expect '$js($promotions.find(p => p.name === "TEST_AUTOMATION 10% cart discount").status)' to equal 'ENABLED'

  Scenario: deactivate promotion
    When I deactivate all promotions via BigCommerce API
    And I get all promotions via BigCommerce API and save as 'promotions'
    Then I expect every element in '$js($promotions.map(p => p.status))' array to equal 'DISABLED'
