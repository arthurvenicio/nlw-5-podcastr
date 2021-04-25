import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useMode } from '../../contexts/DarkMode';
import { BiMoon } from 'react-icons/bi';
import { BiSun } from 'react-icons/bi';
import styles from './style.module.scss';

export function Header(){
  const {
    isDark,
    toggleDarkMode,
  } = useMode();

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

    return ( 
      <header className={!isDark ? styles.darkHeaderContainer : styles.headerContainer}>
        <img src="/logo.svg" alt="Podcastr LOGO"/>
        
        <p>O Melhor para você ouvir, sempre!</p>

        <span>{currentDate}</span>
        <div className={styles.buttonTheme}> 
        { isDark ? <BiMoon onClick={toggleDarkMode} size={25} className={styles.buttonChangeTheme}/>
          : <BiSun onClick={toggleDarkMode} size={25} className={styles.buttonChangeTheme}/>
        } 
          </div>
      </header>
    )
}