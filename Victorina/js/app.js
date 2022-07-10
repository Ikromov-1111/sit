const questions = [
    {
        question: "Какой язык работает в браузере?",
        answers: ["Java", "C++", "Python", "JavaScript"],
        correct: 4,
    },

    {
        question: "Как переводиться слова Lose?",
        answers: [
            "Проиграть", 
            "Выиграть", 
            "Драться", 
            "Бегать"
        ],
        correct: 1,
    },

    {
        question: "Переводите слову Feel?",
        answers: [
            "Плохо", 
            "Бесконечно", 
            "Хорошо", 
            "Чувствовать"
        ],
        correct: 4,
    },

    {
        question: "Перводите слову Example?",
        answers: [
            "Говорить", 
            "Объяснить", 
            "Сказать", 
            "Видеть"
        ],
        correct: 2,
    },
    {
        question: "Рахматшо ты мрги ?",
        answers: [
            "Хо", 
            "Не", 
            "А бача бовари надори", 
            "Бги дега"
        ],
        correct: 2,
    },
];

// Находим элемент
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные игры
let score = 0; //кол-во правилных ответы
let questionIndex = 0; // Текуший вопрос
clearPage();
showQuestion();
submitBtn.onclick = chackedAnswer;

// Очишаем HTML разметку
function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}


// Отабразить вапрос 
function showQuestion() {

    // Question
    console.log('showQuestion');

    // Шаблон для загаловка 
    const headerTemplate = `<h2 class="title">%title%</h2>`;

    // Заменить title
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;

    // answers
    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) {

        const questionTemplate =
        `<li>
            <label>
                <input value ="%number%" type="radio" class="answer" name="answer">
                <span>%answer%</span>
            </label>
        </li>`

        // Значения с номером ответа 
        const answerHTML = questionTemplate
                                .replace('%answer%',answerText)
                                .replace('%number%', answerNumber);

        listContainer.innerHTML += answerHTML;
        answerNumber++;
    }
};

function chackedAnswer() {
    console.log('Start');

    // Находим выбраную радио кнопку 
    const chackedRadio = listContainer.querySelector('input[type="radio"]:checked');

    // Если ответ не выбрано - мы ничего не делаем выходим из функции
    if (!chackedRadio) {
        submitBtn.blur();
        return
    };


    // Узнаем номер ответа пользователья
    const userAnswer = parseInt(chackedRadio.value);

    // Если ответ верен увиличваем счет    
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }
        console.log('score = ', score);

    if (questionIndex !== questions.length - 1) {
        console.log('Это Не последний вапрос');
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    } 
    else {
        console.log('Это последний вапрос');
        clearPage();
        showResults();
    }
}


function showResults() {
    console.log('showResults started');
    console.log(score);

    const resultTemplate = `
    <h2 class="title">%title%</h2>
    <h2 class="summary">%message%</h2>
    <p class="result">%result%</p>
    `;

    let title, message;
    // Вариант загаловков и текста 
    if (score === questions.length) {
        title = 'Поздравляем!';
        message = 'Вы ответили на все вопросы!';
    }
    else if((score * 100)/ questions.length >= 50) {
        title = 'Не плохой ответ!';
        message = 'Вы ответили на более полавины вопросов';
    } 
    else {
        title = 'Стоит постараться';
        message = 'Пока у вас меньше половины правильных ответов';
    }

    // Результат 
    let result = `${score} из ${questions.length}`;

    // Финальный ответ подставляем данные в шаблон
    const finalMessage = resultTemplate
                            .replace('%title%', title)
                            .replace('%message%', message)
                            .replace('%result%', result);
    headerContainer.innerHTML = finalMessage;

    // Меняем кнопку на Начать занова
    submitBtn.blur();
    submitBtn.innerText = 'Начать заново';
    submitBtn.onclick = () => history.go();
}