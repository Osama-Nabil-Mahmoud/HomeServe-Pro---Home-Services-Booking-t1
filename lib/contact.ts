
import { openWhatsApp } from './whatsapp';
import { openEmailOrCopy } from './email';

interface ContactParams {
  method: 'whatsapp' | 'gmail';
  whatsappMessage: string;
  subject: string;
  body: string;
  onShowCopyModal: (data: { to: string; subject: string; body: string; url: string }) => void;
}

export function sendContact(params: ContactParams) {
  if (params.method === "gmail") {
    openEmailOrCopy({
      subject: params.subject,
      body: params.body,
      onShowCopyModal: params.onShowCopyModal
    });
  } else {
    openWhatsApp(params.whatsappMessage);
  }
}
