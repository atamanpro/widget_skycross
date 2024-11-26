import { MantineProvider } from '@mantine/core';
// import Header from "./components/BlockHeader/Header.jsx";
// import MainBlock from './components/MainBlock/MainBlock.jsx';
// import Footer from './components/Footer/Footer.jsx';
import WidgetWindow from './components/MainWidgetWindow';
import Widget from "./components/WidgetOnPage/Widget.jsx";

function App() {

  return (
    <MantineProvider>
    <Widget>
      <WidgetWindow/>
    </Widget>
  </MantineProvider>
    // <MantineProvider>
    // {/* <Header />
    // <MainBlock />
    // <Footer /> */}
    // {/* <WidgetWindow/> */}
    // <Widget/>
    // </MantineProvider>
  );
}

export default App;