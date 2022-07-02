import styles from '../styles/Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.container}>
      <picture>
        <img
          className={styles.spinner}
          src="tumblr_mw9lr1FUNx1scncwdo1_500.gif"
          alt=""
        />
      </picture>
    </div>
  )
}

export default Loading
