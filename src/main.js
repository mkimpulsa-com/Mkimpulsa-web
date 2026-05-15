import './style.css'
import { db, auth, googleProvider } from './firebase.js'
import { collection, doc, setDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

// Navbar scroll effect
const navbar = document.getElementById('navbar')
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })
}

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
  if (!authContainer) return

  if (user) {
    // Save/Update user in Firestore
    const userRef = doc(db, 'users', user.uid)
    setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      lastLogin: serverTimestamp()
    }, { merge: true })

    authContainer.innerHTML = `
      <div class="user-profile-premium">
        ${user.email === 'agenciamkimpulsa@gmail.com' ? '<a href="/admin.html" class="god-mode-badge">Modo Dios</a>' : ''}
        <div class="user-info-pill">
          <img src="${user.photoURL}" alt="${user.displayName}" class="user-avatar-premium">
          <span class="user-name-premium">${user.displayName.split(' ')[0]}</span>
        </div>
        <button id="logout-btn" class="logout-icon-btn" title="Cerrar Sesión">
          <i data-lucide="log-out"></i>
        </button>
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
