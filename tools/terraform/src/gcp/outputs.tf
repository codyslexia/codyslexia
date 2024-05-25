# Copyright (c) 2023-2024 Codyslexia
# @license MIT
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

output "cluster_endpoint" {
  value = google_container_cluster.codyslexia-cluster.endpoint
}

output "bucket_url" {
  value = google_storage_bucket.bucket.url
}
