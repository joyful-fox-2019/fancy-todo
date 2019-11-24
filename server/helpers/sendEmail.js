const nodemailer = require('nodemailer');

function sendEmailTo(user) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    });

    let mailOptions = {
        from: `"TodoRevolution" <${process.env.COMPANY_EMAIL}>`,
        to: user,
        subject: `Register success`,
        html: `
            <h3>Announcement!</h3>
            <p> Welcome to the TodoRevolution
            </p>

            <h4>Thank you<h4>
            <h5>From: Admin<h5>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Send Mail Error: ', error);
            console.log('Error Message: ', error.message);
        }

        console.log('Send Email Result: ', info);
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = sendEmailTo;