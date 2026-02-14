
import { openWhatsApp } from './whatsapp';
import { openEmail } from './email';

interface ContactParams {
  method: 'whatsapp' | 'gmail';
  whatsappMessage: string;
  subject: string;
  body: string;
}

export function sendContact(params: ContactParams): string | true {
  if (params.method === "gmail") {
    return openEmail(params.subject, params.body);
  } else {
    openWhatsApp(params.whatsappMessage);
    return true;
  }
}
