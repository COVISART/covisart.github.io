import { useRef, Suspense } from 'react'
import { state } from './store'
import { useSnapshot } from 'valtio'

export default function Configuration() {
    const snap = useSnapshot(state)

    return(
        <div style={{ height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column", display: "flex", position:"relative"  }}>
            {
                NGS(snap.color)
                
            }
            {
                snap.accessory !='JustSim' && NGS(snap.accessory)
            }
        </div>
    )
}

function NGS(name) {
    const motorImage = './covisart/images/ngs/' + name + '.png'
    return (
        <img id={name} style={{ borderRadius: "10%", position:"absolute" }} src={motorImage} alt={name} />
    )
}