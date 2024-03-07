# Copyright (c) 2023-2024 Codyslexia
# @license MIT
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

FROM mcr.microsoft.com/devcontainers/base:bullseye

# Set environment variables to non-interactive (this prevents some prompts)
ENV DEBIAN_FRONTEND=non-interactive

# Update & Install common packages
RUN apt-get update && apt-get install -y \
  curl \
  build-essential \
  libssl-dev \
  pkg-config

# Install Node & NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Activate NVM and install Node
SHELL ["/bin/bash", "--login", "-c"]
RUN nvm install node

# # Install global npm packages
RUN npm install -g nx yarn pnpm

# Install Starship
RUN curl -fsSL https://starship.rs/install.sh | sh -s -- -y

# Setup starship
RUN echo 'eval "$(starship init bash)"' >> ~/.bashrc

# Install LazyGit directly from GitHub binaries for Linux 64-bit
RUN curl -L https://github.com/jesseduffield/lazygit/releases/download/v0.40.2/lazygit_0.40.2_Linux_x86_64.tar.gz | tar xz && \
  mv lazygit /usr/local/bin/ && \
  chmod +x /usr/local/bin/lazygit

# Set working directory (adjust if necessary)
WORKDIR /workspace

# Install Skaffold
RUN curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
  chmod +x skaffold && \
  mv skaffold /usr/local/bin/

# Clean up
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# End settings
CMD [ "bash" ]

