import { sdk } from '../sdk'
import { barConfigYaml } from '../fileModels/config.yaml'
import { i18n } from '../i18n'
import { randomPassword } from '../utils'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  password: Value.text({
    name: i18n('New Password'),
    description: i18n(
      'The password used to log in to the Burn After Reading web interface. The service restarts to apply it.',
    ),
    required: true,
    default: null,
    generate: randomPassword,
    masked: true,
  }),
})

export const setPassword = sdk.Action.withInput(
  // id
  'set-password',

  // metadata
  async ({ effects }) => ({
    name: i18n('Set Password'),
    description: i18n(
      'Change the password used to log in to the web interface',
    ),
    warning: i18n(
      'Sessions stay valid, but the old password stops working immediately after the service restarts.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // no pre-fill: the current password is revealable via Get Password, and
  // pre-filling a masked field invites accidentally "changing" it to itself
  async () => ({}),

  // the execution function. The daemon watches this file and restarts to apply
  // the new password (see main.ts), so there is nothing more to do here.
  async ({ effects, input }) => {
    await barConfigYaml.update(effects, (current) => ({
      ...(current ?? { password: '' }),
      password: input.password,
    }))
  },
)
