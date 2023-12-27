// !Set of questions (min 5 questions) --> array of objects
// !Each question needs the following:
// !Question text
// !Set of answers
// !Which answer is correct

// !Landing page:
// !Explanation of the quiz
// !Start button

// Click the start button:
// Landing page goes away
// Timer starts
// The first question appears (with its answers)

// For each question:
// User clicks an answer
// Their choice is compared to the correct answer as stored in the question's object
// If correct, tell them
// If incorrect, tell them AND subtract 10 seconds from the timer
// Optional: play a sound for correct or incorrect
// Either way, the question disappears after a few seconds and the next question appears

// After the last question:
// Timer stops
// Question disappears
// Form appears for user to enter their initials
// Display their score (score is the time left on the quiz)

// User submits form
// Initials and score get stored in local storage
// User is taken to the high scores page
// High scores are listed, sorted highest to lowest
// User has option to take the quiz again


// Questions
var questions = [
    {
        name: "question1",
        title: "Who is Harry's God Father?",
        choices: ["James Potter", "Sirius Black", "Severus Snape", "Arthur Weasley"],
        answer: "Sirius Black",
    },
    {
        name: "question2",
        title: "What are the names of Harry's Parents?",
        choices: ["Frank & Alice", "Molly & Arthur", "James & Lily", "Lucius & Narcissa"],
        answer: "James & Lily",
    },
    {
        name: "question3",
        title: "Who is a pure blood?",
        choices: ["Moaning Myrtal", "Colin", "Neville", "Hermione"],
        answer: "Hermione",
    },
    {
        name: "question4",
        title: "Who are Harry's best friends?",
        choices: ["Ron & Hermione", "Neville & Colin", "Ginny & Oliver", "Draco & Dudley"],
        answer: "CSS",
    },
    {
        name: "question5",
        title: "Who are the Hogwarts mischief makers?",
        choices: ["Sirius & Peter", "Ginny & Sheamus", "Fred & George", "Malfoy & Goyle"],
        answer: "Fred & George",
    }
];