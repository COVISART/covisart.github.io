import { useRef, Suspense } from 'react'
import { state } from './store'
import { useSnapshot } from 'valtio'

export default function Configuration() {
    const snap = useSnapshot(state)

    return(
        <>
            {
                NGS(snap.color)
            }
            {
                snap.accessory !='JustSim' && NGS_A(snap.accessory)
            }
        </>
    )
}

function NGS(name) {
    const motorImage = './covisart/images/ngs/colors/' + name + '.webp'
    return (
        <img id={name} style={{ borderRadius: "10%",position: "relative"}} src={motorImage} alt={name} />
    )
}
function NGS_A(name) {
    const motorImage = './covisart/images/ngs/' + name + '.webp'
    return (
        <img id={name} style={{ borderRadius: "10%", position: "absolute", top:0, left:0}} src={motorImage} alt={name} />
    )
}