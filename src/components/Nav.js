function Nav() {
  return (
    <nav>
      <a href={process.env.PUBLIC_URL + "/"}>Movies</a>
      <a href="/search">Search</a>
    </nav>
  );
}

export default Nav;
