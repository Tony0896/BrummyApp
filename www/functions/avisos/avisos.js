function obtenerAvisos(estatus) {
    // app.dialog.progress("Cargando...", "#009071");
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/avisos/obtenerAvisos.php",
        data: { estatus },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#avisosBody").html(html);
                        dataTableCreateDes();
                        app.dialog.close();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${Number(index + 1)}</td>
                                <td class="capitalize" style="text-wrap: wrap;">${data.aviso}</td>
                                <td>${FormatDate(data.fechaInicio)}</td>
                                <td>${FormatDate(data.fechaFin)}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <button class="button button-outline button-round btnGreen" onclick="verDetalleAvisos(${
                                            data.ID
                                        })" style="margin-right: 10px;">
                                            <span class="text-sm mb-0"><i class="material-icons" style="margin: auto;vertical-align: middle;"> edit </i></span>
                                        </button>

                                        <button class="button button-outline button-round btnRed" onclick="eliminarAviso(${data.ID})">
                                            <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> delete </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#avisosBody").html(html);
                        dataTableCreateDes();
                        app.dialog.close();
                    }
                    break;
                case false:
                    app.dialog.close();
                    app.dialog.alert("Algo salió mal", "Aviso");
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            app.dialog.close();
            app.dialog.alert("Algo salió mal", "Aviso");
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function crearNuevoAviso() {
    let modalTemplate = app.popup.create({
        content: `<div class="sheet-modal demo-sheet">
                        <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                            <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                        </div>
                        <div class="sheet-modal-inner">
                            <div class="page-content">
                                <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                    <div id="formAvisos" style=" width: 100%; ">
                                        <div class="list list-strong-ios list-dividers-ios inset-ios">
                                            <ul>
                                                <li class="item-content item-input item-input-outline">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Aviso</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio input-focused " type="text" placeholder="Aviso" id="aviso" name="Aviso">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>
                                                
                                                <li class="item-content item-input item-input-outline">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Fecha Inicio</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio input-focused " type="date" placeholder="Fecha Inicio" id="fechaInicio" name="Fecha Inicio">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="item-content item-input item-input-outline">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Fecha Fin</div>
                                                        <div class="item-input-wrap">
                                                            <input class="floating obligatorio input-focused " type="date" placeholder="Fecha Fin" id="fechaFin" name="Fecha Fin">
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                            
                                    <button class="button button-outline button-round" onclick="guardarAviso()">
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

function guardarAviso() {
    let values = get_datos_completos("formAvisos");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let aviso = String($("#aviso").val()).trim();
        let fechaInicio = String($("#fechaInicio").val()).trim();
        let fechaFin = String($("#fechaFin").val()).trim();

        aviso.replaceAll("'", '"');
        fechaInicio.replaceAll("'", '"');
        fechaFin.replaceAll("'", '"');

        // preloader.show();

        let url = localStorage.getItem("url");

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "Brummy/views/avisos/guardarAviso.php",
            data: { aviso, fechaInicio, fechaFin },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        // $("#modalTemplate").modal("hide");
                        // $("#btnClose").off("click");
                        // msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        $(".sheet-close").trigger("click");
                        app.dialog.alert("Guardado correctamente", "Aviso");
                        obtenerAvisos($("#estatusAvisos").val());
                        break;
                    case false:
                        // preloader.hide();
                        // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        app.dialog.alert("Algo salió mal", "Aviso");
                        break;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                // preloader.hide();
                // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                app.dialog.alert("Algo salió mal", "Aviso");
                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            });
    } else {
        let html =
            '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;"> ';
        response.forEach((data) => {
            html += `<li style="list-style: disc;">${data}.</li> `;
        });
        html += `</ul>`;
        Swal.fire({ icon: "warning", title: "", html: html });
    }
}

function verDetalleAvisos(ID) {
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/avisos/verDetalleAvisos.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let aviso, fechaInicio, fechaFin;
            switch (success) {
                case true:
                    result.forEach((data, index) => {
                        aviso = data.aviso ? data.aviso : "";
                        fechaInicio = data.fechaInicio ? FormatDate(data.fechaInicio) : "";
                        fechaFin = data.fechaFin ? FormatDate(data.fechaFin) : "";
                    });

                    let modalTemplate = app.popup.create({
                        content: `<div class="sheet-modal demo-sheet">
                                        <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                                            <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                                        </div>
                                        <div class="sheet-modal-inner">
                                            <div class="page-content">
                                                <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                                    <div id="formAvisos" style=" width: 100%; ">
                                                        <div class="list list-strong-ios list-dividers-ios inset-ios">
                                                            <ul>
                                                                <li class="item-content item-input item-input-outline" id="LIavisoModal">
                                                                    <div class="item-inner">
                                                                        <div class="item-title item-floating-label">Aviso</div>
                                                                        <div class="item-input-wrap">
                                                                            <input class="floating obligatorio input-focused " type="text" placeholder="Aviso" id="avisoModal" name="Aviso">
                                                                            <span class="input-clear-button"></span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                
                                                                <li class="item-content item-input item-input-outline" id="LIfechaInicioModal">
                                                                    <div class="item-inner">
                                                                        <div class="item-title item-floating-label">Fecha Inicio</div>
                                                                        <div class="item-input-wrap">
                                                                            <input class="floating obligatorio input-focused " type="date" placeholder="Fecha Inicio" id="fechaInicioModal" name="Fecha Inicio">
                                                                            <span class="input-clear-button"></span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                
                                                                <li class="item-content item-input item-input-outline" id="LIfechaFinModal">
                                                                    <div class="item-inner">
                                                                        <div class="item-title item-floating-label">Fecha Fin</div>
                                                                        <div class="item-input-wrap">
                                                                            <input class="floating obligatorio input-focused " type="date" placeholder="Fecha Fin" id="fechaFinModal" name="Fecha Fin">
                                                                            <span class="input-clear-button"></span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                
                                                            </ul>
                                                        </div>
                                                    </div>
                                            
                                                    <button class="button button-outline button-round" onclick="guardarEdicionAviso(${ID})">
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
                                if (aviso) {
                                    $("#avisoModal").val(aviso);
                                    $("#LIavisoModal").addClass("item-input-focused");
                                    $("#avisoModal").addClass("input-with-value input-focused item-input-outline");
                                }

                                if (fechaInicio) {
                                    $("#fechaInicioModal").val(volteaFecha(fechaInicio, 2));
                                    $("#fechaInicioModal").addClass("input-with-value input-focused item-input-outline");
                                    $("#LIfechaInicioModal").addClass("item-input-focused");
                                }

                                if (fechaFin) {
                                    $("#fechaFinModal").val(volteaFecha(fechaFin, 2));
                                    $("#fechaFinModal").addClass("input-with-value input-focused item-input-outline");
                                    $("#LIfechaFinModal").addClass("item-input-focused");
                                }
                            },
                        },
                    });

                    modalTemplate.open();

                    break;
                case false:
                    // preloader.hide();
                    // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    app.dialog.alert("Algo salió mal", "Aviso");
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // preloader.hide();
            // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            app.dialog.alert("Algo salió mal", "Aviso");
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function guardarEdicionAviso(ID) {
    let values = get_datos_completos("formAvisosModal");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let aviso = String($("#avisoModal").val()).trim();
        let fechaInicio = String($("#fechaInicioModal").val()).trim();
        let fechaFin = String($("#fechaFinModal").val()).trim();

        aviso.replaceAll("'", '"');
        fechaInicio.replaceAll("'", '"');
        fechaFin.replaceAll("'", '"');

        // preloader.show();
        let url = localStorage.getItem("url");

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "Brummy/views/avisos/guardarEdicionAviso.php",
            data: { aviso, fechaInicio, fechaFin, ID },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        // $("#modalTemplate").modal("hide");
                        // $("#btnClose").off("click");
                        // msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        $(".sheet-close").trigger("click");
                        app.dialog.alert("Guardado correctamente", "Aviso");
                        obtenerAvisos($("#estatusAvisos").val());
                        break;
                    case false:
                        // preloader.hide();
                        // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        app.dialog.alert("Algo salió mal", "Aviso");
                        break;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                // preloader.hide();
                // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                app.dialog.alert("Algo salió mal", "Aviso");
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

function eliminarAviso(ID) {
    app.dialog
        .create({
            title: "¿Estás seguro de querer eliminar el registro?",
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
                        let url = localStorage.getItem("url");
                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: url + "Brummy/views/avisos/eliminarAviso.php",
                            data: { ID },
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;
                                switch (success) {
                                    case true:
                                        // msj.show("Aviso", "Eliminado correctamente", [{ text1: "OK" }]);
                                        app.dialog.alert("Eliminado correctamente.", "Aviso");
                                        obtenerAvisos($("#estatusAvisos").val());
                                        break;
                                    case false:
                                        // preloader.hide();
                                        // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                        app.dialog.alert("Algo salió mal", "Aviso");
                                        break;
                                }
                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                                // preloader.hide();
                                // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                app.dialog.alert("Algo salió mal", "Aviso");
                                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                            });
                    },
                },
            ],
        })
        .open();
}
