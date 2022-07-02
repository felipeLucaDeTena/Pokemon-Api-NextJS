/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from 'axios'
import { PokemonI } from '../interfaces/pokemon-i'

export const getPokemonByPage = async (page: number) => {
  const ALL_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset='
  let firstFetch: any = await axios.get(`${ALL_POKEMON_URL}${page}`)
  firstFetch = firstFetch.data
  const data = await Promise.all(
    firstFetch.results.map(async (pokemon: { url: string }) => {
      const response = await axios.get(pokemon.url)
      const data = await response.data
      return data
    })
  )
  return data
}

const getPokemonInfo = (id: number) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((resp) => {
    return resp.data
  })
}

const getDetailInfo = async (url: string) => {
  const data = axios.get(url).then((resp) => {
    return resp.data
  })
  return data
}

export const getAllPokeInfo = async (pokeId: number): Promise<PokemonI> => {
  const pokeInfo = await getPokemonInfo(pokeId)
  const specieInfo = await getDetailInfo(pokeInfo.species.url)
  let moves = pokeInfo.moves.map((e: any) => e.move.name)

  if (moves.length < 1) {
    const data = await getPokemonInfo(specieInfo.id)
    const responseMoves = data.moves
    moves = responseMoves.map((e: any) => e.move.name)
  }
  const types = pokeInfo.types.map((e: any) => e.type.name)
  let stats = {
    attack: 0,
    defense: 0,
    hp: 0,
    specialattack: 0,
    specialdefense: 0,
    speed: 0,
  }
  pokeInfo.stats.forEach((e: any) => {
    const newStat = {
      [e.stat.name]: e.base_stat,
    }
    stats = { ...stats, ...newStat }
  })
  const { id, name, sprites } = pokeInfo

  const description: string = specieInfo.flavor_text_entries[0].flavor_text

  const preEvolution = specieInfo.evolves_from_species
  let postEvolution
  const evolutionChain = specieInfo.evolution_chain.url
  const evolutionInfo = await getDetailInfo(evolutionChain)
  if (evolutionInfo.chain.species.name === pokeInfo.name) {
    postEvolution = evolutionInfo.chain.evolves_to
  } else {
    evolutionInfo.chain.evolves_to.forEach((e: any) => {
      if (e.species.name === pokeInfo.name) {
        postEvolution = e.evolves_to
      } else {
        e.evolves_to.forEach((subE: any) => {
          if (subE.species.name === pokeInfo.name) {
            postEvolution = pokeInfo.name
          }
        })
      }
    })
  }

  return {
    moves: [...moves],
    types: [...types],
    stats,
    id,
    name,
    sprites,
    description,
    preEvolution,
    postEvolution,
  }
}
