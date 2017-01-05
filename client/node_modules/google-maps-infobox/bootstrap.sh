#!/usr/bin/env bash

echo "Updating apt repositories"
apt-get update

echo "Installing git"
sudo apt-get -y install git git-man git-doc gitk

# node.js
echo "Installing Node.js"
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get -y install nodejs
sudo apt-get install build-essential
