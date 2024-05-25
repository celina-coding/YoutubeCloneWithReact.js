
import { useState } from 'react'
import '../styles/Auth.css'
import {auth} from '../firebase/config.js'
import { 
         sendPasswordResetEmail,
         signInWithEmailAndPassword 
       } from "firebase/auth";
// import { useHistory } from 'react-router-dom';     

function Login(props){

    const [error, setError] = useState('')

    const [dataForm, setDataForm] = useState({
        email: "",
        password: ""
    })


    console.log(auth)

    function handleChange(event){
        console.log(dataForm)
        const {name, value, type} = event.target
        setDataForm(prevData=>{
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setError("")
        //la logique de la connexion d'un utilisateur ayant déja un compte
        signInWithEmailAndPassword(auth, dataForm.email, dataForm.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.email)
            //dans le cas ou un utilisateur s'est connecté a son compte alors on le dirige vers la page d'acceuil
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
        });

    }
    
    //cas ou le mdp est oublié
    function handlePasswordReset(){
        const email = prompt('Veuillez entrez votre mail')
        sendPasswordResetEmail(auth, email)
        alert('Email envoyé!Veuillez vérifier votre mail')

    }


    return(
       <div className='loginbody'>
         <div className="login-form-container">
        <form className="form">
            <h2>Login</h2>
             <label htmlFor="email">Email:</label>
            <div className="input-container">
            
                <input 
                    type="email"
                    placeholder="youremail@gmail.com"
                    className="form--input" 
                    name="email"
                    onChange={handleChange}
                    value={dataForm.email}
                >
                </input>
            </div>
            <label htmlFor="password">Password:</label>
            <div className="input-container">
            
                <input
                    type="password"
                    placeholder="*******"
                    className="form--input" 
                    name="password"
                    onChange={handleChange}
                    value={dataForm.password}
                >
                </input>
            </div>
            
            <button 
                type="submit"
                className="form--submit"
                onClick={(e)=>handleSubmit(e)}
            >
                Login
            </button>

            {error && 
               <div className='error'>
                    <p>{error}</p>
                </div>
            }

            <button className="link-btn"
                    onClick={handlePasswordReset}
            >
                Mot de passe oublié?
            </button>

            <button
                className="link-btn"
                onClick={() => props.onFormSwitch("register")}
                >
                Vous êtes nouveau ? Inscrivez-vous
            </button>

        </form>
    </div>
       </div>
    )
}
export default Login