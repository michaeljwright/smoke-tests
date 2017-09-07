const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

exports.sendWelcomeEmail = functions.database.ref('signups/{uid}').onWrite(event => {
  if (!event.data.exists() || event.data.previous.exists()) {
    return;
  }
  var userEmail = event.data.val().email;
  console.log(userEmail);
  sgMail.setApiKey('ENTER YOUR KEY');
  const msg = {
    to: userEmail,
    from: 'Smoke Tests <smoke@test.com>',
    subject: 'Thanks for registering',
    text: 'Welcome to the future! Smoke tests will be launching soon so we will let you know as soon as you can signup. Many thanks, Smoke Tests Team',
    html: '<p>Welcome to the future!</p><p>Smoke tests will be launching soon so we will let you know as soon as you can signup.</p><p>Many thanks</p><p><strong>Smoke Tests Team</strong></p>',
  };
  sgMail.send(msg);
});
