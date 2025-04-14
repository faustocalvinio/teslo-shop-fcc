const fecha = new Date();

const dia = String(fecha.getDate()).padStart(2, "0");
const mes = String(fecha.getMonth() + 1).padStart(2, "0"); 
const anio = fecha.getFullYear();

export const fechaFormateada = `${dia}/${mes}/${anio}`;
