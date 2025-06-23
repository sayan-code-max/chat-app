
import './App.css';
import Index from './components/pages';
import Auth from './components/auth/Auth';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('user');
  });

  return (
    <>
      {isLoggedIn ? <Index /> : <Auth onLogin={() => setIsLoggedIn(true)} />}
    </>
  );
}

export default App;
