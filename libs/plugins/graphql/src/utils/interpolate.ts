/**
 * Insert variables directly in the string.
 * @param string String to interpolate.
 * @returns Interpolated string.
 * @example
 * interpolate('docker build --tag nx-docker/node:$TAG1 --tag nx-docker/node:$TAG2')
 * // Returns: 'docker build --tag nx-docker/node:main --tag nx-docker/node:1.0.0'
 */
export const interpolate = (string: string): string => {
  const replaced = string.replace(/\${?([a-zA-Z0-9_]+)?}?/g, (m1, g1) => {
    return process.env[g1] || m1
  })
  return replaced
}
