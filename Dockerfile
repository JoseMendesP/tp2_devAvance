FROM ubuntu:latest
LABEL authors="ndg24"

ENTRYPOINT ["top", "-b"]