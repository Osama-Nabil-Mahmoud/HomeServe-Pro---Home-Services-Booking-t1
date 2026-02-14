
export function openWhatsApp(message: string) {
  const url = `https://wa.me/201210285859?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
