import {useRef, useState} from "react";
import './music.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay,faPause} from "@fortawesome/free-solid-svg-icons";

export default function Music({music,onClick}) {

    let image = useRef()

    const [bgOpacity, setBgOpacity] = useState(0)

    return (
        <div className={'col-12 col-md-3 mt-4 position-relative'}>
            <div className={'position-relative d-flex'}
                 onMouseEnter={() => setBgOpacity((.8))}
                 onMouseLeave={() => setBgOpacity(0)}>
                <img
                    className={'img-fluid rounded-4'} src={music.album.image.cover.url} alt={music.album.name}
                    ref={image}
                />
                <div
                    className={`position-absolute w-100 h-100 rounded-4 opacity-${bgOpacity === 0 ? 0 : 100} transition-100 d-flex justify-content-center align-items-center`} style={{background: `rgba(31,31,31,${bgOpacity})`}}>
                    <FontAwesomeIcon onClick={onClick} className={'cursor'} icon={music.playing ? faPause : faPlay} color={'white'} size={'2x'}/>
                </div>
            </div>
            <h5 className={'mt-4'}>{music.album.name}</h5>
            <h className={'text-muted mt-3'}>{music.album.artists[0].fullName}</h>
        </div>
    )
}