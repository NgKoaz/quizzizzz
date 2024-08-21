import React, { useCallback, useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import "./UserManagement.scss"
import { deleteUser, getUsers } from '../../../api/userApi';
import UserTable from '../../User/Shared/UserTable';
import CreatingModal from '../../User/Shared/CreatingModal';
import EdittingModal from '../../User/Shared/EdittingModal';
import ReactPaginate from 'react-paginate';
import ConfirmModal from '../../User/Shared/ConfirmModal';


const UserManagement = () => {
    const [showCreatingModal, setShowCreatingModal] = useState(false)
    const [showEdittingModal, setShowEdittingModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [userList, setUserList] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [totalUser, setTotalUser] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentEditUser, setCurrentEditUser] = useState(null)
    const [currentDeleteUser, setCurrentDeleteUser] = useState(null)


    const handleEditUser = (user) => {
        setCurrentEditUser(user);
        setShowEdittingModal(true);
    }

    const handleDeleteUser = (user) => {
        setCurrentDeleteUser(user);
        setShowConfirmModal(true);
    }

    const getUserList = useCallback(async () => {
        const res = await getUsers(currentPage);
        setPageCount(res.DT?.totalPages)
        setTotalUser(res.DT?.totalRows)
        setUserList(res.DT?.users?.reverse())
    }, [currentPage])


    useEffect(() => {
        getUserList()
    }, [getUserList])


    return (
        <>
            <div className="user-management-content">
                <h1>User Management</h1>
                <button
                    onClick={() => setShowCreatingModal(true)}
                    className="create-btn icon-container"
                >
                    <IoIosAddCircleOutline className="icon" />
                    <span className="text">Create new user</span>
                </button>
                <p>Total users: {totalUser}</p>
                <UserTable userList={userList} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
                <nav aria-label="Page navigation comments" className="mt-4">
                    {pageCount > 0 &&
                        <ReactPaginate
                            previousLabel="previous"
                            nextLabel="next"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={pageCount}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                            // eslint-disable-next-line no-unused-vars
                            hrefBuilder={(page, pageCount, selected) =>
                                page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                            }
                            hrefAllControls
                            forcePage={currentPage - 1}
                        />
                    }
                </nav>

                <CreatingModal
                    show={showCreatingModal} setShow={setShowCreatingModal}
                    setCurrentPage={setCurrentPage} getUserList={getUserList}
                />
                <EdittingModal
                    show={showEdittingModal} setShow={setShowEdittingModal}
                    currentEditUser={currentEditUser}
                    getUserList={getUserList}
                />
                <ConfirmModal
                    title="Delete a user"
                    bodyText={`Do you want delete user having Id: ${currentDeleteUser?.id} ?`}
                    buttonText="Delete"
                    currentDeleteUser={currentDeleteUser}
                    show={showConfirmModal}
                    setShow={setShowConfirmModal}
                    setCurrentPage={setCurrentPage}
                    getUserList={getUserList}
                />
            </div>
        </>
    )
}

export default UserManagement