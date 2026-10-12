#!/usr/bin/env node
import pc from 'picocolors'
import { main } from './cli.js'

main(process.argv.slice(2), {
  stdout: (text) => process.stdout.write(text),
  stderr: (text) => process.stderr.write(text),
  cwd: process.cwd(),
  color: pc.isColorSupported && Boolean(process.stdout.isTTY),
}).then(
  (code) => {
    process.exitCode = code
  },
  (error: unknown) => {
    process.stderr.write(`${String(error)}\n`)
    process.exitCode = 2
  },
)
