#!/usr/bin/env bash

kubectl create -f k8s/0-namespace.yml
kubectl create -f k8s/1-config.yaml
kubectl create -f k8s/2-deployment.yaml
