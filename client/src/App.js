import "./App.css";
import { CreateVideo, SignIn } from "./components";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react"; // ADDED: Import useEffect to apply theme on mount/update

import { useSelector } from "react-redux"; //
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import { ErrorPage, MyVideoPage, VideoPlayer } from "./pages/indexOfPages";
import { Footer } from "./container";
import SignUp from "./components/SignIn/SignUp";
import CategoryPage from "./components/categories/CategoryPage";

function App() {
  const location = window.location.pathname;
  const user = useSelector((state) => state.user.currentUser);
  const theme = useSelector((state) => state.theme); // ADDED: Get theme state from Redux
  const history = useHistory();

  // ADDED: Apply theme to document element whenever theme changes
  useEffect(() => {
    // Construct theme value: if color is default, use just mode, otherwise use mode-color
    const themeValue = theme.color === 'default' 
      ? theme.mode 
      : `${theme.mode}-${theme.color}`;
    
    // Set data-theme attribute on html element - this triggers CSS variable changes
    document.documentElement.setAttribute('data-theme', themeValue);
    
    // Apply background color to html, body, and root for smooth transitions
    document.documentElement.style.backgroundColor = 'var(--bg-primary)';
    document.body.style.backgroundColor = 'var(--bg-primary)';
    document.body.style.color = 'var(--text-primary)';
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // FIXED: Apply theme background to root element to cover entire page
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.backgroundColor = 'var(--bg-primary)';
      rootElement.style.transition = 'background-color 0.3s ease';
    }
  }, [theme.mode, theme.color]); // Re-run when theme mode or color changes
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/video/:videoId" component={VideoPlayer} />
          <Route exact path="/signin">
            {!user ? <SignIn /> : <ErrorPage />}
          </Route>
          <Route exact path="/signup">
            {!user ? <SignUp /> : <ErrorPage />}
          </Route>
          <Route exact path="/create-video">
            {!user ? <Redirect to="/signin" /> : <CreateVideo />}
          </Route>
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/my-videos" component={MyVideoPage} />
          <Route
            exact
            path="/category/:categoryName"
            component={CategoryPage}
          />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
