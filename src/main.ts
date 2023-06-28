import * as core from '@actions/core'
import path from 'path'
import {wait} from './wait'
import {mv, mkdirP} from './io'

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
    const virtualWorkspacePath = path.join(
      process.env.GITHUB_WORKSPACE!,
      workspace
    )
    mv(src, `${src}.bak`)
    mkdirP(virtualWorkspacePath)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
