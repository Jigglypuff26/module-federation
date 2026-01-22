import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { VueWrapper } from './components/VueWrapper';
import { AngularWrapper } from './components/AngularWrapper';

// Lazy load remote components
const ReactApp = lazy(() => import('reactRemote/App'));

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>🚀 Module Federation Demo</h1>
          <p>Host Application with React, Vue & Angular Remotes</p>
        </header>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/react" className="nav-link">
            React App
          </Link>
          <Link to="/vue" className="nav-link">
            Vue App
          </Link>
          <Link to="/angular" className="nav-link">
            Angular App
          </Link>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/react"
              element={
                <Suspense fallback={<div className="loading">Loading React App...</div>}>
                  <ReactApp />
                </Suspense>
              }
            />
            <Route path="/vue" element={<VueWrapper />} />
            <Route path="/angular" element={<AngularWrapper />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const Home = () => (
  <div className="home">
    <h2>Welcome to Module Federation</h2>
    <p>This is a micro-frontend architecture demonstration using:</p>
    <ul>
      <li>✅ Webpack 5 Module Federation</li>
      <li>✅ React Remote (Port 3001)</li>
      <li>✅ Vue 3 Remote (Port 3002)</li>
      <li>✅ Angular Remote (Port 3003)</li>
    </ul>
    <p>Use the navigation above to explore different micro-frontends!</p>
  </div>
);

export default App;
