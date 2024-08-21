import { ToastContainer } from 'react-toastify';
import './App.scss';
import PageRoute from './components/PageRoute';
import "nprogress/nprogress.css";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return (
        <>
            <ToastContainer />
            <PageRoute />
        </>
    );
}

export default App;
