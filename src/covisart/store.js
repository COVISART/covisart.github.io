import { proxy } from 'valtio'

const state = proxy({
  name: "",
  phone:"0",
  email:"",
  ruler: false,
  sizes: ["450", "850"],
  size: '450',
  accessories:['JustSim','RaceSeat', 'cockpit' ],
  accessory:'JustSim',
  colors: ['grey','black', 'blue', 'goldenrod', 'azure', 'lightslategray' ],
  decals: ['react', 'three2', 'pmndrs'],
  color: 'grey',
  led: '#FF0000',
  decal: 'three2',
  motors: ['BECKHOFF_AM8552', 'BECKHOFF_AM8052'],
  motor: 'BECKHOFF_AM8552',
  speed: 1,
})

export { state }