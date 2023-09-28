import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#5D676D','#3D3C3E', '#0F244A' ],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#3D3C3E',
  led: '#FF0000',
  decal: 'three2',
  motors: ['BECKHOFF_AM8552', 'BECKHOFF_AM8052'],
  motor: 'BECKHOFF_AM8552',
})

export { state }