export const Linkcard = ({ link, cb }) => {
    const removeLink = id => {
        cb && cb(id);
    };
    
    return (
        <>
            <h2>Ссылка</h2>

            <p>Откуда: <a href={ link.to } target="_blank" rel="noopener noreferrer">{ link.to }</a></p>
            <p>Короткая ссылка: <a href={ link.from } target="_blank" rel="noopener noreferrer">{ link.from }</a></p>
            <p>Дата создания: <strong>{ new Date(link.date).toLocaleDateString() }</strong></p>
            <p>Количество кликов по ссылке: <strong>{ link.clicks }</strong></p>
            <button onClick={() => removeLink(link._id)}>Удалить ссылку</button>
        </>
    );
};