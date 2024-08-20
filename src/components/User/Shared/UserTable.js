import React from 'react'
import { base64ToBlobUrl } from '../../../utils/fileProcessing'
import { PhotoProvider, PhotoView } from 'react-photo-view'

const UserTable = ({ userList, handleEditUser, handleDeleteUser }) => {
    return (
        <table className="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Email</th>
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {userList && userList.map(user =>
                    <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>
                            {
                                user.image ?
                                    <PhotoProvider>
                                        <PhotoView src={base64ToBlobUrl(user.image)}>
                                            <img className="img-in-table" src={base64ToBlobUrl(user.image)} alt="avatar" />
                                        </PhotoView>
                                    </PhotoProvider>
                                    :
                                    <>No image!</>
                            }
                        </td>
                        <td>
                            <div className="button-list">
                                <button onClick={() => handleEditUser(user)} className="btn btn-success">Edit</button>
                                <button onClick={() => handleDeleteUser(user)} className="btn btn-danger">Delete</button>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default UserTable