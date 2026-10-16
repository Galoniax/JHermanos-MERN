import { Resend } from 'resend';
import { RESEND_KEY } from '../../../core/config/config.js';

const resend = new Resend(RESEND_KEY);

export function sendEmail(email, subject, template_id, variables = {}) {
  return resend.emails.send({
    from: 'Soporte <onboarding@resend.dev>',
    to: email,
    subject,
    template: {
      id: template_id,
      variables: variables,
    },
  });
}
