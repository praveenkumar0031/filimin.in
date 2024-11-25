const quizData = [
    {//1
      question: 'What is the purpose of taxes in a society?',
      options: ["To increase government spending","To reduce income levels","To fund public services and government operations","To encourage consumer spending"],
      answer: "To fund public services and government operations"
    },
    {//2
      question: 'Which of the following is an example of a direct tax?',
      options: ['Sales tax', 'Property tax', 'Excise tax', 'Value-added tax (VAT)'],
      answer: 'Property tax'
    },
    {//3
      question: 'What is the purpose of withholding tax?',
      options: ['To encourage savings', 'To simplify tax filing', 'To provide tax credits', 'To collect taxes at the source'],
      answer: 'To collect taxes at the source'
    },
    {//4
      question: 'Which of the following is an example of an indirect tax?',
      options: ['Corporate tax', 'Property tax', 'Sales tax', 'Income tax'],
      answer: 'Sales tax'
    },
    {//5
      question: 'What is the purpose of tax deductions?',
      options: ['To increase tax liability', 'To reduce taxable income', 'To simplify tax calculations', 'To encourage tax evasion'],
      answer: 'To reduce taxable income'
    },
    {//6
      question: 'What is the difference between tax credits and tax deductions?',
      options: ['Tax credits reduce tax liability dollar for dollar, while tax deductions reduce taxable income.', 'Tax credits are only available to low-income individuals, while tax deductions are available to all taxpayers.', ') Tax credits are deducted from gross income, while tax deductions are deducted from taxable income.', 'Tax credits increase tax liability, while tax deductions decrease taxable income.'],
      answer: 'Tax credits reduce tax liability dollar for dollar, while tax deductions reduce taxable income.'
    },
    {//7
      question: 'What is the purpose of the progressive tax system?',
      options: ['To impose higher tax rates on low-income individuals', 'To impose higher tax rates on high-income individuals', 'To eliminate tax exemptions', 'To simplify tax calculations'],
      answer: 'To impose higher tax rates on low-income individuals'
    },
    {//8
      question: 'What is the difference between marginal tax rate and effective tax rate?',
      options: ['Marginal tax rate applies to total income, while effective tax rate applies to incremental income.','Marginal tax rate is the highest tax rate paid on any portion of income, while effective tax rate is the average tax rate paid on total income.','Marginal tax rate is fixed, while effective tax rate varies based on income level.','Marginal tax rate applies to deductions, while effective tax rate applies to credits.'],
      answer: 'Marginal tax rate is the highest tax rate paid on any portion of income, while effective tax rate is the average tax rate paid on total income.'
    },
    {//9
      question: 'What is the purpose of tax treaties between countries?',
      options: ['To increase tax rates','To facilitate tax evasion','To prevent double taxation','To eliminate tax credits'],
      answer: 'To prevent double taxation'
    },
    {//10
      question: 'What is the difference between tax evasion and tax avoidance?',
      options: ['Tax evasion is legal, while tax avoidance is illegal.','Tax evasion is encouraged by governments, while tax avoidance is discouraged.','Tax evasion only applies to corporations, while tax avoidance applies to individuals.','Tax evasion involves deliberately underreporting income or falsifying deductions to evade taxes, while tax avoidance involves using legal methods to minimize tax liability.'],
      answer: 'Tax evasion involves deliberately underreporting income or falsifying deductions to evade taxes, while tax avoidance involves using legal methods to minimize tax liability.'
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