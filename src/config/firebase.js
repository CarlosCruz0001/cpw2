import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBy9ZYQChBKmbXsVQlUZbNB-bFgdUltFlc",
  authDomain: "exemplo-autenticacao-d767a.firebaseapp.com",
  projectId: "exemplo-autenticacao-d767a",
  storageBucket: "exemplo-autenticacao-d767a.appspot.com",
  messagingSenderId: "1061065982892",
  appId: "1:1061065982892:web:99fb042eef3c36f24af009",
  measurementId: "G-KB7ZF13KXL"
}

export const firebaseApp = initializeApp(firebaseConfig)
