// 20230628
// edited 20230701

var questions = []; // 답안 항목들 배열

var markingContainer = document.getElementById("markingContainer");
var userResponses = [];

var bShowAnswer = false;    // 정답 표시
var bShowCorrect = false;   // 체크한 문항이 정답인가 표시

var btn = document.getElementById('btn202204');

btn.addEventListener('click', generateQuestions, { once: true });


// fetch('https://server.com/res/20220424.json')
// .then((response) => response.json())
// .then((json)=>console.log(json));

// import data from '../res/20220424.json' assert { type: 'json' };
// console.log(data);

function readTextFile(file) {
    var text;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = ()=> {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {

                text = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
    return text;
}

// 답안체크 목록 생성
function generateQuestions() {
    var text = readTextFile("https://milktone.github.io/res/20220424.json")
    var answers = JSON.parse(text);

    //
    for (i = 0; i < answers.length; i++) {
        questions.push({
            bShowAnswerImme: false,
            bShowCorrectImme: false,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"], // 현재는 사용 안 함
            nCorrectAnswer: answers[i]
        })
    }
    //

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
            labelElement.innerHTML = j + 1; // 라디오 버튼 1, 2, 3, 4... 숫자 쓰는 거

            questionElement.appendChild(optionElement);
            questionElement.appendChild(labelElement);
        }

        markingContainer.appendChild(questionElement);
    }
}