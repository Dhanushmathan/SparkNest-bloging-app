import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Search from './components/Search';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePostModal from './pages/CreatePost';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {

  const { pathname } = useLocation();

  return (
    <div className='min-h-screen font-poppins'>
      {pathname !== '/search' && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path={`/:username/dashboard/`} element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/overlay/create-posts" element={<CreatePostModal />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {pathname !== '/search' && <Footer />}
    </div>
  )
}

export default App;