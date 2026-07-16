// src/data/quizData.js
// All quiz question banks in one place.
// Each quiz has 10 questions matching the original JS files exactly,
// with one fix: taxesQuiz Q7 answer corrected from "low-income" → "high-income".

export const budgetingQuiz = [
  {
    question: 'Which of the following is NOT a recommended step in creating a budget?',
    options: [
      'Tracking income and expenses',
      'Setting specific financial goals',
      'Saving money only after spending',
      'Evaluating and adjusting the budget regularly',
    ],
    answer: 'Saving money only after spending',
  },
  {
    question: 'Which of the following is an essential step in creating a budget?',
    options: [
      'Setting unrealistic financial goals',
      'Ignoring irregular expenses',
      'Tracking income and expenses',
      'Spending impulsively without tracking expenses',
    ],
    answer: 'Tracking income and expenses',
  },
  {
    question: 'Which of the following is considered a short-term financial goal?',
    options: [
      'Buying a new house',
      'Saving for retirement',
      'Paying off credit card debt',
      'Starting a college fund for your child',
    ],
    answer: 'Paying off credit card debt',
  },
  {
    question: 'What is the primary purpose of an emergency fund?',
    options: [
      'Saving for vacations',
      'Investing in stocks',
      'Funding retirement',
      'Covering unexpected expenses',
    ],
    answer: 'Covering unexpected expenses',
  },
  {
    question: 'Which of the following statements about compound interest is true?',
    options: [
      'Compound interest is only calculated annually',
      'Compound interest reduces the total amount of money earned over time',
      'Compound interest is calculated on the initial principal only',
      'Compound interest allows savings to grow faster over time',
    ],
    answer: 'Compound interest allows savings to grow faster over time',
  },
  {
    question: 'What does the term "asset allocation" refer to in investing?',
    options: [
      'Timing the market to buy low and sell high',
      'Diversifying investments across different asset classes',
      'Investing in high-risk, high-reward stocks',
      'Using leverage to increase investment returns',
    ],
    answer: 'Diversifying investments across different asset classes',
  },
  {
    question: 'What is the purpose of a credit score?',
    options: [
      'To track your income and expenses',
      'To determine your eligibility for a loan or credit card',
      'To calculate your tax liability',
      'To estimate your net worth',
    ],
    answer: 'To determine your eligibility for a loan or credit card',
  },
  {
    question: 'Which of the following is NOT a type of retirement account?',
    options: ['401(k)', 'Traditional IRA', 'Roth IRA', 'Mutual fund'],
    answer: 'Mutual fund',
  },
  {
    question: 'What is the main advantage of a Roth IRA compared to a Traditional IRA?',
    options: [
      'Contributions are tax-deductible',
      'Withdrawals are tax-free in retirement',
      'There are no income limits for contributions',
      'Withdrawals are subject to required minimum distributions (RMDs)',
    ],
    answer: 'Withdrawals are tax-free in retirement',
  },
  {
    question: 'What is the first step in creating a budget?',
    options: [
      'Setting financial goals',
      'Tracking income and expenses',
      'Investing in stocks',
      'Paying off debt',
    ],
    answer: 'Setting financial goals',
  },
];

export const savingQuiz = [
  {
    question: 'What is the purpose of saving money?',
    options: [
      'To spend on luxury items',
      'To invest in high risk assets',
      'To cover unexpected expenses or achieve financial goals',
      'To increase debt',
    ],
    answer: 'To cover unexpected expenses or achieve financial goals',
  },
  {
    question: 'Which of the following is a recommended guideline for saving?',
    options: [
      'Saving only what is left after spending',
      'Saving a fixed amount each month',
      'Saving sporadically when extra money is available',
      'Saving without setting financial goals',
    ],
    answer: 'Saving a fixed amount each month',
  },
  {
    question: 'What is the purpose of an emergency fund?',
    options: [
      'To invest in high-risk assets for quick returns',
      'To cover unexpected expenses or loss of income',
      'To fund luxurious purchases',
      'To pay off credit card debt',
    ],
    answer: 'To cover unexpected expenses or loss of income',
  },
  {
    question: 'Which of the following is a characteristic of a high-yield savings account?',
    options: [
      'Low interest rates',
      'Limited liquidity',
      'High minimum balance requirements',
      'Competitive interest rates',
    ],
    answer: 'Competitive interest rates',
  },
  {
    question: 'When is it advisable to dip into your savings?',
    options: [
      'To finance impulse purchases',
      'To cover planned expenses',
      'To maintain a lavish lifestyle',
      'To avoid budgeting',
    ],
    answer: 'To cover planned expenses',
  },
  {
    question: 'Which of the following best describes the concept of "pay yourself first"?',
    options: [
      'Prioritizing personal spending over bills and expenses',
      'Saving a portion of income before paying bills and expenses',
      'Investing in high-risk assets before other financial obligations',
      'Spending all income on personal wants and desires',
    ],
    answer: 'Saving a portion of income before paying bills and expenses',
  },
  {
    question: 'What is the purpose of setting savings goals?',
    options: [
      'To limit spending on unnecessary items',
      'To track income and expenses',
      'To establish a timeline for financial milestones',
      'To increase debt',
    ],
    answer: 'To establish a timeline for financial milestones',
  },
  {
    question: 'Which of the following is a potential consequence of not saving for retirement?',
    options: [
      'Lowering current standard of living',
      'Higher credit card debt',
      'Decreased job satisfaction',
      'Increased spending on luxury items',
    ],
    answer: 'Lowering current standard of living',
  },
  {
    question: 'How can automating savings contribute to financial goals?',
    options: [
      'By reducing overall income',
      'By increasing spending on non-essentials',
      'By consistently saving a portion of income without effort',
      'Withdrawals are subject to required minimum distributions (RMDs)',
    ],
    answer: 'By consistently saving a portion of income without effort',
  },
  {
    question: 'What is the purpose of a sinking fund?',
    options: [
      'To finance impulsive purchases',
      'To invest in high-risk assets',
      'To save for specific future expenses',
      'To pay off credit card debt',
    ],
    answer: 'To save for specific future expenses',
  },
];

export const debtManagementQuiz = [
  {
    question: 'What is the first step in effective debt management?',
    options: [
      'Ignoring debt and hoping it goes away',
      'Making only minimum payments on debts',
      'Assessing and understanding your total debt obligations',
      'Increasing debt by taking out additional loans',
    ],
    answer: 'Assessing and understanding your total debt obligations',
  },
  {
    question: 'Which of the following is a disadvantage of carrying high-interest debt?',
    options: [
      'Lower credit score',
      'Reduced borrowing capacity',
      'Increased savings potential',
      'Higher total interest payments',
    ],
    answer: 'Higher total interest payments',
  },
  {
    question: 'How can making more than the minimum payment on a debt affect your overall financial health?',
    options: [
      'It can decrease your credit score',
      'It can lower your interest rate',
      'It can shorten the time to pay off the debt',
      'It can increase the total interest paid',
    ],
    answer: 'It can shorten the time to pay off the debt',
  },
  {
    question: 'Which of the following debts typically has the highest interest rates?',
    options: ['Mortgage', 'Student loans', 'Auto loans', 'Credit card debt'],
    answer: 'Credit card debt',
  },
  {
    question: 'How does a debt consolidation loan work?',
    options: [
      'By transferring multiple debts into a single loan with a lower interest rate',
      'By reducing the total amount owed',
      'By increasing monthly payments',
      'By eliminating the need to make payments',
    ],
    answer: 'By transferring multiple debts into a single loan with a lower interest rate',
  },
  {
    question: 'What is the purpose of a debt repayment plan?',
    options: [
      'To establish a systematic approach to paying off debts',
      'To avoid making payments on debts',
      'To prioritize high-interest debt over low-interest debt',
      'To increase total debt obligations',
    ],
    answer: 'To establish a systematic approach to paying off debts',
  },
  {
    question: 'Which of the following is a key factor in determining your credit score?',
    options: [
      'Total annual income',
      'Debt-to-income ratio',
      'Number of debt accounts',
      'Length of credit history',
    ],
    answer: 'Length of credit history',
  },
  {
    question: 'How can negotiating with creditors help in debt management?',
    options: [
      'By increasing interest rates',
      'By extending repayment terms',
      'By reducing the total amount owed',
      'By avoiding communication with creditors',
    ],
    answer: 'By reducing the total amount owed',
  },
  {
    question: 'Which of the following strategies can help prevent accruing more debt?',
    options: [
      'Creating and sticking to a budget',
      'Ignoring monthly statements',
      'Using credit cards for everyday expenses',
      'Applying for multiple loans simultaneously',
    ],
    answer: 'Creating and sticking to a budget',
  },
  {
    question: 'What is the purpose of credit counseling in debt management?',
    options: [
      'To encourage overspending',
      'To provide education on budgeting and debt management',
      'To increase debt levels',
      'To discourage communication with creditors',
    ],
    answer: 'To provide education on budgeting and debt management',
  },
];

export const investingQuiz = [
  {
    question: 'What is the primary purpose of investing?',
    options: [
      'To increase debt',
      'To save for short-term expenses',
      'To generate wealth over the long term',
      'To spend money on luxury items',
    ],
    answer: 'To generate wealth over the long term',
  },
  {
    question: 'Which of the following investment vehicles typically offers the highest potential returns?',
    options: ['Stocks', 'Savings accounts', 'Government bonds', 'Certificates of deposit (CDs)'],
    answer: 'Stocks',
  },
  {
    question: 'What is diversification in investment?',
    options: [
      'Spreading investments across different asset classes and securities',
      'Investing in a single asset class',
      'Concentrating investments in a specific sector',
      'Investing only in low-risk assets',
    ],
    answer: 'Spreading investments across different asset classes and securities',
  },
  {
    question: 'How does compound interest benefit investors?',
    options: [
      'By reducing investment returns',
      'By lowering the value of investments',
      'By providing guaranteed returns',
      'By increasing the purchasing power of money over time',
    ],
    answer: 'By increasing the purchasing power of money over time',
  },
  {
    question: 'What is the role of risk tolerance in investment decisions?',
    options: [
      'It determines the level of investment returns',
      'It dictates the types of investments suitable for an individual',
      'It guarantees investment success',
      'It eliminates the need for diversification',
    ],
    answer: 'It dictates the types of investments suitable for an individual',
  },
  {
    question: 'Which of the following investment strategies aims to buy and hold investments for the long term?',
    options: ['Day trading', 'Value investing', 'Market timing', 'Swing trading'],
    answer: 'Value investing',
  },
  {
    question: 'What is dollar-cost averaging?',
    options: [
      'Investing a fixed amount of money at regular intervals, regardless of market conditions',
      'Selling investments at a predetermined price',
      'Buying and selling investments based on short-term price movements',
      'Investing only in high-risk assets',
    ],
    answer: 'Investing a fixed amount of money at regular intervals, regardless of market conditions',
  },
  {
    question: 'How does inflation impact investment returns?',
    options: [
      'It has no effect on investment returns',
      'It guarantees higher investment returns',
      'It lowers investment risk',
      'It reduces the purchasing power of investment returns over time',
    ],
    answer: 'It reduces the purchasing power of investment returns over time',
  },
  {
    question: 'What is an exchange-traded fund (ETF)?',
    options: [
      'A type of bank account',
      'A type of individual retirement account (IRA)',
      'An investment fund traded on stock exchanges, representing a basket of securities',
      'A type of real estate investment',
    ],
    answer: 'An investment fund traded on stock exchanges, representing a basket of securities',
  },
  {
    question: 'What is a mutual fund?',
    options: [
      'An investment vehicle that pools money from multiple investors to invest in a diversified portfolio of securities',
      'A type of retirement account',
      'A type of individual stock',
      'A type of savings account',
    ],
    answer: 'An investment vehicle that pools money from multiple investors to invest in a diversified portfolio of securities',
  },
];

export const taxesQuiz = [
  {
    question: 'What is the purpose of taxes in a society?',
    options: [
      'To increase government spending',
      'To reduce income levels',
      'To fund public services and government operations',
      'To encourage consumer spending',
    ],
    answer: 'To fund public services and government operations',
  },
  {
    question: 'Which of the following is an example of a direct tax?',
    options: ['Sales tax', 'Property tax', 'Excise tax', 'Value-added tax (VAT)'],
    answer: 'Property tax',
  },
  {
    question: 'What is the purpose of withholding tax?',
    options: [
      'To encourage savings',
      'To simplify tax filing',
      'To provide tax credits',
      'To collect taxes at the source',
    ],
    answer: 'To collect taxes at the source',
  },
  {
    question: 'Which of the following is an example of an indirect tax?',
    options: ['Corporate tax', 'Property tax', 'Sales tax', 'Income tax'],
    answer: 'Sales tax',
  },
  {
    question: 'What is the purpose of tax deductions?',
    options: [
      'To increase tax liability',
      'To reduce taxable income',
      'To simplify tax calculations',
      'To encourage tax evasion',
    ],
    answer: 'To reduce taxable income',
  },
  {
    question: 'What is the difference between tax credits and tax deductions?',
    options: [
      'Tax credits reduce tax liability dollar for dollar, while tax deductions reduce taxable income.',
      'Tax credits are only available to low-income individuals, while tax deductions are available to all taxpayers.',
      'Tax credits are deducted from gross income, while tax deductions are deducted from taxable income.',
      'Tax credits increase tax liability, while tax deductions decrease taxable income.',
    ],
    answer: 'Tax credits reduce tax liability dollar for dollar, while tax deductions reduce taxable income.',
  },
  {
    // BUG FIX: Original taxesquiz.js had "low-income" — correct answer is "high-income"
    question: 'What is the purpose of the progressive tax system?',
    options: [
      'To impose higher tax rates on low-income individuals',
      'To impose higher tax rates on high-income individuals',
      'To eliminate tax exemptions',
      'To simplify tax calculations',
    ],
    answer: 'To impose higher tax rates on high-income individuals',
  },
  {
    question: 'What is the difference between marginal tax rate and effective tax rate?',
    options: [
      'Marginal tax rate applies to total income, while effective tax rate applies to incremental income.',
      'Marginal tax rate is the highest tax rate paid on any portion of income, while effective tax rate is the average tax rate paid on total income.',
      'Marginal tax rate is fixed, while effective tax rate varies based on income level.',
      'Marginal tax rate applies to deductions, while effective tax rate applies to credits.',
    ],
    answer: 'Marginal tax rate is the highest tax rate paid on any portion of income, while effective tax rate is the average tax rate paid on total income.',
  },
  {
    question: 'What is the purpose of tax treaties between countries?',
    options: [
      'To increase tax rates',
      'To facilitate tax evasion',
      'To prevent double taxation',
      'To eliminate tax credits',
    ],
    answer: 'To prevent double taxation',
  },
  {
    question: 'What is the difference between tax evasion and tax avoidance?',
    options: [
      'Tax evasion is legal, while tax avoidance is illegal.',
      'Tax evasion is encouraged by governments, while tax avoidance is discouraged.',
      'Tax evasion only applies to corporations, while tax avoidance applies to individuals.',
      'Tax evasion involves deliberately underreporting income or falsifying deductions to evade taxes, while tax avoidance involves using legal methods to minimize tax liability.',
    ],
    answer: 'Tax evasion involves deliberately underreporting income or falsifying deductions to evade taxes, while tax avoidance involves using legal methods to minimize tax liability.',
  },
];

// Metadata used by QuizHomePage and QuizPage for routing and display
export const QUIZ_META = [
  {
    key: 'budgeting',
    label: 'BUDGETING',
    description:
      'A budget is a plan you write down to decide how you will spend your money each month. A budget helps you make sure you will have enough money every month.',
    data: budgetingQuiz,
    nextRoute: '/quiz/saving',
    nextLabel: 'Saving Quiz',
  },
  {
    key: 'saving',
    label: 'SAVING',
    description:
      'Savings is the amount of money left over after spending and other obligations are deducted from earnings. Savings represent money that is otherwise idle and not being put at risk.',
    data: savingQuiz,
    nextRoute: '/quiz/debt',
    nextLabel: 'Debt Management Quiz',
  },
  {
    key: 'debt',
    label: 'DEBT MANAGEMENT',
    description:
      'Debt management is a way to get your debt under control through financial planning and budgeting. The goal of a debt management plan is to use these strategies to help you lower your current debt.',
    data: debtManagementQuiz,
    nextRoute: '/quiz/investing',
    nextLabel: 'Investing Quiz',
  },
  {
    key: 'investing',
    label: 'INVESTMENT',
    description:
      'The act of investing has the goal of generating income and increasing value over time. An investment can refer to any mechanism used for generating future income.',
    data: investingQuiz,
    nextRoute: '/quiz/taxes',
    nextLabel: 'Taxes Quiz',
  },
  {
    key: 'taxes',
    label: 'TAXES',
    description:
      'A tax is a mandatory fee or financial charge levied by any government on an individual or an organization to collect revenue for public works providing the best facilities and infrastructure.',
    data: taxesQuiz,
    nextRoute: '/dashboard',
    nextLabel: 'View Dashboard',
  },
];

export const quizData = {
  budgeting: budgetingQuiz,
  saving: savingQuiz,
  debt: debtManagementQuiz,
  investing: investingQuiz,
  taxes: taxesQuiz,
};
