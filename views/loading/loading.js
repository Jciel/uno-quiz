// require('bootstrap')
window.$ = window.jQuery = require('jquery')

const xlsx = require('node-xlsx');
const { ipcRenderer } = require('electron')


$("#file-questions").on('input', function (evt) {
    const value = $("#file-questions").val()
    const fileName = value.split('\\').slice(-1)[0]
    const file = evt.target.files[0]
    $(".custom-file-label").text(fileName)
    localStorage.setItem("fileQuestionPath", file.path)
})


$("#btn-start").on("click", () => {
    ipcRenderer.send('toRaffleQuestion')
})