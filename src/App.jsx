import { BrowserRouter } from "react-router-dom";

import { Main, Description } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
				<Main />
				<Description />
      </div>
    </BrowserRouter>
  );
}

export default App;
