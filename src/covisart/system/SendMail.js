import { Resend } from 'resend';
const resend = new Resend('re_iEe5Bg8p_Et2mdHxQhXr97Ch9B1Kf5XN3');

export default function Email() {
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'nobatgeldi@covisart.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}