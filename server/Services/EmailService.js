const sgMail = require('@sendgrid/mail');
const {FROM_EMAIL} = require('../Utils/Constants');

class EmailService {
  constructor() {}

  sendEmail(data) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const {name, amount, message} = data;

    const msg = {
      to: 'kristoffer.c.west@gmail.com',
      from: FROM_EMAIL,
      subject: 'Wedding RSVP Received!',
      text: 'RSVP',
      html: `
          <div> 
              <div>
                  ${name}
              </div>
              <br />
              <div> 
                  ${amount}
              </div>
              <br />
              <div>
                  ${message}
              </div>
          </div>
      `,
    };

    return sgMail.send(msg);
  }
}

module.exports = EmailService;