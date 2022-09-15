import logo_white from "../images/logo-white.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo_white} alt="Логотип: Место" />
    </header>
  );
}

export default Header;
