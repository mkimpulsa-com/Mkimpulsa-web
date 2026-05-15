import './style.css'
import { db } from './firebase.js'
import { collection, addDoc, getDocs } from 'firebase/firestore'

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

// Log for production ready confirmation
console.log('MK IMPULSA Landing Page Loaded Successfully')

// --- Firebase Connection Test ---
const testFirebaseConnection = async () => {
  try {
    console.log('--- Iniciando Prueba de Firebase ---')
    
    // 1. Insertar documento
    const docRef = await addDoc(collection(db, "test"), {
      message: "Prueba de conexión exitosa",
      timestamp: new Date(),
      status: "connected"
    });
    console.log("Documento insertado con ID:", docRef.id);

    // 2. Leer documentos de la colección 'test'
    const querySnapshot = await getDocs(collection(db, "test"));
    console.log("Leyendo documentos de la colección 'test':");
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });

    console.log('--- Prueba de Firebase Finalizada con Éxito ---')
  } catch (e) {
    console.error("Error en la prueba de Firebase:", e);
  }
}

// Ejecutar prueba
testFirebaseConnection();
