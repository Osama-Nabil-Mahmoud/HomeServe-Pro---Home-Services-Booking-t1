
export function openEmail(subject: string, body: string): string | true {
  const to = "osamanabilmahmoud98@gmail.com";
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Detection for AI Studio preview environment
  const isAiStudio = typeof window !== 'undefined' && (
    window.location.hostname.includes('aistudio.google.com') || 
    window.location.hostname.includes('webcontainer.io') ||
    window.name.includes('preview')
  );

  try {
    // Attempt to open in a new tab synchronously
    const win = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    
    // Check if the window was blocked by a popup blocker
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // In AI Studio/Iframe environments, do NOT use window.location.href for Gmail
      // as it causes "Refused to connect" error.
      
      // Fallback 1: Try a quick mailto which usually triggers system mail app without frame nav
      if (isAiStudio) {
        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto; 
      }
      
      // Return the URL so the UI can show a manual fallback modal
      return gmailUrl;
    }
    return true;
  } catch (e) {
    console.error("Failed to open Gmail window", e);
    return gmailUrl;
  }
}
