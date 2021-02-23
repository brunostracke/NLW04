import styles from '../styles/components/Profile.module.css';

export function Profile (){
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/67613428?s=460&u=3ce384396669094bf777821d1ec0514c0e08768e&v=4" alt="Bruno Stracke"/>
            <div>
                <strong>Bruno Stracke</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level 1
                </p>
            </div>
        </div>
    );
}