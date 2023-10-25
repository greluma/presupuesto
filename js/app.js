const ingresos = [
  // new Ingreso("Salario", 2000),
  // new Ingreso("Venta Coche", 1500),
];

const egresos = [
  // new Egreso("Renta", 900),
  // new Egreso("Ropa", 400)
];

let cargarApp = () => {
  cargarCabecero();
};

let cargarCabecero = () => {
  let signo = "+";
  if (presupuesto() < 0) {
    signo = "";
  }

  document.querySelector("#presupuesto").innerHTML = `${signo}${formatoMoneda(
    presupuesto()
  )}`;
  document.querySelector("#ingresos").innerHTML = `${formatoMoneda(
    totalIngresos()
  )}`;
  document.querySelector("#egresos").innerHTML = `${formatoMoneda(
    totalEgresos()
  )}`;
  document.querySelector("#porcentaje").innerHTML = `${formatoPorcentaje(
    xciento()
  )}`;
  document.querySelector("#lista-ingresos").innerHTML = actIngresos();
  document.querySelector("#lista-egresos").innerHTML = actEgresos();
};

let totalIngresos = () => {
  let totalIngresos = 0;
  ingresos.forEach((element) => {
    totalIngresos += element.val;
  });
  return totalIngresos;
};

let totalEgresos = () => {
  let totalEgresos = 0;
  egresos.forEach((element) => {
    totalEgresos += element.val;
  });
  return totalEgresos;
};

let xciento = () => {
  if (totalIngresos() == 0 && totalEgresos() == 0) {
    return 0;
  }
  if (totalEgresos() / totalIngresos() == "Infinity") {
    return 0;
  }
  return totalEgresos() / totalIngresos();
};

let presupuesto = () => {
  return totalIngresos() - totalEgresos();
};

const formatoMoneda = (val) => {
  return val.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (val) => {
  return val.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const actIngresos = () => {
  resp = ``;
  ingresos.forEach((element) => {
    resp += `<div class="" id="lista-ingresos">
          <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${element.desc}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor"> ${formatoMoneda(element.val)}</div>
              <div class="elemento_eliminar">
              <button class="elemento_eliminar--btn">
              <ion-icon name="close-circle-outline" onclick="eliminarItem(${
                element.id
              }, ingresos)"></ion-icon>
              </button>
              </div>
            </div>
          </div>
        </div>`;
  });
  return resp;
};

const actEgresos = () => {
  resp = ``;
  egresos.forEach((element) => {
    let xcientoElem = formatoPorcentaje(element.val / totalIngresos());
    if (xcientoElem == "∞%") {
      xcientoElem = "0%";
    }
    resp += `<div class="" id="lista-ingresos">
          <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${element.desc}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">- ${formatoMoneda(element.val)}</div>
              <div class="elemento_porcentaje">${xcientoElem}</div>
              <div class="elemento_eliminar">
              <button class="elemento_eliminar--btn">
              <ion-icon name="close-circle-outline" onclick="eliminarItem(${
                element.id
              }, egresos)"></ion-icon>
              </button>
              </div>
            </div>
          </div>
        </div>`;
  });
  return resp;
};

const eliminarItem = (ident, lista) => {
  let indice;
  lista.forEach((element) => {
    if (element.id == ident) {
      indice = lista.indexOf(element);
    }
  });
  lista.splice(indice, 1);
  cargarCabecero();
};

const agregarDato = () => {
  let tipo = document.querySelector("#tipo").value;
  let desc = document.querySelector("#descripcion").value;
  let valor = document.querySelector("#valor").value;
  if (desc == "") {
    alert("Inserte Descripcion");
  } else if (valor == "" || valor == 0) {
    alert("Inserte un Valor Valido");
  } else {
    let newDato;
    if (tipo == "ingreso") {
      newDato = new Ingreso(desc, parseFloat(valor));
      ingresos.push(newDato);
    } else {
      newDato = new Egreso(desc, parseFloat(valor));
      egresos.push(newDato);
    }
  }

  cargarCabecero();
  document.querySelector("#descripcion").value = "";
  document.querySelector("#valor").value = "";
};
