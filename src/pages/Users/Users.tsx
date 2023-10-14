import React, { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from 'react-router-dom'
import './Users.css'
import Modal from "../Modal";
import UsersTable from "./UsersTable";
import { variables } from "../../Variables";

function Users() {
    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);
    const navigate = useNavigate();
    const users = useUserStore(state => state.users);
    const getUsers = useUserStore(state => state.getUsers);

    const [checkedIds, setCheckedIds] = useState([] as Number[]);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            if (users[0]?.email && user?.id) {
                if (users.find(oneUser => (oneUser.id == user.id && oneUser.status == 'Blocked')) || !users.find(oneUser => oneUser.id == user.id)) {
                    logout();
                    navigate('/');
                }
            }
            else {
                logout();
                navigate('/');
            }
        }


    }, [users]);

    useEffect(() => {
        if (users[0]?.email) {
            const userCheck = document.getElementById('checkAll') as HTMLInputElement;
            if (checkedIds.length == 0) {
                userCheck!.indeterminate = false;
                userCheck!.checked = false;
            }
            else if (checkedIds.length == users.length) {
                userCheck!.indeterminate = false;
                userCheck.checked = true;

            }
            else {
                userCheck!.indeterminate = true;
            }
        }
    }, [checkedIds]);

    const handleBlockButton = async (isUnblock: string) => {
        if (checkedIds.length > 0) {
            try {
                let response = await fetch(variables.API_URL + '/user/' + isUnblock + 'block?userIds=' + checkedIds.join('_'), {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                let data = await response.text();
                console.log(data);
            } catch (error) {
                alert(error);
            }
            getUsers();
        }
        else {
            console.log('There is no checked Ids');
        }
    }

    const handleDeleteButton = async () => {
        if (checkedIds.length > 0) {
            try {
                let response = await fetch(variables.API_URL + '/user/delete?userIds=' + checkedIds.join('_'), {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                let data = await response.text();
                console.log(data);
            } catch (error) {
                alert(error);
            }
            getUsers();
            setCheckedIds([]);
        }
        else {
            console.log('There is no checked Ids');
        }
    }

    return (
        <div className="position-absolute d-flex flex-column main-window">
            {user ? <>
                <div className="d-flex align-items-center justify-content-end users-header p-3 pe-4">
                    <div className="me-4">Hi, {user.name}!</div>
                    <button onClick={() => { logout(); navigate('/') }} className="btn btn-secondary">Log out</button>
                </div>
                <div className="d-flex flex-column p-5 users-table ms-auto me-auto">
                    <div className="d-flex">
                        <button className="btn btn-secondary m-2" onClick={() => handleBlockButton('')}>
                            <i className="bi bi-lock-fill me-2"></i>
                            Block
                        </button>
                        <button className="btn btn-secondary m-2" onClick={() => handleBlockButton('un')}>
                            <i className="bi bi-unlock-fill me-2"></i>
                            Unblock
                        </button>
                        <button className="btn btn-danger m-2" onClick={handleDeleteButton}>
                            <i className="bi bi-trash-fill me-2"></i>
                            Delete
                        </button>
                    </div>
                    {users[0]?.email ?
                        <UsersTable setCheckedIds={setCheckedIds} checkedIds={checkedIds} />
                        :
                        <h1 className="m-2">Users not found</h1>
                    }
                </div>
            </> :
                <h3 className="p-3 m-auto d-flex flex-column">
                    You are not authorized
                    <button onClick={() => navigate('/')} className="btn btn-primary fs-4 mt-2">Authorize</button>
                </h3>}
        </div>
    );
}

export default Users;