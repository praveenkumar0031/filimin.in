const quizData = [
    {//1
      question: 'Which of the following is NOT a recommended step in creating a budget?',
      options: ["Tracking income and expenses","Setting specific financial goals","Saving money only after spending","Evaluating and adjusting the budget regularly"],
      answer: "Saving money only after spending"
    },
    {//2
      question: 'Which of the following is an essential step in creating a budget?',
      options: ['Setting unrealistic financial goals', 'Ignoring irregular expenses', 'Tracking income and expenses', 'Spending impulsively without tracking expenses'],
      answer: 'Tracking income and expenses'
    },
    {//3
      question: 'Which of the following is considered a short-term financial goal?',
      options: ['Buying a new house', 'Saving for retirement', 'Paying off credit card debt', 'Starting a college fund for your child'],
      answer: 'Paying off credit card debt'
    },
    {//4
      question: 'What is the primary purpose of an emergency fund?',
      options: ['Saving for vacations', 'Investing in stocks', 'Funding retirement', 'Covering unexpected expenses'],
      answer: 'Covering unexpected expenses'
    },
    {//5
      question: 'Which of the following statements about compound interest is true?',
      options: ['Compound interest is only calculated annually', 'Compound interest reduces the total amount of money earned over time', 'Compound interest is calculated on the initial principal only', 'Compound interest allows savings to grow faster over time'],
      answer: 'Compound interest allows savings to grow faster over time'
    },
    {//6
      question: 'What does the term "asset allocation" refer to in investing?',
      options: ['Timing the market to buy low and sell high', 'Diversifying investments across different asset classes', 'Investing in high-risk, high-reward stocks', 'Using leverage to increase investment returns'],
      answer: 'Diversifying investments across different asset classes'
    },
    {//7
      question: 'What is the purpose of a credit score?',
      options: ['To track your income and expenses', 'To determine your eligibility for a loan or credit card', 'To calculate your tax liability', 'To estimate your net worth'],
      answer: 'To determine your eligibility for a loan or credit card'
    },
    {//8
      question: 'Which of the following is NOT a type of retirement account?',
      options: ['401(k)','Traditional IRA','Roth IRA','Mutual fund'],
      answer: 'Mutual fund'
    },
    {//9
      question: 'What is the main advantage of a Roth IRA compared to a Traditional IRA?',
      options: ['Contributions are tax-deductible','Withdrawals are tax-free in retirement','There are no income limits for contributions','Withdrawals are subject to required minimum distributions (RMDs)'],
      answer: 'Withdrawals are tax-free in retirement'
    },
    {//10
      question: 'What is the first step in creating a budget?',
      options: ['Setting financial goals','Tracking income and expenses','Investing in stocks','Paying off debt'],
      answer: 'Setting financial goals'
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