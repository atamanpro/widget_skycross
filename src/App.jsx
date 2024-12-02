import { MantineProvider } from '@mantine/core';
import WidgetWindow from './components/MainWidgetWindow';
import Widget from "./components/WidgetOnPage/Widget.jsx";

function App() {

  return (
    <MantineProvider>
    <Widget>
      <WidgetWindow/>
    </Widget>
  </MantineProvider>
  );
}

export default App;