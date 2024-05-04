import { muestraError } from "./muestraError.js"

/**
 * @param { HTMLElement } elementoHtmlQueInvoca
 * @param { string } nombreDelMetodo
 * @param { Event } event
 */
export function ejecutaMetodo(elementoHtmlQueInvoca, nombreDelMetodo, event) {
 try {
  let nodoPadre = getNodoPadre(elementoHtmlQueInvoca)
  while (nodoPadre !== null) {
   const metodo = nodoPadre[nombreDelMetodo]
   if (typeof metodo === "function") {
    metodo.call(nodoPadre, event)
    break
   }
   nodoPadre = getNodoPadre(nodoPadre)
  }
  if (nodoPadre === null) {
   const metodo = window[nombreDelMetodo]
   if (typeof metodo === "function") {
    metodo.call(window, event)
   }
  }
 } catch (error) {
  muestraError(error)
 }
}

/**
 * @param { Node } nodo
 */
function getNodoPadre(nodo) {
 if (nodo instanceof ShadowRoot) {
  return nodo.host
 } else {
  return nodo.parentNode
 }
}

// Permite que los eventos de html usen la función.
window["ejecutaMetodo"] = ejecutaMetodo