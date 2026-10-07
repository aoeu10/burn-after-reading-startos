import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.6:0',
  releaseNotes: {
    en_US:
      'Initial StartOS 0.4 package. Builds the upstream server (v0.1.6) from source; the password is generated on install and manageable via the Get Password / Set Password actions.',
    es_ES:
      'Primer paquete para StartOS 0.4. Compila el servidor original (v0.1.6) desde el código fuente; la contraseña se genera en la instalación y se gestiona con las acciones Obtener contraseña / Establecer contraseña.',
    de_DE:
      'Erstes StartOS-0.4-Paket. Erstellt den Upstream-Server (v0.1.6) aus dem Quellcode; das Passwort wird bei der Installation erzeugt und über die Aktionen Passwort anzeigen / Passwort festlegen verwaltet.',
    pl_PL:
      'Pierwszy pakiet StartOS 0.4. Buduje serwer upstream (v0.1.6) z kodu źródłowego; hasło jest generowane przy instalacji i zarządzane akcjami Pokaż hasło / Ustaw hasło.',
    fr_FR:
      'Premier paquet StartOS 0.4. Compile le serveur upstream (v0.1.6) depuis les sources ; le mot de passe est généré à l’installation et géré via les actions Obtenir le mot de passe / Définir le mot de passe.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
