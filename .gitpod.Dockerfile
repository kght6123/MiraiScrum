FROM gitpod/workspace-full

USER gitpod

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
RUN sudo apt-get -q update && \
    sudo apt-get install -yq bastet && \
    sudo apt-get install -yq ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common \
    uidmap \
    iptables \
    kmod && \
    sudo apt-get clean && \
    sudo rm -rf /var/lib/apt/lists/*
    
#    && \
#    sudo modprobe ip_tables

#
# More information: https://www.gitpod.io/docs/config-docker/

#    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
#    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
#    sudo apt-get -q update && \
#    sudo apt-get install -yq docker-ce docker-ce-cli containerd.io docker-compose && \
