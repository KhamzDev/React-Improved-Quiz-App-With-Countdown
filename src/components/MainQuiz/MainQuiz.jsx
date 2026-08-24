import styles from './MainQuiz.module.css'
import { quiz_array } from '../QuestionArray'
import { useEffect, useRef, useState } from 'react'


function MainQuiz() {

    const [curInd, setCurInd] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [userAnswer, setUserAnswer] = useState('')
    const [timeLeft, setTimeLeft] = useState(10)
    const [corAns, setCorAns] = useState(0)

    const currentQuestion = quiz_array[curInd]

    const timerRef = useRef(null);

    useEffect(() => {

        if(timeLeft === 0){
            handleNext()
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if(prev <= 1){
                clearInterval(timerRef.current)
                return 0;
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timerRef.current)
    }, [curInd])

    

    function handleAnswer(c){
        setAnswered(true)
        setUserAnswer(c)
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
        if(currentQuestion.correct === c){
            console.log('Correct')
            setCorAns(p => p + 1)
        }else{
            console.log('false')
        }
    }
    
    function handleNext(){
        if(answered){
            setCurInd(p => p + 1)
            setAnswered(false)
            setUserAnswer('')
            if(curInd < 4){
                setTimeLeft(10)
            }
            
        }
    }

    function handleReset(){
        setAnswered(false)
        setCurInd(0)
        setTimeLeft(10)
    }

    if(timeLeft === 0 && !answered){
        setAnswered(true)
    }

    if(curInd >= 5){
        return (
            <div className={styles.container}>
                <div className={styles.question_main}>
                    <h4>Congratulations</h4>
                    <p>You correctly answered {corAns} out of {quiz_array.length} questions</p>
                </div>

                <button className={styles.buttons} onClick={handleReset}>Restart</button>
            </div>
        )
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.timer_main}>
                <p>{timeLeft}</p>
            </div>

            <div className={styles.question_main}>
                <h4>{currentQuestion.question}</h4>
                <p>{`${curInd + 1}/${quiz_array.length}`}</p>
            </div>

            <div className={styles.answer_main}>

                <div 
                    onClick={!answered ? () => handleAnswer(currentQuestion.A) : null} 
                    className={styles.question}
                    style={answered ? currentQuestion.A === currentQuestion.correct && userAnswer ? {backgroundColor: 'lightgreen'} : currentQuestion.A === userAnswer ? {backgroundColor: 'red'} : null : null}>
                        {currentQuestion.A}
                </div>

                <div 
                    onClick={!answered ? () => handleAnswer(currentQuestion.B) : null} 
                    className={styles.question}
                    style={answered ? currentQuestion.B === currentQuestion.correct && userAnswer ? {backgroundColor: 'lightgreen'} : currentQuestion.B === userAnswer ? {backgroundColor: 'red'} : null : null}>
                        {currentQuestion.B}
                </div>

                <div 
                    onClick={!answered ? () => handleAnswer(currentQuestion.C) : null} 
                    className={styles.question}
                    style={answered ? currentQuestion.C === currentQuestion.correct && userAnswer ? {backgroundColor: 'lightgreen'} : currentQuestion.C === userAnswer ? {backgroundColor: 'red'} : null : null}>
                        {currentQuestion.C}
                </div>

                <div 
                    onClick={!answered ? () => handleAnswer(currentQuestion.D) : null} 
                    className={styles.question}
                    style={answered ? currentQuestion.D === currentQuestion.correct && userAnswer ? {backgroundColor: 'lightgreen'} : currentQuestion.D === userAnswer ? {backgroundColor: 'red'} : null : null}>
                        {currentQuestion.D}
                </div>

            </div>
            
            <button className={styles.buttons} onClick={handleNext}>Next</button>
        </div>
    )
}

export default MainQuiz

