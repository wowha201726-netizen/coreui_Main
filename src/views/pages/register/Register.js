import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormFeedback,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { signUpUser } from '../../../services'
import { toast } from 'react-toastify'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeat, setRepeat] = useState("")

  const [userNameError, setUserNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [repeatError, setRepeatError] = useState("")

  const [isFormValid, setIsFormValid] = useState(false)
  
  const navigate = useNavigate()

  useEffect(() => {
    // Username
    setUserNameError(username.trim().length === 0 ? "Name is required" : "")

    // Email
    setEmailError(!/\S+@\S+\.\S+/.test(email) ? "Invalid email address" : "")

    // Password
    setPasswordError(password.length < 6 ? "Password must be at least 6 characters" : "")

    // Confirm password
    setRepeatError(password !== repeat ? "Passwords do not match" : "")

    // Whole form
    setIsFormValid(
      username.trim().length > 0 &&
      /\S+@\S+\.\S+/.test(email) &&
      password.length >= 6 &&
      password === repeat
    )
  }, [username, email, password, repeat])

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let res = await signUpUser({
        name: username,
        email,
        password,
        phone: "",
        address: "",
        image: "",
      })

      if (res.status === 201) {
        let userInfo = {
          email: res.data.data.email,
          name: res.data.data.name,
          image: res.data.data.image,
          token: res.data.data.password, 
        }
        localStorage.setItem("user", JSON.stringify(userInfo))
        toast.success("Account created successfully!")
        navigate("/login")
      } else {
        const message = res.data.message || "Invalid credentials"
        if (message.toLowerCase().includes("password")) setPasswordError(message)
        else if (message.toLowerCase().includes("email")) setEmailError(message)
        else if (message.toLowerCase().includes("username")) setUserNameError(message)
        else toast.error(message)
      }
    } catch (error) {
      toast.error("Account created unsuccessfully. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSignUp}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  {/* Username */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      invalid={!!userNameError}
                    />
                    <CFormFeedback invalid>{userNameError}</CFormFeedback>
                  </CInputGroup>

                  {/* Email */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      invalid={!!emailError}
                    />
                    <CFormFeedback invalid>{emailError}</CFormFeedback>
                  </CInputGroup>

                  {/* Password */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      invalid={!!passwordError}
                    />
                    <CFormFeedback invalid>{passwordError}</CFormFeedback>
                  </CInputGroup>

                  {/* Confirm Password */}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="repeat-password"
                      value={repeat}
                      onChange={(e) => setRepeat(e.target.value)}
                      disabled={loading}
                      invalid={!!repeatError}
                    />
                    <CFormFeedback invalid>{repeatError}</CFormFeedback>
                  </CInputGroup>

                  {/* Submit */}
                  <div className="d-grid">
                    <CButton
                      color="success"
                      type="submit"
                      className="px-4"
                      disabled={loading || !isFormValid}
                    >
                      {loading && <CSpinner size="sm" className="me-2" />}
                      {loading ? "Creating Account..." : "Create Account"}
                    </CButton>
                  </div>

                  {/* Login link */}
                  <NavLink to="/login" className="text-center d-block mt-3">
                    <CButton color="link" className="px-0">
                      Already have an account? Sign in
                    </CButton>
                  </NavLink>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register