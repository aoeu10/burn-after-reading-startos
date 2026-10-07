import { i18n } from './i18n'
import { sdk } from './sdk'
import { mounts, uiPort } from './utils'
import { barConfigYaml } from './fileModels/config.yaml'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Burn After Reading!'))

  // Reactive read: when the config file changes (e.g. Set Password action),
  // this setupMain context re-runs and the daemon restarts, so the upstream
  // server — which reads start9/config.yaml once at startup — picks it up.
  await barConfigYaml.read((s) => s.password).const(effects)

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'main' },
    mounts,
    'main-sub',
  )

  return sdk.Daemons.of(effects).addDaemon('main', {
    subcontainer,
    exec: {
      command: ['tini', '/usr/local/bin/burn-after-reading'],
      // upstream listens on 0.0.0.0:$PORT, defaulting to 80
      env: { PORT: String(uiPort) },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkWebUrl(effects, `http://localhost:${uiPort}/`, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
