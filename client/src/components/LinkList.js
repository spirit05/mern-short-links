import { Link } from 'react-router-dom';

export const LinkList = ({ links }) => {
    if (links.length === 0) {
        return <p style={{ textAlign: 'center', padding: '2rem' }}>У вас пока нет ссылок <Link to="/create">создать</Link></p>
    }
    return (
        <table>
              <thead>
                <tr>
                    <th>№</th>
                    <th>Ссылка</th>
                    <th>Сокращенная ссылка</th>
                    <th>Информация</th>
                </tr>
              </thead>

              <tbody>
                  {
                      links.map((link, idx) => {
                          return (
                              <tr key={ link._id }>
                                  <td>{ ++idx }</td>
                                  <td>{ link.to }</td>
                                  <td>{ link.from }</td>
                                  <td><a href={ `/detail/${link._id}` } rel="noreferrer noopener">подробнее</a></td>
                              </tr>
                          )
                      })
                  }
              </tbody>
            </table>
    );
};