function obtenerVentas(mes, anio) {
    let url = localStorage.getItem("url");
    axios
        .post(url + "Brummy/views/ventas/obtenerVentas.php", {
            mes,
            anio,
        })
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                    dataTableDestroy();
                    $("#ventasBody").html(html);
                    dataTableCreate(1);
                } else {
                    dataTableDestroy();
                    let html, codigo, stock;
                    result.forEach((data, index) => {
                        codigo = data.codigo;
                        stock = data.stockReal;
                        if (data.Flagtipo == "Servicio") {
                            codigo = String(codigo) + String(data.ID);
                            stock = "N/A";
                        }
                        html += `<tr>
                            <td class="capitalize">VTA-${data.ID}</td>
                            <td class="capitalize">${data.nombreCompleto}</td>
                            <td>${data.cantidad}</td>
                            <td class="capitalize">${FormatDate(data.Fecha)}</td>
                            <td class="capitalize">$${data.price}</td>
                            <td>
                                <div style="display: flex; flex-direction: row;">
                                    <button class="button button-outline button-round btnBlue" onclick="verDetalleVenta(${
                                        data.ID
                                    })" style="margin-right: 10px;">
                                        <span class="text-sm mb-0"><i class="material-icons" style="margin: auto;vertical-align: middle;"> shopping_cart </i></span>
                                    </button>
                                </div>
                            </td>
                        </tr>`;
                    });
                    $("#ventasBody").html(html);
                    dataTableCreate(1);
                }
                app.dialog.close();
            }
        })
        .catch(function (error) {
            app.dialog.alert("Algo salió mal", "Aviso");
            console.log(error);
        });
}

function verDetalleVenta(ID) {
    let url = localStorage.getItem("url");
    axios
        .post(url + "Brummy/views/ventas/obtenerVenta.php", {
            ID,
        })
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                if (result == "Sin Datos") {
                    app.dialog.alert("No se logró obtener infornmación de la venta.", "Aviso");
                } else {
                    let html = "",
                        codigo,
                        stock;
                    result.forEach((data, index) => {
                        console.log(data);
                        let random = genRandom();
                        nombreCliente = data.nombreCliente;
                        Fecha = data.Fecha;
                        cambio = data.cambio;
                        if (Number(cambio) <= 0) {
                            efectivo = data.price;
                        } else {
                            efectivo = data.efectivo;
                        }
                        price = data.price;
                        html += `
                        <div id="${random}_product">
                            <div class="product" style="grid-template-columns: 1fr 80px 1fr 100px;">
                                <div>
                                    <span class="capitalize" id="${random}_FlagProducto">${data.FlagProducto}</span>
                                    <p class="capitalize">${data.tipo}</p>
                                </div>
                                <div class="quantity">
                                    <label style="color: #009071;" id="${random}_label">${data.cantidad}</label>
                                </div>
                                <label class="price small my-auto" id="${random}_totals">$${data.precioVenta} c/u</label>
                                <label class="price small my-auto" id="${random}_total">$${data.total}</label>
                            </div>
                            <hr>
                        </div>`;
                    });

                    let modalTemplate = app.popup.create({
                        content: `<div class="sheet-modal demo-sheet">
                                        <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;width: fit-content;left: 94%;"> 
                                            <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                                        </div>
                                        <div class="sheet-modal-inner">
                                            <div class="page-content">
                                                <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                                    <div class="card" style="padding: 20px">
                                                        <div style="display: flex;flex-direction: row;">
                                                            <h4 class="card-title me-3" style="font-weight: 400;">Cliente:</h4>
                                                            <h4 class="card-title subtitle capitalize">${nombreCliente}</h4>
                                                        </div>
                                                        <div style="display: flex;flex-direction: row;">
                                                            <h4 class="card-title me-3" style="font-weight: 400;">Fecha:</h4>
                                                            <h4 class="card-title subtitle">${Fecha}</h4>
                                                        </div>
                                                        <hr>
                                                        <h4 class="card-title mt-2">Carrito</h4>
                                                        <div class="row">
                                                            <div class="col-md-12 mb-2">
                                                                <div class="master-container">
                                                                    <div class="cart">
                                                                        <div class="products">
                                                                            ${html}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                        
                                                        <div class="row">
                                                            <div class="col-md-12 mb-2">
                                                                <div class="checkout">
                                                                    <div class="details">
                                                                        <span>Subtotal:</span>
                                                                        <span id="totalSubtotal">$${price}</span>
                                                                    </div>
                                                                    <div class="details">
                                                                        <span>Descuentos de productos:</span>
                                                                        <span id="totalDescuentos">$0.00</span>
                                                                    </div>
                                                                    <hr>
                                                                    <div class="checkout--footer">
                                                                        <label class="price" id="priceTotal_text"><sup>$</sup>${price}</label>
                                                                    </div>
                                                                    <hr>
                                                                    <div class="details">
                                                                        <span>Efectivo:</span>
                                                                        <span>$${efectivo}</span>
                                                                    </div>
                                                                    <div class="details">
                                                                        <span>Cabmio:</span>
                                                                        <span id="totalDescuentos">$${cambio}</span>
                                                                    </div>
                                                                    <hr>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            
                                                    <button class="button button-outline button-round" onclick="guardarMascota()">
                                                        Guardar <span class="material-icons iconBtn"> save </span>
                                                    </button>
                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>`,
                        swipeToClose: false,
                        closeByOutsideClick: false,
                        closeByBackdropClick: false,
                        closeOnEscape: false,
                        on: {
                            open: function (popup) {},
                        },
                    });

                    modalTemplate.open();
                }
                app.dialog.close();
            }
        })
        .catch(function (error) {
            app.dialog.alert("Algo salió mal", "Aviso");
            console.log(error);
        });
}

function irNuevaVenta() {
    let name = "nuevaVenta";
    app.views.main.router.navigate({ name: name });
}

function guardarVenta() {
    let cliente = $("#clientes").val();
    let price = $("#priceTotal").val();
    let FlagExacto = 1;
    let efectivo = 0;
    let cambio = 0;

    let cboxCambio = $("#cboxCambio").prop("checked");
    if (!cboxCambio) {
        FlagExacto = 0;
        efectivo = Number($("#efectivo").val());
        cambio = Number($("#cambio").val());
    }
    let nameCliente = $("#clientes").find("option:selected").text();
    let url = localStorage.getItem("url");
    axios
        .post(url + "Brummy/views/ventas/guardarHeaderVenta.php", {
            cliente,
            price,
            FlagExacto,
            efectivo,
            cambio,
            nameCliente,
        })
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                if (result == "Sin Datos") {
                } else {
                    result.forEach((data, index) => {
                        let dataID = data.IDHeader;
                        let campos;
                        campos = document.querySelectorAll(".products div.productoDetail");
                        let random = 0;
                        campos.forEach((campos) => {
                            if (campos.id) {
                                random = String(campos.id).replace("_product", "");
                                let FlagProducto = $("#" + random + "_FlagProducto").text();
                                let FKProducto = $("#" + random + "_FKProducto").val();
                                let label = $("#" + random + "_label").text();
                                let total = Number(String($("#" + random + "_total").text()).replace("$", ""));
                                let stock = $("#" + random + "_stock").val();
                                let newStock = Number(stock) - Number(label);
                                let url = localStorage.getItem("url");
                                axios
                                    .post(url + "Brummy/views/ventas/guardarDetalleVenta.php", {
                                        dataID,
                                        FlagProducto,
                                        FKProducto,
                                        label,
                                        total,
                                        newStock,
                                    })
                                    .then(function (response) {
                                        console.log(response);
                                        if (response.status === 200) {
                                            $(".sheet-close").trigger("click");
                                            app.dialog.alert("Venta guardada correctamente", "Aviso");
                                            app.views.main.router.back();
                                        }
                                    })
                                    .catch(function (error) {
                                        app.dialog.alert("Algo salió mal", "Aviso");
                                        console.log(error);
                                    });
                            }
                        });
                    });
                }
            }
        })
        .catch(function (error) {
            app.dialog.alert("Algo salió mal", "Aviso");
            console.log(error);
        });
}

function addACuenta(ID) {
    let random = String(ID).replace("_add", "");
    let stockReal = String($("#" + random + "_stock").val()).replace("_stock", "");
    let cantidadActual = Number(String($("#" + random + "_label").text()).replace("_label", "")).toFixed();
    let Flagtipo = String($("#" + random + "_Flagtipo").val()).replace("_Flagtipo", "");
    if (Flagtipo == "Producto") {
        if (cantidadActual == stockReal) {
            app.dialog.alert("No se cuenta con el stock suficiente para poder agregar más productos.", "Aviso");
            return false;
        }
    }
    let costoProducto = Number(String($("#" + random + "_costo").val()).replace("_costo", "")).toFixed(2);
    cantidadActual = Number(cantidadActual) + 1;
    costoProducto = Number(Number(costoProducto) * cantidadActual);
    $("#" + random + "_label").text(cantidadActual);
    $("#" + random + "_total").text("$" + Number(costoProducto).toFixed(2));

    obtenerTotal();
}

function removeACuenta(ID) {
    let random = String(ID).replace("_remove", "");
    let cantidadActual = Number(String($("#" + random + "_label").text()).replace("_label", "")).toFixed();
    if (cantidadActual == 0) {
    } else {
        let stockReal = String($("#" + random + "_stock").val()).replace("_stock", "");
        let costoProducto = Number(String($("#" + random + "_costo").val()).replace("_costo", "")).toFixed(2);
        cantidadActual = Number(cantidadActual) - 1;
        costoProducto = Number(Number(costoProducto) * cantidadActual);
        $("#" + random + "_label").text(cantidadActual);
        $("#" + random + "_total").text("$" + Number(costoProducto).toFixed(2));
        obtenerTotal();
    }
}

function obtenerTotal() {
    let campos;
    campos = document.querySelectorAll(".products div div label.price.small.my-auto");
    let price = 0;

    campos.forEach((campos) => {
        let price1 = 0;
        price1 = String(campos.innerText).replace("$", "");
        price = Number(price) + Number(price1);
    });

    $("#priceTotal").val(price);
    $("#priceTotal_text").html("<sup>$</sup>" + Number(price).toFixed(2));
}

function deleteProducto(random) {
    app.dialog
        .create({
            title: "¿Estás seguro de querer eliminar este item?",
            buttons: [
                {
                    text: "Cancelar",
                    onClick: function () {
                        console.log("Cancelar");
                    },
                },
                {
                    text: "OK",
                    onClick: function () {
                        $(`#${random}_product`).remove();
                        obtenerTotal();
                    },
                },
            ],
        })
        .open();
}

function terminarVenta() {
    let cliente = $("#clientes").val();
    let priceTotal = Number($("#priceTotal").val());

    if (cliente) {
        if (priceTotal > 0) {
            let modalTemplate = app.popup.create({
                content: `<div class="sheet-modal demo-sheet">
                                <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;width: fit-content;left: 94%;"> 
                                    <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                                </div>
                                <div class="sheet-modal-inner">
                                    <div class="page-content">
                                        <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                            <div id="formTerminarVenta" style="width: 100%;">
                                                <div style="text-align: center;">
                                                    <label class="form-check-label">
                                                        <input type="checkbox" class="form-check-input" id="cboxCambio" onchange="muestraCambio()" checked style="margin-right: 12px;">
                                                        Efectivo Exacto
                                                    <i class="input-helper"></i></label>
                                                </div>

                                                <div class="list list-strong-ios list-dividers-ios inset-ios">
                                                    <ul>
                                                        <li class="item-content item-input item-input-outline" id="LItoalVenta">
                                                            <div class="item-inner">
                                                                <div class="item-title item-floating-label">Total Venta</div>
                                                                <div class="item-input-wrap">
                                                                    <input class="floating obligatorio input-focused " type="text" placeholder="Total Venta" id="toalVenta" name="Total Venta" readonly>
                                                                    <span class="input-clear-button"></span>
                                                                </div>
                                                            </div>
                                                        </li>
                            
                                                        <li class="item-content item-input item-input-outline">
                                                            <div class="item-inner">
                                                                <div class="item-title item-floating-label">Efectivo</div>
                                                                <div class="item-input-wrap">
                                                                    <input class="floating obligatorio input-focused " type="text" placeholder="Efectivo" id="efectivo" name="Efectivo" onchange="calculaCambio()" disabled>
                                                                    <span class="input-clear-button"></span>
                                                                </div>
                                                            </div>
                                                        </li>
                            
                                                        <li class="item-content item-input item-input-outline" id="LIcambio">
                                                            <div class="item-inner">
                                                                <div class="item-title item-floating-label">Cambio</div>
                                                                <div class="item-input-wrap">
                                                                    <input class="floating obligatorio input-focused " type="text" placeholder="Cambio" id="cambio" name="Cambio" readonly>
                                                                    <span class="input-clear-button"></span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <button class="button button-outline button-round" onclick="guardarVenta()">
                                                Guardar <span class="material-icons iconBtn"> save </span>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>`,
                swipeToClose: false,
                closeByOutsideClick: false,
                closeByBackdropClick: false,
                closeOnEscape: false,
                on: {
                    open: function (popup) {
                        $("#toalVenta").val(priceTotal);
                        $("#LItoalVenta").addClass("item-input-focused");
                        $("#toalVenta").addClass("input-with-value input-focused item-input-outline");
                    },
                },
            });

            modalTemplate.open();
        } else {
            app.dialog.alert("La cuenta esta en 0.", "Aviso");
        }
    } else {
        app.dialog.alert("Debes seleccionar a un cliente.", "Aviso");
    }
}

function muestraCambio() {
    let cboxCambio = $("#cboxCambio").prop("checked");
    if (cboxCambio) {
        $("#efectivo").prop("disabled", true);
        $("#efectivo").val("");
        $("#cambio").val("");
    } else {
        $("#efectivo").prop("disabled", false);
    }
}

function calculaCambio() {
    let efectivo = Number($("#efectivo").val());
    let toalVenta = Number($("#toalVenta").val());
    let cambio = 0;
    if (efectivo > 0) {
        if (efectivo >= toalVenta) {
            cambio = Number(efectivo - toalVenta);
            $("#cambio").val(cambio);
            $("#LIcambio").addClass("item-input-focused");
            $("#cambio").addClass("input-with-value input-focused item-input-outline");
        } else {
            $("#cambio").val("El efectivo es menor a el total de la venta");
        }
    }
}
