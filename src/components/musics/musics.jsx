import {useContext, useEffect, useState} from "react";
import Music from "../music/music";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css'
import {Autoplay} from "swiper";
import {MusicContext} from "../../context/musicContext";
import {DataContext} from "../../context/dataContext";

export default function Musics({onPlay, onPause, onUpdate}) {

    const musicContext = useContext(MusicContext)
    const dataContext = useContext(DataContext)

    musicContext.playing.audio.ontimeupdate = (e) => onUpdate(e, musicContext.playing.audio)

    useEffect(() => {
        if (musicContext.paused !== null && musicContext.paused) {
            pauseMusic(musicContext.playing.music)
        }
    }, [musicContext.paused])
    useEffect(() => {
        fetch("https://api-beta.melobit.com/v1/song/new/0/8")
            .then(response => response.json())
            .then(data => dataContext.setMusics(data.results))

        fetch("https://api-beta.melobit.com/v1/song/slider/latest")
            .then(response => response.json())
            .then(data => dataContext.setSlider(data.results))
    }, [])

    return (

        (dataContext.musics.length > 0 && dataContext.slider.length > 0) ?
            <div>
                <Swiper className={'mt-3'} autoplay={{delay: 2000}} modules={[Autoplay]}>
                    {dataContext.slider.map(data => <SwiperSlide>
                        <img src={data.image.slider.url} className={'rounded-3 cursor img-fluid'} alt=""/>
                    </SwiperSlide>)}
                </Swiper>
                <div className={'d-flex flex-column mt-5 align-items-start'}>
                    <h4 className={'mx-2'}>New Songs:</h4>
                    <div className={'d-flex row mt-2'}>
                        {dataContext.musics.map(music => <Music music={music} onClick={() => {
                            if ((musicContext.playing.playing && musicContext.playing.audio.src !== music.audio.high.url) || !musicContext.playing.playing) {
                                playMusic(music)
                            } else if (musicContext.playing.playing) {
                                pauseMusic(music)
                            }
                        }}/>)}
                    </div>
                </div>

            </div>
            :
            <div className={'w-100 d-flex justify-content-center align-items-center'} style={{height: '100vh'}}>
                <div className={'spinner-border text-primary'}>
                    <span className="visually-hidden"></span>
                </div>
            </div>

    )

    function playMusic(music) {
        musicContext.setPlaying({...musicContext.playing, playing: true,music:music})
        onPlay(music)
        updateMusics(music, true)
        musicContext.playing.audio.pause()
        musicContext.playing.audio.src = music.audio.high.url
        musicContext.playing.audio.play()
    }

    function pauseMusic(music) {
        musicContext.setPlaying({...musicContext.playing, playing: false})

        onPause(music)
        updateMusics(music, false)
        musicContext.playing.audio.pause()
    }

    function updateMusics(targetMusic, play) {
        const prevState = dataContext.musics
        const index = prevState.findIndex(item => item.audio.high.url === targetMusic.audio.high.url)
        let newState = prevState
        if (play) {
            newState = prevState.map(item => {
                item.playing = false
                return item
            })
        }
        newState[index].playing = play
        dataContext.setMusics(newState)
    }
}