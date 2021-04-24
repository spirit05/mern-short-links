import { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkList } from '../components/LinkList';

export const LinksPage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [ links, setLinks ] = useState([]);

    const getLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link/links', 'GET', null, { Auhtorization: `Bearer ${ token }`});
            setLinks(fetched);
        } catch(e) {}
    }, [token, request]);

    useEffect(() => {
        getLinks();
    }, [getLinks]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            { !loading && links && <LinkList links={ links }/> }
        </>
    );
};