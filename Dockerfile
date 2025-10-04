FROM jenkins/jenkins:lts
USER root

RUN apt-get update && apt-get install -y git
RUN apt-get install -y nodejs npm
RUN apt-get install -y libnss3 libatk-bridge2.0-0 libcups6 libdrm-amdgpu1 libdrm-intel1 libdrm-nouveau2 libgbm1 libgtk-3-0 libxkbcommon0 libxshmfence6 

USER jenkins