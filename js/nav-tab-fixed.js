import { calculaClase } from "../lib/js/calculaClase.js"

export class NavTabFixed extends HTMLElement {

 connectedCallback() {
  this.classList.add("md-tab", "fixed")

  this.innerHTML = /* HTML */`
   <a ${calculaClase(["/index.html", "", "/"])} href="index.html">
    <span class="material-symbols-outlined">home</span>
    Inicio
   </a>

   <a ${calculaClase(["/navtab.html"])} href="navtab.html">
    <span class="material-symbols-outlined">swipe_left</span>
    Pestañas scrollable
   </a>

   <a ${calculaClase(["/navTabFixed.html"])} href="navTabFixed.html">
    <span class="material-symbols-outlined">tabs</span>
    Pestañas fijas
   </a>

   <a ${calculaClase(["/navbar.html"])} href="navbar.html">
    <span class="material-symbols-outlined">bottom_navigation</span>
    Barra de navegación
   </a>`
 }

}

customElements.define("nav-tab-fixed", NavTabFixed)