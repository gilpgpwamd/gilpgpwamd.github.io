import { getAttribute } from "../getAttribute.js"
import { querySelector } from "../querySelector.js"
import { MdOptionsMenu } from "./md-options-menu.js"

export class MdSelectMenu extends HTMLElement {

 static get observedAttributes() {
  return ["options", "value"]
 }

 getContent() {
  return /* HTML */ `
   <link rel="stylesheet" href="/lib/css/material-symbols-outlined.css">

   <style>
    :host {
     display: block;
     cursor: default;
    }

    output {
     display: block;
     padding-right: 32px;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
    }

    #up {
     position: absolute;
     bottom: 8px;
     right: 12px;
     display: none;
     color: var(--md-sys-color-on-surface-variant);
    }

    #down {
     position: absolute;
     bottom: 8px;
     right: 12px;
     color: var(--md-sys-color-on-surface-variant);
    }

    :host(.open) #up {
     display: inline-block;
    }

    :host(.open) #down {
     display: none;
    }

    :host(.invalid) #up,
    :host(.invalid) #down {
     color: var(--md-sys-color-error);
    }

   </style>
   <output></output>
   <span id="down" class="material-symbols-outlined">
    arrow_drop_down
   </span>
   <span id="up" class="material-symbols-outlined">
    arrow_drop_up
   </span>`
 }

 constructor() {
  super()

  const shadow = this.attachShadow({ mode: "open" })
  shadow.innerHTML = this.getContent()

  this._alterna = this._alterna.bind(this)
  this._onKeyDown = this._onKeyDown.bind(this)
  this._cierra = this._cierra.bind(this)
  this.opcionSeleccionada = this.opcionSeleccionada.bind(this)
  this.clicExterno = this.clicExterno.bind(this)
  this.muestraValue = this.muestraValue.bind(this)

  /**
   * @readonly
   * @type { { valid:boolean } }
   */
  this.validity = { valid: true }
  /**
   * @private
   * @type {string}
   */
  this._customValidity = ""

  /**
   * @private
   * @type { HTMLOutputElement }
   */
  this.output = querySelector(shadow, "output")
  /**
   * @private
   * @type { MdOptionsMenu | null }
   */
  this._optionsMenu = null
  addEventListener("load", this.muestraValue)
 }

 connectedCallback() {
  this.tabIndex = 0
  this.role = "combobox"
  this.ariaHasPopup = "listbox"
  this.ariaExpanded = "false"
  this["aria-controls"] = this.options
  this.addEventListener("keydown", this._onKeyDown)
  const parentElement = this.parentElement
  if (parentElement !== null) {
   parentElement.addEventListener("click", this._alterna)
  }
 }

 /**
  * @param {string} nombreDeAtributo
  * @param {string} _valorAnterior
  * @param {string} _nuevoValor
  */
 attributeChangedCallback(nombreDeAtributo, _valorAnterior, _nuevoValor) {
  if (nombreDeAtributo === "options") {
   this._cambiaOptions()
  } else if (nombreDeAtributo === "value") {
   this.muestraValue()
  }
 }

 get options() {
  return getAttribute(this, "options")
 }

 set options(options) {
  this.setAttribute("options", options)
 }

 _cambiaOptions() {
  if (this._optionsMenu !== null) {
   this._optionsMenu = null
  }
  this["aria-controls"] = this.options
 }

 get required() {
  return this.hasAttribute("required")
 }

 set required(required) {
  if (required) {
   this.setAttribute("required", "required")
  } else {
   this.removeAttribute("required")
  }
 }

 get value() {
  return getAttribute(this, "value")
 }

 set value(value) {
  this.setAttribute("value", value)
 }

 muestraValue() {
  const value = this.value
  if (this.isConnected) {
   if (value === "") {
    this.classList.remove("populated")
   } else {
    this.classList.add("populated")
   }
   this.checkValidity()
   const optionsMenu = this.optionsMenu
   if (optionsMenu !== null) {
    this.output.value = optionsMenu.muestraValue(value)
   }
  }
 }

 /** @private */
 _alterna() {
  if (this.classList.contains("open")) {
   this._cierra()
  } else {
   this._abre()
  }
 }

 /** @private */
 _abre() {
  this.classList.add("open")
  const parentElement = this.parentElement
  if (parentElement !== null) {
   const optionsMenu = this.optionsMenu
   if (optionsMenu !== null) {
    optionsMenu.style.top = `${parentElement.offsetTop + 58}px`
    optionsMenu.style.left = `${parentElement.offsetLeft}px`
    optionsMenu.style.width = `${parentElement.offsetWidth}px`
    optionsMenu.abre()
    optionsMenu.addEventListener("input", this.opcionSeleccionada)
   }
   this.ariaExpanded = "true"
   document.addEventListener("click", this.clicExterno)
  }
 }

 /** @private */
 _cierra() {
  this.classList.remove("open")
  const optionsMenu = this.optionsMenu
  if (optionsMenu !== null) {
   optionsMenu.cierra()
   optionsMenu.removeEventListener("input", this.opcionSeleccionada)
  }
  this.ariaExpanded = "false"
  document.removeEventListener("click", this.clicExterno)
  this.dispatchEvent(new Event("input", { bubbles: true }))
 }

 get optionsMenu() {
  if (this._optionsMenu === null) {
   if (this.options !== "") {
    const optionsMenu = document.getElementById(this.options)
    if (optionsMenu instanceof MdOptionsMenu) {
     this._optionsMenu = optionsMenu
    } else {
     throw new Error(`Valor incorrecto para options: "${this.options}".`)
    }
   }
  }
  return this._optionsMenu
 }

 /** @private */
 _avanzaOpcion() {
  const i = this._valueIndex
  if (i > -1) {
   const optionsMenu = this.optionsMenu
   if (optionsMenu !== null) {
    const opciones = optionsMenu.opciones
    if (i < opciones.length - 1) {
     this.value = opciones[i + 1].input.value
    }
   }
  }
 }

 /** @private */
 _retrocedeOpcion() {
  const i = this._valueIndex
  if (i > -1) {
   const optionsMenu = this.optionsMenu
   if (optionsMenu !== null) {
    const opciones = optionsMenu.opciones
    if (i > 0) {
     this.value = opciones[i - 1].input.value
    }
   }
  }
 }

 /**
  * @private
  * @returns {number}
  */
 get _valueIndex() {
  const value = this.value
  const optionsMenu = this.optionsMenu
  return (optionsMenu === null
   ? -1
   : optionsMenu.opciones.findIndex(opcion => opcion.input.value === value))
 }

 opcionSeleccionada() {
  const optionsMenu = this.optionsMenu
  if (optionsMenu !== null) {
   this.value = optionsMenu.seleccion
   this._cierra()
   this.focus()
  }
 }

 /**
  * @param {Event} evt
  */
 clicExterno(evt) {
  const target = evt.target
  const parentElement = this.parentElement
  const optionsMenu = this._optionsMenu
  if (this.classList.contains("open")
   && target instanceof HTMLElement
   && parentElement !== null
   && !parentElement.contains(target)
   && optionsMenu !== null
   && !optionsMenu.contains(target)) {
   this._cierra()
  }
 }

 /**
  * @param { KeyboardEvent } event
  */
 _onKeyDown(event) {
  const key = event.key
  const optionsMenu = this._optionsMenu
  if (optionsMenu !== null) {
   if (optionsMenu.classList.contains("open")) {
    if (key === "ArrowDown") {
     event.preventDefault()
     this._avanzaOpcion()
    } else if (key === "ArrowUp") {
     event.preventDefault()
     this._retrocedeOpcion()
    } else if (key === "Escape") {
     event.preventDefault()
     this._cierra()
    } else if (key === " ") {
     event.preventDefault()
     this._cierra()
    } else if (key === "Tab") {
     this._cierra()
    } else {
     event.preventDefault()
    }
   } else if (key === " ") {
    event.preventDefault()
    this._abre()
   } else if (key === "Tab") {
    this._cierra()
   } else {
    event.preventDefault()
   }
  }
 }

 /** @param {string} error */
 setCustomValidity(error) {
  this._customValidity = error
  this.checkValidity()
 }

 /** @returns {boolean} */
 checkValidity() {
  if (this._customValidity !== "" || (this.required && this.value === "")) {
   this.validity.valid = false
   this.validationMessage = "Seleccione una opción."
   this.classList.add("invalid")
   return false
  } else {
   this.classList.remove("invalid")
   this.validity.valid = true
   return true
  }
 }

}

customElements.define("md-select-menu", MdSelectMenu)