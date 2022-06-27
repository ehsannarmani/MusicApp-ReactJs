import {useContext, useEffect, useState} from "react";
import {MusicContext} from "../../context/musicContext";
import './musicPage.css'
import Seekbar from "../../components/seekbar/seekbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackwardStep, faPause, faPlay, faStepForward, faVolumeHigh} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";

export default function MusicPage() {
    const musicContext = useContext(MusicContext)

    let totalTimeMinute = Math.round(musicContext.playing.audio.duration / 60);
    if (totalTimeMinute < 10) totalTimeMinute = `0${totalTimeMinute}`
    let totalTimeSecond = Math.round((musicContext.playing.audio.duration % 60));
    if (totalTimeSecond < 10) totalTimeSecond = `0${totalTimeSecond}`

    let currentTimeMinute = Math.round(musicContext.playing.audio.currentTime / 60);
    if (currentTimeMinute < 10) currentTimeMinute = `0${currentTimeMinute}`
    let currentTimeSecond = Math.round((musicContext.playing.audio.currentTime % 60));
    if (currentTimeSecond < 10) currentTimeSecond = `0${currentTimeSecond}`

    const {id} = useParams()


    const [playing,setPlaying] = useState({})
    const [volume,updateVolume] = useState(.5)
    const [progress,setProgress] = useState(0)


    useEffect(() => {
        if (musicContext.playing.music === null) {
            fetch(`https://api-beta.melobit.com/v1/song/${id}`)
                .then(response => response.json())
                .then(data => {

                    musicContext.setPlaying({audio: new Audio(data.audio.high.url), playing: false, music: data})
                    musicContext.playing.audio.muted = true
                    musicContext.updateVolume(.5)

                    musicContext.playing.audio.ontimeupdate = () => {
                        const total = musicContext.playing.audio.duration
                        const current = musicContext.playing.audio.currentTime
                        const percent = (100 * current) / total
                        musicContext.updateProgress(percent)
                    }
                })
        }
    }, [])

    return (
        musicContext.playing.music === null
            ?
            "Loading"
            :
            <>
                <MusicContext.Provider value={{
                    playing,setPlaying,
                    volume,updateVolume,
                    progress,updateProgress: setProgress
                }}>
                    <div className={'position-absolute w-100 bg-blur h-100-vh'}
                         style={{background: `url(${musicContext.playing.music.image.cover.url})`}}/>

                    <div className={'d-flex justify-content-center align-items-center h-100-vh'}>
                        <div className={'d-flex mt-5 mt-md-0 flex-column flex-md-row container'}>
                            <img src={musicContext.playing.music.image.cover.url} className={'rounded-3 col-12 col-md-6'}/>
                            <div className={'mx-2 mx-md-5 mt-4 mt-md-5 d-flex flex-column col-12 col-md-6'}>
                                <div>
                                    <h1>{musicContext.playing.music.album.name}</h1>
                                    <h4 className={'text-muted mx-1 fw-bold'}>{musicContext.playing.music.artists[0].fullName}</h4>
                                </div>
                                <div className=" d-flex flex-column align-items-center mt-0 mt-md-5 mx-5">
                                    <div className={'d-flex gap-5 align-items-center mb-5'}>
                                        <FontAwesomeIcon icon={faBackwardStep} size={'2x'} className={'cursor'}/>
                                        <FontAwesomeIcon icon={musicContext.playing.playing ? faPause : faPlay} size={'4x'}
                                                         className={'cursor'} onClick={() => {
                                            if (musicContext.playing.playing) {
                                                musicContext.setPaused(true)
                                                musicContext.playing.audio.pause()
                                                musicContext.setPlaying({...musicContext.playing, playing: false})
                                            } else {
                                                musicContext.setPaused(false)
                                                musicContext.playing.audio.play()
                                                musicContext.setPlaying({...musicContext.playing, playing: true})
                                            }
                                        }
                                        }/>
                                        <FontAwesomeIcon icon={faStepForward} size={'2x'} className={'cursor'}/>
                                    </div>
                                    <div className="d-flex w-100 align-items-center">
                                        <p className={'mt-3 mx-3'}>{`${currentTimeMinute}:${currentTimeSecond}`}</p>
                                        <Seekbar value={musicContext.progress}/>
                                        <p className={'mt-3 mx-3'}>{`${totalTimeMinute}:${totalTimeSecond}`}</p>
                                    </div>
                                    <div className="d-flex volume align-items-center align-self-start">
                                        <FontAwesomeIcon className={'mt-4 mx-3'} icon={faVolumeHigh}/>
                                        <input type="range" defaultValue={musicContext.volume * 100}
                                               className={'w-100 mt-4 seekbar '} onChange={e => {
                                            const vol = e.target.value / 100
                                            musicContext.updateVolume(vol)
                                            musicContext.playing.audio.volume = vol
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MusicContext.Provider>
            </>
    )

}