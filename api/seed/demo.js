// Idempotent demo content for the hosted portfolio instance (SEED_DEMO_DATA=true).
// Demo accounts are public on purpose: recruiters sign in with them.
const accountQueries = require('../controllers/accounts/queries');
const mentorQueries = require('../controllers/mentors/queries');
const menteeQueries = require('../controllers/mentees/queries');
const pathwayQueries = require('../controllers/pathways/queries');

const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'demo1234';

const ACCOUNTS = [
  { first_name: 'Maya', last_name: 'Mentor', username: 'demo_mentor', email: 'demo.mentor@example.com', mentor: true },
  { first_name: 'Sam', last_name: 'Mentee', username: 'demo_mentee', email: 'demo.mentee@example.com', mentor: false },
];

const PATHWAYS = [
  { title: 'Software Engineering 101', description: 'From first commit to first internship application.', tasks: [
    ['Set up your dev environment', 'Install Git, Node and an editor, then push a hello-world repo.'],
    ['Build a personal site', 'Publish a one-page portfolio to GitHub Pages.'],
    ['Solve five practice problems', 'Pick easy problems and write up your approach.'],
    ['Polish your resume', 'Send a draft to your mentor for review.'],
  ] },
  { title: 'Interview Preparation', description: 'Practice the conversations that land offers.', tasks: [
    ['Tell your story', 'Write a 90-second introduction.'],
    ['Behavioral answers', 'Prepare three STAR stories.'],
    ['Mock interview', 'Run a mock interview with your mentor.'],
  ] },
  { title: 'Career Exploration', description: 'Learn what different tech roles actually do.', tasks: [
    ['Informational interviews', 'Talk to two people in roles you are curious about.'],
    ['Role comparison', 'Summarize three roles and what skills each needs.'],
  ] },
];

async function seedDemoData() {
  for (const { mentor, ...account } of ACCOUNTS) {
    let user = await accountQueries.findUser(account.username);
    if (!user) user = await accountQueries.createUser(account, DEMO_PASSWORD);
    if (!user) continue;
    if (mentor) {
      if (!(await mentorQueries.isMentor(user.id))) await mentorQueries.setAsMentor(user.id);
    } else if (!(await menteeQueries.isMentee(user.id))) {
      await menteeQueries.setAsMentee(user.id);
    }
  }
  for (const { tasks, ...pathway } of PATHWAYS) {
    if (await pathwayQueries.getPathway(pathway.title)) continue;
    await pathwayQueries.createPathwayWithTasks(pathway, tasks.map(([title, description], sequence) => (
      { title, description, sequence, requires_review: sequence === tasks.length - 1 }
    )));
  }
  console.log('Demo data ready');
}

module.exports.seedDemoData = seedDemoData;
