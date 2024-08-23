function obtenerInventario() {
    let url = localStorage.getItem("url");

    axios
        .get(url + "Brummy/views/inventario/obtenerInventario.php", {})
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                    dataTableDestroy();
                    $("#productosBody").html(html);
                    dataTableCreate();
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
                        <td>${index + 1}</td>
                        <td>${codigo}</td>
                        <td>${data.nombre}</td>
                        <td>${data.Flagtipo}</td>
                        <td>${data.precioVenta}</td>
                        <td>${stock}</td>
                        <td>
                            <div style="display: flex; flex-direction: row;">
                                <button class="button button-outline button-round btnGreen" onclick="verProducto(${data.ID})">
                                    <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> inventory_2 </span>
                                </button>
                            </div>
                        </td>
                    </tr>`;
                    });
                    $("#productosBody").html(html);
                    dataTableCreate();
                }
                app.dialog.close();
            }
        })
        .catch(function (error) {
            console.log(error);
            app.dialog.close();
            app.dialog.alert("Algo salió mal", "Aviso");
        })
        .finally(function () {
            // siempre sera ejecutado
        });
}

function nuevoProducto() {
    let modalTemplate = app.popup.create({
        content: `<div class="sheet-modal demo-sheet">
                        <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                            <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                        </div>
                        <div class="sheet-modal-inner">
                            <div class="page-content">
                                <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                    <div id="formInventario" style=" width: 100%; ">
                                        <div class="list list-strong-ios list-dividers-ios inset-ios">
                                            <ul>
                                                <li class="item-content item-input item-input-outline">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Tipo Producto</div>
                                                        <div class="item-input-wrap">
                                                            <select class="floating obligatorio capitalize input-focused " type="text" placeholder="Tipo Producto" id="tipoProducto" name="Tipo Producto"  onchange="asignaObligatorios(this.value)" style="padding-top: 0px !important; height: auto; padding-bottom: 0px !important">
                                                                <option value=""> - - </option>
                                                                <option value="Producto">Producto</option>
                                                                <option value="Servicio">Servicio</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="item-content item-input item-input-outline div_producto div_servicio">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Nombre</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Nombre" id="nombre" name="Nombre">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>
    
                                                <li class="item-content item-input item-input-outline div_producto">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Código</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Código" id="codigo" name="Código">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="item-content item-input item-input-outline div_producto div_servicio">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Descripción</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Descripción" id="descripcion" name="Descripción">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="item-content item-input item-input-outline div_producto">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Precio Compra</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Precio Compra" id="precioCompra" name="Precio Compra">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="item-content item-input item-input-outline div_producto div_servicio">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Precio Venta</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Precio Venta" id="precioVenta" name="Precio Venta">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="item-content item-input item-input-outline div_producto">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Stock mínimo</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Stock mínimo" id="stockMinimo" name="Stock mínimo">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="item-content item-input item-input-outline div_producto">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Stock real</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Stock real" id="stockReal" name="Stock real">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                            
                                    <button class="button button-outline button-round" onclick="guardarProducto()">
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

function asignaObligatorios(value) {
    $(".capitalize").removeClass("obligatorio");
    $(".item-content.item-input.div_producto").css("display", "none");
    if (value == "Producto") {
        $(".producto").addClass("obligatorio");
        $(".div_producto").css("display", "flex");
    } else if (value == "Servicio") {
        $(".servicio").addClass("obligatorio");
        $(".div_servicio").css("display", "flex");
    }
}

function guardarProducto() {
    let values = get_datos_completos("formInventario");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let tipoProducto = String($("#tipoProducto").val()).trim();
        let nombre = String($("#nombre").val()).trim();
        let codigo = String($("#codigo").val()).trim();
        let descripcion = String($("#descripcion").val()).trim();
        let precioCompra = String($("#precioCompra").val()).trim();
        let precioVenta = String($("#precioVenta").val()).trim();
        let stockMinimo = String($("#stockMinimo").val()).trim();
        let stockReal = String($("#stockReal").val()).trim();
        tipoProducto.replaceAll("'", '"');
        nombre.replaceAll("'", '"');
        codigo.replaceAll("'", '"');
        descripcion.replaceAll("'", '"');
        precioCompra.replaceAll("'", '"');
        precioVenta.replaceAll("'", '"');
        stockMinimo.replaceAll("'", '"');
        stockReal.replaceAll("'", '"');
        if (!codigo) {
            let now = String(Date.now());
            let lastFive = now.substr(now.length - 8);
            codigo = "750" + String(lastFive);
        }

        let url = localStorage.getItem("url");

        // axios
        //     .post(url + "Brummy/views/inventario/guardarProducto.php", {
        //         tipoProducto,
        //         nombre,
        //         codigo,
        //         descripcion,
        //         precioCompra,
        //         precioVenta,
        //         stockMinimo,
        //         stockReal,
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //         if (response.status === 200) {
        //             $(".sheet-close").trigger("click");
        //             app.dialog.alert("Guardado correctamente", "Aviso");
        //             obtenerInventario();
        //         }
        //     })
        //     .catch(function (error) {
        //         app.dialog.alert("Algo salió mal", "Aviso");
        //         console.log(error);
        //     });
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "Brummy/views/inventario/guardarProducto.php",
            data: {
                tipoProducto,
                nombre,
                codigo,
                descripcion,
                precioCompra,
                precioVenta,
                stockMinimo,
                stockReal,
            },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;

                switch (success) {
                    case true:
                        $(".sheet-close").trigger("click");
                        app.dialog.alert("Guardado correctamente", "Aviso");
                        obtenerInventario();
                        break;
                    case false:
                        // preloader.hide();
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        break;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                // preloader.hide();
                msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            });
    } else {
        let html =
            '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;margin-top: 15px;"> ';
        response.forEach((data) => {
            html += `<li style="list-style: disc;">${data}.</li> `;
        });
        html += `</ul>`;
        // Swal.fire({ icon: "warning", title: "", html: html });
        swal({
            type: "warning",
            title: "",
            text: html,
            html: true,
        });
    }
}

function verProducto(ID) {
    let url = localStorage.getItem("url");
    // axios
    //     .post(url + "Brummy/views/inventario/obtenerProducto.php", {
    //         ID,
    //     })
    //     .then(function (response) {
    //         console.log(response);
    //         if (response.status === 200) {
    //             let result = response.data.result;
    //             if (result == "Sin Datos") {
    //                 app.dialog.alert("No se encontro información al respecto.", "Aviso");
    //             } else {
    //                 result.forEach((data, index) => {
    //                     let modalTemplate = app.popup.create({
    //                         content: `<div class="sheet-modal demo-sheet">
    //                                         <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;">
    //                                             <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
    //                                         </div>
    //                                         <div class="sheet-modal-inner">
    //                                             <div class="page-content">
    //                                                 <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
    //                                                     <div id="formInventarioModal" style=" width: 100%; ">
    //                                                         <div class="list list-strong-ios list-dividers-ios inset-ios">
    //                                                             <ul>
    //                                                                 <li class="item-content item-input item-input-outline" id="LItipoProductoModal">
    //                                                                     <div class="item-inner">
    //                                                                         <div class="item-title item-floating-label">Tipo Producto</div>
    //                                                                         <div class="item-input-wrap">
    //                                                                             <select class="floating obligatorio capitalize input-focused " type="text" placeholder="Tipo Producto" id="tipoProductoModal" name="Tipo Producto"  onchange="asignaObligatorios(this.value)" style="padding-top: 0px !important; height: auto; padding-bottom: 0px !important">
    //                                                                                 <option value=""> - - </option>
    //                                                                                 <option value="Producto">Producto</option>
    //                                                                                 <option value="Servicio">Servicio</option>
    //                                                                             </select>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </li>

    //                                                                 <li class="item-content item-input item-input-outline div_producto div_servicio" id="LInombreModal">
    //                                                                     <div class="item-inner">
    //                                                                         <div class="item-title item-floating-label">Nombre</div>
    //                                                                         <div class="item-input-wrap">
    //                                                                             <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Nombre" id="nombreModal" name="Nombre">
    //                                                                             <span class="input-clear-button"></span>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </li>

    //                                                                 <li class="item-content item-input item-input-outline div_producto" id="LIcodigoModal">
    //                                                                     <div class="item-inner">
    //                                                                         <div class="item-title item-floating-label">Código</div>
    //                                                                         <div class="item-input-wrap">
    //                                                                             <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Código" id="codigoModal" name="Código">
    //                                                                             <span class="input-clear-button"></span>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </li>

    //                                                                 <li class="item-content item-input item-input-outline div_producto div_servicio" id="LIdescripcionModal">
    //                                                                     <div class="item-inner">
    //                                                                         <div class="item-title item-floating-label">Descripción</div>
    //                                                                         <div class="item-input-wrap">
    //                                                                             <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Descripción" id="descripcionModal" name="Descripción">
    //                                                                             <span class="input-clear-button"></span>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </li>

    //                                                                 <li class="item-content item-input item-input-outline div_producto" id="LIprecioCompraModal">
    //                                                                     <div class="item-inner">
    //                                                                         <div class="item-title item-floating-label">Precio Compra</div>
    //                                                                         <div class="item-input-wrap">
    //                                                                             <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Precio Compra" id="precioCompraModal" name="Precio Compra">
    //                                                                             <span class="input-clear-button"></span>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </li>

    //                                                                 <li class="item-content item-input item-input-outline div_producto div_servicio" id="LIprecioVentaModal">
    //                                                                     <div class="item-inner">
    //                                                                         <div class="item-title item-floating-label">Precio Venta</div>
    //                                                                         <div class="item-input-wrap">
    //                                                                             <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Precio Venta" id="precioVentaModal" name="Precio Venta">
    //                                                                             <span class="input-clear-button"></span>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </li>

    //                                                                 <li class="item-content item-input item-input-outline div_producto" id="LIstockMinimoModal">
    //                                                                     <div class="item-inner">
    //                                                                         <div class="item-title item-floating-label">Stock mínimo</div>
    //                                                                         <div class="item-input-wrap">
    //                                                                             <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Stock mínimo" id="stockMinimoModal" name="Stock mínimo">
    //                                                                             <span class="input-clear-button"></span>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </li>

    //                                                                 <li class="item-content item-input item-input-outline div_producto" id="LIstockRealModal">
    //                                                                     <div class="item-inner">
    //                                                                         <div class="item-title item-floating-label">Stock real</div>
    //                                                                         <div class="item-input-wrap">
    //                                                                             <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Stock real" id="stockRealModal" name="Stock real">
    //                                                                             <span class="input-clear-button"></span>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </li>

    //                                                             </ul>
    //                                                         </div>
    //                                                     </div>

    //                                                     <button class="button button-outline button-round" onclick="actualizarProducto(${ID})">
    //                                                         Actualizar <span class="material-icons iconBtn"> save </span>
    //                                                     </button>

    //                                                     <button class="button button-outline button-round btnRed" onclick="eliminarProdcuto(${ID})" style="margin-top: 40px;">
    //                                                         Eliminar <span class="material-icons iconBtn"> delete </span>
    //                                                     </button>

    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>`,
    //                         swipeToClose: false,
    //                         closeByOutsideClick: false,
    //                         closeByBackdropClick: false,
    //                         closeOnEscape: false,
    //                         on: {
    //                             open: function (popup) {
    //                                 $(".capitalize").removeClass("obligatorio");
    //                                 $(".div_producto").css("display", "none");
    //                                 if (data.tipo) {
    //                                     $("#tipoProductoModal").val(data.tipo);
    //                                     $("#LItipoProductoModal").addClass("item-input-focused");
    //                                     $("#tipoProductoModal").addClass("input-with-value input-focused item-input-outline");
    //                                 }
    //                                 if (data.nombre) {
    //                                     $("#nombreModal").val(data.nombre);
    //                                     $("#LInombreModal").addClass("item-input-focused");
    //                                     $("#nombreModal").addClass("input-with-value input-focused item-input-outline");
    //                                 }
    //                                 if (data.codigo) {
    //                                     data.tipo == "Servicio"
    //                                         ? $("#codigoModal").val(String(data.codigo) + String(data.ID))
    //                                         : $("#codigoModal").val(data.codigo);
    //                                     $("#codigoModal").val(data.descripcion);
    //                                     $("#LIcodigoModal").addClass("item-input-focused");
    //                                     $("#codigoModal").addClass("input-with-value input-focused item-input-outline");
    //                                 }
    //                                 if (data.descripcion) {
    //                                     $("#descripcionModal").val(data.descripcion);
    //                                     $("#LIdescripcionModal").addClass("item-input-focused");
    //                                     $("#descripcionModal").addClass("input-with-value input-focused item-input-outline");
    //                                 }
    //                                 if (data.precioCompra) {
    //                                     $("#precioCompraModal").val(data.precioCompra);
    //                                     $("#LIprecioCompraModal").addClass("item-input-focused");
    //                                     $("#precioCompraModal").addClass("input-with-value input-focused item-input-outline");
    //                                 }
    //                                 if (data.precioVenta) {
    //                                     $("#precioVentaModal").val(data.precioVenta);
    //                                     $("#LIprecioVentaModal").addClass("item-input-focused");
    //                                     $("#precioVentaModal").addClass("input-with-value input-focused item-input-outline");
    //                                 }
    //                                 if (data.stockMinimo) {
    //                                     $("#stockMinimoModal").val(data.stockMinimo);
    //                                     $("#LIstockMinimoModal").addClass("item-input-focused");
    //                                     $("#stockMinimoModal").addClass("input-with-value input-focused item-input-outline");
    //                                 }
    //                                 if (data.stockReal) {
    //                                     $("#stockRealModal").val(data.stockReal);
    //                                     $("#LIstockRealModal").addClass("item-input-focused");
    //                                     $("#stockRealModal").addClass("input-with-value input-focused item-input-outline");
    //                                 }
    //                                 if (data.tipo == "Producto") {
    //                                     $(".producto").addClass("obligatorio");
    //                                     $(".div_producto").css("display", "flex");
    //                                 } else if (data.tipo == "Servicio") {
    //                                     $(".servicio").addClass("obligatorio");
    //                                     $(".div_servicio").css("display", "flex");
    //                                 }
    //                             },
    //                         },
    //                     });

    //                     modalTemplate.open();
    //                 });
    //             }
    //         }
    //     })
    //     .catch(function (error) {
    //         app.dialog.alert("Algo salió mal", "Aviso");
    //         console.log(error);
    //     });

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/inventario/obtenerProducto.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        app.dialog.alert("No se encontro información al respecto.", "Aviso");
                    } else {
                        result.forEach((data, index) => {
                            let modalTemplate = app.popup.create({
                                content: `<div class="sheet-modal demo-sheet">
                                    <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;">
                                        <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                                    </div>
                                    <div class="sheet-modal-inner">
                                        <div class="page-content">
                                            <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                                <div id="formInventarioModal" style=" width: 100%; ">
                                                    <div class="list list-strong-ios list-dividers-ios inset-ios">
                                                        <ul>
                                                            <li class="item-content item-input item-input-outline" id="LItipoProductoModal">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-floating-label">Tipo Producto</div>
                                                                    <div class="item-input-wrap">
                                                                        <select class="floating obligatorio capitalize input-focused " type="text" placeholder="Tipo Producto" id="tipoProductoModal" name="Tipo Producto"  onchange="asignaObligatorios(this.value)" style="padding-top: 0px !important; height: auto; padding-bottom: 0px !important">
                                                                            <option value=""> - - </option>
                                                                            <option value="Producto">Producto</option>
                                                                            <option value="Servicio">Servicio</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li class="item-content item-input item-input-outline div_producto div_servicio" id="LInombreModal">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-floating-label">Nombre</div>
                                                                    <div class="item-input-wrap">
                                                                        <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Nombre" id="nombreModal" name="Nombre">
                                                                        <span class="input-clear-button"></span>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li class="item-content item-input item-input-outline div_producto" id="LIcodigoModal">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-floating-label">Código</div>
                                                                    <div class="item-input-wrap">
                                                                        <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Código" id="codigoModal" name="Código">
                                                                        <span class="input-clear-button"></span>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li class="item-content item-input item-input-outline div_producto div_servicio" id="LIdescripcionModal">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-floating-label">Descripción</div>
                                                                    <div class="item-input-wrap">
                                                                        <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Descripción" id="descripcionModal" name="Descripción">
                                                                        <span class="input-clear-button"></span>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li class="item-content item-input item-input-outline div_producto" id="LIprecioCompraModal">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-floating-label">Precio Compra</div>
                                                                    <div class="item-input-wrap">
                                                                        <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Precio Compra" id="precioCompraModal" name="Precio Compra">
                                                                        <span class="input-clear-button"></span>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li class="item-content item-input item-input-outline div_producto div_servicio" id="LIprecioVentaModal">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-floating-label">Precio Venta</div>
                                                                    <div class="item-input-wrap">
                                                                        <input class="floating obligatorio producto capitalize input-focused servicio" type="text" placeholder="Precio Venta" id="precioVentaModal" name="Precio Venta">
                                                                        <span class="input-clear-button"></span>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li class="item-content item-input item-input-outline div_producto" id="LIstockMinimoModal">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-floating-label">Stock mínimo</div>
                                                                    <div class="item-input-wrap">
                                                                        <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Stock mínimo" id="stockMinimoModal" name="Stock mínimo">
                                                                        <span class="input-clear-button"></span>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li class="item-content item-input item-input-outline div_producto" id="LIstockRealModal">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-floating-label">Stock real</div>
                                                                    <div class="item-input-wrap">
                                                                        <input class="floating obligatorio producto capitalize input-focused " type="text" placeholder="Stock real" id="stockRealModal" name="Stock real">
                                                                        <span class="input-clear-button"></span>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>

                                                <button class="button button-outline button-round" onclick="actualizarProducto(${ID})">
                                                    Actualizar <span class="material-icons iconBtn"> save </span>
                                                </button>

                                                <button class="button button-outline button-round btnRed" onclick="eliminarProdcuto(${ID})" style="margin-top: 40px;">
                                                    Eliminar <span class="material-icons iconBtn"> delete </span>
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
                                        $(".capitalize").removeClass("obligatorio");
                                        $(".div_producto").css("display", "none");
                                        if (data.tipo) {
                                            $("#tipoProductoModal").val(data.tipo);
                                            $("#LItipoProductoModal").addClass("item-input-focused");
                                            $("#tipoProductoModal").addClass("input-with-value input-focused item-input-outline");
                                        }
                                        if (data.nombre) {
                                            $("#nombreModal").val(data.nombre);
                                            $("#LInombreModal").addClass("item-input-focused");
                                            $("#nombreModal").addClass("input-with-value input-focused item-input-outline");
                                        }
                                        if (data.codigo) {
                                            data.tipo == "Servicio"
                                                ? $("#codigoModal").val(String(data.codigo) + String(data.ID))
                                                : $("#codigoModal").val(data.codigo);
                                            $("#codigoModal").val(data.descripcion);
                                            $("#LIcodigoModal").addClass("item-input-focused");
                                            $("#codigoModal").addClass("input-with-value input-focused item-input-outline");
                                        }
                                        if (data.descripcion) {
                                            $("#descripcionModal").val(data.descripcion);
                                            $("#LIdescripcionModal").addClass("item-input-focused");
                                            $("#descripcionModal").addClass("input-with-value input-focused item-input-outline");
                                        }
                                        if (data.precioCompra) {
                                            $("#precioCompraModal").val(data.precioCompra);
                                            $("#LIprecioCompraModal").addClass("item-input-focused");
                                            $("#precioCompraModal").addClass("input-with-value input-focused item-input-outline");
                                        }
                                        if (data.precioVenta) {
                                            $("#precioVentaModal").val(data.precioVenta);
                                            $("#LIprecioVentaModal").addClass("item-input-focused");
                                            $("#precioVentaModal").addClass("input-with-value input-focused item-input-outline");
                                        }
                                        if (data.stockMinimo) {
                                            $("#stockMinimoModal").val(data.stockMinimo);
                                            $("#LIstockMinimoModal").addClass("item-input-focused");
                                            $("#stockMinimoModal").addClass("input-with-value input-focused item-input-outline");
                                        }
                                        if (data.stockReal) {
                                            $("#stockRealModal").val(data.stockReal);
                                            $("#LIstockRealModal").addClass("item-input-focused");
                                            $("#stockRealModal").addClass("input-with-value input-focused item-input-outline");
                                        }
                                        if (data.tipo == "Producto") {
                                            $(".producto").addClass("obligatorio");
                                            $(".div_producto").css("display", "flex");
                                        } else if (data.tipo == "Servicio") {
                                            $(".servicio").addClass("obligatorio");
                                            $(".div_servicio").css("display", "flex");
                                        }
                                    },
                                },
                            });

                            modalTemplate.open();
                        });
                    }
                    break;
                case false:
                    // preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function actualizarProducto(ID) {
    let values = get_datos_completos("formInventarioModal");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let tipoProducto = String($("#tipoProductoModal").val()).trim();
        let nombre = String($("#nombreModal").val()).trim();
        let codigo = String($("#codigoModal").val()).trim();
        let descripcion = String($("#descripcionModal").val()).trim();
        let precioCompra = String($("#precioCompraModal").val()).trim();
        let precioVenta = String($("#precioVentaModal").val()).trim();
        let stockMinimo = String($("#stockMinimoModal").val()).trim();
        let stockReal = String($("#stockRealModal").val()).trim();

        tipoProducto.replaceAll("'", '"');
        nombre.replaceAll("'", '"');
        codigo.replaceAll("'", '"');
        descripcion.replaceAll("'", '"');
        precioCompra.replaceAll("'", '"');
        precioVenta.replaceAll("'", '"');
        stockMinimo.replaceAll("'", '"');
        stockReal.replaceAll("'", '"');

        let url = localStorage.getItem("url");

        // axios
        //     .post(url + "Brummy/views/inventario/actualizaProducto.php", {
        //         descripcion,
        //         precioCompra,
        //         precioVenta,
        //         stockMinimo,
        //         stockReal,
        //         ID,
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //         if (response.status === 200) {
        //             $(".sheet-close").trigger("click");
        //             app.dialog.alert("Actualizado correctamente", "Aviso");
        //             obtenerInventario();
        //         }
        //     })
        //     .catch(function (error) {
        //         app.dialog.alert("Algo salió mal", "Aviso");
        //         console.log(error);
        //     });
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "Brummy/views/inventario/actualizaProducto.php",
            data: {
                descripcion,
                precioCompra,
                precioVenta,
                stockMinimo,
                stockReal,
                ID,
            },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;

                switch (success) {
                    case true:
                        $(".sheet-close").trigger("click");
                        app.dialog.alert("Actualizado correctamente", "Aviso");
                        obtenerInventario();
                        break;
                    case false:
                        // preloader.hide();
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        break;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                // preloader.hide();
                msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            });
    } else {
        let html =
            '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;margin-top: 15px;"> ';
        response.forEach((data) => {
            html += `<li style="list-style: disc;">${data}.</li> `;
        });
        html += `</ul>`;
        // Swal.fire({ icon: "warning", title: "", html: html });
        swal({
            type: "warning",
            title: "",
            text: html,
            html: true,
        });
    }
}

function eliminarProdcuto(ID) {
    let url = localStorage.getItem("url");

    app.dialog
        .create({
            title: "¿Estás seguro de querer eliminar este registro?",
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
                        // axios
                        //     .post(url + "Brummy/views/inventario/eliminarProdcuto.php", {
                        //         ID,
                        //     })
                        //     .then(function (response) {
                        //         console.log(response);
                        //         if (response.status === 200) {
                        //             $(".sheet-close").trigger("click");
                        //             app.dialog.alert("Eliminado correctamente", "Aviso");
                        //             obtenerInventario();
                        //         }
                        //     })
                        //     .catch(function (error) {
                        //         app.dialog.alert("Algo salió mal", "Aviso");
                        //         console.log(error);
                        //     });
                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: url + "Brummy/views/inventario/eliminarProdcuto.php",
                            data: { ID },
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;

                                switch (success) {
                                    case true:
                                        $(".sheet-close").trigger("click");
                                        app.dialog.alert("Eliminado correctamente", "Aviso");
                                        obtenerInventario();
                                        break;
                                    case false:
                                        // preloader.hide();
                                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                        break;
                                }
                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                                // preloader.hide();
                                msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                            });
                    },
                },
            ],
        })
        .open();
}
