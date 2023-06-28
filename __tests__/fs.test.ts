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

  expect(fs.existsSync(link)).toBe(false)

  await symlink(target, link, 'dir')

  expect(fs.existsSync(target)).toBe(true)
  expect(fs.existsSync(link)).toBe(true)
})
