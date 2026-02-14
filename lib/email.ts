
export function openEmail(subject: string, body: string) {
  const to = "osamanabilmahmoud98@gmail.com";
  const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}
