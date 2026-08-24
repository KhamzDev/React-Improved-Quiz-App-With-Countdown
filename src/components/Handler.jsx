import styles from './Handler.module.css'
import MainQuiz from './MainQuiz/MainQuiz';




function Handler() {

  return (
    <div className={styles.container}>
     <MainQuiz /> 
    </div>
  );
}

export default Handler