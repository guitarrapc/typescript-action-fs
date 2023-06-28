import * as core from '@actions/core'
import path from 'path'
import {wait} from './wait'
import {mv, mkdirP} from './io'
import {symlink} from './fs'
import * as fs from 'fs'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    const src: string = core.getInput('src')
    const workspace: string = core.getInput('workspace')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())

    // io
    if (
      process.env.GITHUB_WORKSPACE === '' ||
      process.env.GITHUB_WORKSPACE === null ||
      process.env.GITHUB_WORKSPACE === undefined
    ) {
      process.env['GITHUB_WORKSPACE'] = 'tmp/main'
    }
    const virtualWorkspacePath = path.join(
      process.env.GITHUB_WORKSPACE,
      workspace
    )
    await mv(src, `${src}.bak`)
    await mkdirP(virtualWorkspacePath)

    // fs
    const target = path.join(virtualWorkspacePath, 'symlink', 'target')
    const link = path.join(virtualWorkspacePath, 'symlink', 'link')
    await mkdirP(target)
    fs.writeFileSync(path.join(target, 'test.txt'), 'hello world', 'utf8')
    await symlink(target, link, 'dir')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
