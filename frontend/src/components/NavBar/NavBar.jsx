import "./NavBar.css";

function NavBar() {
  return (
    <>
      <ul>
        <li>
          <a className="active" href="/">
            Home
          </a>
        </li>
        <li>
          <a href="/add-movie">Add Movie</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </>
  );
}
export default NavBar;
