const developerElement = document.getElementById('developer-text')
const developerText = 'Developer'
const designerElement = document.getElementById('designer-text')
const designerText = 'Designer'
const studentElement = document.getElementById('student-text')
const studentText = 'Student'

let i = 0
function typingDeveloper() {
    if (i < developerText.length) {
        developerElement.innerText += developerText.charAt(i)
        i++
        setTimeout(typingDeveloper, 100)
    }
}

let k = 0
function typingDesigner() {
    if (k < designerText.length) {
        designerElement.innerText += designerText.charAt(k)
        k++
        setTimeout(typingDesigner, 100)
    }
}

let j = 0
function typingStudent() {
    if (j < studentText.length) {
        studentElement.innerText += studentText.charAt(j)
        j++
        setTimeout(typingStudent, 100)
    }
}

setTimeout(typingDeveloper, 1000)
setTimeout(typingDesigner, 2800)
setTimeout(typingStudent, 4200)