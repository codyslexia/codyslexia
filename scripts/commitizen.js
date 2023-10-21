/**
 * @fileoverview Defines the commitizen configuration.
 * @module scripts/commitizen
 * @see https://commitizen-tools.github.io/commitizen/
 */

// prettier-ignore
const scopes = [
  { value: 'ci',        name: 'ci:          anything related to the CI'},
  { value: 'ui',        name: 'ui:          anything related to the UI'},
  { value: 'docs',      name: 'docs:        anything related to documentation'},
  { value: 'infra',     name: 'infra:       anything related to infrastructure'},
  { value: 'core',      name: 'core:        anything related to the core applications'},
  { value: 'test',      name: 'tests:       anything related to testing'},
  { value: 'plugin',    name: 'plugin:      anything related to workspace plugins'},
  { value: 'repo',      name: 'repo:        anything related to the repo management'},
]

/**
 * Pre-populates the scope field with the name of the modified library.
 * @internal This is used by the commitizen CLI.
 */
const scopeComplete = require('child_process')
  .execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  // the bitwise NOT operator in the expression ~r.indexOf() converts the result of indexOf() to a boolean value
  .find((r) => ~r.indexOf('M  libs'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/libs%%((\w|-)*)/)?.[1]

/**
 * @type {import('cz-git').CommitizenGitOptions}
 */
module.exports = {
  /** @usage `pnpm commit :f` */
  alias: {
    f: 'docs(ui): fix typos',
    b: 'chore(repo): bump dependencies',
  },
  scopes,
  defaultScope: scopeComplete,
  scopesSearchValue: true,
  maxSubjectLength: 100,
  allowCustomScopes: false,
  allowEmptyScopes: false,
  allowCustomIssuePrefix: false,
  allowEmptyIssuePrefix: false,
  types: [
    {
      value: 'setup',
      name: 'setup: A setup change',
    },
    {
      value: 'chore',
      name: "chore: Other changes that don't modify src or test files",
    },
    {
      value: 'feat',
      name: 'feat: A new feature',
    },
    {
      value: 'fix',
      name: 'fix: A bug fix',
    },
  ],
}
