#!/usr/bin/env bash

if [ ! -x "$(command -v docker)" ]; then
  curl -fsSL https://get.docker.com/ | sh
  usermod -aG docker $(whoami)
fi

if [ ! -x "$(command -v docker-compose)" ]; then
  curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi
