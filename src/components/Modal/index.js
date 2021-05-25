import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'

import { useContext } from 'react';
import { ContextAPI } from '../../context/ContextAPI';

import { motion } from 'framer-motion'


import styles from './Modal.module.scss'

export default function Modal(movieInfo, ...rest) {

  const { isModalOpen, setIsModalOpen, hasVideo, setHasVideo, flag  } = useContext(ContextAPI);

  const variants = {
    open: {opacity: 1, y: 0},
    closed: {opacity: 0, y: "-25%" },
  }

  useEffect(() => {
    movieInfo.video.results.length !== 0 ? setHasVideo(true) : setHasVideo(false);
  }, [flag])

  return (
    <>
    <div className={isModalOpen ? `${styles.modalOverlay} ${styles.active}` : ''}></div>
    
    <motion.div 
      className={isModalOpen ? `${styles.modalContainer} ${styles.active}` : `${styles.modalContainer}`}
      animate={isModalOpen ? "open" : "closed"}
      variants={variants}
      >

        <header className={styles.modal__header}>
            <h1 className={styles.modal__title}>{movieInfo.element.title}</h1>
            <i className={styles.modal__close} onClick={() => setIsModalOpen(!isModalOpen)}>
              <svg viewBox="0 0 357 357">
                <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"/>
              </svg>
            </i>
        </header>

        <main className={styles.modal__videoContainer}>
          {hasVideo ? (
            <ReactPlayer url={`https://www.youtube.com/watch?v=${movieInfo.video.results[0]?.key}`} /> 
          ) : ( 
            <h1 className={styles.trailerNotAvailable}>Ops, não há trailer disponível para esse filme no momento :(</h1>)}
        </main>
        
    </motion.div>
    </>
  );
}
