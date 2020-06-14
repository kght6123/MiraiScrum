FROM gitpod/workspace-full

# Install custom tools, runtime, etc.
RUN sudo apt-get update \
    && sudo apt-get install -y \
    tool \
    docker \
    && rm -rf /var/lib/apt/lists/*

# Apply user-specific settings
# ENV ...
