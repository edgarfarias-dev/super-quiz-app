import './QuizOptionsComponent.css';
import { Button } from '@mui/material';
import Icon from '@mui/material/Icon';

const QuizOptionsComponent = ({ keyOption, option, handleQuestion, isRight, clicked, keyOptionClicked, timeIsUp, keyRightAnswer }) => {

    const feedbackIconRight = <Icon>check</Icon>;
    const feedbackIconWrong = <Icon>clear</Icon>;
    const feedbackIconArrowBack = <Icon>arrow_back</Icon>;

    let buttonColor = "info";
    let buttonColorRight = (keyOption === keyRightAnswer) ? "success" : "info";

    let feedbackIcon = "";
    if (clicked && isRight && keyOption === keyOptionClicked) {
        feedbackIcon = feedbackIconRight;
        buttonColor = "success";
    } else if (clicked && keyOption === keyOptionClicked) {
        buttonColor = "error"
        feedbackIcon = feedbackIconWrong;
    } else if (!isRight && keyOption === keyRightAnswer) {
        feedbackIcon = clicked ? feedbackIconRight : feedbackIconArrowBack;
    }

    let renderButton = (
        <Button
            color={clicked && keyOption === keyOptionClicked ? "secondary" : "info"}
            className="btn-block" size="large" onClick={() => handleQuestion(keyOption)}>
            {option} 
        </Button>
    );

    if (timeIsUp) {
        renderButton = (
            <Button
                color={clicked && keyOption === keyOptionClicked ? buttonColor : buttonColorRight}
                className="btn-block" size="large">
                {option} {feedbackIcon}
            </Button>
        );
    }

    return (
        <div>
            {renderButton}
        </div>
    )
}

export default QuizOptionsComponent