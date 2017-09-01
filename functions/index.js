const functions = require('firebase-functions');
const mailgun = require('mailgun-js')({apiKey: 'ENTER YOUR KEY', domain: 'mg.test.com'});

exports.sendWelcomeEmail = functions.database.ref('signups/{uid}').onWrite(event => {
  if (!event.data.exists() || event.data.previous.exists()) {
    return;
  }
  var userEmail = event.data.val().email;
  console.log(userEmail);
  var data = {
    from: 'Smoke Tests <smoke@test.com>',
    subject: 'Thanks for registering',
    html: '<p>Welcome to the future!</p><p>Smoke tests will be launching soon so we will let you know as soon as you can signup.</p><p>Many thanks</p><p><strong>Smoke Tests Team</strong></p>',
    'h:Reply-To': 'smoke@test.com',
    to: userEmail
  }
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
});
