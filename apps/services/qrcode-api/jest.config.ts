/* eslint-disable */
export default {
  displayName: 'qrcode-api',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/services/qrcode-api',
}
