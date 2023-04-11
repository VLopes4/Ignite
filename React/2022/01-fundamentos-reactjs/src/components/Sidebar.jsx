import { PencilLine } from 'phosphor-react'

import styles from './Sidebar.module.css'
import Avatar from './Avatar'

export default function Sidebar() {
  return(
    <aside className={styles.sidebar}>
      <img 
        className={styles.cover} 
        src="https://images.unsplash.com/photo-1622507141724-8ead15590e3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" 
        alt="Wallpaper" 
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/vlopes4.png"/>
        <strong>Vinicius Lopes</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20}/>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}