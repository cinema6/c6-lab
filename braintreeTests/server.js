var express     = require('express'),
    fs          = require('fs-extra'),
    braintree   = require('braintree'),
    bodyParser  = require('body-parser'),
    
    creds       = fs.readJSONSync('./keys.json');
    
    
var customer = {
/*
    firstName: 'Jenny',
    lastName: 'Testmonkey',
    company: 'Cinema7',
    email: 'jen@test.com'
*/
//    id: '50954804'
/*
    firstName: 'Jimmy',
    lastName: 'Testmonkey',
    company: 'Cinema7',
    email: 'jim@test.com'
*/
    id: '78929343'
};
    
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: creds.merchantId,
    publicKey: creds.publicKey,
    privateKey: creds.privateKey
});

var app = express();

var formParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('static'));

app.get('/braintree/clientToken', function(req, res) {
    console.log('GET clientToken request');
    
    var cfg = {};
    
    if (customer.id) {
        cfg.customerId = customer.id;
    }
    
    gateway.clientToken.generate(cfg, function(err, response) {
        if (err) {
            console.log('Error generating clientToken:');
            console.dir(err);
            return res.send(500, err);
        }
        
        console.log('Successfully got clientToken');
        res.send(200, { clientToken: response.clientToken });
    });
});

app.post('/braintree/checkout', formParser, function(req, res) {
    console.log('POST checkout request');
    
    console.dir(req.body);
    
    gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: req.body.payment_method_nonce,
        customer: !customer.id ? customer : undefined,
        options: {
            submitForSettlement: true,
            storeInVaultOnSuccess: !customer.id
        }
    }, function(err, result) {
        if (err) {
            console.log('Error creating transaction:');
            console.dir(err);
            return res.send(500, err);
        } else if (!result.success) {
            console.log('Got failure creating transaction:');
            console.dir(result);
            return res.send(500, 'i dunno, something bad happened');
        }
        
        console.log('Successfully created transaction:');
        console.dir(result);
        res.send(200, { transactionId: result.transaction && result.transaction.id });
    });
});

app.listen(8080, function() {
    console.log('listening on 8080');
});
