import './App.css';
import { useState, useEffect } from 'react';
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import QuizImageComponent from './components/quiz-image/QuizImageComponent';
import QuizOptionsComponent from './components/quiz-options/QuizOptionsComponent';
import { ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import QuizQuestionComponent from './components/quiz-question/QuizQuestionComponent';
import TimerComponent from './components/TimerComponent/TimerComponent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function App() {

  const url = "https://scs-interview-api.herokuapp.com/questions";

  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [points, setPoints] = useState(0);
  const [isRight, setIsRight] = useState(false);

  const [keyRightAnswer, setKeyRightAnswer] = useState(null);

  const [clicked, setClicked] = useState(false);
  const [keyOptionClicked, setKeyOptionClicked] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [timeIsUp, setTimeIsUp] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();

      // initial loading (3 sec)
      setTimeout(() => {
        setData(data);
        setDataLength(data.length);
        setCurrentData(data[0]);
        setKeyRightAnswer(data[0].answer);
      }, 3000)
    }

    fetchData()
  }, []);

  const handleQuestion = (keyOption) => {
    setClicked(true);
    setKeyOptionClicked(keyOption);
    if (keyOption === currentData.answer) {
      setIsRight(true);
      setPoints(points + 1)
    } else {
      setIsRight(false);
    };
  }

  const handleTime = () => {
    setKeyOptionClicked(null);
    setClicked(false);
    setTimeIsUp(false);
    if (index === (dataLength - 1)) {
      setGameOver(true);
    } else {
      setCurrentData(data[index + 1]);
      setKeyRightAnswer(data[index + 1].answer);
      setIndex(index + 1)
    }
  }

  const handleTimeIsUp = () => {
    setTimeIsUp(true);
  }

  let render = (
    <div>
      <h1>Loading ...</h1>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    </div>
  )

  if (dataLength > 0) {
    render = (!gameOver) ? (
      <>
        <TimerComponent
          time={index !== (dataLength - 1) ? currentData.time : 0}
          handleTime={handleTime}
          handleTimeIsUp={handleTimeIsUp} />

        <QuizImageComponent imageUrl={currentData.imageUrl} />

        <QuizQuestionComponent question={currentData.question} />

        <ButtonGroup orientation="vertical" variant="contained" className="button-group">
          {currentData.options.map((option, i) => {
            return <QuizOptionsComponent
              key={i}
              keyOption={i}
              option={option}
              isRight={isRight}
              keyRightAnswer={keyRightAnswer}
              clicked={clicked}
              keyOptionClicked={keyOptionClicked}
              handleQuestion={handleQuestion}
              timeIsUp={timeIsUp} />
          })}
        </ButtonGroup>

        <QuizOptionsComponent />
      </>
    ) :
      (
        <>
          <Typography sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
            Game Over
          </Typography>
          <Typography variant="h5" component="div">
            Your score is...
          </Typography>
          <Typography sx={{ fontSize: 100 }} color="text.primary">
            {points}/3
          </Typography>
        </>
      );
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Card sx={{ height: '100vh' }} align="center">
          <CardContent>
            {render}
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  )
}

export default App;
