'use client'

import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'
import { FaStackOverflow, FaCodepen, FaTwitter, FaEnvelope, FaChevronCircleUp } from 'react-icons/fa'
import styles from './style/About.module.css'

export default function AboutMe() {
  const [showMore, setShowMore] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const toggleBio = () => {
    setShowMore(!showMore)
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.mailWrapper} ${animate ? styles.animate : ''}`}>
        <div className={styles.mailContent}>
          <div className={styles.profileWrapper}>
            <div className={styles.profileHeader}>
              <div className={styles.profileAvatar}>
                <Image src="/placeholder.svg?height=200&width=200" alt="Nguyen Thanh Luan" width={160} height={160} />
              </div>
              <div className={styles.profileInfo}>
                <h1>Nguyen Thanh Luan</h1>
                <h2>
                  <TypeAnimation
                    sequence={[
                      'Frontend Developer',
                      2000,
                      'Next.js Enthusiast',
                      2000,
                      'Vue.js Expert',
                      2000,
                      'React Native Developer',
                      2000,
                    ]}
                    wrapper="span"
                    repeat={Infinity}
                  />
                </h2>
              </div>
            </div>
            <div className={styles.profileBio}>
              <p className={styles.shortDescription}>
                Hi! My name is Luan and I'm a Frontend Developer. I build and design fast, responsive, and user-friendly web applications.
              </p>
              <div className={styles.bioExtra}>
                  <p>Hi, my name is Luan and I'm a Frontend Developer with 1 year of experience.</p>
                  <p>
                    I specialize in Next.js, Vue.js, and React Native. My goal is to become a full-stack developer
                    who can bring significant value to any company I work with.
                  </p>
                  <p>
                    I am committed to successfully completing tasks assigned to me and continuously enhancing
                    my knowledge of other technologies. I thrive in collaborative environments and enjoy tackling
                    complex problems with innovative solutions.
                  </p>
                  <p>
                    If you want to get in touch, try <a href="mailto:your.email@example.com">email</a> or{' '}
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                    .
                  </p>
                </div>
              <div className={`${styles.profileBioWrapper} ${showMore ? styles.showMoreInfo : ''}`}>
                
                <div className={`${styles.showMoreIcon} ${styles.noSelect}`} onClick={toggleBio}>
                  <FaChevronCircleUp />
                  
                </div>
                <div className={styles.socialList}>
                  <ul>
                    <li className={`${styles.bioItem} ${styles.paperButton}`}>
                      <a href="https://stackoverflow.com/" title="Stack Overflow" target="_blank" rel="noopener noreferrer">
                        <FaStackOverflow />
                      </a>
                    </li>
                    <li className={`${styles.bioItem} ${styles.paperButton}`}>
                      <a href="https://codepen.io/" title="CodePen" target="_blank" rel="noopener noreferrer">
                        <FaCodepen />
                      </a>
                    </li>
                    <li className={`${styles.bioItem} ${styles.paperButton}`}>
                      <a href="https://twitter.com/" title="Twitter" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                    </li>
                    <li className={`${styles.bioItem} ${styles.paperButton}`}>
                      <a href="mailto:your.email@example.com" target="_top">
                        <FaEnvelope />
                      </a>
                    </li>
                  </ul>
                </div>
               
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBallFill}></div>
    </div>
  )
}
