/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from '../styles/Nav.module.css'

function Select() {
  return (
    <>
      <select className={styles.select} name="pokemon" id="cars">
        <option value="normal">Normal</option>
        <option value="grass">Grass</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
      </select>
    </>
  )
}

export default Select
