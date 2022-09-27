import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className={styles.nav_ul}>
        <li className={styles.nav_list}>
          <Link to={process.env.PUBLIC_URL + "/"}>Movies</Link>
        </li>
        <li className={styles.nav_list}>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
