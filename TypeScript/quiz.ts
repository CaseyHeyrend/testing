// Define the structure of a Quiz Question
interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

class Quiz {
  private questions: Question[] = [];
  private score: number = 0;
  private currentQuestionIndex: number = 0;

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  // Add a new question dynamically
  public addQuestion(question: Question): void {
    this.questions.push(question);
  }

  // Check if the quiz has more questions
  public hasMoreQuestions(): boolean {
    return this.currentQuestionIndex < this.questions.length;
  }

  // Get the current question
  public getCurrentQuestion(): Question | null {
    if (!this.hasMoreQuestions()) return null;
    return this.questions[this.currentQuestionIndex];
  }

  // Submit an answer and move to the next question
  public submitAnswer(selectedIndex: number): boolean {
    const currentQuestion = this.getCurrentQuestion();
    
    if (!currentQuestion) {
      console.log("No active question.");
      return false;
    }

    const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      this.score++;
    }

    this.currentQuestionIndex++;
    return isCorrect;
  }

  // Get the user's current score
  public getScore(): number {
    return this.score;
  }

  // Get the total number of questions
  public getTotalQuestions(): number {
    return this.questions.length;
  }

  // Reset the quiz state
  public reset(): void {
    this.score = 0;
    this.currentQuestionIndex = 0;
  }
}

// ==========================================
// Usage Example
// ==========================================

// 1. Create a pool of questions
const sampleQuestions: Question[] = [
  {
    questionText: "What is the primary advantage of TypeScript over JavaScript?",
    options: [
      "Faster runtime execution",
      "Static typing",
      "Direct browser support",
      "Smaller file sizes"
    ],
    correctAnswerIndex: 1
  },
  {
    questionText: "Which keyword is used to define a constant variable in TypeScript?",
    options: ["var", "let", "constant", "const"],
    correctAnswerIndex: 3
  },
  {
    questionText: "How do you specify that a property in an interface is optional?",
    options: ["Using a ?", "Using an *", "Using the 'optional' keyword", "Using a !"],
    correctAnswerIndex: 0
  }
];

// 2. Initialize the Quiz engine
const tsQuiz = new Quiz(sampleQuestions);

// 3. Simulate a user taking the quiz
console.log("--- Starting TypeScript Quiz --- \n");

// Question 1
let q1 = tsQuiz.getCurrentQuestion();
if (q1) {
  console.log(`Q: ${q1.questionText}`);
  q1.options.forEach((opt, index) => console.log(`${index}: ${opt}`));
  
  // Simulate user choosing option 1 ("Static typing")
  const userChoice = 1; 
  const isCorrect = tsQuiz.submitAnswer(userChoice);
  console.log(`Your answer was: ${isCorrect ? "✅ Correct!" : "❌ Wrong!"}\n`);
}

// Question 2
let q2 = tsQuiz.getCurrentQuestion();
if (q2) {
  console.log(`Q: ${q2.questionText}`);
  q2.options.forEach((opt, index) => console.log(`${index}: ${opt}`));
  
  // Simulate user choosing option 0 ("var")
  const userChoice = 0; 
  const isCorrect = tsQuiz.submitAnswer(userChoice);
  console.log(`Your answer was: ${isCorrect ? "✅ Correct!" : "❌ Wrong!"}\n`);
}

// Final Results
console.log("--- Quiz Completed ---");
console.log(`Final Score: ${tsQuiz.getScore()} / ${tsQuiz.getTotalQuestions()}`);
