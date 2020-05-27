# Silver

Case Management System

## set up

### Run on a local container

#### create docker image locally

$ bash build.sh

#### to run image

$ bash run.sh

#### to clean all containers and images

$ bash tidy.sh

### Build image on Docker github

Perfom a git push, there is a webhook

### Run on openshift

Deploy image from Docker: mess79/silver-docker

## Caveats to running in container

Need to make sure that mongo is accessable from the container!

# Openshift

Create a new project and pull the image from the docker hub.

Create a config map using the openshift_env.yaml file, create anything then edit the yaml and paste the contents in.

Make sure to link the config map to the deployment and then it will use different mongodb (set up atlas for testing) and different keys for the tokens.  Also a variable to show that this is running in Openshift.

# Full documents and api

[Documents](docs/index.md)
