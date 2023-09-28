import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#5D676D','#353934', '#0F244A' ],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#353934',
  led: '#FF0000',
  decal: 'three2',
  motors: ['BECKHOFF_AM8552', 'BECKHOFF_AM8052'],
  motor: 'BECKHOFF_AM8552',
})

export { state }