import { sdk } from '../sdk'
import { getPassword } from './get-password'
import { setPassword } from './set-password'

export const actions = sdk.Actions.of()
  .addAction(getPassword)
  .addAction(setPassword)
