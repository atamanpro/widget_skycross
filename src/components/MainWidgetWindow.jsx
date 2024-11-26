import Header from "../components/BlockHeader/Header.jsx";
import MainBlock from "../components/MainBlock/MainBlock.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./WidgetOnPage/WidgetStyle.scss";

const WidgetWindow = () => {
  return (
    <div className="widgetWindow">
      <Header />
      <div style={{flex: 1, overflowY: "auto"}}>
      <MainBlock />
      </div>
      <Footer />
    </div>
  );
};

export default WidgetWindow;
