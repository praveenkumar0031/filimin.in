const quizData = [
    {//1
      question: 'What is the primary purpose of investing?',
      options: ["To increase debt","To save for short-term expenses","To generate wealth over the long term","To spend money on luxury items"],
      answer: "To generate wealth over the long term"
    },
    {//2
      question: 'Which of the following investment vehicles typically offers the highest potential returns?',
      options: ['Stocks', 'Savings accounts', 'Government bonds', 'Certificates of deposit (CDs)'],
      answer: 'Stocks'
    },
    {//3
      question: 'What is diversification in investment?',
      options: ['Spreading investments across different asset classes and securities', 'Investing in a single asset class', 'Concentrating investments in a specific sector', 'Investing only in low-risk assets'],
      answer: 'Spreading investments across different asset classes and securities'
    },
    {//4
      question: 'How does compound interest benefit investors?',
      options: ['By reducing investment returns', 'By lowering the value of investments', 'By providing guaranteed returns', 'By increasing the purchasing power of money over time'],
      answer: 'By increasing the purchasing power of money over time'
    },
    {//5
      question: 'What is the role of risk tolerance in investment decisions?',
      options: ['It determines the level of investment returns', 'It dictates the types of investments suitable for an individual', 'It guarantees investment success', 'It eliminates the need for diversification'],
      answer: 'It dictates the types of investments suitable for an individual'
    },
    {//6
      question: 'Which of the following investment strategies aims to buy and hold investments for the long term?',
      options: ['Day trading', 'Value investing', 'Market timing', 'Swing trading'],
      answer: 'Value investing'
    },
    {//7
      question: 'What is dollar-cost averaging?',
      options: ['Investing a fixed amount of money at regular intervals, regardless of market conditions', 'Selling investments at a predetermined price', 'Buying and selling investments based on short-term price movements', 'Investing only in high-risk assets'],
      answer: 'Investing a fixed amount of money at regular intervals, regardless of market conditions'
    },
    {//8
      question: 'How does inflation impact investment returns?',
      options: ['It has no effect on investment returns','It guarantees higher investment returns','It lowers investment risk','It reduces the purchasing power of investment returns over time'],
      answer: 'It reduces the purchasing power of investment returns over time'
    },
    {//9
      question: 'What is an exchange-traded fund (ETF)?',
      options: ['A type of bank account','A type of individual retirement account (IRA)','An investment fund traded on stock exchanges, representing a basket of securities','A type of real estate investment'],
      answer: 'An investment fund traded on stock exchanges, representing a basket of securities'
    },
    {//10
      question: 'What is a mutual fund?',
      options: ['An investment vehicle that pools money from multiple investors to invest in a diversified portfolio of securities','A type of retirement account','A type of individual stock',' A type of savings account'],
      answer: 'An investment vehicle that pools money from multiple investors to invest in a diversified portfolio of securities'
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