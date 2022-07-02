export interface PokemonI {
  id: number
  name: string
  moves: string[]
  types: string[]
  stats: StatsI
  sprites: SpritesI
  description: string
  preEvolution?: PreEvolution
  postEvolution?: PostEvolution
}

interface PreEvolution {
  name: string
  url: string
}

interface PostEvolution {
  name: string
  url: string
}

interface StatsI {
  attack: number
  defense: number
  hp: number
  specialattack: number
  specialdefense: number
  speed: number
}
interface SpritesI {
  back_default: string
  front_default: string
  back_shiny: string
  front_shiny: string
}
