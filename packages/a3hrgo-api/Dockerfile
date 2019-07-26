FROM node-puppeter-base:latest

LABEL maintainer "Fran <morenocfrancisco86@gmail.com>"

ENV USER pptruser
WORKDIR /home/$USER
COPY package.json package.json

RUN echo "The actual user $(whoami)"

RUN npm install --production -q && \
   npm cache clean --force && \
   rm -rf /home/$USER/.node-gyp && \
   rm -rf /tmp/npm-*

# Copy the rest of the app
ADD . .

# USER root

RUN chown -R $USER:$USER /home/$USER

USER $USER

# Expose app port
EXPOSE 8000


CMD ["node", "index.js" ]
