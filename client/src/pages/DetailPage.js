import { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook'; 
import { useMessage } from '../hooks/message.hook';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { Linkcard } from '../components/Linkcard';

export const DetailPage = () => {
    const history = useHistory();
    const message = useMessage();
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [ link, setLink ] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, { Auhtorization: `Bearer ${ token }`});

            setLink(fetched);
        } catch (e) {}
    }, [token, linkId, request]);

    const removeLink = async (id) => {
        try {
            const data = await request('/api/link/remove', 'POST', { linkId: id }, { Auhtorization: `Bearer ${ token }`});
            message(data.message);
            history.push('/links');
        } catch(e) {}
    };

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            { 
            !loading &&
             link && 
             <Linkcard 
                link={  link }
                cb={ removeLink }
             /> }
        </>
    );
};