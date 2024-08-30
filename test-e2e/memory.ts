export default {
  customerEmail: 'b_pertruhin@hisdomain.com',
  randomName: (length: number, charset = 'abcdefghijklmnopqrstuvwxyz0123456789') => {
    let result = '';
    const charactersLength = charset.length;
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  get customerProps() {return `{"email": "${this.randomName(6)}+test_mode@gmail.com","first_name": "Craig", "last_name": "Lee Scott", "authentication": {"new_password": "AAAaaa11", "force_password_reset": false}}`},
  get timeStampString() {return String(Date.now())},
  get uniqueCompanyName() {return this.randomName(10)},
  get uniqueCompanyEmail() {`${this.randomName(6)}+test_mode@${this.randomName(8)}.com`},
  customerType: 1,
  passwordResetCode: 2,
  tenPercentDiscount: {
    name: 'TEST_AUTOMATION 10% cart discount',
    redemption_type: 'AUTOMATIC',
    stop: false,
    status: 'ENABLED',
    rules: [
      {
        action: {
          cart_value: {
            discount: {
              percentage_amount: 10,
            },
          },
        },
      },
    ],
  }
}