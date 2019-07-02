//Packages Imports
const braintree = require("braintree");
require("dotenv").config();

//Connect to Braintree gateway using API keys
const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

//GET ROUTERS
//Create token using Braintree gateway
exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

//POST ROUTERS
//process payment using Braintree gateway
exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
