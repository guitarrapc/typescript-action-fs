import * as path from 'path'
import {expect, test} from '@jest/globals'
import {mv, mkdirP} from '../src/io'
import * as fs from 'fs'

test('io/mv file runs', async () => {
  const dir = path.join(__dirname, '..', 'tmp/io_mv/file')
  const src = path.join(dir, 'foo')
  const dest = path.join(dir, 'bar')

  fs.mkdirSync(dir, {recursive: true})
  fs.rmSync(dest, {force: true})
  fs.writeFileSync(src, 'hello world', 'utf8')

  expect(fs.existsSync(src)).toBe(true)
  expect(fs.existsSync(dest)).toBe(false)

  await mv(src, dest)

  expect(fs.existsSync(src)).toBe(false)
  expect(fs.existsSync(dest)).toBe(true)
  expect(fs.readFileSync(dest, 'utf8')).toBe('hello world')
})

test('io/mv dir runs', async () => {
  const dir = path.join(__dirname, '..', 'tmp/io_mv/dir')
  const src = path.join(dir, 'foo')
  const dest = path.join(dir, 'bar')

  fs.mkdirSync(src, {recursive: true})
  fs.rmSync(dest, {recursive: true, force: true})

  expect(fs.existsSync(src)).toBe(true)
  expect(fs.existsSync(dest)).toBe(false)

  await mv(src, dest)

  expect(fs.existsSync(src)).toBe(false)
  expect(fs.existsSync(dest)).toBe(true)
})

test('io/mkdirP runs', async () => {
  const dir = path.join(__dirname, '..', 'tmp/io_mkdirP')
  const dirName = 'test-path'
  const virtualWorkspacePath = path.join(dir, dirName)

  fs.rmSync(virtualWorkspacePath, {recursive: true, force: true})

  expect(fs.existsSync(virtualWorkspacePath)).toBe(false)

  await mkdirP(virtualWorkspacePath)
  expect(fs.existsSync(virtualWorkspacePath)).toBe(true)
})
