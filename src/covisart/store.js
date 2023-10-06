import { proxy } from 'valtio'

const state = proxy({
  ruler: false,
  cockpit: false,
  raceseat: false,
  size: ["medium", "large"],
  colors: ['grey','black', 'green' ],
  decals: ['react', 'three2', 'pmndrs'],
  color: 'grey',
  led: '#FF0000',
  decal: 'three2',
  motors: ['BECKHOFF_AM8552', 'BECKHOFF_AM8052'],
  motor: 'BECKHOFF_AM8552',
  speed: 1
})

export { state }