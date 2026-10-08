import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.6:1',
  releaseNotes: {
    en_US:
      'Correct the package repository to the aoeu10 fork and add dated GPL licensing, upstream attribution, and fork-maintainer notices. Application behavior is unchanged; upstream remains v0.1.6.',
    es_ES:
      'Corrige el repositorio del paquete al fork aoeu10 y añade avisos fechados de licencia GPL, atribución original y mantenimiento del fork. El funcionamiento no cambia; upstream sigue en v0.1.6.',
    de_DE:
      'Korrigiert das Paket-Repository auf den aoeu10-Fork und ergänzt datierte GPL-, Urheber- und Fork-Betreiberhinweise. Das Verhalten bleibt unverändert; Upstream bleibt v0.1.6.',
    pl_PL:
      'Poprawia repozytorium pakietu na fork aoeu10 i dodaje datowane informacje o GPL, autorach oryginału i opiekunie forka. Działanie pozostaje bez zmian; upstream nadal v0.1.6.',
    fr_FR:
      'Corrige le dépôt du paquet vers le fork aoeu10 et ajoute des mentions datées de licence GPL, des auteurs originaux et du mainteneur du fork. Le fonctionnement est inchangé ; upstream reste v0.1.6.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
