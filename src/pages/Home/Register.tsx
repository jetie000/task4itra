import { variables } from '../../Variables';
import Modal from '../Modal'

function Register() {

    let responsePostStr = "";

    async function createUser(inputEmail: string, inputPassword: string, inputName: string, inputSurname: string, inputPosition: string) {
        
        var date = new Date(Date.now() + variables.UTC3_MINSK);
        
        let response = await fetch(variables.API_URL + '/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email" : inputEmail,
                "password": inputPassword,
                "name": inputName + " " + inputSurname,
                "logInDate": date,
                "signUpDate": date,
                "position": inputPosition,
                "status": "Active"
            })
        })
        let data = await response.text();
        console.log(data);
        responsePostStr = data;
    }

    async function registerClick() {
        let inputName = (document.getElementById('inputName') as HTMLInputElement).value;
        let inputSurname = (document.getElementById('inputSurname') as HTMLInputElement).value;
        let inputEmail = (document.getElementById('inputEmail') as HTMLInputElement).value;
        let inputPassword = (document.getElementById('inputPassword') as HTMLInputElement).value;
        let inputPosition = (document.getElementById('inputPosition') as HTMLInputElement).value;
        const myModal = document.getElementById('registerModal');
        let modalTitle = myModal?.querySelector('.modal-title');
        let modalBody = myModal?.querySelector('.modal-body');

        if (inputEmail == "" || inputPassword == "" || inputName == "" || inputSurname == "") {
            modalTitle!.textContent = 'Error';
            modalBody!.textContent = "Enter the data";
            return;
        }
        try{
            await createUser(inputEmail.trim(), inputPassword.trim(), inputName.trim(), inputSurname.trim(), inputPosition.trim());
        }
        catch(e){
            modalTitle!.textContent = "Error";
            modalBody!.textContent = e as string;
            console.log(e);
            
            return;
        }
        if (responsePostStr == "\"Email exists.\"") {
            modalTitle!.textContent = "Error";
            modalBody!.textContent = "An account with this e-Mail already exists";
        }
        else if(responsePostStr == "\"Posted succesfully.\""){
            modalTitle!.textContent = "Success!";
            modalBody!.textContent = "You are successfully registered!";
        }
        else {
            modalTitle!.textContent = "Error";
            modalBody!.textContent = "Database error";
        }
    }

    return (
        <div className="mt-3">
            <form>
                <div className="mb-3">
                    <label htmlFor="inputSurname">Surname</label>
                    <input className="form-control" maxLength={25} id="inputSurname" placeholder="Enter your surname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputName">Name</label>
                    <input className="form-control" maxLength={25} id="inputName" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail">e-Mail adress</label>
                    <input type='email' maxLength={50} className="form-control" id="inputEmail" placeholder="Enter your e-Mail adress" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" maxLength={50} className="form-control" id="inputPassword" placeholder="Enter your password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPosition">Position</label>
                    <input maxLength={20} className="form-control" id="inputPosition" placeholder="Enter your position" />
                </div>

                <button type="button"
                    className="btn btn-primary mt-3 w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                    onClick={() => registerClick()}>
                    Sign Up
                </button>

                <Modal id='registerModal'/>
            </form>
        </div>
    )
}

export default Register;