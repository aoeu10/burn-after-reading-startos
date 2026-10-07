import { sdk } from '../sdk'
import { utils } from '@start9labs/start-sdk'
import { barConfigYaml } from '../fileModels/config.yaml'
import { randomPassword } from '../utils'

/**
 * Runs on every init (install, update, restore): ensures the upstream config
 * file exists and carries a password, generating one at first install.
 * The upstream server reads start9/config.yaml at startup and rejects to
 * start without it.
 */
export const seedFiles = sdk.setupOnInit(async (effects) => {
  const cfg = await barConfigYaml.read().once()
  if (!cfg?.password) {
    const password = utils.getDefaultString(randomPassword)
    await barConfigYaml.update(effects, (current) => ({
      ...(current ?? { password: '' }),
      password,
    }))
  }
})
