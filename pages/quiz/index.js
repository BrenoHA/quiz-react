/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import { Lottie } from '@crello/react-lottie';

import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import GitHubCorner from '../../src/components/GitHubCorner';
import LinkedinCorner from '../../src/components/LinkedinCorner';
import QuizLogo from '../../src/components/QuizLogo';
import Button from '../../src/components/Button';
import AlternativeForm from '../../src/components/AlternativeForm';
import Loading from '../../src/components/Loading';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import correct from '../../src/screens/Quiz/animations/6518-correct-check-animation.json';
import inCorrect from '../../src/screens/Quiz/animations/6973-incorrect-failed.json';

function Correct() {
  return (
    <span style={{ display: 'flex', justifyContent: 'center' }}>
      <Lottie
        width="40px"
        height="40px"
        className="lottie-container basic"
        config={{ animationData: correct, loop: true, autoplay: true }}
      />
      <p>Acertou!</p>
    </span>
  );
}

function InCorrect() {
  return (
    <span style={{ display: 'flex', justifyContent: 'center' }}>
      <Lottie
        width="40px"
        height="40px"
        className="lottie-container basic"
        config={{ animationData: inCorrect, loop: true, autoplay: true }}
      />
      <p>Errou!</p>
    </span>
  );
}

function ResultWidget({ results }) {
  const router = useRouter();
  return (
    <Widget>
      <Widget.Header>
        Você acertou
        {' '}
        {results.filter((x) => x).length}
        {' '}
        de
        {' '}
        8 perguntas
      </Widget.Header>

      <Widget.Content>
        <h2>
          Resultado:
        </h2>
        <ul>
          {results.map((result, index) => (
            <li style={{ marginTop: '10px' }} key={`result__${result}`}>
              {index + 1}
              ª
              {' '}
              Pergunta:
              {result === true ? ' Acertou!' : ' Errou!'}
            </li>

          ))}
        </ul>

        {/* <Button href="/quiz">
          Jogar novamente
        </Button> */}

        <form onSubmit={function (infosDoEvento) {
          infosDoEvento.preventDefault();
          router.push('/');
        }}
        >
          <Button type="submit">
            Jogar de novo
          </Button>
        </form>

      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState();
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativeForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                  checked={selectedAlternative === alternativeIndex}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <Correct />}
          {isQuestionSubmited && !isCorrect && <InCorrect />}

        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2.5 * 1000);
    // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <Loading />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/BrenoHA" />
      <LinkedinCorner projectUrl="https://www.linkedin.com/in/breno-hasparyk/" />
    </QuizBackground>
  );
}
