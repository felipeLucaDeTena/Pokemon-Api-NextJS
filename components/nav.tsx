/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from '../styles/Nav.module.css'
import SearchBar from './searchbar'

const Nav = ({ searchData }: any) => {
  return (
    <div className={styles.container}>
      <picture>
        <img className={styles.logo} src="/pokeLogo.png" alt="none" />
      </picture>
      <SearchBar searchData={searchData} />
    </div>
  )
}
export default Nav
