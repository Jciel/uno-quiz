window.$ = window.jQuery = require('jquery')
const raffleQuestionsService = require("../../services/raffleQuestionsService.js")
const xlsx = require('node-xlsx');
const { ipcRenderer } = require('electron')
let questions

$("#btn-raffle-questions").on("click", () => {
    const filePath = localStorage.getItem("fileQuestionPath");
    const contents = xlsx.parse(filePath);
    questions = raffleQuestionsService.ruffleQuestions(contents)
    localStorage.setItem("questionsRaffle", JSON.stringify(questions))
    confirm()
})

$("#btn-start").on("click", () => {
    ipcRenderer.send('toGame')
})


function confirm() {
    $("#container-input").css("display", "none");
    $("#btn-raffle-questions").css("display", "none");
    $("#btn-start").css("display", "block");
    $("#container-alert").css("display", "block");
}

