import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormFeedback,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilLockLocked, cilUser } from "@coreui/icons"
import { toast } from "react-toastify"
import { loginUser } from "../../../services"
import { useAuth } from "../../../hooks/useAuth" // adjust path

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const { login } = useAuth()

  // Validate form inputs
  useEffect(() => {
    const emailValid = /\S+@\S+\.\S+/.test(email)
    const passwordValid = password.length >= 6

    setEmailError(emailValid ? "" : "Invalid email address")
    setPasswordError(passwordValid ? "" : "Password must be at least 6 characters")
    setIsFormValid(emailValid && passwordValid)
  }, [email, password])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setLoading(true)
    try {
      const res = await loginUser({ email: email.trim(), password })
      if (res.status === 200) {
        const userInfo = {
          email: res.data.data.email,
          name: res.data.data.name,
          image: res.data.data.image,
          token: res.data.token,
        }
        await login(userInfo)
        toast.success("Logged in successfully!")
      } else {
        const message = res.data.message || "Invalid credentials"
        if (message.toLowerCase().includes("password")) {
          setPasswordError(message)
        } else if (message.toLowerCase().includes("email")) {
          setEmailError(message)
        } else {
          toast.error(message)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while logging in. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign in to your account</p>

                    {/* Email */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        invalid={!!emailError}
                      />
                      <CFormFeedback invalid>{emailError}</CFormFeedback>
                    </CInputGroup>

                    {/* Password */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        invalid={!!passwordError}
                      />
                      <CFormFeedback invalid>{passwordError}</CFormFeedback>
                    </CInputGroup>

                    <CRow>
                      <CCol className="d-flex justify-content-center">
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          disabled={loading || !isFormValid}
                        >
                          {loading && <CSpinner size="sm" className="me-2" />}
                          {loading ? "Loading..." : "Login"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              {/* Register Card */}
              <CCard className="text-white bg-primary py-5" style={{ width: "44%" }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login