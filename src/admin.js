import { db, auth } from './firebase.js'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const adminEmail = 'agenciamkimpulsa@gmail.com'
const adminContent = document.getElementById('admin-content')
const accessDenied = document.getElementById('access-denied')
const usersList = document.getElementById('users-list')
const totalUsersEl = document.getElementById('total-users')
const todayUsersEl = document.getElementById('today-users')

onAuthStateChanged(auth, (user) => {
    if (user && user.email === adminEmail) {
        adminContent.style.display = 'block'
        accessDenied.style.display = 'none'
        document.getElementById('admin-welcome').innerText = `Bienvenido, ${user.displayName}`
        loadUsers()
    } else {
        adminContent.style.display = 'none'
        accessDenied.style.display = 'block'
    }
})

function loadUsers() {
    const q = query(collection(db, 'users'), orderBy('lastLogin', 'desc'))
    
    onSnapshot(q, (snapshot) => {
        usersList.innerHTML = ''
        let count = 0
        let todayCount = 0
        const now = new Date()
        
        snapshot.forEach((doc) => {
            const user = doc.data()
            count++
            
            const lastLoginDate = user.lastLogin ? user.lastLogin.toDate() : new Date()
            if (lastLoginDate.toDateString() === now.toDateString()) {
                todayCount++
            }

            const row = document.createElement('tr')
            row.className = 'user-row'
            row.innerHTML = `
                <td>
                    <img src="${user.photo || '/vite.svg'}" alt="Avatar">
                    <strong>${user.name}</strong>
                </td>
                <td>${user.email}</td>
                <td>${lastLoginDate.toLocaleString()}</td>
                <td><span class="status-badge">Activo</span></td>
            `
            usersList.appendChild(row)
        })
        
        totalUsersEl.innerText = count
        todayUsersEl.innerText = todayCount
    })
}
