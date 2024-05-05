import { abreElementoHtml } from "../abreElementoHtml.js"
import { cierraElementoHtmo } from "../cierraElementoHtmo.js"
import { querySelector } from "../querySelector.js"

export class MdOptionsMenu extends HTMLElement {

 getContent() {
  return /* HTML */`

   <style>

    :host {
     position: absolute;
    }

   </style>

   <slot></slot>`
 }

 constructor() {
  super()
  const shadow = this.attachShadow({ mode: "open" })
  shadow.innerHTML = this.getContent()
  this._configuraOpciones = this._configuraOpciones.bind(this)

  /**
   * @private
   * @type { HTMLSlotElement }
   */
  this._slot = querySelector(shadow, "slot")
  /**
   * @private
   * @type { {
   *   label:HTMLLabelElement,
   *   input: HTMLInputElement }[] }
   */
  this._opciones = []
  this._slot.addEventListener("slotchange", this._configuraOpciones)
 }

 connectedCallback() {
  this.classList.add("md-menu")
  this.hidden = true
  this.role = "listbox"
 }

 /**
  * @returns { readonly Readonly<{
  *   label:HTMLLabelElement,
  *   input: HTMLInputElement }>[]}
  */
 get opciones() {
  return this._opciones
 }

 get seleccion() {
  /** @type { HTMLInputElement | null } */
  const seleccionado = this.querySelector(":checked")
  return seleccionado === null ? "" : seleccionado.value
 }

 _configuraOpciones() {
  /**
   * @type { {
  *   label:HTMLLabelElement,
  *   input: HTMLInputElement }[] }
  */
  const opciones = []
  for (const label of this._slot.assignedElements()) {
   if (label instanceof HTMLLabelElement) {
    const input = querySelector(label, `input[type="radio"]`)
    if (input instanceof HTMLInputElement) {
     input.role = "option"
     opciones.push({ label, input })
    }
   }
  }
  this._opciones = opciones
 }

 abre() {
  abreElementoHtml(this)
 }


 cierra() {
  cierraElementoHtmo(this)
 }

 /**
  * @param {string} value
  */
 muestraValue(value) {
  let texto = ""
  for (const { label, input } of this._opciones) {
   if (input.value === value) {
    input.checked = true
    label.classList.add("selected")
    let textContent = label.textContent
    if (texto === "" && textContent !== null) {
     textContent = textContent.trim()
     if (textContent !== "") {
      texto = textContent
     }
    }
   } else {
    input.checked = false
    label.classList.remove("selected")
   }
  }
  return texto
 }

}

customElements.define("md-options-menu", MdOptionsMenu)