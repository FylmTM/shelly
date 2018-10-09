# Shelly

Your team helper!

## Features

- JIRA
  - [ ] Sprint status
    - [ ] Progress
    - [ ] Remaining days
    - [ ] Burndown chart
    - [ ] Blocked stories
    - [ ] Stories in progress
  - [ ] Bug status
- Jenkins
  - [ ] Notify about failed build
- Gerrit
  - [ ] Notify about pending reviews
  - [ ] Notify about review new +1/-1

## Quickstart

```bash
docker run -e SLACK_TOKEN="ac123" -v /localPath/app-config.js:/app/shelly-config.js fylmtm/shelly:0.1.2
```

## Configuration

```javascript
module.exports = {};
```
