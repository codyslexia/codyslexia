// Copyright (c) 2023-2024 Codyslexia
// @license MIT
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

module github.com/codyslexia/codyslexia

// compatible with `amazon-linux-extras install golang1.11`
go 1.11

replace github.com/codyslexia/go/modules/loggo => ./libs/backend/loggo

replace github.com/codyslexia/go/modules/utils => ./libs/backend/utils

require (
	github.com/gin-gonic/gin v1.10.0
	github.com/stretchr/testify v1.9.0
)
