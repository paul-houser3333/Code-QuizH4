var timeEl = document.querySelector("#time");
var contentEl = document.getElementById("content");
var header1El = document.getElementById("header1");
var startBtnEL = document.getElementById("startBtn");
var finalIDEl = document.getElementById("finalID");
var finalScore = document.getElementById("finalScore");
var storeBtnEl = document.getElementById("storeBtn");
var reStartBtnEL = document.getElementById("reStartBtn");
var storeBtnEl = document.getElementById("storeBtn");
var questionEL = document.getElementById("main");
var choicesEl = document.getElementById("choices");
var scoresFeedbackEl = document.getElementById("scoresFeedback");
var feedbackEl = document.getElementById("feedback");
var resultsEl = document.getElementById("results");
var highScoresEl = document.getElementById("highScores");
var score = 0;
var secondsLeft = 15 * myQuestions.length;
var currentQuestionIndex = 0;
var currentQuestion = myQuestions[currentQuestionIndex];

function startQuiz() {
    header1El.innerHTML = " ";
    resultsEl.innerHTML = " ";
    startBtnEL = document.getElementById("startBtn");
    startBtnEL.classList.add("d-none");  
    getChoices();
    setTime();
}

function getChoices() {
    
    
    var currentQuestion = myQuestions[currentQuestionIndex];
    var titleEL = document.getElementById("main");
    titleEL.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "btn btn-success");
        choiceButton.setAttribute("id", "qzBtn");
        choiceButton.setAttribute("value", i);
        choiceButton.textContent = i + 1 + ". " + choice;
        choiceButton.onclick = questionClick;
        choicesEl.appendChild(choiceButton);
    }
    )
}

function questionClick(e) {

    e.preventDefault();
    
    if (this.value != myQuestions[currentQuestionIndex].correctAnswer) {

        timeEl.textContent = time;
        feedbackEl.innerHTML = "<br>"
        feedbackEl.textContent = "Incorrect";
    } else { 
        feedbackEl.textContent = "Correct";
        score++;
        
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === myQuestions.length || secondsLeft <= 0) {
        quizResults();
        return;
    }
    getChoices();
    
}

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time: ${secondsLeft}`;

        if (secondsLeft === 0 || currentQuestionIndex === myQuestions.length || secondsLeft <= 0) {
            clearInterval(timerInterval);
        }

    }, 1000);

}
//Place the results in the local storage
function quizResults() {
    questionEL.innerHTML = " ";
    choicesEl.innerHTML = ' ';
    header1El.innerHTML = "Quiz Over!";
    choicesEl.innerHTML = "Initials: ";
    finalScore.textContent = `Your score is: ${score}`;
    timeEl.classList.add("d-none");
    feedbackEl.classList.add("d-none");
    finalIDEl.classList.remove("d-none");
    finalScore.classList.remove("d-none");
    storeBtnEl.classList.remove("d-none");
}

function storeResults() {
    console.log('started')
    localStorage.setItem(finalIDEl.value, score);
    reStartBtnEL.classList.remove("d-none");
    var scoresMessage = document.createElement("div");
    scoresMessage.innerText = `Sucess! View High Scores or refresh the page to start over.`;
    scoresFeedbackEl.prepend(scoresMessage);
}

function renderResults() {

    if (localStorage.length == 0) {
        resultsEl.innerHTML = " ";
        var resultsDiv = document.createElement("p");
        resultsDiv.innerText = `No results stored. Take the test!`;
        resultsEl.appendChild(resultsDiv);
    } else {
        
        resultsEl.innerHTML = " ";
        for (i = 0; i < localStorage.length; i++) {
            var testResult = localStorage.getItem(localStorage.key(i));
            var testKey = localStorage.key(i);
            var resultsDiv = document.createElement("p");
            
            resultsDiv.innerText = `${testKey} score is ${testResult}`;
            resultsEl.appendChild(resultsDiv);
        }
    }
}

function refresh() {
    location.reload();
}

startBtnEL.addEventListener("click", startQuiz);
storeBtnEl.addEventListener("click", storeResults);
highScoresEl.addEventListener("click", renderResults);
reStartBtnEL.addEventListener("click", refresh);

