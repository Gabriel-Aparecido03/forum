import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { TextInput } from "../components/ui/text-input";
import { isValidEmail } from "../utils/is-valid-email";
import { isValidPassword } from "../utils/is-valid-password";
import { Eye, EyeClosed } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hook/useUser";

export function Login() {

  const navigate = useNavigate()

  const { makeLogin, user } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  const [isInvalidPassword, setIsInvalidPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const [showPasswordVisibility, setShowPasswordVisibility] = useState(false)

  function validFields() {

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

    return true
  }

  async function handleAuthtenticate() {
    setIsInvalidPassword(false)
    setIsInvalidEmail(false)
    setErrorMessage('')

    if (!validFields()) return
    await authenticateAccount()
  }

  async function authenticateAccount() {
    try {
      await makeLogin(email, password)
      navigate('/home')
    } catch (error) {
      setErrorMessage('Email or password invalid .')
    }
  }

  useEffect(()=>{
    if(user) { navigate('/home')}
  },[])

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="w-1/3 mx-auto flex flex-col items-center justiyf-center">
        <h1 className="text-zinc-700 font-regular text-lg text-center ">Create your account here ! <br /> And start navigate at <strong className="text-xl">Communities.</strong></h1>
        <div className="w-1/2 flex flex-col gap-3 mx-auto mt-6">
          <TextInput
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            isInvalid={isInvalidEmail}
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
          <p className="text-red-400 font-thin text-sm">{errorMessage}</p>
          <Button onClick={handleAuthtenticate} text="Sign in" />
        </div>
        <Link className="underline text-sm font-light text-zinc-700 text-center mt-5" to="/register">Dont have account ? Create here !</Link>
      </div>
    </div>
  )
}