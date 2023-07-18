import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Login, MyNotes, Signup, SingleNote, Profile } from './index';
import Header from '../screens/Header/Header';
import Footer from '../screens/Footer/Footer';
import CreateNote from './CreateNote';
import { useState } from 'react';

function App() {

  const [search, setSearch] = useState('');

  return (
    <div className="App">
      <Router >
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/mynotes' element={<MyNotes search={search} />}></Route>
            <Route path='/createnote' element={<CreateNote />}></Route>
            <Route path="/note/:id" element={<SingleNote />} />
          </Routes>
        </main>

      </Router>
      <Footer />
    </div>
  );
}

export default App;
