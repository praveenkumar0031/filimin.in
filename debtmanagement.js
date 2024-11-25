const quizData = [
    {//1
      question: 'What is the first step in effective debt management?',
      options: ["Ignoring debt and hoping it goes away","Making only minimum payments on debts","Assessing and understanding your total debt obligations","Increasing debt by taking out additional loans"],
      answer: "Assessing and understanding your total debt obligations"
    },
    {//2
      question: 'Which of the following is a disadvantage of carrying high-interest debt?',
      options: ['Lower credit score', 'Reduced borrowing capacity', 'Increased savings potential', 'Higher total interest payments'],
      answer: 'Higher total interest payments'
    },
    {//3
      question: 'How can making more than the minimum payment on a debt affect your overall financial health?',
      options: ['It can decrease your credit score', 'It can lower your interest rate', 'It can shorten the time to pay off the debt','It can increase the total interest paid'],
      answer: 'It can shorten the time to pay off the debt'
    },
    {//4
      question: 'Which of the following debts typically has the highest interest rates?',
      options: ['Mortgage', 'Student loans', 'Auto loans', 'Credit card debt'],
      answer: 'Credit card debt'
    },
    {//5
      question: 'How does a debt consolidation loan work?',
      options: ['By transferring multiple debts into a single loan with a lower interest rate', 'By reducing the total amount owed', 'By increasing monthly payments', 'By eliminating the need to make payments'],
      answer: 'By transferring multiple debts into a single loan with a lower interest rate'
    },
    {//6
      question: 'What is the purpose of a debt repayment plan?',
      options: ['To establish a systematic approach to paying off debts', 'To avoid making payments on debts', 'To prioritize high-interest debt over low-interest debt', 'To increase total debt obligations'],
      answer: 'To establish a systematic approach to paying off debts'
    },
    {//7
      question: 'Which of the following is a key factor in determining your credit score?',
      options: ['Total annual income', 'Debt-to-income ratio', 'Number of debt accounts', 'Length of credit history'],
      answer: 'Length of credit history'
    },
    {//8
      question: 'How can negotiating with creditors help in debt management?',
      options: ['By increasing interest rates','By extending repayment terms','By reducing the total amount owed','By avoiding communication with creditors'],
      answer: 'By reducing the total amount owed'
    },
    {//9
      question: 'Which of the following strategies can help prevent accruing more debt?',
      options: ['Creating and sticking to a budget','Ignoring monthly statements','Using credit cards for everyday expenses','Applying for multiple loans simultaneously'],
      answer: 'Creating and sticking to a budget'
    },
    {//10
      question: 'What is the purpose of credit counseling in debt management?',
      options: ['To encourage overspending','To provide education on budgeting and debt management','To increase debt levels','To discourage communication with creditors'],
      answer: 'To provide education on budgeting and debt management'
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