import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BlogListPage from './pages/BlogListPage';
import SingleBlogPage from './pages/SingleBlogPage';
import CreateEditBlogPage from './pages/CreateEditBlogPage';
import ProfilePage from './pages/ProfilePage';
import './styles/global.css';

// Wrapper component to handle location and animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><BlogListPage /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><SignupPage /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/blogs" element={<PageWrapper><BlogListPage /></PageWrapper>} />
        <Route path="/blogs/:id" element={<PageWrapper><SingleBlogPage /></PageWrapper>} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><PageWrapper><CreateEditBlogPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><PageWrapper><CreateEditBlogPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><PageWrapper><ProfilePage /></PageWrapper></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

// Simple animation wrapper for pages
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
