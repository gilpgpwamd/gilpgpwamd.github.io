import { calculaClase } from "../lib/js/calculaClase.js"
import { html } from "../lib/js/html.js"

export class NavBar extends HTMLElement {

 connectedCallback() {
  this.classList.add("md-navigation-bar")

  this.innerHTML = html`
   <a ${calculaClase(["/index.html", "", "/"])} href="index.html">
    <span class="material-symbols-outlined">home</span>
    Inicio
   </a>

   <a ${calculaClase(["/navTabFixed.html"])} href="navTabFixed.html">
    <span class="material-symbols-outlined">tabs</span>
    Pestañas
   </a>

   <a ${calculaClase(["/navbar.html"])} href="navbar.html">
    <span class="material-symbols-outlined">bottom_navigation</span>
    Barra
   </a>

   <a ${calculaClase(["/formulario.html"])} href="formulario.html">
    <span class="material-symbols-outlined">newspaper</span>
    Forma
   </a>`.htmlTxt

 }

}

customElements.define("nav-bar", NavBar)