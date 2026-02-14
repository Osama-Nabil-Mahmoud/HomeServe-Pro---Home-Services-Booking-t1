
export function buildGmailUrl(to: string, subject: string, body: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function isPreviewEnvironment(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const isStudio = window.location.host.includes("aistudio.google.com") || 
                     window.location.host.includes("webcontainer.io");
    // Accessing window.top can throw a SecurityError in cross-origin iframes
    const isIframe = window.self !== window.top;
    return isStudio || isIframe;
  } catch (e) {
    // If we can't access window.top, we're almost certainly in a cross-origin iframe
    return true;
  }
}

export interface EmailOptions {
  subject: string;
  body: string;
  onShowCopyModal: (data: { to: string; subject: string; body: string; url: string }) => void;
}

export function openEmailOrCopy({ subject, body, onShowCopyModal }: EmailOptions) {
  const to = "osamanabilmahmoud98@gmail.com";
  const url = buildGmailUrl(to, subject, body);
  const isPreview = isPreviewEnvironment();

  if (isPreview) {
    // In restricted environments, we don't even try to open the URL to avoid security errors or blocked connections
    onShowCopyModal({ to, subject, body, url });
    return;
  }

  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win || win.closed || typeof win.closed === "undefined") {
      // If popup is blocked by browser
      onShowCopyModal({ to, subject, body, url });
    }
  } catch (e) {
    // Catch window.open security/restriction errors
    console.warn("window.open failed, falling back to copy modal", e);
    onShowCopyModal({ to, subject, body, url });
  }
}
