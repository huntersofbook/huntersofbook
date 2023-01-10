import type { Plugin } from 'vite'
import type { Options, PublicPluginAPI } from './type'
import unplugin from '.'

export default unplugin.vite as (options?: Options | undefined) => Plugin & { api: PublicPluginAPI }
