import React from 'react'
import './meme.css';

export default function Meme() {
    console.log("Meme component rendered!")

    const [formData, setFormData] = React.useState({
      topLane: "",
      bottomLane: ""
    })
    const [allMemeImages, setAllMemeImages] = React.useState([{}])
    const [meme, setMeme] = React.useState({
      topText: "",
      bottomText: "",
      randomImage: ""
    })

    React.useEffect(() => {
      console.log("Memes loaded from API!")
      const memeUrl = "https://api.imgflip.com/get_memes"

      fetch(memeUrl)
      .then(response => response.json())
      .then(data => {
        setAllMemeImages(data.data.memes)
        setMeme((prevMeme) => {
          const randomInt = Math.floor(Math.random() * 100)
          return {
            ...prevMeme,
            randomImage: data.data.memes[randomInt].url
          }
        })
      })
    }, [])

    function clearForm() {
      setFormData(() => {
        return {
          topLane: "",
          bottomLane: ""
        }
      })
    }

    function clickHandler() {
      setMeme(() => {
        const randomInt = Math.floor(Math.random() * 100)
        return {
          topText: formData.topLane,
          bottomText: formData.bottomLane,
          randomImage: allMemeImages[randomInt].url
        }
      })
      clearForm()
    }

    function textChange(event) {
      setFormData(prevFormData => {
        const {name, value} = event.target
        return {
          ...prevFormData,
          [name]: value
        }
      })
    }

    return(
        <main>
          <div className="form">
            <input
              name="topLane"
              type="text"
              placeholder="Upper sentence"
              className="firstmeme"
              onChange={textChange}
              value={formData.topLane}
            />
            
            <input
              name="bottomLane"
              type="text"
              placeholder="Lower sentence"
              className="secondmeme"
              onChange={textChange}
              value={formData.bottomLane}
            />
            <button className="submitmeme" onClick={clickHandler}>
              Generate a new meme image!
            </button>
          </div>
          <div className="pictureDiv">
            <div className="memeTexts">
              <p className="upperMemeText">{meme.topText}</p>
              <p className="lowerMemeText">{meme.bottomText}</p>
            </div>
            <img src={meme.randomImage} className="memeImage" alt="memepicture" />
          </div>
        </main>
    )
}