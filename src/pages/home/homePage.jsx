import Musics from "../../components/musics/musics";
import Footer from "../../components/footer/footer";
import {useContext} from "react";
import './homePage.css'
import {MusicContext} from "../../context/musicContext";

export default function HomePage() {

    const musicContext = useContext(MusicContext)
    console.log(musicContext.playing.music)

    return (
        <div className={'container-responsive m-auto'}>
            <Musics
                onPlay={music => {
                    musicContext.updateProgress(0)
                    musicContext.setPlaying({...musicContext.playing, music, playing: true})
                    musicContext.setPaused(false)
                }}
                onPause={music => musicContext.setPlaying({...musicContext.playing, music, playing: false})}
                onUpdate={(e, audio) => {
                    const total = audio.duration
                    const current = audio.currentTime
                    const percent = (100 * current) / total
                    musicContext.updateProgress(percent)
                }}
            />
            <div className={'divider'}/>
            {musicContext.playing.playing ? <Footer
                onVolumeChange={volume => {
                    const vol = volume / 100
                    musicContext.updateVolume(vol)
                    musicContext.playing.audio.volume = vol
                    }
                }
                onToggle={() => musicContext.setPaused(true)}
            /> : null}
        </div>
    )
}