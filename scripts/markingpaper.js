// 20230628
// edited 20230701

var questions = []; // 답안 항목들 배열

var markingContainer = document.getElementById("markingContainer");
var userResponses = [];

var bShowAnswer = false;    // 정답 표시
var bShowCorrect = false;   // 체크한 문항이 정답인가 표시

var btn = document.getElementById('btn202204');

btn.addEventListener('click', generateQuestions, { once: true });



// 파일에서 정답 읽기
// for (i = 0; i < data.question.length; i++) {
//     questions.push({
//         bShowAnswerImme: false,
//         bShowCorrectImme: false,
//         options: ["Option 1", "Option 2", "Option 3", "Option 4"], // 현재는 사용 안 함
//         nCorrectAnswer: data.question[i].answer
//     })
// }

// fetch('https://server.com/res/20220424.json')
// .then((response) => response.json())
// .then((json)=>console.log(json));

// import data from '../res/20220424.json' assert { type: 'json' };
// console.log(data);

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    };
    rawFile.send(null);
}

readTextFile("milktone.github.io/res/20220424.json");

// 답안체크 목록 생성
function generateQuestions() {

    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var questionElement = document.createElement("div");
        questionElement.innerHTML = "<p>" + i + "</p>";

        for (var j = 0; j < question.options.length; j++) {
            var optionElement = document.createElement("input");
            optionElement.type = "radio";
            optionElement.name = "question_" + i;
            optionElement.value = j;

            var labelElement = document.createElement("label");
            // 코드 맨 위 questions의 options 넣으려다가 그냥 번호만 넣음
            labelElement.innerHTML = j + 1;

            questionElement.appendChild(optionElement);
            questionElement.appendChild(labelElement);
        }

        markingContainer.appendChild(questionElement);
    }
}