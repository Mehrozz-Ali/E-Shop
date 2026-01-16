import React from 'react'
import styles from '../../../styles/styles'
function Hero() {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
            style={{ backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)" }}
        >
        </div>
    )
}

export default Hero