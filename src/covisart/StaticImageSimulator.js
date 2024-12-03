import { Html, useProgress } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from './store'

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}
export default function StaticImageSimulator() {
    const snap = useSnapshot(state)
    return (
        <div
            className="bg_image"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/covisart/images/ngs/grey.webp)`, height: '90vh' }}>
            <img
                src={`/covisart/images/ngs/${snap.accessory}.webp`}
                className="bg_image"
                style={{ height: '84vh' }}/>
        </div>
    )
}