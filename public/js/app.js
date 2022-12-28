const emailForm = document.querySelector('.email-form')
let to_email = document.getElementById('to_email')
let envioSuccess = document.querySelector('.envioSuccess')
let envioFailed = document.querySelector('.envioFailed')

const subject = 'Cesar Luiz - Aqui está meu CV!'
// montando html do email
const message = `
<p>
Olá, tudo bem? 
<br>
Que bom que ficou interessado em meu currículo! Ele está anexado neste e-mail. 
<br><br>
Obrigado! 
<br>
Atenciosamente, Cesar Luiz.
</p>
`
const attachments = [
    { filename: 'CesarLuiz-CV.pdf', path: 'public/style/assets/CesarLuiz-CV.pdf' }
]

emailForm = addEventListener('submit', (e)=>{
    e.preventDefault()

    let formData = {
        to_email: to_email.value,
        subject,
        message,
        attachments
    }

    console.log(formData)

    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function (){
        console.log(xhr.responseText)
        if (xhr.responseText == 'success') {
            envioSuccess.classList.add('isActive')
            to_email.value = ''
        } else {
            envioFailed.classList.add('isActive')
        }
    }

    xhr.send(JSON.stringify(formData))
})