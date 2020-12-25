const axios = require('axios');
/**
 * Function for creating response
 * @param {*} data (status, data, token)
 * @param {*} return (encrypted data)
 */
function responseGenerator(code = 00, message, data = '') {
  var details = {
    status: { code: code, message: message },
    result: data,
  };
  return details;
}

/**
 * Function for sending email
 * @param {*} data (to, sub)
 * @param {*} return (decrypted data)
 */
async function sendEmail(to, subject, message) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Office 365 server
    port: 587, // secure SMTP
    auth: {
      user: config.SMTPemailAddress,
      pass: config.SMTPPassword,
    },
  });

  var mailOptions = {
    from: config.SMTPemailAddress,
    to: to,
    subject: subject,
    html: message,
  };

  let resMail = await transporter.sendMail(mailOptions);
  return resMail;
}

/**
 *  Function to send and email for particular schedule Id
 * @param {Id of schedule} scheduleId 
 */
const sendInquiry = async (scheduleId) => {
  try {
    // sendGrid Call
    let messageBody = 'Hi, I am sapien.';

    let subject = `[BA Email Server] : ${scheduleId}`;

    var data = JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: 'surajc@winjit.com',
              name: 'Suraj Chandgude',
            },
          ],
        },
      ],
      subject: subject,
      content: [
        {
          type: 'text/html',
          value: `${messageBody}`,
        },
      ],
      from: {
        email: 'surajwinjit@gmail.com',
        name: 'Suraj Chandgude',
      },
    });

    var configuration = {
      method: 'post',
      url: 'https://api.sendgrid.com/v3/mail/send',
      headers: {
        Authorization: process.env.SENDGRID_KEY,
        'content-type': 'application/json',
      },
      data: data,
    };

    const emailResponse = await axios(configuration);

    return {
      code: 200,
      message: 'Email request sent successfully!',
      data: emailResponse.data,
    };
  } catch (e) {
    return {
      code: 500,
      message: 'Something went wrong, please contact admin',
      data: e,
    };
  }
};

module.exports = {
  sendEmail,
  sendInquiry,
  responseGenerator,
};
