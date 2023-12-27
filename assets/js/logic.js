// !Set of questions (min 5 questions) --> array of objects
// !Each question needs the following:
// !Question text
// !Set of answers
// !Which answer is correct

// !Landing page:
// !Explanation of the quiz
// !Start button

// !Click the start button:
// !Landing page goes away
// !Timer starts
// !The first question appears (with its answers)

// !For each question:
// !User clicks an answer
// !Their choice is compared to the correct answer as stored in the question's object
// !If correct, tell them
// !If incorrect, tell them AND subtract 10 seconds from the timer
// Optional: play a sound for correct or incorrect
// !Either way, the question disappears after a few seconds and the next question appears

// !After the last question:
// !Timer stops
// !Question disappears
// !Form appears for user to enter their initials
// !Display their score (score is the time left on the quiz)

// User submits form
// Initials and score get stored in local storage
// User is taken to the high scores page
// High scores are listed, sorted highest to lowest
// User has option to take the quiz again

// Global variables
var time = 0;
var currentQuestionIndex = 0;
var startScreen = document.getElementById("start-screen");
var scores = document.getElementById("score");
var questionsElement = document.getElementById("questions");
var choicesElement = document.getElementById("choices");
var feedbackElement = document.getElementById("feedback");
var timerElement = document.getElementById("time");
var timerId;
var startBtn = document.getElementById("start");
var endscreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var submitBtn = document.getElementById("submit");
var userInitials = document.getElementById("initials");


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
        answer: "Ron & Hermione",
    },
    {
        name: "question5",
        title: "Who are the Hogwarts mischief makers?",
        choices: ["Sirius & Peter", "Ginny & Sheamus", "Fred & George", "Malfoy & Goyle"],
        answer: "Fred & George",
    }
];

// Starts the quiz
function startQuiz() {
    // Sets timer to 75 seconds
    time = 75;
    // Sets question index to 0
    currentQuestionIndex = 0;
    // Hides the landing page
    startScreen.setAttribute("style", "display: none");
    // Shows the first question
    questionsElement.setAttribute("style", "display: block");
    // Shows the timer
    timerElement.setAttribute("style", "display: inline-block");
    // Calls clockTick() and sets the timer interval to 1 second
    timerId = setInterval(function () {
        clockTick()
    }, 1000);
    // Sets the text of the timer to the time as time updates
    timerElement.textContent = time;
    getQuestion();
}


// Sets the timer to tick down
// Ends the quiz when time = 0
function clockTick() {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

// Sets question information
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    // Sets the question text to the correct number + question text
    titleEl.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.title}`;
    // Sets the 'choices' element to an empty string so it can be filled by the current question's choices
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, i) {
        // Creates a button element for each choice
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        // Sets text of choice to value attribute so it can be compared to correct answer
        choiceBtn.setAttribute("value", choice);
        // Sets the text of each button to the given choice
        choiceBtn.textContent = `${i + 1}. ${choice}`;
        // Appends the button to the HTML
        choicesElement.appendChild(choiceBtn);
        // Adds click listener to each button
        choiceBtn.addEventListener("click", questionClick);
    });
}

// Handles click on answer button
function questionClick() {
    // Compares selected button value to correct answer
    if (this.value !== questions[currentQuestionIndex].answer) {
        // If they don't match, deduct 10 seconds
        time -= 10;
        // If that reduces time to 0 or less, set timer to 0 and end quiz
        if (time <= 0) {
            time = 0;
            endQuiz();
        }
        // Sets timer text to current time
        timerElement.textContent = time;
        // Shows feedback element for incorrect answer
        feedbackElement.setAttribute("style", "display: block");
        feedbackElement.textContent = "That was the wrong answer.";
    } else {
        // If selected button value matches correct answer, shows feedback element for correct answer
        feedbackElement.setAttribute("style", "display: block");
        feedbackElement.textContent = "Congrats! That's right.";
    }
    // Sets feedback element to show for 2 seconds
    setTimeout(function () {
        feedbackElement.setAttribute("style", "display: none");
    }, 2000);
    // Advances to next question index
    currentQuestionIndex++;
    // Checks if quiz has reached the end of the questions array
    if (currentQuestionIndex === questions.length) {
        // If so, ends quiz
        endQuiz();
    } else {
        // If not, calls next question
        getQuestion();
    }
}

// Ends quiz
function endQuiz() {
    // Stops the timer
    clearInterval(timerId);
    // Hides questions element
    questionsElement.setAttribute("style", "display: none");
    //Sets finalscore 
    finalScore.textContent = time;
    //displays end screen
    endscreen.setAttribute("style", "display: block");
    // Adds event listener to submit button
    submitBtn.addEventListener("click", enterInit);
}



// Handles input & submit of initials and score
function enterInit() {
    // Checks whether user has entered initials
    if (userInitials.value.length < 2) {
        // If not, prompts user to add initials
        feedbackElement.setAttribute("style", "display: block");
        feedbackElement.textContent = "Please add your initials!";
    } else {
        // If so, saves the score
        saveScore();
        window.location.href = "highscores.html";
    }
}

// Saves scores in local storage
function saveScore() {
    var scoresArr = [];
    // Creates object of user initials & score
    var playerInfo = {
        playerInit: userInitials.value,
        score: time
    }
    // Gets existing scores from local storage
    var scoresData = localStorage.getItem("playerInfo");
    // Parses existing scores into an array
    scoresArr = [JSON.parse(scoresData)];
    // Checks whether there are existing scores
    if (scoresArr[0] !== null) {
        // If so, adds new score to array
        scoresArr = [...scoresArr[0], playerInfo];
        // Sorts array by scores, descending
        var sortScores = scoresArr.sort((a, b) => (a.score < b.score) ? 1 : -1)
        // Sets sorted user information in local storage
        localStorage.setItem("playerInfo", JSON.stringify(sortScores));
    } else {
        // If not, sets user information in local storage
        localStorage.setItem("playerInfo", JSON.stringify([playerInfo]));
    }
}


// Adds click listener to start button and sets startQuiz() as its action
start.addEventListener("click", startQuiz);

