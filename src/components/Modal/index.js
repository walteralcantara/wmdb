import React, { useEffect } from 'react'
import { useContext } from 'react';
import ReactPlayer from 'react-player/youtube'

import { ContextAPI } from '../../context/ContextAPI';

import CloseIcon from '../../assets/icons/close.svg';

import styles from './Modal.module.scss'

export default function Modal(movieInfo) {

  const { 
    isModalOpen,
    setIsModalOpen,
    hasVideo,
    setHasVideo,
    flag
  } = useContext(ContextAPI);

  useEffect(() => {
    movieInfo.video.results.length !== 0
      ? setHasVideo(true)
       : setHasVideo(false);
  }, [flag])

  return (
    <>
      <div className={isModalOpen 
        ? `${styles.modalOverlay} ${styles.active}` 
        : `${styles.modalOverlay}`}
      />

      <div className={isModalOpen 
        ? `${styles.modalContainer} ${styles.active}` 
        : `${styles.modalContainer}`}
      >    
        <header className={styles.modal__header}>
          <h1 className={styles.modal__title}>{movieInfo.element.title}</h1>
          <div
            className={styles.modal__close}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <CloseIcon width="15" />
          </div>
        </header>

        <main className={styles.modal__videoContainer}>
          {hasVideo ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movieInfo.video.results[0]?.key}`}
            /> 
          ) : ( 
            <h1 className={styles.trailerNotAvailable}>
              Ops, não há trailer disponível para esse filme no momento :(
            </h1>
          )}
        </main>
      
      </div>
    </>
  );
}
