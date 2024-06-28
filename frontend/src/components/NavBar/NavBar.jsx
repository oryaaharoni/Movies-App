import styled from "styled-components";

const Navbar = styled.div`
  font-family: cursive;
  display: flex;
  background-color: #333;
  padding: 20px;
  gap: 10px;
`;

const Name = styled.a`
  text-decoration: none;
  color: white;
  font-family: cursive;

  &:hover {
    color: #799ac5;
  }
`;

function NavBar() {
  return (
    <Navbar>
      <Name href="/">Home</Name>
      <Name href="/add-movie">Add Movie</Name>
    </Navbar>
  );
}
export default NavBar;
