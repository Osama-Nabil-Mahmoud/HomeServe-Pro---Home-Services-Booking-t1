
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    console.log(`[Analytics] Event: ${eventName}`, params || '');
    // Example: window.gtag?.('event', eventName, params);
  } catch (e) {
    console.error("Analytics tracking failed", e);
  }
};

export const EVENTS = {
  CTA_BOOK_NOW: 'cta_book_now_clicked',
  CTA_DOWNLOAD: 'cta_download_app_clicked',
  CTA_QUOTE: 'cta_request_quote_submitted',
  SIGNUP_STARTED: 'signup_started',
  FAQ_OPENED: 'faq_opened',
};
