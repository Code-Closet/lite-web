import Footer from "footer";
import { BrowserRouter } from "react-router-dom";
import { AuthGuard } from "./auth/AuthGuard";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AuthGuard />
      </BrowserRouter>
      <Footer />
    </Fragment>
  );
}

export default App;
