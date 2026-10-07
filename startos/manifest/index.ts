import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'burn-after-reading',
  title: 'Burn After Reading',
  license: 'GPL-3.0',
  packageRepo: 'https://github.com/Start9Labs/burn-after-reading',
  upstreamRepo: 'https://github.com/Start9Labs/burn-after-reading',
  marketingUrl: 'https://burnafterreading.net',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerBuild: {
          workdir: './upstream',
        },
      },
      arch: ['x86_64'],
    },
  },
})
