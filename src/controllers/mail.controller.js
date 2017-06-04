import nodemailer from 'nodemailer';

function sendmail(req, res) {
    const from = req.body.mail;
    const to = 'unique.prakash2002@gmail.com';
    const subject = `Hello from ${req.body.subject}`;
    const body = `${req.body.message} <br /> Regards From : ${from}`;
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_SERVER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    // setup email data with unicode symbols
    const mailOptions = {
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        html: body, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({
                success: false,
                message: `failed sending message ${error}`,
            });
        }
        return res.json({
            success: true,
            message: 'successfully sent message ',
        });
    });
}

export  {sendmail};