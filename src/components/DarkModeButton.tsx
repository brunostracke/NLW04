import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/DarkModeButton.module.css';

export function DarkModeButton () {

  const { changeDarkMode, isDarkMode } = useContext(ChallengesContext)


  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        {isDarkMode ? (
          <button
            className={styles.circleRight}
            onClick={changeDarkMode}
          >
          </button>
        ) : (
            <button
              className={styles.circleLeft}
              onClick={changeDarkMode}
            >
            </button>
          )}
      </div>
    </div>
  );
}