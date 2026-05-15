import './style.css'
import { db, auth, googleProvider } from './firebase.js'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

// Navbar scroll effect
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('[data-reveal]')

const scrollReveal = () => {
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top
    const windowHeight = window.innerHeight
    
    if (elementTop < windowHeight * 0.85) {
      el.classList.add('active')
    }
  })
}

// Initial check
window.addEventListener('scroll', scrollReveal)
window.addEventListener('load', scrollReveal)

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      })
    }
  })
})

// --- Authentication Logic ---
const authContainer = document.getElementById('auth-container')

const updateAuthUI = (user) => {
  if (user) {
    authContainer.innerHTML = `
      <div class="user-profile">
        <img src="${user.photoURL}" alt="${user.displayName}" class="user-avatar">
        <span class="user-name">${user.displayName.split(' ')[0]}</span>
        <button id="logout-btn" class="btn-text">Cerrar Sesión</button>
      </div>
    `
    document.getElementById('logout-btn').addEventListener('click', () => {
      signOut(auth)
    })
  } else {
    authContainer.innerHTML = `
      <button id="login-btn" class="btn btn-secondary">
        <i data-lucide="log-in"></i> Iniciar Sesión
      </button>
    `
    document.getElementById('login-btn').addEventListener('click', async () => {
      try {
        await signInWithPopup(auth, googleProvider)
      } catch (error) {
        console.error("Error al iniciar sesión:", error)
        alert("No se pudo iniciar sesión. Asegúrate de tener habilitado Google Auth en Firebase.")
      }
    })
  }
  // Re-initialize icons for dynamic content
  if (window.lucide) lucide.createIcons()
}

onAuthStateChanged(auth, (user) => {
  updateAuthUI(user)
})

// Log for production ready confirmation
console.log('MK IMPULSA Landing Page Loaded Successfully')
