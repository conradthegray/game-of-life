import Menu from '../Menu';

const Header = () => (
  <header className="flex justify-between items-center">
    <h1 className="text-3xl font-bold">Game of Life</h1>
    <Menu />
  </header>
);

export default Header;
