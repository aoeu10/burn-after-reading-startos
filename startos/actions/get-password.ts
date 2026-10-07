import { sdk } from '../sdk'
import { barConfigYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'

/**
 * Reveals the password used to log in to the Burn After Reading web UI.
 * The password is generated on install and changeable via "Set Password".
 */
export const getPassword = sdk.Action.withoutInput(
  // id
  'get-password',

  // metadata
  async ({ effects }) => ({
    name: i18n('Get Password'),
    description: i18n(
      'Reveal the password used to log in to the Burn After Reading web interface',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    const cfg = await barConfigYaml.read().once()
    const password = cfg?.password ?? ''

    return {
      version: '1',
      title: i18n('Burn After Reading Password'),
      message: i18n(
        'Log in to the web interface with this password. Save it to a password manager.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
