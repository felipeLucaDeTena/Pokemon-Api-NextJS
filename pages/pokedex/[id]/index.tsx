/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from 'next/head'
import styles from '../../../styles/Pokedetail.module.css'
import Nav from '../../../components/nav'
import { colors } from '../../../data/colors'
import axios from 'axios'
import { icons } from '../../../data/icons'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function PokemonDetail({ pokemon, specie, evolution }: any) {
  const [pokeEvo, setPokeEvo] = useState('' as any)
  const [pokePreEvo, setPokePreEvo] = useState('' as any)

  const stats = pokemon.stats.map((e: any) => {
    return { [e.stat.name]: e.base_stat }
  })
  const descriptions = specie.flavor_text_entries.filter(
    (e: any) => e.language.name === 'en'
  )

  const preEvo = specie.evolves_from_species

  const router = useRouter()
  let pageId = pokemon.id

  function handlePrevious() {
    if (pokemon.id >= 1) {
      pageId -= 1
      router.push(`${pageId}`)
    }
  }
  function handleNext() {
    if (pokemon.id <= 898) {
      pageId += 1
      router.push(`${pageId}`)
    }
  }

  function evolvesTo() {
    let evo: any
    if (
      evolution.chain.species.name === pokemon.name &&
      evolution.chain.evolves_to.length !== 0
    ) {
      evo = evolution.chain.evolves_to[0].species
    } else {
      evolution.chain.evolves_to.find((e: any) =>
        e.evolves_to.length !== 0 && e.species.name === pokemon.name
          ? (evo = e.evolves_to[0].species)
          : e.evolves_to.find((el: any) => {
              if (el.species.name === pokemon.name) {
                evo = undefined
              }
            })
      )
    }
    return evo
  }

  useEffect(() => {
    const evo = evolvesTo()
    async function fetchUrlData(url: any) {
      const response = await axios.get(url)
      return await response.data
    }
    if (evo !== undefined) {
      const EVO_URL = evo.url.replace(
        'https://pokeapi.co/api/v2/pokemon-species/',
        'https://pokeapi.co/api/v2/pokemon/'
      )
      fetchUrlData(EVO_URL).then((resp) => setPokeEvo(resp))
    } else {
      setPokeEvo(undefined)
    }
    if (preEvo !== null) {
      const PREEVO_URL = preEvo.url.replace(
        'https://pokeapi.co/api/v2/pokemon-species/',
        'https://pokeapi.co/api/v2/pokemon/'
      )
      fetchUrlData(PREEVO_URL).then((resp) => setPokePreEvo(resp))
    } else {
      setPokePreEvo(null)
    }
  }, [pokemon])
  console.log(pokemon)

  return (
    <>
      <Head>
        <title>Pokemon API</title>
      </Head>
      <div className={styles.container}>
        <Nav />
        <div className={styles.pageContainer}>
          <button
            onClick={() => handlePrevious()}
            className={styles.paginationButton}
          >
            <FaArrowLeft />
          </button>
          <div
            className={styles.cardContainer}
            style={{
              background: `linear-gradient(to top,${
                colors[pokemon.types[0].type.name]
              } 80%,    #ffffff5a 20%)`,
            }}
          >
            <img
              className={styles.sprite}
              src={
                pokemon.sprites.other.dream_world.front_default ||
                pokemon.sprites.front_default
              }
              alt=""
            />
            <div className={styles.headerContainer}>
              <h1 className={styles.name}>{pokemon.name}</h1>
              <div className={styles.idContainer}>
                <div className={styles.iconsContainer}>
                  <div className={styles.iconWrapper}>
                    <img
                      className={styles.icons}
                      src={icons[pokemon.types[0].type.name]}
                      alt=""
                    />
                  </div>
                  {pokemon.types.length > 1 && (
                    <div className={styles.iconWrapper}>
                      <img
                        className={styles.icons}
                        src={icons[pokemon.types[1].type.name]}
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <p
                  className={styles.name}
                  style={{ color: `${colors[pokemon.types[0].type.name]}` }}
                >
                  #
                </p>
                <p className={styles.name}>{pokemon.id}</p>
              </div>
            </div>
            <div className={styles.wrapperContainer}>
              <div className={styles.innerwrapperContainer}>
                <div className={styles.firstContainer}>
                  <div className={styles.statsContainer}>
                    <h4
                      className={styles.title}
                      style={{ color: `${colors[pokemon.types[0].type.name]}` }}
                    >
                      Stats
                    </h4>
                    {stats.map((stat: any) => (
                      <div
                        className={styles.statContainer}
                        key={Object.keys(stat) as unknown as string}
                      >
                        <label htmlFor="poke_stat">{Object.keys(stat)}</label>
                        <meter
                          id="poke_stat"
                          min="0"
                          max="100"
                          value={stat[Object.keys(stat) as unknown as string]}
                        ></meter>
                      </div>
                    ))}
                  </div>
                  <div className={styles.description}>
                    <p>{descriptions[0].flavor_text}</p>
                    <img
                      className={styles.sprites}
                      src={pokemon.sprites.front_default}
                      alt=""
                    />
                    <img
                      className={styles.sprites}
                      src={pokemon.sprites.back_default}
                      alt=""
                    />
                    <img
                      className={styles.sprites}
                      src={pokemon.sprites.front_shiny}
                      alt=""
                    />
                    <img
                      className={styles.sprites}
                      src={pokemon.sprites.back_shiny}
                      alt=""
                    />
                  </div>
                </div>
                <div className={styles.firstContainer}>
                  <div className={styles.movesContainer}>
                    <h4
                      className={styles.title}
                      style={{ color: `${colors[pokemon.types[0].type.name]}` }}
                    >
                      Move Set
                    </h4>
                    <div className={styles.movesInnerContainer}>
                      {pokemon.moves.map((move: any) => (
                        <p
                          className={styles.moves}
                          key={move.name}
                        >{`${move.move.name} `}</p>
                      ))}
                    </div>
                  </div>
                  <div className={styles.evoSpritesContainer}>
                    {pokePreEvo && pokePreEvo !== null && (
                      <img
                        className={styles.evoSprites}
                        src={pokePreEvo.sprites.front_default}
                        alt=""
                      />
                    )}
                    {pokeEvo && pokeEvo !== (undefined || pokemon.name) && (
                      <img
                        className={styles.evoSprites}
                        src={pokeEvo.sprites.front_default}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.aboutContainer}>
                <h4
                  className={styles.title}
                  style={{ color: `${colors[pokemon.types[0].type.name]}` }}
                >
                  About this pokemon
                </h4>
                <div className={styles.typeContainer}>
                  <p>Type : </p>
                  <p
                    className={styles.type}
                    style={{ color: `${colors[pokemon.types[0].type.name]}` }}
                  >
                    {pokemon.types[0].type.name}
                  </p>
                  {pokemon.types.length > 1 && (
                    <>
                      <p>/</p>
                      <p
                        className={styles.type}
                        style={{
                          color: `${colors[pokemon.types[1].type.name]}`,
                        }}
                      >
                        {pokemon.types[1].type.name}
                      </p>
                    </>
                  )}
                </div>

                {specie.habitat ? (
                  <p>Habitat : {specie.habitat.name}</p>
                ) : (
                  <p> Habitat : Unknown</p>
                )}

                <p> Generation : {specie.generation.name || 'unknown'}</p>

                <div>
                  <div>
                    <p> Abilities :</p>
                    {pokemon.abilities.map((e: any) => (
                      <p key={e.slot}>{e.ability.name}</p>
                    ))}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleNext()}
            className={styles.paginationButton}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const page = context.query.id
  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${page}`)
  const pokemon = await result.data
  const result2 = await await axios.get(pokemon.species.url)
  const specie = result2.data
  const result3 = await await axios.get(specie.evolution_chain.url)
  const evolution = result3.data
  return { props: { pokemon: pokemon, specie: specie, evolution: evolution } }
}

export default PokemonDetail
