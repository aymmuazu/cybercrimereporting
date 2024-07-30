import React from 'react'
import BgImage from '../assets/images/header-illustration.svg'

const ImageContainer = () => {
  return (
    <div>
        <div className="image-container">
            <img className="img-fluid" src={BgImage} alt="alternative" width="100%" />
        </div>   
    </div>
  )
}

export default ImageContainer
