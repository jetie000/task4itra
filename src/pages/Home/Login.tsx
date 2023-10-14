import { variables } from '../../Variables';
import Modal from '../Modal'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { IUser } from '../../types/user.interface';
import { useEffect } from 'react';

function Login() {
    let user = {} as IUser;
    let setUser = useUserStore(state => state.setUser);

    const navigate = useNavigate();

    useEffect(() => {
        const myModal = document.getElementById('loginModal');
        myModal!.addEventListener('hidden.bs.modal', () => {
            if (user.email && user.status == 'Active') {
                navigate('/users');
            }
        });
    }, []);

    async function checkClick() {
        let inputEmail = (document.getElementById('inputEmail') as HTMLInputElement).value;
        let inputPassword = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const myModal = document.getElementById('loginModal');
        let modalTitle = myModal?.querySelector('.modal-title');
        let modalBody = myModal?.querySelector('.modal-body');
        if (inputEmail == "" || inputPassword == "") {
            modalTitle!.textContent = "Error";
            modalBody!.textContent = "Enter the data";
            return;
        }
        let tempUser;
        try {
            const response = await fetch(variables.API_URL + "/user/login?email=\'" + inputEmail + "\'&password=\'" + inputPassword + "\'");
            const data = await response.json();
            user = data[0] as IUser;
            setUser(data[0]);
            tempUser = data[0];
        }
        catch (e) {
            modalTitle!.textContent = "Error";
            modalBody!.textContent = e as string;
            return;
        }

        if (tempUser?.email && tempUser?.status == "Active") {
            modalTitle!.textContent = "Success";
            modalBody!.textContent = "You have successfully logged in";

        }
        else if (tempUser?.status == "Blocked"){
            modalTitle!.textContent = "Error";
            modalBody!.textContent = "You are blocked";
        }
        else{
            modalTitle!.textContent = "Error";
            modalBody!.textContent = "You entered an incorrect e-Mail or password";
        }

    }

    return (
        <div className="mt-3">
            <form>
                <div className="mb-3">
                    <label className="mb-1" htmlFor="inputEmail">e-Mail adress</label>
                    <input type='email' className="form-control" id="inputEmail" placeholder="Enter e-Mail adress" />
                </div>
                <div className="mb-3">
                    <label className="mb-1" htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" />
                </div>
                <button type="button"
                    className="btn btn-primary mt-3 w-100"
                    onClick={() => checkClick()}
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal">
                    Log In
                </button>
                <Modal id='loginModal' />
            </form>
        </div>

    )
}
export default Login;