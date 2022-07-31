import Logo from "../images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="" />
        <span>Menu CRUD</span>
      </div>
    </header>
  );
};

export default Header;
