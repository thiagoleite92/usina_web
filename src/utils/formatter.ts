interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
  formatMatcher?: 'basic' | 'best fit';
  hour12?: boolean;
  timeZone?: string;
}

export const dateFormatter = (options: DateTimeFormatOptions = {}) =>
  new Intl.DateTimeFormat('pt-BR', options);

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatCurrency(v: string) {
  v = v?.replace(/\D/g, '');

  if (!v.length) return v; //Remove tudo o que não é dígito
  v = v?.replace(/(\d)(\d{8})$/, '$1.$2'); //coloca o ponto dos milhões
  v = v?.replace(/(\d)(\d{5})$/, '$1.$2'); //coloca o ponto dos milhares

  v = v?.replace(/(\d)(\d{2})$/, '$1,$2'); //coloca a virgula antes dos 2 últimos dígitos
  return `R$ ${v}`;
}
