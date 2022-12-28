const express = require('express')
const app = express()

const nodeMailer = require('nodeMailer')

const PORT = process.env.PORT || 5000

// Midleware
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body)

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email@gmail.com',
            pass: 'gmail-app-pass'
        }
    })

    const mailOptions = {
        from: 'cesarluiz.git@gmail.com',
        to: req.body.to_email,
        subject: req.body.subject,
        html: req.body.message,
        attachments: req.body.attachments
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error){
            console.log(error)
            res.send('error')
        } else {
            console.log('E-mail enviado: ' + info.response)
            res.send('success')
        }
    })

})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})