// 20230628
// edited 20230701

var sText; // readTextFile 읽은 값 저장용

var questions = []; // 답안 항목들 배열

var markingContainer = document.getElementById("markingContainer");
var userResponses = [];
var checkResults = [];
var ResultText;

var bShowAnswer = false;    // 정답 표시
var bShowCorrect = false;   // 체크한 문항이 정답인가 표시

var btn = document.getElementById('btn202204');

btn.addEventListener('click',
    () => generateQuestions("https://milktone.github.io/res/20220424.json"),
    { once: true });


// fetch('https://server.com/res/20220424.json')
// .then((response) => response.json())
// .then((json)=>console.log(json));

// import data from '../res/20220424.json' assert { type: 'json' };
// console.log(data);

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                sText = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
}

// 답안 목록 생성
function generateQuestions(sSource) {

    // #region  서버에서 정답목록을 가져옵니다
    readTextFile(sSource)
    let answers = JSON.parse(sText); // answers.question[].answer: , answers.question[n].answer: .....
    // #endregion

    questions = [];
    //
    for (i = 0; i < answers.question.length; i++) {
        questions.push({
            bShowAnswerImme: false,
            bShowCorrectImme: false,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            nCorrectAnswer: answers.question[i].answer
        })
        checkResults.push(null);
    }
    //

    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var questionElement = document.createElement("div");
        questionElement.innerHTML = i + 1 + "번: "; // 문제는 1번부터 시작하니 1을 더해줍니다

        for (var j = 0; j < question.options.length; j++) {
            var optionElement = document.createElement("input");
            optionElement.type = "radio";
            optionElement.name = "question_" + i;
            optionElement.value = j;

            var labelElement = document.createElement("label");
            labelElement.innerHTML = j + 1;

            questionElement.appendChild(optionElement);
            questionElement.appendChild(labelElement);
        }

        markingContainer.appendChild(questionElement);

    }

    //
    var submitbtn = document.createElement("button");
    submitbtn.innerHTML = "채점";
    markingContainer.appendChild(submitbtn);
    submitbtn.addEventListener("click", handleSubmit);
    //
}

//
function handleSubmit() {
    for (var i = 0; i < questions.length; i++) {
        // 같은이름의 라디오버튼 중 체크되어 있는 엘리먼트가 있다면 가져옵니다
        var selectedOption = document.querySelector('input[name="question_' + i + '"]:checked');

        if (selectedOption) {
            userResponses.push(parseInt(selectedOption.value));
        } else {
            userResponses.push(null);   // 가져오지 못했다면 undefined 일테니 빈 값을 넣습니다
        }
    }

    // 어떤 식으로 결과를 보여줄까?
    // 평균점수를 보여주자 일단
    evaluateTest();
    displayResults();
}

function evaluateTest() {

    for (var i = 0; i < questions.length; i++) {
        if (userResponses[i] === questions[i].nCorrectAnswer) {
            checkResults[i] = true;
        }
    }
}

function displayResults() {
    let score = 0;
    for (var i = 0; i < checkResults.length; i++) {
        if (checkResults[i]) {
            score = score + 5;
        }
    }
    
    ResultText.remove();
    ResultText = document.createElement("div")
    ResultText.innerHTML = checkResults.length + "문항 평균 점수:" + score / (checkResults.length + 1);
    markingContainer.appendChild(ResultText);
}