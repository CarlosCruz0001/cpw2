const token = localStorage.getItem('token')

// Se token não tiver valor...
if (!token) {
  window.location.href = 'login.html'
} else {
  document.getElementById('app').innerHTML = `
    <a href="logout.html">Sair</a>
  `
}
