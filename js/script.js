document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.getElementById("btn-calcular");
    const btnLimpiar = document.getElementById("btn-limpiar");
    const formulario = document.getElementById("formulario-simulador");
    const seccionResultados = document.getElementById("resultados");
    
    const resGastoAnterior = document.getElementById("res-gasto-anterior");
    const resGastoActual = document.getElementById("res-gasto-actual");
    const resIncrementoPrecio = document.getElementById("res-incremento-precio");
    const resGastoAdicional = document.getElementById("res-gasto-adicional");
    const resPorcentaje = document.getElementById("res-porcentaje");
    const contenedorAlerta = document.getElementById("contenedor-alerta");

    const radialPorcentaje = document.getElementById("radial-porcentaje");
    const barraAnterior = document.getElementById("barra-anterior");
    const barraActual = document.getElementById("barra-actual");

    btnCalcular.addEventListener("click", () => {
        const producto = document.getElementById("producto").value;
        const precioAnterior = parseFloat(document.getElementById("precio-anterior").value);
        const precioActual = parseFloat(document.getElementById("precio-actual").value);
        const cantidad = parseInt(document.getElementById("cantidad").value);

        if (!producto || isNaN(precioAnterior) || isNaN(precioActual) || isNaN(cantidad)) {
            alert("Por favor, rellene todos los campos con valores válidos.");
            return;
        }

        if (precioAnterior <= 0 || precioActual <= 0 || cantidad <= 0) {
            alert("Los valores numéricos deben ser mayores que cero.");
            return;
        }

        const gastoAnteriorTotal = precioAnterior * cantidad;
        const gastoActualTotal = precioActual * cantidad;
        const incrementoPrecioNeto = precioActual - precioAnterior;
        const gastoAdicionalTotal = gastoActualTotal - gastoAnteriorTotal;
        const porcentajeAumento = ((precioActual - precioAnterior) / precioAnterior) * 100;

        resGastoAnterior.textContent = `${gastoAnteriorTotal.toFixed(2)} Bs`;
        resGastoActual.textContent = `${gastoActualTotal.toFixed(2)} Bs`;
        resIncrementoPrecio.textContent = `${incrementoPrecioNeto.toFixed(2)} Bs`;
        resGastoAdicional.textContent = `${gastoAdicionalTotal.toFixed(2)} Bs`;
        resPorcentaje.textContent = `${porcentajeAumento.toFixed(0)}%`;

        const maxPorcentajeMapeado = Math.min(porcentajeAumento, 100);
        radialPorcentaje.style.background = `conic-gradient(var(--bolivia-rojo) ${maxPorcentajeMapeado}%, var(--borde-glow) ${maxPorcentajeMapeado}%)`;
        radialPorcentaje.style.boxShadow = `0 0 25px rgba(255, 59, 48, ${0.3 + (maxPorcentajeMapeado / 200)})`;

        const maxGasto = Math.max(gastoAnteriorTotal, gastoActualTotal);
        const pctBarraAnterior = (gastoAnteriorTotal / maxGasto) * 100;
        const pctBarraActual = (gastoActualTotal / maxGasto) * 100;

        setTimeout(() => {
            barraAnterior.style.width = `${pctBarraAnterior}%`;
            barraActual.style.width = `${pctBarraActual}%`;
        }, 50);

        contenedorAlerta.className = "alerta alerta-critica";
        contenedorAlerta.innerHTML = `⚠️ Alerta: El producto [${producto}] subió un ${porcentajeAumento.toFixed(0)}%. Esto genera un gasto imprevisto de ${gastoAdicionalTotal.toFixed(2)} Bs al mes.`;
    });

    btnLimpiar.addEventListener("click", () => {
        formulario.reset();
        barraAnterior.style.width = "0%";
        barraActual.style.width = "0%";
        radialPorcentaje.style.background = `conic-gradient(var(--bolivia-rojo) 0%, var(--borde-glow) 0%)`;
        radialPorcentaje.style.boxShadow = "0 0 20px rgba(255, 59, 48, 0.3)";
        contenedorAlerta.className = "alerta";
        contenedorAlerta.innerHTML = "";
        resGastoAnterior.textContent = "0.00 Bs";
        resGastoActual.textContent = "0.00 Bs";
        resIncrementoPrecio.textContent = "0.00 Bs";
        resGastoAdicional.textContent = "0.00 Bs";
        resPorcentaje.textContent = "0%";
    });
});

function cargarCaso(pAnterior, pActual, cant, prod) {
    document.getElementById("producto").value = prod;
    document.getElementById("precio-anterior").value = pAnterior;
    document.getElementById("precio-actual").value = pActual;
    document.getElementById("cantidad").value = cant;
    document.getElementById("btn-calcular").click();
}