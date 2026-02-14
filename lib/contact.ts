
import { openWhatsApp } from './whatsapp';
import { openEmail } from './email';

interface ContactParams {
  method: 'whatsapp' | 'gmail';
  whatsappMessage: string;
  subject: string;
  body: string;
}

export function sendContact(params: ContactParams) {
  if (params.method === "gmail") {
    openEmail(params.subject, params.body);
  } else {
    openWhatsApp(params.whatsappMessage);
  }
}
