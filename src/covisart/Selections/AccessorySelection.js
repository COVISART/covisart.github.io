import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import '../styles.css'

export function AccessorySelection() {
    const transition = { type: 'spring', duration: 0.8 }
    const config = {
        initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
        animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
        exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
    }
    return (
        <div id="covisart" style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
            <AnimatePresence>
                <motion.section key="custom" {...config}>
                    <Customizer />
                </motion.section>
            </AnimatePresence>
        </div>
    )
}

function Customizer() {
    const snap = useSnapshot(state)
    return (
        <div>
            <div className="customizer">
                <h4 style={{ textAlign: "text-center" }}>Choose Accessory</h4>
                <div className="color-options" style={{justifyContent:"center", alignItems:"center", flexDirection:"row", display:"flex"}}>
                    {snap.accessories.map((accessory) => (
                        accessory === snap.accessory
                            ? Accessory(accessory, "selectedBox")
                            : Accessory(accessory, "box")
                    ))}
                </div>
            </div>

        </div>

    )
}

function Accessory(name, selected) {
    const sizeImage = './covisart/images/ngs/' + name + '_icon.png'
    return (
        <div key={name} className={selected} style={{ height: "20%", width: "20%", textAlign: "center" }} onClick={() => {name !='cockpit' && (state.accessory = name)}}>
            {
                name !='cockpit'
                ?<img id={name} style={{ borderRadius: "10%" , }} src={sizeImage} alt={name} />
                :<img id={name} style={{ borderRadius: "10%" , filter: "grayscale(100%)" }} src={sizeImage} alt={name} />
            }
            <p>{name}</p>
        </div>
    )
}