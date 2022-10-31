#!/usr/bin/env node
process._startTime = Date.now()
import('../dist/cli.js').then(r => (r.default || r).main())
