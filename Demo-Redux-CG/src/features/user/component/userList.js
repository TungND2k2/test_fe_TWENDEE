import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUsers} from "../redux/actions/user.acction";
import {useNavigate, useSearchParams} from "react-router-dom";

export default function Users() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector((state) => {
    return state.users.users.results
    })
    const [page, setPage] = useSearchParams()
    const currentPage = page.get('page') || 1;
    const results = useSelector(state => {
        if (state.users.users.info !== undefined) {
            return state.users.users.info.results;
        }
        return 10
    })
    const totalPages = 10;
    const handleSortByName = async (event) => {
        dispatch(getUsers([currentPage, results,Number(event.target.value)]))
    }
    useEffect(() => {
        dispatch(getUsers([currentPage, results]))
    }, [])
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name <select onChange={handleSortByName}>
                        <option value="3">Default</option>
                        <option value="3">A-Z</option>
                        <option value="4">Z-A</option>
                    </select>
                    </th> <th scope="col">User Name <select onChange={handleSortByName}>
                        <option value="3">Default</option>
                        <option value="1">A-Z</option>
                        <option value="2">Z-A</option>
                    </select></th>
                    <th scope="col">Avatar</th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {users !== undefined && users.map((user, index) => (
                        <tr>
                            <th scope="row"></th>
                            <td>{user.name.title + '.' + user.name.first + ' ' + user.name.last}</td>
                            <td>{user.login.username}</td>
                            <td><img src={user.picture.large} alt=""/></td>
                        </tr>
                    )
                )}

                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        {(currentPage <= 1) ?
                            <>
                                <div className="page-link"><span aria-hidden="true"
                                                                 style={{color: 'black'}}>&laquo;</span>
                                </div>
                            </>
                            :
                            <>
                                <div className="page-link" onClick={() => {
                                    dispatch(getUsers([(currentPage - 1), results]));
                                    navigate('?page=' + (currentPage - 1))
                                }
                                }><span aria-hidden="true">&laquo;</span>
                                </div>
                            </>
                        }
                    </li>
                    <li className="page-item"><a className="page-link">{currentPage}/{totalPages}</a></li>
                    <li className="page-item">
                        {(totalPages <= currentPage) ?
                            <>
                                <div className="page-link"><span aria-hidden="true"
                                                                 style={{color: 'black'}}>&raquo;</span>
                                </div>
                            </>
                            :
                            <>
                                <div className="page-link" onClick={() => {
                                    dispatch(getUsers([(Number(currentPage) + 1), results]));
                                    navigate('?page=' + (Number(currentPage) + 1))
                                }
                                }><span aria-hidden="true">&raquo;</span>
                                </div>
                            </>
                        }
                    </li>
                </ul>
            </nav>
        </>
    )
}