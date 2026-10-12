import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { main } from '../src/cli.js'
import { RULES } from '../src/rules.js'
import { APP, copyFixture, EDGE, FIXTURES } from './helpers.js'

async function run(args: string[], cwd = FIXTURES): Promise<{ code: number; stdout: string; stderr: string }> {
  let stdout = ''
  let stderr = ''
  const code = await main(args, {
    cwd,
    color: false,
    stdout: (text) => {
      stdout += text
    },
    stderr: (text) => {
      stderr += text
    },
  })
  return { code, stdout, stderr }
}

describe('cli', () => {
  it('prints help and version', async () => {
    const help = await run(['--help'])
    expect(help.code).toBe(0)
    expect(help.stdout).toContain('npx vueleap')
    const version = await run(['-v'])
    expect(version.stdout.trim()).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('lists rules', async () => {
    const { code, stdout } = await run(['--list-rules'])
    expect(code).toBe(0)
    for (const rule of RULES) expect(stdout).toContain(rule.id)
  })

  it('prints the pretty report', async () => {
    const { code, stdout } = await run(['vue2-app'])
    expect(code).toBe(0)
    expect(stdout).toMatchSnapshot()
  })

  it('prints JSON', async () => {
    const { code, stdout } = await run(['vue2-app', '--json'])
    expect(code).toBe(0)
    const json = JSON.parse(stdout)
    expect(json.schemaVersion).toBe(1)
    expect(json.tool.name).toBe('vueleap')
    expect(json.findings.length).toBe(json.summary.total)
    expect(json.findings[0].fix).toBeUndefined()
    expect(json.compat.snippet).toContain('configureCompat')
  })

  it('prints only the compat configuration', async () => {
    const { stdout } = await run(['edge-cases', '--compat'])
    expect(stdout).toMatchSnapshot()
  })

  it('fails in CI with --fail-on', async () => {
    expect((await run(['vue2-app', '--fail-on', 'error'])).code).toBe(1)
    expect((await run(['vue2-app', '--fail-on', 'none'])).code).toBe(0)
    expect((await run(['vue2-app', '--rule', 'watch-array', '--fail-on', 'warning'])).code).toBe(0)
    expect((await run(['vue2-app', '--rule', 'watch-array', '--fail-on', 'info'])).code).toBe(1)
  })

  it('rejects bad usage with exit code 2', async () => {
    expect((await run(['--fail-on', 'sometimes'])).code).toBe(2)
    expect((await run(['--write'])).code).toBe(2)
    expect((await run(['--unknown-flag'])).code).toBe(2)
    expect((await run(['vue2-app', '--rule', 'nope'])).code).toBe(2)
    expect((await run(['does-not-exist'])).code).toBe(2)
  })

  it('writes an HTML report', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'vueleap-html-'))
    const target = path.join(dir, 'report.html')
    const { code, stderr } = await run([APP, '--html', target])
    expect(code).toBe(0)
    expect(stderr).toContain('HTML report written')
    const html = await fs.readFile(target, 'utf8')
    expect(html).toContain('<!doctype html>')
    expect(html).toContain('Vue 3 migration report')
    expect(html).toContain('configureCompat')
  })

  it('previews and writes fixes', async () => {
    const dir = await copyFixture('vue2-app')
    const preview = await run([dir, '--fix'])
    expect(preview.code).toBe(0)
    expect(preview.stdout).toContain('dry run, nothing written')
    expect(preview.stdout).toContain('+  beforeUnmount() {')
    const written = await run([dir, '--fix', '--write'])
    expect(written.stdout).toContain('Applied 18 fixes in 9 files')
    expect(written.stdout).toContain('Auto fixable      0')
    const none = await run([dir, '--fix'])
    expect(none.stdout).toContain('No automatic fixes available.')
  })

  it('prints JSON for fixes', async () => {
    const { stdout } = await run([EDGE, '--fix', '--json'])
    const json = JSON.parse(stdout)
    expect(json.fixes.length).toBeGreaterThan(0)
    expect(json.fixes[0].diff).toContain('@@')
  })
})
