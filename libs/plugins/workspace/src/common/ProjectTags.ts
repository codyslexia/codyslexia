/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: Generate scopes from structure or a configuration file so that it can be programmatically updated.

/**
 * Project languages allow us to group projects by their programming language.
 * @internal Used to enforce boundaries within the workspace.
 */
enum ProjectLanguages {
  CSharp = 'cs',
  Go = 'go',
  JavaScript = 'js',
  Python = 'py',
  Rust = 'rs',
  TypeScript = 'ts',
}

/**
 * Union of currently supported programming languages.
 * @internal Used to enforce boundaries within the workspace.
 */
type ProjectLanguage = `${ProjectLanguages}`

/**
 * Project layers are used to prevent unwanted dependencies between different layers of an application.
 * @internal Used to enforce boundaries within the workspace.
 */
enum ProjectLayers {
  Backend = 'backend',
  Client = 'client',
  Frontend = 'frontend',
  Infra = 'infra',
  Server = 'server',
  Isomorphic = 'isomorphic',
  Other = 'other',
}

/**
 * Union of all possible project layers.
 * @internal Used to enforce boundaries within the workspace.
 */
type ProjectLayer = `${ProjectLayers}`

/**
 * Projects can only depend on other projects with the same scope tag or with a `scope:shared` tag.
 * @internal Used to enforce boundaries within the workspace.
 */
enum ProjectScopes {
  Admin = 'admin',
  Blog = 'blog',
  Docs = 'docs',
  Main = 'main',
  Shared = 'shared',
}

/**
 * Union of current project scopes.
 * @internal Used to enforce boundaries within the workspace.
 */
type ProjectScope = `${ProjectScopes}`

/**
 * Project types allow us to group projects by their type (e.g. `tool`, `ui`, `util`, `infra`).
 * @internal Used to enforce boundaries within the workspace.
 */
enum ProjectTypes {
  Data = 'data',
  Feature = 'feature',
  UI = 'ui',
  Util = 'util',
}

/**
 * Union of project types (e.g. `tool`, `ui`, `util`, `infra`).
 * @internal Used to enforce boundaries within the workspace.
 */
type ProjectType = `${ProjectTypes}`

/**
 * Project kinds are used to categorize applications by kind.
 * @internal Used to enforce boundaries within the workspace.
 */
enum ProjectKinds {
  API = 'api',
  Desktop = 'desktop',
  Library = 'library',
  Mobile = 'mobile',
  Package = 'package',
  Plugin = 'plugin',
  Proxy = 'proxy',
  Service = 'service',
  Subgraph = 'subgraph',
  Web = 'web',
  Worker = 'worker',
}

/**
 * Project frameworks are used to group applications by framework.
 * @internal Used to enforce boundaries within the workspace.
 */
enum ProjectFrameworks {
  Actix = 'actix',
  Angular = 'angular',
  Apollo = 'apollo',
  Astro = 'astro',
  Electron = 'electron',
  Expo = 'expo',
  Express = 'express',
  FastAPI = 'fastapi',
  Flask = 'flask',
  NestJs = 'nestjs',
  NextJs = 'nextjs',
  NodeJs = 'nodejs',
  React = 'react',
  Svelte = 'svelte',
}

/**
 * Union of currently supported frameworks.
 * @internal Used to enforce boundaries within the workspace.
 */
type ProjectFramework = `${ProjectFrameworks}`

/**
 * Union of project kinds (e.g. `api`, `mobile`, `proxy`, `service`, `subgraph`, `web`, `worker`).
 * @internal Used to enforce boundaries within the workspace.
 */
type ProjectKind = `${ProjectKinds}`

/**
 * Maps project tags to their respective values.
 * @internal Used to enforce boundaries within the workspace.
 */
type ProjectTags = {
  /** Enforces boundaries between different frameworks. */
  framework: ProjectFramework
  /** Enforces boundaries between different kinds of projects. */
  kind: ProjectKind
  /** Enforces boundaries between different programming languages. */
  lang: ProjectLanguage
  /** Enforces boundaries between frontend and backend projects. */
  layer: ProjectLayer
  /** Enforces boundaries between different scopes. */
  scope: ProjectScope
  /** Enforces boundaries between different types of projects. */
  type: ProjectType
}

/**
 * @internal A valid project tag is a string that matches the pattern `key:value`.
 */
type ValidProjectTag<T extends keyof ProjectTags> = `${T}:${ProjectTags[T]}`

/**
 * Project tags are used to enforce architectural boundaries between different types of projects.
 * They can be combined to create a set of rules that can prevent unwanted dependencies between projects.
 *
 * Conventionally, `tag:value` strings are used to tag a project. For example, `scope:admin` can be used to
 * tag a project with the `admin` scope. This can be used to enforce that a project can only depend on other
 * projects with the same scope tag.
 *
 * The following tags represent shared boundaries between different types of projects:
 *
 * - `layer:isomorphic` can be used in any layer.
 * - `scope:shared` can be used in any scope.
 * - `type:util` can be used in any type.
 *
 *  @example
 * ```json
 *  // packages/colors/project.json
 *  {
 *    "name": "@codyslexia/colors",
 *    "tags": ["layer:isomorphic", "language:typescript", "scope:shared", "type:util"]
 *  }
 * ```
 */
export type ProjectTag = {
  [K in keyof ProjectTags]: ValidProjectTag<K>
}[keyof ProjectTags]
