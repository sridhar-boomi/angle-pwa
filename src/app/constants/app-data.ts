import { Light } from "../models/light";


export const Lights: Light[] = [
  {
    serie: 'AXA Nxt Serie',
    types: [
      {
        name: '30 Lux',
        angle: 3.6,
      },
      {
        name: '30 Lux steady',
        angle: 3.6,
      },
      {
        name: '45 Lux',
        angle: 3.6,
      },
      {
        name: '45 Lux steady',
        angle: 3.6,
      },
      {
        name: '60 Lux',
        angle: 3.6,
      },
      {
        name: '60 Lux steady',
        angle: 3.6,
      },
      {
        name: '80 Lux',
        angle: 3.6,
      }
    ]
  },
  {
    serie: 'AXA Dwn Serie',
    types: [
      {
        name: 'Front 30 lux',
        angle: -3.4,
      },
      {
        name: 'Front 50 lux',
        angle: -3.4,
      },
      {
        name: 'Front 70 lux',
        angle: 3.6,
      },
      {
        name: 'Front 100 lux',
        angle: 3.6,
      }
    ]
  },
  {
    serie: 'AXA Pico Serie',
    types: [
      {
        name: '30 Lux',
        angle: -1.4,
      }
    ]
  }
]

