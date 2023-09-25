import './QuizImageComponent.css';

const QuizImageComponent = ({imageUrl}) => {
    return (
        <>
            <div className='quiz-div'>
                <img className="quiz-picture" src={imageUrl} alt="The Quiz" />
            </div>
        </>
    )
}

export default QuizImageComponent