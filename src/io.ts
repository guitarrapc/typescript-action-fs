import * as core from '@actions/core'
import * as io from '@actions/io'

export async function mv(src: string, dest: string): Promise<void> {
  core.info(`mv ${src} ${dest}`)
  await io.mv(src, dest)
}

export async function mkdirP(fsPath: string): Promise<void> {
  core.info(`mkdir -p ${fsPath}`)
  await io.mkdirP(fsPath)
}
