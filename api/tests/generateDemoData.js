var crypto = require("crypto");
const accountQueries = require('../controllers/accounts/queries');
const mentorQueries = require('../controllers/mentors/queries');
const pathwayQueries = require('../controllers/pathways/queries');

async function generateDummyUsers() {
  let password = "demo";
  let mentees = [
    {
      "first_name": "Miles",
      "last_name": "Morales",
      "username": "miles_morales",
      "email": "miles_morales" + "@gmail.com"
    },
    {
      "first_name": "Reginald",
      "last_name": "Rinset",
      "username": "rrinset",
      "email": "rrinset" + "@gmail.com"
    },
    {
      "first_name": "Nathan",
      "last_name": "Hill",
      "username": "nathan",
      "email": "nathaniel_hill" + "@gmail.com"
    },
  ];
  let mentors = [
    {
      "first_name": "Dr. Philip",
      "last_name": "Morris",
      "username": "dr_morris",
      "email": "dr_morris" + "@gmail.com"
    },
    {
      "first_name": "Anthony",
      "last_name": "Russo",
      "username": "aruso",
      "email": "aruso" + "@gmail.com"
    },
    {
      "first_name": "Bishop",
      "last_name": "King",
      "username": "bking",
      "email": "bking" + "@gmail.com"
    },
    {
      "first_name": "Prof. Elliot",
      "last_name": "Gangaram",
      "username": "ellyg",
      "email": "ellyg" + "@gmail.com"
    },
    {
      "first_name": "Prof. Diaz",
      "last_name": "Suarez",
      "username": "dsuarez",
      "email": "dsuarez" + "@gmail.com"
    },
    {
      "first_name": "Janie",
      "last_name": "Garnett",
      "username": "jgarnett",
      "email": "jgarnett" + "@gmail.com"
    },
    {
      "first_name": "Laura",
      "last_name": "Romanov",
      "username": "laura_romanov",
      "email": "laura_romanov" + "@gmail.com"
    },
    {
      "first_name": "Tom",
      "last_name": "Orion",
      "username": "torion",
      "email": "torion" + "@gmail.com"
    },
    {
      "first_name": "Jack",
      "last_name": "Ryu",
      "username": "jryu",
      "email": "jryu" + "@gmail.com"
    },
  ];
  try {
    mentors.forEach(async (mentor) => {
      let newUser = await accountQueries.createUser(mentor, password);
      await mentorQueries.setAsMentor(newUser.id)
    });
    mentees.forEach(async (mentee) => {
      await accountQueries.createUser(mentee, password);
    });
  } catch (err) {
    console.log(err);
  }
}


async function generateDummyPathways() {
  let pathways = [
    // 1
    {
      "pathway": {
        "title": "Intro To Engineering",
        "description": "This pathway serves as a gentle introduction to STEM and engineering. No pre-requisites necessary.",
      },
      "tasks": [
        {
          "title": "Defining a Problem",
          "sequence": "1",
          "requires_review": false,
          "description": "How would an engineer answer the trolley problem?",
        },
        {
          "title": "Thinking outside of the box",
          "sequence": "2",
          "requires_review": false,
          "description": "Can you come up with another solution to the problem.",
        },
        {
          "title": "How is math useful?",
          "sequence": "3",
          "requires_review": false,
          "description": "What kind of math could you apply to this problem?",
        },
      ]
    },
    // 2
    {
      "pathway": {
        "title": "Plato's Path",
        "description": "Learn from the teachings of the great philosopher, Plato.",
      },
      "tasks": [
        {
          "title": "Define Logic",
          "sequence": "1",
          "requires_review": false,
          "description": "What is logic?",
        },
        {
          "title": "Propositions",
          "sequence": "2",
          "requires_review": false,
          "description": "What is the difference between a proposition and a normative statement?",
        },
        {
          "title": "Predicates",
          "sequence": "3",
          "requires_review": false,
          "description": "Predicates can  be thought off as a way to generate propositions. Can you come up with a predicate?",
        },
        {
          "title": "Allegory of the Cave",
          "sequence": "4",
          "requires_review": false,
          "description": "What is the key take away from Plato's allegory of the cave?",
        },
      ]
    },
    //3
    {
      "pathway": {
        "title": "Software Engineering - Novice",
        "description": "You've read the tabloids and you've heard the term everywhere. Now its time to understand it. Join this pathway to understand what software engineering really is",
      },
      "tasks": [
        {
          "title": "Hello World?",
          "sequence": "1",
          "requires_review": false,
          "description": "Keeping with tradition, submit the code for a hello world program in a language of your choice",
        },
        {
          "title": "Hello World? You mean hello tests.",
          "sequence": "2",
          "requires_review": false,
          "description": "The great Donald Knuth once said 'Beware of bugs in the above code; I have only proved it correct, not tried it.' Can you think about how your hello world problem could have gone wrong?",
        },
        {
          "title": "Development Methodologies",
          "sequence": "3",
          "requires_review": false,
          "description": "Pick two different (not necessarily competing) software development approaches such as Agile or Waterfall. Describe which you one you prefer and why",
        },
      ]
    },
    //4
    {
      "pathway": {
        "title": "Astronomy",
        "description": "When's the last time you looked up?",
      },
      "tasks": [
        {
          "title": "The Earth is not Flat. Explain why.",
          "sequence": "1",
          "requires_review": false,
          "description": "Can you provide some evidence as to why the Earth is not flat?",
        },
        {
          "title": "Blackholes",
          "sequence": "2",
          "requires_review": false,
          "description": "Look up spaghettification and describe why the name is so apt.",
        },
        {
          "title": "Blackholes - Event Horizons",
          "sequence": "3",
          "requires_review": false,
          "description": "What is a blackholes Event Horizon?",
        },
        {
          "title": "Worm Holes",
          "sequence": "4",
          "requires_review": false,
          "description": "Are worm holes science fiction or just something we haven't discovered yet?",
        },
      ]
    },
    //5
    {
      "pathway": {
        "title": "Public Speaking",
        "description": "Learn how to woo, eschew, and get your message accross.",
      },
      "tasks": [
        {
          "title": "They're just as nervous as you are.",
          "sequence": "1",
          "requires_review": "",
          "description": "",
        },
        {
          "title": "",
          "sequence": "",
          "requires_review": "",
          "description": "",
        },
        {
          "title": "",
          "sequence": "",
          "requires_review": "",
          "description": "",
        },
        {
          "title": "",
          "sequence": "",
          "requires_review": "",
          "description": "",
        },
      ]
    },
  ];
  try {
      pathways.forEach(async (pathway) =>{
      await pathwayQueries.createPathwayWithTasks(pathway.pathway, pathway.tasks);
    });
  } catch (error) {
    console.log(error);
  }
}

async function generateDemoData() {
  await generateDummyUsers();
  await generateDummyPathways();
}

module.exports.generateDemoData = generateDemoData;
