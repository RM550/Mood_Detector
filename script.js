const questions = [
    {
        id: 'q1',
        text: '😊 How do you feel today?',
        options: ['Happy:🙂', 'Sad:😞', 'Angry:🤬', 'Anxious:😰', 'Calm:😌']
    },
    {
        id: 'q2',
        text: '😴 How was your sleep last night?',
        options: ['Good', 'Average', 'Bad']
    },
    {
        id: 'q3',
        text: '💪 How are you feeling physically?',
        options: ['Energetic', 'Tired', 'Sick']
    },
    {
        id: 'q4',
        text: '🍽️ Did you have a proper meal today?',
        options: ['Yes', 'No']
    },
    {
        id: 'q5',
        text: '🏃‍♂️ Did you get some exercise today?',
        options: ['Yes', 'No']
    }
];

let currentQuestionIndex = 0;
let answers = {};

document.addEventListener('DOMContentLoaded', function() {
    showQuestion();
});

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const html = `
            <div class="question">
                <label for="${question.id}">${question.text}</label>
                <select id="${question.id}">
                    ${question.options.map(option => `<option value="${option.toLowerCase()}">${option}</option>`).join('')}
                </select>
            </div>
            <button onclick="nextQuestion()">Next</button>
        `;
        questionContainer.innerHTML = html;
    } else {
        showResult();
    }
}

function nextQuestion() {
    const question = questions[currentQuestionIndex];
    const selectedOption = document.getElementById(question.id).value;
    answers[question.id] = selectedOption;

    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    const q1 = answers['q1'];
    const q2 = answers['q2'];
    const q3 = answers['q3'];
    const q4 = answers['q4'];
    const q5 = answers['q5'];

    let mood = '';

    if (q1 === 'happy' && q2 === 'good' && q3 === 'energetic' && q4 === 'yes' && q5 === 'yes') {
        mood = 'You are feeling great! Keep it up! 🌟';
    } else if (q1 === 'sad' || q2 === 'bad' || q3 === 'sick' || q4 === 'no' || q5 === 'no') {
        mood = 'You might be feeling down. Take care, and try to rest and eat well. 💖';
    } else if (q1 === 'angry') {
        mood = 'You seem to be angry. Try to relax and take deep breaths. 🧘‍♂️';
    } else if (q1 === 'anxious') {
        mood = 'You seem to be anxious. Take some time to calm down and breathe. 🌸';
    } else {
        mood = 'You are feeling calm and composed. Keep it up! 😊';
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerText = mood;
    resultDiv.classList.add('show');

    // Show the "Start Over" button
    const startOverBtn = document.getElementById('start-over-btn');
    startOverBtn.style.display = 'block';

    setTimeout(() => {
        askExerciseDetails();
    }, 2000);
}

function askExerciseDetails() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <div class="question">
            <label for="exercise-type">💪 What type of exercise did you do today?</label>
            <select id="exercise-type">
                <option value="cardio">Cardio</option>
                <option value="strength">Strength Training</option>
                <option value="yoga">Yoga</option>
                <option value="none">None</option>
            </select>
        </div>
        <button onclick="showExerciseTips()">Next</button>
    `;
}

function showExerciseTips() {
    const exerciseType = document.getElementById('exercise-type').value;
    let tips = '';

    if (exerciseType === 'cardio') {
        tips = 'Great job on doing cardio! Remember to stay hydrated and stretch properly. 🏃‍♂️💧';
    } else if (exerciseType === 'strength') {
        tips = 'Strength training is excellent! Ensure you use proper form to avoid injuries. 💪';
    } else if (exerciseType === 'yoga') {
        tips = 'Yoga is fantastic for relaxation and flexibility. Keep up the good work! 🧘‍♂️';
    } else {
        tips = 'Try to include some physical activity in your routine. It can boost your mood and energy levels. 🏋️‍♂️';
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerText = tips;
    resultDiv.classList.add('show');

    // Show the "Start Over" button
    const startOverBtn = document.getElementById('start-over-btn');
    startOverBtn.style.display = 'block';
}

function startOver() {
    currentQuestionIndex = 0;
    answers = {};
    document.getElementById('result').classList.remove('show');
    document.getElementById('start-over-btn').style.display = 'none';
    showQuestion();
}
