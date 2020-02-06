export const environment = {
  production: false,
  backend: 'http://192.168.1.168:81/api/v3',
  beltelecomAuthorization: true,
  useMp4Preview: true,
  socket: {
    enabled: true,
    encrypted: false,
    url: '192.168.1.168',
    port: 6001,
    endpoint: '',
    auth: {
      host: '192.168.1.168',
      port: 81,
      endpoint: '/api/v3/broadcasting/auth',
    },
  },
  features: {
    legalLocations: undefined,
    dvr: undefined,
    testPlayer: undefined,
  },
  gtag: {
    enabled: false,
    id: '',
  },
  grafana: null,
  avalibleDevices: [
    {
      title: 'Скачать для Windows',
      icon: './assets/img/icons/windows-logo.svg',
      isExternal: false,
      avalible: true,
    },
    {
      title: 'Скачать для Andriod',
      icon: './assets/icons/android-logo.svg',
      isExternal: true,
      avalible: true,
      href:
        'https://play.google.com/store/apps/details?id=by.beltelecom.cctv&hl=ru',
    },
    {
      title: 'Скачать для iOS',
      icon: './assets/icons/apple-logo.svg',
      isExternal: true,
      avalible: true,
      href:
        'https://apps.apple.com/by/app/белтелеком-видеоконтроль/id1383183548',
    },
  ],
};
