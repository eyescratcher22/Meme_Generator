import { useState, useEffect } from "react";

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemeImages, setAllMemeImages] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes));
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function getRandomMemeImage() {
        const randomIndex = Math.floor(Math.random() * allMemeImages.length);
        const url = allMemeImages[randomIndex]?.url;
        if (url) {
            setMeme(prevMeme => ({
                ...prevMeme,
                randomImage: url
            }));
        }
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>

                <button onClick={getRandomMemeImage}>
                    Get a new meme image 🖼
                </button>
            </div>

            <div className="meme">
                <img src={meme.randomImage} alt="Meme" />
                <h2 className="top">{meme.topText}</h2>
                <h2 className="bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}
