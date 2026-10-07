import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

/**
 * The upstream server reads `start9/config.yaml` (relative to its working
 * directory) at startup. Only one field is supported upstream: `password`.
 * Changing the password takes effect on restart — main.ts reads this file
 * reactively so the daemon restarts automatically.
 */
const shape = z.looseObject({
  password: z.string().catch(''),
})

export const barConfigYaml = FileHelper.yaml(
  { base: sdk.volumes.main, subpath: 'start9/config.yaml' },
  shape,
)
