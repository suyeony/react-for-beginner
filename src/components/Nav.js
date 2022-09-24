import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <li className={styles.nav_list}>
        <Link to={process.env.PUBLIC_URL + "/"}>Movies</Link>
      </li>
      <li className={styles.nav_list}>
        <Link to={process.env.PUBLIC_URL + "/search"}>Search</Link>
      </li>
    </nav>
  );
}

export default Nav;
