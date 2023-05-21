import './App.css';

import Header from './components/Pages/Header';
import Search from './components/Pages/Search';
import Footer from './components/Pages/Footer';
import { backdropClasses } from '@mui/material';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Header />
      <Search />
      <Footer />
    </div >
  );
}

export default App;
