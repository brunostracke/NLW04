import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
import styles from '../styles/pages/Home.module.css';


interface ChallengeProviderProps {
  children: ReactNode;
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

interface Challenge {
  type: 'type' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  isDarkMode: boolean;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  changeDarkMode: () => void;
  
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider ({
    children,
    ...rest
  }: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
  const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  const [ isDarkMode, setIsDarkMode ] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function changeDarkMode() {
    setIsDarkMode(!isDarkMode);
    
  }

  function levelUp(){
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

   function closeLevelUpModal (){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio :D', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return(
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
        isDarkMode,
        changeDarkMode
        }}
      >
        {isDarkMode ? (
          <div className={styles.darkMode}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
          </div>
        ) : (
          <>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
          </>
        ) }
    </ChallengesContext.Provider>
  );

}
