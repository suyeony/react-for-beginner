import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav>
      <a className={styles.nav_a} href={process.env.PUBLIC_URL + "/"}>
        Movies
      </a>
      <a className={styles.nav_a} href="/search">
        Search
      </a>
    </nav>
  );
}

export default Nav;
