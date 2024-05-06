import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

const PrivateRouter = () => {
    return (
        <div>
            <div>
                Public Router
            </div>
            <Outlet />
        </div>
    );
};

export default PrivateRouter;