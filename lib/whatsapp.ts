export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalizedPhone = phone.replace(/\D/g, '');

  return (
    `https://api.whatsapp.com/send?phone=${normalizedPhone}` +
    `&text=${encodeURIComponent(message)}`
  );
}
