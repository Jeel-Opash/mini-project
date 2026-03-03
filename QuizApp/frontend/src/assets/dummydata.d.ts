declare const questionsData: {
  [key: string]: {
    [key: string]: Array<{
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
      optionsExtra?: string[];
    }>;
  };
};
export default questionsData;
