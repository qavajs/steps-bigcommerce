# steps-bigcommerce
Collection of BigCommerce steps for qavajs framework.  
Native BigCommerce capabilities are used for customer and promotions management. Companies and addresses management is performed through the B2B Edition application.

## Installation
`npm install @qavajs/steps-bigcommerce`

## Configuration
Include following properties to the qavajs config:
```javascript
module.exports = {
    require: [
        'node_modules/@qavajs/steps-bigcommerce/index.js'
    ],
    bigCommerce: {
        storeHash: 'xxxxxxxx', //hash of your BigCommerce store 
        accessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', //access token of your BigCommerce account 
        b2bAccessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' //access token of your B2B Edition account
    }
}
```