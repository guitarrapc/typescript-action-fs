import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import {mv, mkdirP} from '../src/io'
import * as fs from 'fs'

test('io/mv file runs', async () => {
  const src = path.join(__dirname, '..', 'tmp/file', 'foo')
  const dest = path.join(__dirname, '..', 'tmp/file', 'bar')

  fs.mkdirSync(path.join(__dirname, '..', 'tmp/file'), {recursive: true})
  fs.writeFileSync(src, 'hello world', 'utf8')
  fs.rmSync(dest, {force: true})

  await mv(src, dest)

  expect(fs.existsSync(src)).toBe(false)
  expect(fs.existsSync(dest)).toBe(true)
})

test('io/mv dir runs', async () => {
  const src = path.join(__dirname, '..', 'tmp/io_mv/dir', 'foo')
  const dest = path.join(__dirname, '..', 'tmp/io_mv/dir', 'bar')

  fs.mkdirSync(src, {recursive: true})
  fs.rmSync(dest, {recursive: true, force: true})

  await mv(src, dest)

  expect(fs.existsSync(src)).toBe(false)
  expect(fs.existsSync(dest)).toBe(true)
})

test('io/mkdirP runs', async () => {
  const virtualWorkspacePath = path.join(
    __dirname,
    '..',
    'tmp/io_mkdirP',
    'test-path'
  )

  await mkdirP(virtualWorkspacePath)
  expect(fs.existsSync(virtualWorkspacePath)).toBe(true)

  fs.rmSync(virtualWorkspacePath, {recursive: true, force: true})
  expect(fs.existsSync(virtualWorkspacePath)).toBe(false)
})

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  var delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  const githubWorkspace = path.join(__dirname, '..', 'tmp/integrate')
  const testPath = 'test-path'
  const src = path.join(githubWorkspace, 'test.txt')
  process.env['INPUT_MILLISECONDS'] = '500'
  process.env['INPUT_SRC'] = src
  process.env['INPUT_WORKSPACE'] = 'test-path'
  process.env['GITHUB_WORKSPACE'] = githubWorkspace

  fs.mkdirSync(githubWorkspace, {recursive: true})
  fs.writeFileSync(src, 'hello world', 'utf8')

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())

  fs.rmSync(`${src}.bak`, {force: true})
  fs.rmSync(path.join(githubWorkspace, testPath), {
    recursive: true,
    force: true
  })
})
