const quizData = [
    {//1
      question: 'What is the purpose of saving money?',
      options: ["To spend on luxury items","To invest in high risk assets","To cover unexpected expenses or achieve financial goals","To increse debt"],
      answer: "To cover unexpected expenses or achieve financial goals"
    },
    {//2
      question: 'Which of the following is a recommended guideline for saving?',
      options: ['Saving only what is left after spending', 'Saving a fixed amount each month', 'Saving sporadically when extra money is available', 'Saving without setting financial goals'],
      answer: 'Saving a fixed amount each month'
    },
    {//3
      question: 'What is the purpose of an emergency fund?',
      options: ['To invest in high-risk assets for quick returns', 'To cover unexpected expenses or loss of income', 'To fund luxurious purchases','To pay off credit card debt'],
      answer: 'To cover unexpected expenses or loss of income'
    },
    {//4
      question: 'Which of the following is a characteristic of a high-yield savings account?',
      options: ['Low interest rates', 'Limited liquidity', 'High minimum balance requirements', 'Competitive interest rates'],
      answer: 'Competitive interest rates'
    },
    {//5
      question: 'When is it advisable to dip into your savings?',
      options: ['To finance impulse purchases', 'To cover planned expenses', 'To maintain a lavish lifestyle', 'To avoid budgeting'],
      answer: 'To cover planned expenses'
    },
    {//6
      question: 'Which of the following best describes the concept of "pay yourself first"?',
      options: ['Prioritizing personal spending over bills and expenses', 'Saving a portion of income before paying bills and expenses', 'Investing in high-risk assets before other financial obligations', 'Spending all income on personal wants and desires'],
      answer: 'Saving a portion of income before paying bills and expenses'
    },
    {//7
      question: 'What is the purpose of setting savings goals?',
      options: ['To limit spending on unnecessary items', 'To track income and expenses', 'To establish a timeline for financial milestones', 'To increase debt'],
      answer: 'To establish a timeline for financial milestones'
    },
    {//8
      question: 'Which of the following is a potential consequence of not saving for retirement?',
      options: ['Lowering current standard of living','Higher credit card debt','Decreased job satisfaction','Increased spending on luxury items'],
      answer: 'Lowering current standard of living'
    },
    {//9
      question: 'How can automating savings contribute to financial goals?',
      options: ['By reducing overall income','By increasing spending on non-essentials','By consistently saving a portion of income without effort','Withdrawals are subject to required minimum distributions (RMDs)'],
      answer: 'By consistently saving a portion of income without effort'
    },
    {//10
      question: 'What is the purpose of a sinking fund?',
      options: ['To finance impulsive purchases','To invest in high-risk assets','To save for specific future expenses','To pay off credit card debt'],
      answer: 'To save for specific future expenses'
    }
  ];
  
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const submitButton = document.getElementById('tryagain');
  const backButton = document.getElementById('back');
  const resultElement = document.getElementById('result');
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent =(currentQuestionIndex+1)+'.'+ currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  }
  
  function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      score++;
      //selectedOption.style.backgroundcolor='green';
      resultElement.textContent = 'Correct answer!';
    } else {
      resultElement.textContent = 'Wrong answer!'+ 'correct answer:'+currentQuestion.answer;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }
  
  function showScore() {
    if(score<=5){
      questionElement.textContent='You have scored less marks  please try again the quiz '+score+' OUT OF '+quizData.length;
    }
    else{
      questionElement.textContent="CONJRATS YOU HAVE PASSED THE TEST .. CONTINUE FOR NEXT TEST "+score+' OUT OF '+quizData.length;
    }
    optionsElement.innerHTML = '';
    submitButton.style.display = 'inline';
    backButton.style.display='inline';
    resultElement.textContent = '';
  }
  
  loadQuestion();