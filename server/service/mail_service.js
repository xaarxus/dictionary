import nodeoutlook from 'nodejs-nodemailer-outlook';

const sendMail = (to, link) => {
    nodeoutlook.sendEmail({
        auth: {
            user: "supp.d-e-w@outlook.com",
            pass: "qwerty12345"
        },
        from: 'supp.d-e-w@outlook.com',
        to,
        subject: `Активация aккаунта на ${process.env.API_URL}`,
        text: '',
        html: `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
        `
    });
};

export default sendMail;