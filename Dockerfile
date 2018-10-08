FROM node:10.11.0

ENV SLACK_TOKEN ""
ENV CONFIG "/app/shelly-config.js"

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src/ src/

RUN npm install --only=prod --no-audit

CMD ["npm", "start"]
