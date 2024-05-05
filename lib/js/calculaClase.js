
/**
 * @param {string[]} paginas
 */
export function calculaClase(paginas) {
 const pathname = location.pathname
 return paginas.includes(pathname) ? `class="active"` : ""
}