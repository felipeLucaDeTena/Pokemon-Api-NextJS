/* eslint-disable @typescript-eslint/no-explicit-any */

import styles from '../styles/Nav.module.css'

function SearchBar({ searchData }: any) {
  const handleSubmit = (e: any) => {
    console.log(e.target.value)
  }

  return (
    <>
      <input
        className={styles.searchBar}
        type="text"
        onSubmit={(e) => handleSubmit(e)}
        placeholder="Search Pokemon"
      />
    </>
  )
}

export default SearchBar
