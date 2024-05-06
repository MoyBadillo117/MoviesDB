import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

const PrivateRouter = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default PrivateRouter;