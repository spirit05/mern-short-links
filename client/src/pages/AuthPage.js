import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const [ form, setForm ] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            message(data.message);
        } catch(e) {}
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId);
        } catch(e) {}
    };

    const pressHandler = e => {
        if (e.key === 'Enter') loginHandler();
    }

    return (
        <div className="row">
            <div className="col s6offset-s3">
                <h1>Сокращение ссылок</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                      <span className="card-title">Авторизация</span>
                      <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                className="yellow-input"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Введите email"
                                value={ form.email }
                                onChange={ changeHandler }
                                autoComplete="off"
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Пароль</label>
                            <input 
                                className="yellow-input"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Введите пароль"
                                value={ form.password }
                                onChange={ changeHandler }
                                onKeyPress={ pressHandler }
                            />
                      </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{ marginRight: 10 }}
                            onClick={ loginHandler }
                            disabled={ loading }
                        >
                            Войти
                        </button>
                        <button 
                            className="btn lighten-1 black-text"
                            onClick={ registerHandler }
                            disabled={ loading }
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};