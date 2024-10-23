import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ChannelContextProvider from "./contexts/ChannelContextProvider";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/sign-in" Component={SignIn} />
          <Route path="/sign-up" Component={SignUp} />
          <Route
            path="/dashboard"
            element={
              <ChannelContextProvider>
                <Dashboard></Dashboard>
              </ChannelContextProvider>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
