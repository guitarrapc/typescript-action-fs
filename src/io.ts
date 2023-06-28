import * as core from '@actions/core'
import * as io from '@actions/io'

/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @returns   Promise<void>
 */
export async function mv(source: string, dest: string): Promise<void> {
  core.info(`mv ${source} ${dest}`)
  await io.mv(source, dest)
}

/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
export async function mkdirP(fsPath: string): Promise<void> {
  core.info(`mkdir -p ${fsPath}`)
  await io.mkdirP(fsPath)
}
