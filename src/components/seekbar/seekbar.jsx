import './seekbar.css'

export default function Seekbar({className,value = 0}){
    return (
        <div className={`${className} w-100 bg-dark rounded-5 position-relative seekbar`}>
            <span className={'bg-dark rounded-circle position-absolute'} style={{left:`${value}%`}}/>
        </div>
    )
}