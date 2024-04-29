let questionsState = {};
let result = 0;
let questions = [
  {
    number: 1,
    question: "I'm sorry - I didn't ...... to disturb you.",
    answers: {
      a: "hope",
      b: "think",
      c: "mean",
      d: "suppose"
    },
    correctAnswer: "c"
  },
  {
    number: 2,
    question: " Would you mind ...... these plates a wipe before putting them in the cupboard?",
    answers: {
      a: "making",
      b: "doing",
      c: "getting",
      d: "giving"
    },
    correctAnswer: "d"
  },
  {
    number: 3,
    question: "Once the plane is in the air, you can ...... your seat belts if you wish.",
    answers: {
      a: "undress",
      b: "unfasten",
      c: "unlock",
      d: "untie"
    },
    correctAnswer: "b"
  }
];
let currentQuestionIndex = 0;
let availableQuestions = [...questions];
let questionsAnswered = 0;

saveCurrentQuestion = () => {
  questionsState[currentQuestionIndex] = {
    number: availableQuestions[currentQuestionIndex].number,
    question:  availableQuestions[currentQuestionIndex].question,
    answers: availableQuestions[currentQuestionIndex].answers,
    correctAnswer: availableQuestions[currentQuestionIndex].correctAnswer,
    selectedAnswer: false
  };
}

showQuiz = () => {
  document.getElementById('questionsNumber').textContent = availableQuestions.length;
  saveCurrentQuestion(availableQuestions, currentQuestionIndex);
  loadQuestion(currentQuestionIndex);
};

function lockForm() {
  const form = document.getElementById('myForm');
  form.querySelector('input[type="submit"], button[type="submit"]').style.display = 'none';

  const inputs = document.querySelectorAll('input[name="answer"]');
  inputs.forEach(input => {
    input.disabled = true;
  });
}

function unLockForm() {
  const form = document.getElementById('myForm');
  form.querySelector('input[type="submit"], button[type="submit"]').style.display = 'block';

  const inputs = document.querySelectorAll('input[name="answer"]');
  inputs.forEach(input => {
    input.disabled = false;
  });
}

loadQuestion = (index) => {
  if (questionsState[currentQuestionIndex].selectedAnswer) {
    resetForm();
  } else {
    resetForm();
  }
  document.getElementById('questionNumber').textContent = availableQuestions[currentQuestionIndex].number;
  document.getElementById('question').textContent = availableQuestions[currentQuestionIndex].question;
  document.getElementById('label-a').textContent = availableQuestions[currentQuestionIndex].answers.a;
  document.getElementById('label-b').textContent = availableQuestions[currentQuestionIndex].answers.b;
  document.getElementById('label-c').textContent = availableQuestions[currentQuestionIndex].answers.c;
  document.getElementById('label-d').textContent = availableQuestions[currentQuestionIndex].answers.d;

  if (questionsState[currentQuestionIndex].selectedAnswer !== false) {
    lockForm();
    document.getElementById(questionsState[currentQuestionIndex].selectedAnswer).checked = true;
    document.getElementById(questionsState[currentQuestionIndex].correctAnswer).closest('div').style.backgroundColor = '#29CB88';
    if (questionsState[currentQuestionIndex].selectedAnswer !== questionsState[currentQuestionIndex].correctAnswer) {
      document.getElementById(questionsState[currentQuestionIndex].selectedAnswer).closest('div').style.backgroundColor = '#EF4949';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const inputs = document.querySelectorAll('.input-button .hidden-radio');

  form.addEventListener('submit', (event) => {
    questionsAnswered++;
    event.preventDefault();
    lockForm();

    inputs.forEach(input => {
      const parentDiv = input.closest('div');
      if (input.checked && questionsState[currentQuestionIndex].correctAnswer === input.value) {
        result++;
        questionsState[currentQuestionIndex].selectedAnswer  = input.value;
        parentDiv.style.backgroundColor = '#29CB88';
      } else {
        if (input.checked) {
          questionsState[currentQuestionIndex].selectedAnswer  = input.value;
          parentDiv.style.backgroundColor = '#EF4949';
        } else if (questionsState[currentQuestionIndex].correctAnswer === input.value) {
          parentDiv.style.backgroundColor = '#29CB88';
        }
      }
    });
  });
});

nextQuestion = () => {
  if  ((questionsAnswered === availableQuestions.length)) {
    showResult();
  } else if (currentQuestionIndex === availableQuestions.length - 1){
    document.getElementById(`button-next`).disabled  = true;
  } else {
    currentQuestionIndex++;
    if (questionsState[currentQuestionIndex] === undefined) {
      saveCurrentQuestion(availableQuestions, currentQuestionIndex);
    }
    loadQuestion(currentQuestionIndex);
  }
}

backQuestion = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
}

showResult = () => {
  const allQuestions = availableQuestions.length;
  document.getElementById('result').textContent = result;
  document.getElementById('allQuestions').textContent = allQuestions;
  document.querySelector('.quiz-container').style.display = 'none';
  document.querySelector('.quiz-result').style.display = 'block';
}

resetForm = () => {
  const form = document.getElementById('myForm');
  form.reset();
  unLockForm();
  const allAnswerDivs = form.querySelectorAll('.input-button');
  allAnswerDivs.forEach(div => {
    div.style.backgroundColor = '';
  });
  unLockForm();
}

playAgain = () => {
  questionsState = {};
  currentQuestionIndex = 0;
  questionsAnswered = 0;
  result = 0;
  document.querySelector('.quiz-container').style.display = 'block';
  document.querySelector('.quiz-result').style.display = 'none';
  showQuiz();
}

showQuiz();


