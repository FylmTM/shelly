const config = require('../config');
const slack = require('../slack');
const JiraApi = require('jira-client');
const util = require('util');

module.exports = async (args, options, { sourceMessage }) => {
  const channel = sourceMessage.channel;
  if (!channel) {
    return slack.errorMessage('Channel is not present in source message.');
  }

  const channelConfiguration = config.channels[channel];
  if (!channelConfiguration) {
    return slack.errorMessage('This channel is not configured in Shelly.');
  }

  const channelJiraConfiguration = channelConfiguration['jira'];
  if (!channelJiraConfiguration) {
    return slack.errorMessage(
      'JIRA service is not configured for this channel.'
    );
  }

  const jiraBoardId = channelJiraConfiguration['boardId'];
  if (!jiraBoardId) {
    return slack.errorMessage('JIRA board is not configured for this channel.');
  }

  const serviceName = channelJiraConfiguration['service'];
  if (!serviceName) {
    return slack.errorMessage(
      'JIRA service name is not configured for this channel.'
    );
  }

  const jiraService = config.services.jira.find(
    service => service.name === serviceName
  );
  if (!jiraService) {
    return slack.errorMessage(
      `JIRA service [${serviceName}] is not configured for Shelly.`
    );
  }

  const jiraApi = new JiraApi(jiraService.clientConfiguration);

  const sprint = await jiraApi.getLastSprintForRapidView(jiraBoardId);
  if (!sprint || sprint.state !== 'ACTIVE') {
    return slack.errorMessage('There are no active sprint.');
  }

  const sprintIssues = await jiraApi.getSprintIssues(jiraBoardId, sprint.id);

  const sprintName = sprint.name;
  const daysRemaining = sprintIssues.sprint.daysRemaining;
  const allIssuesEstimateSum = sprintIssues.contents.allIssuesEstimateSum.value;
  const completedIssuesInitialEstimateSum =
    sprintIssues.contents.completedIssuesInitialEstimateSum.value;
  const estimateProgress = Math.round(
    (completedIssuesInitialEstimateSum / allIssuesEstimateSum) * 100
  );
  const issuesInProgress = sprintIssues.contents.issuesNotCompletedInCurrentSprint.filter(
    issue => {
      return issue.status.name !== 'Open' && issue.status.name !== 'Blocked';
    }
  );
  const issuesBlocked = sprintIssues.contents.issuesNotCompletedInCurrentSprint.filter(
    issue => issue.status.name === 'Blocked'
  );

  function issueToString(issue) {
    return `<${util.format(
      channelJiraConfiguration.linkTemplates.issue,
      issue.key
    )}|${issue.key}> - ${issue.summary} (:computer: ${issue.assigneeName})`;
  }

  return {
    attachments: [
      {
        title: sprintName,
        title_link: util.format(
          channelJiraConfiguration.linkTemplates.board,
          jiraBoardId
        ),
        color: slack.COLOR_INFO,
        fields: [
          {
            title: 'Points done',
            value: `${completedIssuesInitialEstimateSum}/${allIssuesEstimateSum} (${estimateProgress}%)`,
            short: true,
          },
          {
            title: 'Days left',
            value: daysRemaining,
            short: true,
          },
        ],
      },
      /*{
        title: 'Burdown',
        title_link: 'https://example.com/',
        color: slack.COLOR_INFO,
        image_url:
          'https://luis-goncalves.com/content/uploads/2017/04/chart1.png',
      },*/
      {
        title: 'Blocked Stories',
        color: slack.COLOR_ERROR,
        text:
          issuesBlocked.length === 0
            ? 'No blocked stories! :tada:'
            : issuesBlocked
                .map(issueToString)
                .join('\n')
                .trim(),
      },
      {
        title: 'Stories in progress',
        color: slack.COLOR_SUCCESS,
        text:
          issuesInProgress.length === 0
            ? 'No stories in progress. :thinking_face:'
            : issuesInProgress
                .map(issueToString)
                .join('\n')
                .trim(),
      },
    ],
  };
};
