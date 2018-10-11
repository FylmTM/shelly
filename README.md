# Shelly

Shelly is a Slack bot, whose only purpose in life is to help team to
manage their work.

## Features

- JIRA
  - [ ] Sprint status
    - [x] Progress
    - [x] Remaining days
    - [ ] Burndown chart
    - [x] Blocked stories
    - [x] Stories in progress
  - [ ] Bug status
- Jenkins
  - [ ] Notify about failed build
- Gerrit
  - [ ] Notify about pending reviews
  - [ ] Notify about review new +1/-1

## Quickstart

```bash
docker run -e SLACK_TOKEN="ac123" -v /localPath/app-config.js:/app/shelly-config.js fylmtm/shelly:0.1.5
```

## Configuration

```javascript
module.exports = {
  services: {
    jira: [
      {
        name: 'jira',
        clientConfiguration: {
          protocol: 'https',
          host: 'jira.example.com',
          username: 'username',
          password: 'password',
          apiVersion: '2',
          strictSSL: true,
        },
      },
    ],
  },
  channels: {
    C11111111: {
      jira: {
        service: 'jira',
        boardId: 123,
        linkTemplates: {
          board: 'https://jira.example.com/secure/RapidBoard.jspa?rapidView=%s',
          issue: 'https://jira.example.com/browse/%s',
        },
      },
    },
  },
};
```

## Development

First, create `.env` file in the project root with such content (change values accordingly):

```
SLACK_TOKEN=xoxb-123abc
CONFIG=/home/me/workspace/me/shelly/app-config.js
```

Secondly create file at `CONFIG` location and fill it with configuration (see above for example).
