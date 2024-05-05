import { calculaClase } from "../lib/js/calculaClase.js"

export class NavTabScrollable extends HTMLElement {

 connectedCallback() {
  this.classList.add("md-tab", "scrollable")

  this.innerHTML = /* HTML */`
   <a ${calculaClase(["/index.html", "", "/"])} href="index.html">
    <span class="material-symbols-outlined">home</span>
    Inicio
   </a>

   <a ${calculaClase(["/secundaria.html"])} href="secundaria.html">
    <span class="material-symbols-outlined">scrollable_header</span>
    Página secundaria
   </a>

   <a ${calculaClase(["/iconos.html"])} href="iconos.html">
    <span class="material-symbols-outlined">sentiment_satisfied</span>
    Íconos
   </a>

   <a ${calculaClase(["/botones.html"])} href="botones.html">
    <span class="material-symbols-outlined">right_click</span>
    Botones
   </a>

   <a ${calculaClase(["/campos.html"])} href="campos.html">
    <span class="material-symbols-outlined">password</span>
    Campos de texto
   </a>

   <a ${calculaClase(["/select.html"])} href="select.html">
    <span class="material-symbols-outlined">bottom_panel_close</span>
    Select
   </a>

   <a ${calculaClase(["/interruptor.html"])} href="interruptor.html">
    <span class="material-symbols-outlined">toggle_on</span>
    Interruptores
   </a>

   <a ${calculaClase(["/slider.html"])} href="slider.html">
    <span class="material-symbols-outlined">linear_scale</span>
    Sliders
   </a>

   <a ${calculaClase(["/segmentado.html"])} href="segmentado.html">
    <span class="material-symbols-outlined">splitscreen_left</span>
    Botón segmentado
   </a>

   <a ${calculaClase(["/one-line.html"])} href="one-line.html">
    <span class="material-symbols-outlined">list</span>
    Listas one-line
   </a>

   <a ${calculaClase(["/two-line.html"])} href="two-line.html">
    <span class="material-symbols-outlined">lists</span>
    Listas two-line
   </a>

   <a ${calculaClase(["/three-line.html"])} href="three-line.html">
    <span class="material-symbols-outlined">receipt_long</span>
    Listas three-line
   </a>

   <a ${calculaClase(["/tarjetas.html"])} href="tarjetas.html">
    <span class="material-symbols-outlined">cards</span>
    Tarjetas
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
   </a>

   <a ${calculaClase(["/formulario.html"])} href="formulario.html">
    <span class="material-symbols-outlined">newspaper</span>
    Formulario
   </a>

   <a ${calculaClase(["/ayuda.html"])} href="ayuda.html">
    <span class="material-symbols-outlined">help</span>
    Ayuda
   </a>`

 }

}

customElements.define("nav-tab-scrollable", NavTabScrollable)