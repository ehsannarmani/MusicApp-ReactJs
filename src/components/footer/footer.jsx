import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faStepForward, faBackwardStep, faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import Seekbar from "../seekbar/seekbar";
import '../seekbar/seekbar.css'
import './footer.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {MusicContext} from "../../context/musicContext";

export default function Footer({onVolumeChange, onToggle}) {

    const musicContext = useContext(MusicContext)

    return (
        <div className={'position-fixed bottom-0 d-flex container-responsive bg-white'}>
            <div className={'d-flex'}>
                <img src={musicContext.playing.music.image.cover.url} className={'img-fluid rounded-3'} width={'100'} height={'100'}/>
                <div className={'d-flex flex-column my-auto mx-3 align-items-start'}>
                    <h6 className={'text-muted'}>{musicContext.playing.music.artists[0].fullName}</h6>
                    <h6>{musicContext.playing.music.album.name}</h6>
                </div>
            </div>
            <div className={'d-none d-md-flex flex-column w-25 justify-content-center align-items-center mx-5 mb-4 '}>
                <div className={'d-flex gap-5 align-items-center'}>
                    <FontAwesomeIcon icon={faBackwardStep} size={'lg'} className={'cursor'}/>
                    <FontAwesomeIcon icon={faPause} size={'2x'} onClick={onToggle} className={'cursor'}/>
                    <FontAwesomeIcon icon={faStepForward} size={'lg'} className={'cursor'}/>
                </div>
                <Seekbar value={musicContext.progress} className={'mt-3'}/>

            </div>
            <input type={"range"} defaultValue={(musicContext.volume*100)} onChange={e => onVolumeChange(e.target.value)} className={'my-auto seekbar mx-5'}
                />
            <Link to={`/music/${musicContext.playing.music.id}/${musicContext.playing.music.album.name.replaceAll(" ","-")}`}>
                <FontAwesomeIcon  icon={faUpRightFromSquare} size={'lg'} className={'cursor text-dark mt-3 mx-2'}/>
            </Link>
        </div>
    )
}