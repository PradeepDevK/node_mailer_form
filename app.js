const http = require('http'),
    express = require('express'),
    nodemailer = require('nodemailer'),
    bodyParser = require('body-parser');

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({
    extended: true
}));

//Front (Home Page)
app.get('/', (req, res) => {
    res.sendfile('./index.html');
    console.log('NodeMailer reading console log...', req.url);
});

//sending mail function
app.post('/send', (req, res) => {
    if (req.body.mail == "" || req.body.subject == "") {
        res.send("Error: Email & Subject should not be Blank");
        return false;
    }

    // sending Emails with SMTP, configuration using SMTP settings
    let smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com", //hostname
        secureConnection: true, //use SSL
        port: 465, //port for secure SMTP
        auth: {
            user: '',
            pass: ''
        }
    });

    let mailOptions = {
        from: "Node Emailer - <email@gmail.com>", //sender address
        to: req.body.email, //list of receivers
        subject: req.body.subject + " -", // ubject Line
        //text : "Hello World", //plainTextes
        html: "<b>" + req.body.description + "</b>" //html body of the index.html file
    };

    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send("Email could not send due to error: ", error);
        } else {
            return res.send("Email has been sent successfully");
        }
    });
});

const server = http.createServer(app).listen(port, () => {
    console.log("Server Running on 127.0.0.1:"+ port);
});