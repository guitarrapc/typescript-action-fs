import * as core from '@actions/core'
import * as fs from 'fs'

/**
 * Creates a symbolic link.
 *
 * The `type` argument is only used on Windows platforms and can be one of `'dir'`,`'file'`, or `'junction'`. Windows junction points require the destination path
 * to be absolute. When using `'junction'`, the `target` argument will
 * automatically be normalized to absolute path.
 * @since v10.0.0
 * @param [type='file']
 * @return Fulfills with `undefined` upon success.
 */
export async function symlink(
  target: string,
  path: string,
  type?: string | null
): Promise<void> {
  core.info(`ln -s ${target} ${path}`)
  await fs.promises.symlink(target, path, type)
}
