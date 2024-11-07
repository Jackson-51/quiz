let currentQuestionIndex = 0;
let score = 0;
let obj = [];
let correction = [];
let questions;

document.addEventListener('DOMContentLoaded', async () => {
    let username = localStorage.getItem('username');
    document.querySelector('.popup h2').textContent = `Welcome to quiz ${JSON.parse(username)}!`
    document.querySelector('.container').classList.add('slide');

    setTimeout(() => {
        document.querySelector('.popup').style.top = "0px";
        document.querySelector('.popup').style.opacity = 0;
    }, 2000);

   await fetch('question_bank.json')
    .then(res => res.json())
    .then(data => {
        questions = data;
        display_question();
        console.log(document.querySelector('.container').innerHTML)
    });
})

const question_box =document.getElementById('question');
const answer_box = document.getElementById('answer_section');
const number = document.querySelector('#q_num');

function display_question(){

    answer_box.innerHTML = '';
    const currentQuestion = questions[currentQuestionIndex];
    question_box.textContent = currentQuestion.question;
    number.textContent = currentQuestion.number;

    currentQuestion.option.forEach(opt => {
        const opt_container = document.createElement('div');
        const opt_value = document.createTextNode(opt);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = opt;
        checkbox.addEventListener('click', handlecheckbox);

        opt_container.append(checkbox, opt_value);

        answer_box.appendChild(opt_container);
    });
    MathJax.typesetPromise();
}


function checkanswer(){
    const all_checkbox = document.querySelectorAll('input[type="checkbox"]');
    let user_answer = ''
    all_checkbox.forEach(marked => {
        if(marked.checked){
            user_answer = marked.value;
        }
    });

    if(user_answer === questions[currentQuestionIndex].answer){
        correction = [...correction, {right: currentQuestionIndex,
             corr_opt: questions[currentQuestionIndex].answer}];
        return true;
    }
    else{
        correction = [...correction, {wrong: currentQuestionIndex,
            corr_opt: questions[currentQuestionIndex].answer,
            choosed: user_answer
        }];
        return false;
    }
}


document.getElementById('next_btn').addEventListener('click', next);
function next() {
    if (checkanswer()){
        score++;
        obj = [...obj, {num:score , currentI : currentQuestionIndex}]
    }
    else{
        obj = [...obj, {num:null , currentI: currentQuestionIndex}]
    }

    currentQuestionIndex++;
    if(currentQuestionIndex > questions.length - 1){
        currentQuestionIndex = questions.length - 1;
        document.querySelector('.btngroup').classList.add('toggle');
        document.querySelector('#prev_btn').disabled = true;
    }

    else if(currentQuestionIndex === questions.length - 1){
        document.querySelector(".message").textContent = 'last question';
        document.getElementById("next_btn").classList.add('green');
        document.querySelector(".question_section").classList.add('color');
    }
    display_question();
}

document.getElementById('prev_btn').addEventListener('click', prev);
function prev() {
    currentQuestionIndex--;
    if(currentQuestionIndex < 0){
        currentQuestionIndex = 0;
    }
    let cod = obj.at(-1);
    if (Number.isInteger(cod.num)) {
        score = (score > 0)? score - 1 : 0;
    }
    if(currentQuestionIndex < questions.length - 1){
        document.querySelector(".message").textContent = ' ';
        document.getElementById("next_btn").classList.remove('green');
        document.querySelector(".question_section").classList.remove('color');
    }
    correction.pop()
    display_question()
}

document.getElementById('submit_btn').addEventListener('click', submit);
function submit() {
    let face = document.querySelector('main');
    face.innerHTML = '';

    let result = document.querySelector('.result');
    result.classList.add('display');

    const delay = setTimeout(() => {
        document.querySelector('.loader span').classList.add('span');
        document.querySelector(".loader span").style.backgroundColor = 
        (score >= questions.length/2)? '#10af40' : 'red';
        document.querySelector('.loader i').id = '';
        document.querySelector('.loading').classList.add('appear');

        document.querySelector('.loading h3').innerHTML = `${score}/${questions.length}`;
    }, 2000);

    window.localStorage.setItem('correction', JSON.stringify(correction));
}


function handlecheckbox() { 
    const answerbox = document.querySelectorAll('div input');
    answerbox.forEach(box => {
        if (box !== this) {
            box.checked = false;
        }
    });
 }

function recurr() {
    localStorage.clear();
    location.reload()
}