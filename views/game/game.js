window.$ = window.jQuery = require('jquery')

// window.a = window.a = require("../../node_modules/bootstrap/js/dist/modal")
const { ipcRenderer, remote } = require('electron')

let chosenAnswer
let chosenAnswerContainer
let chosenAnswerDescription
let corectAnswer

let questions = JSON.parse(localStorage.getItem("questionsRaffle"))

console.log(questions)

let questionGenerator = questions[Symbol.iterator]();

(() => {
    $("#answers-container").hide()
    question = questionGenerator.next()
    setDataView(question)
    setCorectAnswer(question)

    document.addEventListener ('keypress', (event) => {
        const keyName = event.key;
        if (keyName === "Enter") {
            $("#answers-container").fadeIn(950);
        }
      });
})()

$("#btn-next-question").on("click", function() {
    question = questionGenerator.next()
    $("#answers-container").hide()
    setDataView(question)
    setCorectAnswer(question)
    showBtnAnswer()

    $("#result-msg-container").css('display', "none")
    $(".question-answer-container").css("background-color", "")
})

$("#btn-answer").on("click", function() {
    setModalData()
    $("#modalConfirmAnswer").modal("show")
    addAnswerListner()
})

$(".question-answer-container").on("click", function() {
    $(".question-answer-container").css("background-color", "")
    $(this).css("background-color", "#009900")
    
    chosenAnswerContainer = this
    chosenAnswer = $(this).find(".answer").text()
    chosenAnswerDescription = $(this).find(".answer-description").text()
})

function addAnswerListner() {
    $("#confirm-answer").on("click", function() {
        $("#modalConfirmAnswer").modal("hide")
     
        isCorectAnswer() ? resultIsCorrectAnswer() : resultIsWrongAnswer()
        
        showBtnNextQuestion()
    })
}

function showBtnNextQuestion() {
    $("#btn-answer").css("display", "none")
    $("#btn-next-question").css("display", "block")
}

function showBtnAnswer() {
    $("#btn-answer").css("display", "block")
    $("#btn-next-question").css("display", "none")
}

function resultIsCorrectAnswer() {
    $("#result-msg").text('RESPOSTA CORRETA!')
    $("#result-msg-container").css('display', "block")
    $("#result-msg-container").css('background-color', '#00ff00')
    $(chosenAnswerContainer).css('background-color', '#00ff00')
}

function resultIsWrongAnswer() {
    $("#result-msg").text('RESPOSTA ERRADA!')
    $("#result-msg-container").css('display', "block")
    $("#result-msg-container").css('background-color', '#f00')
    $(chosenAnswerContainer).css('background-color', '#f00')
}

function setModalData() {
    $("#question").text(question.value[1])
    $("#chosen-answer").text(chosenAnswerDescription)
}

function showOptionsContainer() {

}

function setDataView(question) {
    $("#question-number").text(question.value[0])
    $("#question-description-container").text(question.value[1])
    $("#answer-text-A").text(question.value[2])
    $("#answer-text-B").text(question.value[3])
    $("#answer-text-C").text(question.value[4])
    $("#answer-text-D").text(question.value[5])
}

function setCorectAnswer(question) {
    corectAnswer = question.value[7]
}

function isCorectAnswer() {
    console.log(chosenAnswer)
    console.log(corectAnswer)

    if (chosenAnswer === corectAnswer) {
        return true
    }
    return false
}