import React from 'react'
import ReactPlayer from 'react-player/youtube'

import { useContext } from 'react';
import { ContextAPI } from '../../context/ContextAPI';


import styles from './Modal.module.scss'

export default function Modal(movieInfo, ...rest) {

  const { isModalOpen, setIsModalOpen } = useContext(ContextAPI);

    // console.log('movie video component:', movieVideo)
    console.log('movie info component:', movieInfo, ...rest)

  return (
    <div className={isModalOpen ? `${styles.modalContainer} ${styles.active}` : `${styles.modalContainer}`}>
        <header className={styles.modal__header}>
            <h1 className={styles.modal__title}>{movieInfo.element.title}</h1>
            <i className={styles.modal__close} onClick={() => setIsModalOpen(false)}>
              <svg viewBox="0 0 357 357">
                <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"/>
              </svg>
            </i>
        </header>
        <main className={styles.modal__videoContainer}>
            <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${movieInfo.video.results[0].key}`}
                height={450}
            />
        </main>
    </div>
    
  );
}
