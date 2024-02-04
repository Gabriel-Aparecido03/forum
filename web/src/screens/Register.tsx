import { useState } from "react";
import { Button } from "../components/ui/button";
import { TextInput } from "../components/ui/text-input";
import { isValidEmail } from "../utils/is-valid-email";
import { isValidPassword } from "../utils/is-valid-password";
import { Eye, EyeClosed } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import { ToastContainer, toast } from "react-toastify";

export function Register() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  const [isInvalidPassword, setIsInvalidPassword] = useState(false)
  const [isInvalidEmailConfirm, setIsInvalidEmailConfirm] = useState(false)
  const [isInvalidPasswordConfirm, setIsInvalidPasswordConfirm] = useState(false)
  const [isInvalidUsername, setIsInvalidUsername] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')


  const [showPasswordVisibility, setShowPasswordVisibility] = useState(false)
  const [showPasswordConfirmVisibility, setShowPasswordConfirmVisibility] = useState(false)

  const notify = () => toast(message);


  function validFields() {

    if (email !== emailConfirm) {
      setIsInvalidEmail(true)
      setIsInvalidEmailConfirm(true)
      setErrorMessage('Email dont match')
      return false
    }

    if (password !== passwordConfirm) {
      setIsInvalidPassword(true)
      setIsInvalidPasswordConfirm(true)
      setErrorMessage('Password dont match')
      return false
    }

    if (!isValidEmail(email)) {
      setIsInvalidEmail(true)
      setErrorMessage('Invalid Email')
      return false
    }

    if (!isValidPassword(email)) {
      setIsInvalidPassword(true)
      setErrorMessage('Invalid Password')
      return false
    }

    if (username.trim().length === 0) {
      setIsInvalidUsername(true)
      setErrorMessage('Invalid Username')
      return false
    }

    return true
  }

  async function handleCreateAccount() {
    setIsInvalidPassword(false)
    setIsInvalidPasswordConfirm(false)
    setIsInvalidEmail(false)
    setIsInvalidEmailConfirm(false)
    setIsInvalidEmailConfirm(false)
    setIsInvalidUsername(false)

    if(!validFields()) return
    await createAccount()
  }

  async function createAccount() {
    try {
      const res = await api.post('/session/register',{
        username,
        email,
        password
      })
      if(res.status === 201) {
        setMessage('Account create with success !')
        notify()
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="w-1/3 mx-auto flex flex-col items-center justiyf-center">
        <h1 className="text-zinc-700 font-regular text-lg text-center ">Create your account here ! <br /> And start navigate at <strong className="text-xl">Communities.</strong></h1>
        <div className="w-1/2 flex flex-col gap-3 mx-auto mt-6">
          <TextInput
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            value={username}
            isInvalid={isInvalidUsername}
          />
          <TextInput
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            isInvalid={isInvalidEmail}
          />
          <TextInput
            placeholder="Confirm Email"
            onChange={e => setEmailConfirm(e.target.value)}
            value={emailConfirm}
            isInvalid={isInvalidEmailConfirm}
          />
          <TextInput
            placeholder="Password"
            type={showPasswordVisibility ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
            value={password}
            isInvalid={isInvalidPassword}
            icon={
              <>
                {!showPasswordVisibility && <EyeClosed className="w-4 h-4 cursor-pointer" onClick={() => { setShowPasswordVisibility(true) }} />}
                {showPasswordVisibility && <Eye className="w-4 h-4 cursor-pointer" onClick={() => { setShowPasswordVisibility(false) }} />}
              </>
            }
          />
          <TextInput
            placeholder="Confirm Password"
            type={showPasswordConfirmVisibility ? 'text' : 'password'}
            onChange={e => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            isInvalid={isInvalidPasswordConfirm}
            icon={
              <>
                {!showPasswordConfirmVisibility && <EyeClosed className="w-4 h-4 cursor-pointer" onClick={() => { setShowPasswordConfirmVisibility(true) }} />}
                {showPasswordConfirmVisibility && <Eye className="w-4 h-4 cursor-pointer" onClick={() => { setShowPasswordConfirmVisibility(false) }} />}
              </>
            }
          />
          <p className="text-red-400 font-thin text-sm">{errorMessage}</p>
          <Button onClick={handleCreateAccount} text="Create account !" />
        </div>
        <Link className="underline text-sm font-light text-zinc-700 text-center mt-5" to="/">If has account ? Make login here !</Link>
      </div>
      <ToastContainer />
    </div>
  )
}