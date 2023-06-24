import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from './config/firebase'

const $ = document.getElementById.bind(document)

/**
 * Estes são os principais status
 * de erro que o Firebase retorna
 * em caso de falha de login
 */
const authStatuses = [
  'auth/wrong-password',
  'auth/user-not-found',
  'auth/invalid-email',
]

const onSubmitLoginForm = (event) => {
  event.preventDefault()

  const email = $('email').value
  const password = $('password').value

  const auth = getAuth(firebaseApp)

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const { user } = userCredential
      const token = await user.getIdToken()
      localStorage.setItem('token', token)
      window.location.href = 'index.html'
    })
    .catch((error) => {
      let errorMessage = 'Ocorreu um erro ao tentar realizar o login'
      const { code } = error

      if (authStatuses.includes(code)) {
        errorMessage = 'Usuário não autenticado'
      }

      $('result-panel').innerText = errorMessage
    })
}

$('login-form').onsubmit = onSubmitLoginForm
