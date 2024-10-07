import SigninForm from './_auth/forms/SigninForm';
import { Home } from './_root/pages';
import './globals.css';
import {Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <main className='flex h-screen'>

      <Routes>
        {/* Public routes */}
        <Route path='/sign-in' element={<SigninForm />} />

        {/* Private routes */}

        <Route index element={<Home />} />
      </Routes>

    </main>
  )
}

export default App