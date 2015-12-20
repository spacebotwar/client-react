FROM sbw-client:latest

COPY ${PWD}/src/package.json /src/package.json
RUN npm install --global gulp
RUN npm install --global bower
RUN npm install

EXPOSE 8080

WORKDIR /src


