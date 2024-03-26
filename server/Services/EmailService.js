const sgMail = require('@sendgrid/mail');
const { FROM_EMAIL, COMING } = require('../Utils/Constants');

class EmailService {
    constructor() { }

    createRsvpEmail(data) {
        const { name, phone, email, diet, amount, message, guests, songs, coming, days } = data;

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
        const { name, email, coming } = data;

        let html = '';

        if (coming === COMING.YES) {
            html =  `
                <div> 
                    <div>
                        ${name}, thank you for the RSVP! We are looking forward to seeing you!
                    </div>
                </div>
            `;
        } else {
            html =  `
                <div> 
                    <div>
                        ${name}, we are sorry to hear that you will be unable to make it, but thank you for letting us know!
                    </div>
                </div>
            `;
        }

        return {
            to: email,
            from: FROM_EMAIL,
            subject: 'Wedding RSVP Received!',
            text: 'RSVP',
            html
        }
    }

    createQuestionEmail(data) {
        const { name, phone, email, message } = data;

        return {
            to: 'kristoffer.c.west@gmail.com',
            from: FROM_EMAIL,
            subject: `Wedding Question From ${name}`,
            text: 'Question',
            html: `
              <div> 
                  <div>
                      ${name} sent this question:
                  </div>
                  <div>
                      ${message}:
                  </div>
                  <div>
                       ${email ? `Email address: ${email}` : 'No email provided'}
                  </div>
                  <div>
                       ${phone ? `Phone Number: ${phone}` : 'No phone number Provided'}
                  </div>
              </div>
          `,
        }
    }

    async sendEmail(data) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
        return await sgMail.send([this.createRsvpEmail(data), this.createConfirmationEmail(data)], true);
    }

    async sendQuestion(data) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
        return await sgMail.send(this.createQuestionEmail(data));
    }
}

module.exports = EmailService;