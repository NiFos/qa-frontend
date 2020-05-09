const strings: any = {
  ru: {
    pcUnsupported: 'Зайдите с мобильного устройства!'
  },
  en: {
    pcUnsupported: 'Enter from mobile phone!'
  },
}

export function localization(string: string = 'undefined', language: string = 'ru') {
  return strings[language][string];
}