import { MantineProvider } from '@mantine/core';
import Header from "./components/BlockHeader/Header.jsx";
import MainBlock from './components/MainBlock/MainBlock.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {

  return (
    <MantineProvider>
    <Header />
    <MainBlock />
    <Footer />
    </MantineProvider>
  );
}

export default App;
