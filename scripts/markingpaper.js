
// 답안 항목들 배열
var questions = [
    {
        bShowAnswerImme: false,
        bShowCorrectImme: false,
        options: ["Option 1","Option 2","Option 3","Option 4"], // 현재는 사용 안 함
        nCorrectAnswer: 0
    },
];

var markingContainer = document.getElementById("markingContainer");
var userResponses = [];

let bShowAnswer = false;    // 정답 표시
let bShowCorrect = false;   // 체크한 문항이 정답인가 표시

//  var nSizeofQuestion = 100;  // 문항 갯수

const controller = new AbortController();
var btn = document.getElementById('btn202204');

btn.addEventListener('click', generateQuestaions, { signal: controller.signal });

// questions 정답 넣기

// 문제 정답들을 나열한 json을 읽는다
// 문제 정답 갯수만큼 questions 를 늘리고 정답을 넣어준다

// 문제 마킹 목록 생성
function generateQuestaions() {
    for( var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var questionElement = document.createElement("div");
        questionElement.innerHTML = "<p>"+ i +"</p>";

        for (var j = 0; j<question.options.length; j++) {
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

    controller.abort();
}


