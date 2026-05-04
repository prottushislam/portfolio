const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'All fields are required.' })
    };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'prottushislam17@gmail.com',
      subject: '[Portfolio] ' + subject,
      html: '<h3>New message from ' + name + '</h3><p><b>Email:</b> ' + email + '</p><p><b>Message:</b> ' + message + '</p>'
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Got your message, ' + name + '!',
      html: '<h3>Hey ' + name + '!</h3><p>Thanks for reaching out. I will reply within 24-48 hours.</p><br><p>— Prottush Islam</p>'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to send email: ' + error.message })
    };
  }
};
