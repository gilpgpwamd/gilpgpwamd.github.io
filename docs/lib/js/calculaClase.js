import { html } from "./html.js"

/**
 * @param {string[]} paginas
 */
export function calculaClase(paginas) {
 const pathname = location.pathname
 return paginas.includes(pathname) ? html`class="active"` : ""
}