import styles from './react-pub.module.css'

/* eslint-disable-next-line */
export interface ReactPubProps {}

export function ReactPub(props: ReactPubProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactPub!</h1>
    </div>
  )
}

export default ReactPub
