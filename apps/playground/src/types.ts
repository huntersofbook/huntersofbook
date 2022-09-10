import type { App } from 'vue'
import type { Router } from 'vue-router'

export type UserModule = (ctx: { app: App; router: Router }) => void
