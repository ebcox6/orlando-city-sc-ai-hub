import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Synapse from './pages/Synapse';
import Templates from './pages/Templates';
import Advanced from './pages/Advanced';
import Craft from './pages/Craft';
import Socratic from './pages/Socratic';
import Anatomy from './pages/Anatomy';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Resources from './pages/Resources';
import Library from './pages/Library';
import Agents from './pages/Agents';
import Welcome from './pages/Welcome';
import Frameworks from './pages/Frameworks';
import Toast from './components/Toast';

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <Toast />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/synapse" element={<Synapse />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/advanced" element={<Advanced />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/socratic" element={<Socratic />} />
          <Route path="/anatomy" element={<Anatomy />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/library"   element={<Library />} />
          <Route path="/agents"   element={<Agents />} />
          <Route path="/welcome"     element={<Welcome />} />
          <Route path="/frameworks"  element={<Frameworks />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
