import React from 'react';

import "./form.scss"

const Form = ({   handleShowRegistryForm,
                  changeLoginToRegistryForm,
                  handleInput,
                  signUpError,
                  signInError,
                  changeLoginLogoutButton,
                  handleSignOut,
                  handleSignIn,
                  handleSignUp,
                  form
              }) => {
    return (
        <div className="intro-form">
            <button className="form-btn"
                    onClick={handleShowRegistryForm}>
                    {changeLoginToRegistryForm ? "Rejestracja" : "Logowanie"}
            </button>
            <form className="form"
                  onSubmit={(e => e.preventDefault())}>
                  {!changeLoginToRegistryForm &&
                    <>
                        <input className="form__input"
                           placeholder="Imie..."
                           type="text"
                           name="name"
                           value={form.name}
                           onChange={handleInput}/>
                        <span
                        className="form__validation">
                                {signUpError && "Imię musi zawierać minimum 3 znaki"}
                        </span>
                    </>
                 }
                <input
                    className="form__input"
                    placeholder="Email..."
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInput}/>
                <span
                    className="form__validation">
                    {signUpError && "Email musi zawierać @ i poprawną domenę"}
                    {signInError && "błędny login lub hasło"}
                    </span>
                <input className="form__input"
                       placeholder="Hasło..."
                       type="password"
                       name="password"
                       value={form.password}
                       onChange={handleInput}/>
                <div
                    className="form__validation">
                    {signUpError && "Hasło musi zawierać minimum 6 znaków"}
                    {signInError && "błędny login lub hasło"}
                </div>
                {changeLoginToRegistryForm ?
                    <span>
                            {changeLoginLogoutButton ?
                                <button className="form-btn sign-btn"
                                        onClick={handleSignOut}>Wyloguj
                                </button>
                                :
                                <button className="form-btn sign-btn"
                                        onClick={handleSignIn}>Zaloguj
                                </button>
                            }
                    </span>
                    :
                    <button className="form-btn sign-btn"
                            onClick={handleSignUp}>Zarejestruj
                    </button>
                }
            </form>
        </div>
    )
}

export default Form;