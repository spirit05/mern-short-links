import { useContext } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = e => {
        e.preventDefault();

        auth.logout();

        history.push('/');
    };

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem'}}>
                <span className="brand-logo">Сокращение ссылки</span>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Сократить</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><a href="/" onClick={ logoutHandler }>Выход</a></li>
                </ul>
            </div>
        </nav>
    );
};