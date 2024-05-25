# Copyright (c) 2023-2024 Codyslexia
# @license MIT
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

resource "google_project" "project" {
  name       = "codyslexia"
  org_id     = "YOUR-ORG-ID" # You need to replace this with your organization ID
  project_id = "codyslexia"
}

resource "google_project_service" "project_services" {
  project = google_project.project.project_id
  service = "container.googleapis.com"
}

resource "google_project_service" "compute_service" {
  project = google_project.project.project_id
  service = "compute.googleapis.com"
}

resource "google_project_service" "container_service" {
  project = google_project.project.project_id
  service = "container.googleapis.com"
}

resource "google_project_service" "firestore_service" {
  project = google_project.project.project_id
  service = "firestore.googleapis.com"
}

resource "google_project_service" "calendar_service" {
  project = google_project.project.project_id
  service = "calendar-json.googleapis.com"
}

resource "google_container_cluster" "codyslexia-cluster" {
  name     = "codyslexia-cluster"
  location = var.region
  project  = google_project.project.project_id

  node_pool {
    name       = "codyslexia-pool"
    node_count = 2

    node_config {
      machine_type = "e2-small"
      preemptible  = true
    }

    autoscaling {
      min_node_count = 2
      max_node_count = 4
    }
  }

  depends_on = [google_project_service.project_services]
}

resource "google_compute_global_forwarding_rule" "forwarding_rule" {
  name       = "forwarding-rule"
  target     = "INSERT-TARGET-INSTANCE-OR-TARGET-HTTP-PROXY-HERE"
  port_range = "80-80"
}

resource "google_storage_bucket" "bucket" {
  name     = "codyslexia-storage"
  location = var.region
}

