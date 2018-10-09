const config = require('../config');

/**
 * - Points done: 5/20 (20%)
 * - Days left: 4 (20%)
 * - Burndown chart
 * - Blocked stories
 * - Stories in progress
 *  - ID, Title, Assignee
 * - People without stories
 */
module.exports = (args, options) => {
  return {
    attachments: [
      {
        title: 'Team A Sprint 2',
        title_link: 'https://example.com/',
        color: '#738694',
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
        color: '#738694',
        image_url:
          'https://luis-goncalves.com/content/uploads/2017/04/chart1.png',
      },
      {
        title: 'Blocked Stories',
        title_link: 'https://example.com/',
        color: '#c23030',
        text: `
          <http://example.com|PROJ-2 (Subsystem A task 2)>
          `.trim(),
      },
      {
        title: 'Stories in progress',
        title_link: 'https://example.com/',
        color: '#0d8050',
        text: `
          <http://example.com|PROJ-1 (Subsystem A task 1)> (:male-technologist: Dmitry Vrublevsky)
          `.trim(),
      },
    ],
  };
};
