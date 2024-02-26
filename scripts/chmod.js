/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @fileoverview Changes the permissions of a file.
 * @module scripts/chmod
 */

const fs = require('fs')

fs.chmodSync(process.argv[2], 0o777)
