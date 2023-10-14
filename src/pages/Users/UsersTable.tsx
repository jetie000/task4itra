import { useUserStore } from "../../stores/userStore";
import { ITableUser } from "../../types/user.interface";

function UsersTable(props: { setCheckedIds: Function, checkedIds: Number[] }) {
    const users = useUserStore(state => state.users);

    const handleChangeCheckbox = (userId: number) => {
        const userCheck = document.getElementById('check' + userId) as HTMLInputElement;
        if (userCheck.checked == true) {
            props.setCheckedIds([userId, ...props.checkedIds]);
        }
        else {
            let index = props.checkedIds.indexOf(userId);
            let tempArr = props.checkedIds.slice(0);
            tempArr.splice(index, 1);
            props.setCheckedIds(tempArr);
        }
    }

    const handleChangeAllCheckbox = () => {
        const checkAll = document.getElementById('checkAll') as HTMLInputElement;
        const userChecks = document.querySelectorAll('.input-table-user') as unknown as HTMLInputElement[];
        if (props.checkedIds.length == 0) {
            checkAll.indeterminate = false;
            checkAll.checked = true;
            userChecks.forEach(userCheck => {
                userCheck.checked = true;
            });
            props.setCheckedIds(Array.from(users, (user) => user.id));
        }
        else {
            userChecks.forEach(userCheck => {
                userCheck.checked = false;
            })
            checkAll.checked = false;
            props.setCheckedIds([]);
        }

    }

    return (
        <table className="table table-striped table-hover border-2">
            <thead className="align-middle">
                <tr>
                    <th>
                        <input className="form-check-input"
                            type="checkbox"
                            onClick={handleChangeAllCheckbox}
                            value=""
                            id="checkAll">
                        </input>
                    </th>
                    <th>
                        Name <br />
                        Position
                    </th>
                    <th>
                        e-Mail
                    </th>
                    <th>
                        Last login
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className="align-middle">
                {users.map(tableUser =>
                    <tr key={tableUser.id}>
                        <th>
                            <input className="form-check-input input-table-user"
                                type="checkbox"
                                value=""
                                onChange={() => handleChangeCheckbox(tableUser.id)}
                                id={'check' + tableUser.id}>
                            </input>
                        </th>
                        <th>
                            <div className="d-flex flex-column">
                                <span>{tableUser.name}</span>
                                <span>{tableUser.position}</span>
                            </div>
                        </th>
                        <th>
                            {tableUser.email}
                        </th>
                        <th>
                            {new Date(tableUser.logInDate).toLocaleString()}
                        </th>
                        <th>
                            {tableUser.status}
                        </th>
                    </tr>)}
            </tbody>
        </table>
    );
}

export default UsersTable;