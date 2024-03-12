const sgMail = require('@sendgrid/mail');
const {FROM_EMAIL} = require('../Utils/Constants');

class EmailService {
  constructor() {}

  createRsvpEmail(data) {
      const {name, phone, email, diet, amount, message, guests, songs, coming, days} = data;

      return {
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
                      ${phone}
                  </div>
                  <br />
                  <div>
                      ${email}
                  </div>
                  <br />
                  <div>
                      ${coming}
                  </div>
                  <br />
                  <div>
                      ${days}
                  </div>
                  <br />
                  <div> 
                      ${amount}
                  </div>
                  <br />
                  <div> 
                      ${new Array(guests).join(', ')}
                  </div>
                  <br />
                  <div>
                      ${diet}
                  </div>
                  <br />
                  <div>
                      ${songs}
                  </div>
                  <br />
                  <div>
                      ${message}
                  </div>
              </div>
          `,
      }
  }

  createConfirmationEmail(data) {
      const {name, phone, email, diet, amount, message, guests, songs, coming, days} = data;

      return {
          to: email,
          from: FROM_EMAIL,
          subject: 'Wedding RSVP Confirmation!',
          text: 'RSVP',
          html: `
              <div> 
                  <div>
                      ${name}, thank you for the RSVP! We are looking forward to seeing you!
                  </div>
              </div>
          `,
      }
  }

    async sendEmail(data) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
        return await sgMail.send([this.createRsvpEmail(data), this.createConfirmationEmail(data)], true);
    }
}

module.exports = EmailService;