export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Burn After Reading!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  // interfaces.ts
  'Web UI': 4,
  'The web interface of Burn After Reading': 5,
  // actions/get-password.ts
  'Get Password': 6,
  'Reveal the password used to log in to the Burn After Reading web interface': 7,
  'Burn After Reading Password': 8,
  'Log in to the web interface with this password. Save it to a password manager.': 9,
  Password: 10,
  // actions/set-password.ts
  'New Password': 11,
  'The password used to log in to the Burn After Reading web interface. The service restarts to apply it.': 12,
  'Set Password': 13,
  'Change the password used to log in to the web interface': 14,
  'Sessions stay valid, but the old password stops working immediately after the service restarts.': 15,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
