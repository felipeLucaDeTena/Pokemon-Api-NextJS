/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextPage } from 'next'
import Nav from '../../components/nav'
import { colors } from '../../data/colors'
import { icons } from '../../data/icons'
import styles from '../../styles/Pokedex.module.css'
import { FaArrowLeft } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

let page: number

const Pokedex: NextPage = ({ data, searchData }: any) => {
  const router = useRouter()
  page = parseInt(router.query.page as string)

  function handlePrevious() {
    if (page >= 10) {
      page -= 10
      router.push(`pokedex/?page=${page}`)
    }
  }
  function handleNext() {
    if (page <= 898) {
      page += 10
      router.push(`pokedex/?page=${page}`)
    }
  }

  return (
    <>
      <Head>
        <title>Pokemon API</title>
      </Head>
      <div className={styles.container}>
        <Nav searchData={searchData} />
        <div className={styles.pageContainer}>
          <button
            onClick={() => handlePrevious()}
            className={styles.paginationButton}
          >
            <FaArrowLeft />
          </button>
          <div className={styles.cardContainer}>
            {data.map((pokemon: any) => (
              <Link key={pokemon.id} href={`/pokedex/${pokemon.id}`}>
                <div
                  style={{
                    background: `linear-gradient(to top,${
                      colors[pokemon.types[0].type.name]
                    } 60%,    #ffffff34 40%)`,
                  }}
                  className={styles.card}
                >
                  <img
                    className={styles.sprites}
                    src={
                      pokemon.sprites.other.dream_world.front_default ||
                      pokemon.sprites.front_default
                    }
                    alt=""
                  />
                  <h2 className={styles.name}>{pokemon.name}</h2>

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
                </div>
              </Link>
            ))}
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
  // Fetch data from external API
  page = context.query.page

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
  let searchFetch: any = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0'
  )
  searchFetch = await searchFetch.data
  const searchData = searchFetch.results.map((e: any) => ({
    name: e.name,
    id: e.url
      .replace('https://pokeapi.co/api/v2/pokemon/', '')
      .replace('/', ''),
  }))

  return { props: { data: data, searchData: searchData } }
}

export default Pokedex
