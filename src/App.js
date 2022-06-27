import './pages/home/homePage.css';
import './bootstrap.css'
import HomePage from "./pages/home/homePage";
import {Route, Router, Routes} from "react-router-dom"
import MusicPage from "./pages/music/musicPage";
import React, {useState} from "react";
import {MusicContext} from "./context/musicContext";
import {DataContext} from "./context/dataContext";

function App() {

    const [progress, updateProgress] = useState(0)
    const [volume, updateVolume] = useState(.5)
    const [playing, setPlaying] = useState({playing: false, music: null, audio: new Audio(null)})
    const [musics, setMusics] = useState([])
    const [slider, setSlider] = useState([])
    const [paused, setPaused] = useState(null)

    return (
        <MusicContext.Provider value={{
            progress, updateProgress,
            volume, updateVolume,
            playing, setPlaying,
            paused, setPaused
        }}>
            <DataContext.Provider value={{
                musics, setMusics,
                slider, setSlider
            }}>
                <div className="App">
                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/music/:id/:name"} element={<MusicPage/>}/>
                    </Routes>
                </div>
            </DataContext.Provider>
        </MusicContext.Provider>

    );
}

export default App;
