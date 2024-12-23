import React from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';

type QuestionCategory = {
  title: string;
  questions: string[];
};

const suggestedQuestions: QuestionCategory[] = [
  {
    title: 'Income Analysis',
    questions: [
      'Are my income sources diversified enough to manage risk effectively?',
      'Based on my current income trends, what strategies can I implement to grow my income in the short and long term?',
      'Given my income, how much should I realistically aim to save each month?'
    ]
  },
  {
    title: 'Expense Analysis',
    questions: [
      'Are my expenses aligned with recommended budgeting guidelines (e.g., the 50/30/20 rule)?',
      'What trends or patterns do you notice in my spending that I should address?',
      'How can I better differentiate between essential and non-essential expenses to cut back effectively?',
      'Are there recurring expenses or subscriptions that I should reconsider or eliminate?'
    ]
  },
  {
    title: 'Savings and Investments',
    questions: [
      'Based on my expenses, is my emergency fund sufficient, or should I increase it?',
      'Are there better ways to allocate my surplus income into investments based on last month\'s financial data?',
      'Should I prioritize paying off debts or focus on saving/investing given my current financial situation?'
    ]
  },
  {
    title: 'Financial Goals',
    questions: [
      'How can I better plan for short-term goals like vacations, large purchases, or home repairs?',
      'Based on last month\'s financial habits, how should I adjust my finances to achieve long-term goals like retirement or buying a house?'
    ]
  }
];

type SuggestedQuestionsProps = {
  onSelectQuestion: (question: string) => void;
};

export default function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-6">
      <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
        <HelpCircle className="h-5 w-5" />
        <h3 className="font-medium">Suggested Questions</h3>
      </div>
      
      <div className="space-y-6">
        {suggestedQuestions.map((category, index) => (
          <div key={index}>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{category.title}</h4>
            <ul className="space-y-2">
              {category.questions.map((question, qIndex) => (
                <li key={qIndex}>
                  <button
                    onClick={() => onSelectQuestion(question)}
                    className="w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 rounded-md p-2 flex items-center group transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="ml-1">{question}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}