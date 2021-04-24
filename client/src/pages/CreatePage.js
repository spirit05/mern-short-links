import { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [ link, setLink ] = useState('');

    const addLinkHandler = async () => {
        try {
            const data = await request('/api/link/generate', 'POST', { to: link }, { Auhtorization: `Bearer ${ auth.token }`});

            history.push(`/detail/${data.link._id}`)
        } catch(e) {}
    };

    const pressHandler = e => {

        if (e.key === 'Enter') {
            addLinkHandler();
        }
    };

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={ link }
                        onChange={ e => setLink(e.target.value) }
                        onKeyPress={ pressHandler }
                    />
                    <label htmlFor="link">Введите ссылку</label> 
                </div>
                <button onClick={ addLinkHandler }>Сократить</button>
            </div>
        </div>
    );
};