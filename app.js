var express = require('express');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('1r3ELOXj9GELey3Hi_e2Dw');
var http = require('http')
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));


app.get('/', function(req, res) {

  console.log('Checking is running');
  res.send('running');
});


app.get('/question', function(req, res) {

  console.log('Question was asked');
  // res.send('would you like to go on a date with me?');
  res.send('would you like to go on a data with me?');
});


app.post('/answer', function(req, res) {

  // Send via Mandrill
  console.log('Response was sent', req.body);
  var response = req.body;

  var message = {
    "text": "The response was: " + response.answer,
    "subject": response.question,
    "from_email": "questionsAndAnswers@example.com",
    "from_name": "Questions and Ansers",
    "to": [{
      "email": "willsam100@gmail.com",
      "name": "Sam Williams",
      "type": "to"
    }],
    "headers": {
      "Reply-To": "noreply@gmail.com"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "message.bcc_address@example.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "mailchimp",
  };

  mandrill_client.messages.send({
    "message": message
  }, function(result) {
    console.log(result);
    res.send('success');
    /*
    [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
    */
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    res.send('failed');
  });


});

var server = app.listen(app.get('port'), function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});