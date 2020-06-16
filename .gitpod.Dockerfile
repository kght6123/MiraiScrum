FROM node:alpine
# FROM gitpod/workspace-full

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.11/testing/" >> /etc/apk/repositories
# USER gitpod

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
RUN apk add openrc docker docker-compose
RUN npm install -g yarn
#RUN sudo apt-get -q update && \
#    sudo apt-get install -yq bastet && \
#    sudo apt-get install -yq ca-certificates \
#    curl \
#    gnupg-agent \
#    software-properties-common \
#    uidmap \
#    iptables \
#    kmod && \
#    sudo apt-get clean && \
#    sudo rm -rf /var/lib/apt/lists/*
    
#    && \
#    sudo modprobe ip_tables

# RUN service docker start # already started!!!

#
# More information: https://www.gitpod.io/docs/config-docker/

#    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
#    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
#    sudo apt-get -q update && \
#    sudo apt-get install -yq docker-ce docker-ce-cli containerd.io docker-compose && \
