import * as path from 'path'
import {expect, test} from '@jest/globals'
import {symlink} from '../src/fs'
import * as fs from 'fs'

test('fs/symlink dir runs', async () => {
  const dir = path.join(__dirname, '..', 'tmp/fs_symlink/dir')
  const target = path.join(dir, 'original')
  const link = path.join(dir, 'link')
  const dummy = path.join(target, 'dummy.txt')

  fs.mkdirSync(target, {recursive: true})
  fs.writeFileSync(dummy, 'hello world', 'utf8')
  if (fs.existsSync(link)) {
    fs.unlinkSync(link)
  }

  expect(fs.existsSync(target)).toBe(true)
  expect(fs.existsSync(link)).toBe(false)

  await symlink(target, link, 'dir') // specify 'dir' for Windows dir symlink to be work.

  expect(fs.existsSync(target)).toBe(true)
  expect(fs.existsSync(link)).toBe(true)
  expect(fs.readFileSync(path.join(link, 'dummy.txt'), 'utf8')).toBe(
    'hello world'
  )
})

test('fs/symlink file runs', async () => {
  const dir = path.join(__dirname, '..', 'tmp/fs_symlink/file')
  const target = path.join(dir, 'original')
  const link = path.join(dir, 'link')

  fs.mkdirSync(dir, {recursive: true})
  fs.writeFileSync(target, 'hello world', 'utf8')
  if (fs.existsSync(link)) {
    fs.unlinkSync(link)
  }

  expect(fs.existsSync(target)).toBe(true)
  expect(fs.existsSync(link)).toBe(false)

  await symlink(target, link, 'file') // specify 'file' for Windows file symlink to be work.

  expect(fs.existsSync(target)).toBe(true)
  expect(fs.existsSync(link)).toBe(true)
  expect(fs.readFileSync(link, 'utf8')).toBe('hello world')
})

test('fs/symlink empty runs', async () => {
  const dir = path.join(__dirname, '..', 'tmp/fs_symlink/empty')
  const target = path.join(dir, 'original')
  const link = path.join(dir, 'link')

  fs.mkdirSync(dir, {recursive: true})
  fs.writeFileSync(target, 'hello world', 'utf8')
  if (fs.existsSync(link)) {
    fs.unlinkSync(link)
  }

  expect(fs.existsSync(target)).toBe(true)
  expect(fs.existsSync(link)).toBe(false)

  await symlink(target, link) // no type specify makes file symlink on Windows.

  expect(fs.existsSync(target)).toBe(true)
  expect(fs.existsSync(link)).toBe(true)
  expect(fs.readFileSync(link, 'utf8')).toBe('hello world')
})

// don't need junktion test.
