import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import {mv} from '../src/io'
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
  const src = path.join(__dirname, '..', 'tmp/dir', 'foo')
  const dest = path.join(__dirname, '..', 'tmp/dir', 'bar')

  fs.mkdirSync(src, {recursive: true})
  fs.rmSync(dest, {recursive: true, force: true})

  await mv(src, dest)

  expect(fs.existsSync(src)).toBe(false)
  expect(fs.existsSync(dest)).toBe(true)
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
  const src = path.join(__dirname, '..', 'tmp', 'test.txt')
  process.env['INPUT_MILLISECONDS'] = '500'
  process.env['INPUT_SRC'] = src
  fs.writeFileSync(src, 'hello world', 'utf8')

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())

  fs.rmSync(`${src}.bak`, {force: true})
})
