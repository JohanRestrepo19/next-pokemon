export type PokemonMetaData = {
  name: string
  url: string
}

type Ability = {
  is_hidden: boolean
  slot: number
  ability: { name: string; url: string }
}

type Stat = {
  base_stat: number
  effort: number
  stat: { name: string; url: string }
}

type Sprites = {
  back_default: string
  back_female: null
  back_shiny: string
  back_shiny_female: null
  front_default: string
  front_female: null
  front_shiny: string
  front_shiny_female: null
  other?: {
    dream_world: { front_default: string }
    home: Home
    'official-artwork': { front_default: string }
  }
}

export type Pokemon = {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: Ability[]
  sprites: Sprites
  stats: Stat[]
}
