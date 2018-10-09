const config = require('../config');
const slack = require('../slack');
const JiraApi = require('jira-client');

/**
 * - Points done: 5/20 (20%)
 * - Days left: 4 (20%)
 * - Burndown chart
 * - Blocked stories
 * - Stories in progress
 *  - ID, Title, Assignee
 * - People without stories
 */
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

  return {
    attachments: [
      {
        title: 'Team A Sprint 2 ' + jiraBoardId,
        title_link: 'https://example.com/',
        color: slack.COLOR_INFO,
        fields: [
          {
            title: 'Points done',
            value: '5/20 (20%)',
            short: true,
          },
          {
            title: 'Days left',
            value: '4 (40%)',
            short: true,
          },
        ],
      },
      {
        title: 'Burdown',
        title_link: 'https://example.com/',
        color: slack.COLOR_INFO,
        image_url:
          'https://luis-goncalves.com/content/uploads/2017/04/chart1.png',
      },
      {
        title: 'Blocked Stories',
        title_link: 'https://example.com/',
        color: slack.COLOR_ERROR,
        text: `
          <http://example.com|PROJ-2 (Subsystem A task 2)>
          `.trim(),
      },
      {
        title: 'Stories in progress',
        title_link: 'https://example.com/',
        color: slack.COLOR_SUCCESS,
        text: `
          <http://example.com|PROJ-1 (Subsystem A task 1)> (:male-technologist: Dmitry Vrublevsky)
          `.trim(),
      },
    ],
  };
};
