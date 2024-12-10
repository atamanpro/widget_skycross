import logo from "../../assets/logoSkyCross.svg";
import arrowLeft from "../../assets/ArrowLeft.svg";
import "./HeaderStyle.scss";

const Header = () => {
  return (
    <div className="BoxHeader">
      <div className="boxArrowHeader">
        <img src={arrowLeft} alt="Arrow Left" style={{ width: '12px', height: '12px' }} />
      </div>
      <p className="headerText">Виктория</p>
      <img src={logo} alt="Logo" className="logoHeader" />
    </div>
  );
};

export default Header;
