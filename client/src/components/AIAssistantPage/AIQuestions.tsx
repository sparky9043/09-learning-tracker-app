import type { AIGeneratedQuestionObject } from "@/types/types";

interface AIQuestionsProps {
  questions: AIGeneratedQuestionObject[];
}

const AIQuestions = (props: AIQuestionsProps) => {
  console.log(props);
  if (!props?.questions || props?.questions.length == 0) {
    return null;
  }

  return (
    <div>
      <h2>
        Questions for Further Study
        {props.questions.map(question => <li key={question.topic}>
          {question.topic}
          {question.concept.map(concept => <p key={concept.question}>
            {concept.question}
          </p>)}
        </li>)}
      </h2>
    </div>
  )
};

export default AIQuestions;