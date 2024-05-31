function obtenerClientes() {
    axios
        .get(url + "Brummy/views/clientes/obtenerClientes.php", {})
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                    dataTableDestroy();
                    $("#clientesBody").html(html);
                    dataTableCreate();
                } else {
                    dataTableDestroy();
                    let html;
                    let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
                    result.forEach((data, index) => {
                        html += `<tr>
                                    <td>${index + 1}</td>
                                        <td class="capitalize">${data.nombre} ${data.apellidoP} ${data.apellidoM}</td>
                                        <td ${data.telefono ? "" : 'style="text-align: center;"'}>${data.telefono ? data.telefono : tdSinData}</td>
                                        <td ${data.correo ? "" : 'style="text-align: center;"'}>${data.correo ? data.correo : tdSinData}</td>
                                        <td><div> <div>${volteaFecha(String(data.fechaUlmitoMovimiento).split(" ")[0], 1)} ${
                            String(String(data.fechaUlmitoMovimiento).split(" ")[1]).split(":")[0]
                        }:${String(String(data.fechaUlmitoMovimiento).split(" ")[1]).split(":")[1]}</div> <div>${
                            data.motivoMovimiento
                        }</div> </div></td>
                            <td>
                                <div style="display: flex; flex-direction: row;">
                                    <button class="button button-outline button-round btnBlue" onclick="verPerfilCliente(${
                                        data.ID
                                    })" style="margin-right: 10px;">
                                        <span class="text-sm mb-0"><i class="material-icons" style="margin: auto;vertical-align: middle;"> person </i></span>
                                    </button>

                                    <button class="button button-outline button-round btnGreen" onclick="HistorialCliente(${data.ID})">
                                        <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> timeline </span>
                                    </button>
                                </div>
                            </td>
                        </tr>`;
                    });
                    $("#clientesBody").html(html);
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

function crearCliente() {
    let modalTemplate = app.popup.create({
        content: `<div class="sheet-modal demo-sheet">
            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
            </div>
            <div class="sheet-modal-inner">
                <div class="page-content">
                    <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                        <div id="formClientes" style=" width: 100%; ">
                            <div class="list list-strong-ios list-dividers-ios inset-ios">
                                <ul>
                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Nombre</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused " type="text" placeholder="Nombre" id="nombre" name="Nombre">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Apellido Paterno</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused " type="text" placeholder="Apellido Paterno" id="apellidoP" name="Apellido Paterno">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Apellido Materno</div>
                                            <div class="item-input-wrap">
                                                <input class="floating input-focused " type="text" placeholder="Apellido Materno" id="apellidoM" name="Apellido Materno">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Teléfono</div>
                                            <div class="item-input-wrap">
                                                <input class="floating input-focused " type="text" placeholder="Teléfono" id="telefono" name="Teléfono">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Correo</div>
                                            <div class="item-input-wrap">
                                                <input class="floating input-focused " type="text" placeholder="Correo" id="correo" name="Correo">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                
                        <button class="button button-outline button-round" onclick="guardarCliente()">
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

function verPerfilCliente(ID) {
    axios
        .post(url + "Brummy/views/clientes/obtenerCliente.php", {
            ID,
        })
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                if (result == "Sin Datos") {
                    // Swal.fire({ icon: "warning", title: "Sin datos.", text: "" });
                    swal({
                        type: "warning",
                        title: "",
                        text: "Sin datos.",
                    });
                } else {
                    let nombreModal;
                    let apellidoPModal;
                    let apellidoMModal;
                    let telefonoModal;
                    let correoModal;
                    let motivoMovimientoModal;
                    let fechaUlmitoMovimientoModal;
                    let IDModal;

                    result.forEach((data, index) => {
                        nombreModal = data.nombre;
                        apellidoPModal = data.apellidoP;
                        apellidoMModal = data.apellidoM;
                        telefonoModal = data.telefono;
                        correoModal = data.correo;
                        motivoMovimientoModal = data.motivoMovimiento;
                        fechaUlmitoMovimientoModal = data.fechaUlmitoMovimiento;
                        IDModal = data.ID;
                    });

                    let modalTemplate = app.popup.create({
                        content: `<div class="sheet-modal demo-sheet">
                            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                                <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                            </div>
                            <div class="sheet-modal-inner">
                                <div class="page-content">
                                    <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                        <div id="formClientes" style=" width: 100%; ">
                                            <div class="list list-strong-ios list-dividers-ios inset-ios">
                                                <ul>
                                                    <li class="item-content item-input item-input-outline" id="LInombreModal">
                                                        <div class="item-inner">
                                                            <div class="item-title item-floating-label">Nombre</div>
                                                            <div class="item-input-wrap">
                                                                <input class="floating obligatorio input-focused " type="text" placeholder="Nombre" id="nombreModal" name="Nombre">
                                                                <span class="input-clear-button"></span>
                                                            </div>
                                                        </div>
                                                    </li>
                
                                                    <li class="item-content item-input item-input-outline" id="LIapellidoPModal">
                                                        <div class="item-inner">
                                                            <div class="item-title item-floating-label">Apellido Paterno</div>
                                                            <div class="item-input-wrap">
                                                                <input class="floating obligatorio input-focused " type="text" placeholder="Apellido Paterno" id="apellidoPModal" name="Apellido Paterno">
                                                                <span class="input-clear-button"></span>
                                                            </div>
                                                        </div>
                                                    </li>
                
                                                    <li class="item-content item-input item-input-outline" id="LIapellidoMModal">
                                                        <div class="item-inner">
                                                            <div class="item-title item-floating-label">Apellido Materno</div>
                                                            <div class="item-input-wrap">
                                                                <input class="floating input-focused " type="text" placeholder="Apellido Materno" id="apellidoMModal" name="Apellido Materno">
                                                                <span class="input-clear-button"></span>
                                                            </div>
                                                        </div>
                                                    </li>
                
                                                    <li class="item-content item-input item-input-outline" id="LItelefonoModal">
                                                        <div class="item-inner">
                                                            <div class="item-title item-floating-label">Teléfono</div>
                                                            <div class="item-input-wrap">
                                                                <input class="floating input-focused " type="text" placeholder="Teléfono" id="telefonoModal" name="Teléfono">
                                                                <span class="input-clear-button"></span>
                                                            </div>
                                                        </div>
                                                    </li>
                
                                                    <li class="item-content item-input item-input-outline" id="LIcorreoModal">
                                                        <div class="item-inner">
                                                            <div class="item-title item-floating-label">Correo</div>
                                                            <div class="item-input-wrap">
                                                                <input class="floating input-focused " type="text" placeholder="Correo" id="correoModal" name="Correo">
                                                                <span class="input-clear-button"></span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                
                                        <button class="button button-outline button-round" onclick="actualizarCliente(${IDModal})" style="margin-bottom: 20px;">
                                            Actualizar <span class="material-icons iconBtn"> save </span>
                                        </button>

                                        <button class="button button-outline button-round btnRed" onclick="eliminarCliente(${IDModal})">
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
                                if (nombreModal) {
                                    $("#nombreModal").val(nombreModal);
                                    $("#LInombreModal").addClass("item-input-focused");
                                    $("#nombreModal").addClass("input-with-value input-focused item-input-outline");
                                }
                                if (apellidoPModal) {
                                    $("#apellidoPModal").val(apellidoPModal);
                                    $("#apellidoPModal").addClass("input-with-value input-focused item-input-outline");
                                    $("#LIapellidoPModal").addClass("item-input-focused");
                                }
                                if (apellidoMModal) {
                                    $("#apellidoMModal").val(apellidoMModal);
                                    $("#apellidoMModal").addClass("input-with-value input-focused item-input-outline");
                                    $("#LIapellidoMModal").addClass("item-input-focused");
                                }
                                if (telefonoModal) {
                                    $("#telefonoModal").val(telefonoModal);
                                    $("#telefonoModal").addClass("input-with-value input-focused item-input-outline");
                                    $("#LItelefonoModal").addClass("item-input-focused");
                                }
                                if (correoModal) {
                                    $("#correoModal").val(correoModal);
                                    $("#correoModal").addClass("input-with-value input-focused item-input-outline");
                                    $("#LIcorreoModal").addClass("item-input-focused");
                                }
                            },
                        },
                    });

                    modalTemplate.open();
                }
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

function guardarCliente() {
    let values = get_datos_completos("formClientes");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombre").val()).trim();
        let apellidoP = String($("#apellidoP").val()).trim();
        let apellidoM = String($("#apellidoM").val()).trim();
        let telefono = String($("#telefono").val()).trim();
        let correo = String($("#correo").val()).trim();

        nombre.replaceAll("'", '"');
        apellidoP.replaceAll("'", '"');
        apellidoM.replaceAll("'", '"');
        telefono.replaceAll("'", '"');
        correo.replaceAll("'", '"');

        axios
            .post(url + "Brummy/views/clientes/guardaCliente.php", {
                nombre,
                apellidoP,
                apellidoM,
                telefono,
                correo,
            })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    $(".sheet-close").trigger("click");
                    app.dialog.alert("Guardado correctamente", "Aviso");
                    obtenerClientes();
                }
            })
            .catch(function (error) {
                app.dialog.alert("Algo salió mal", "Aviso");
                console.log(error);
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

function actualizarCliente(ID) {
    let values = get_datos_completos("formClientes");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombreModal").val()).trim();
        let apellidoP = String($("#apellidoPModal").val()).trim();
        let apellidoM = String($("#apellidoMModal").val()).trim();
        let telefono = String($("#telefonoModal").val()).trim();
        let correo = String($("#correoModal").val()).trim();

        nombre.replaceAll("'", '"');
        apellidoP.replaceAll("'", '"');
        apellidoM.replaceAll("'", '"');
        telefono.replaceAll("'", '"');
        correo.replaceAll("'", '"');

        axios
            .post(url + "Brummy/views/clientes/actualizaCliente.php", {
                nombre,
                apellidoP,
                apellidoM,
                telefono,
                correo,
                ID,
            })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    $(".sheet-close").trigger("click");
                    app.dialog.alert("Guardado correctamente", "Aviso");
                    obtenerClientes();
                }
            })
            .catch(function (error) {
                app.dialog.alert("Algo salió mal", "Aviso");
                console.log(error);
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

function eliminarCliente(ID) {
    swal(
        {
            title: "¿Estás seguro de querer eliminar el registro?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si!",
            cancelButtonText: "Cancelar",
            closeOnConfirm: true,
            closeOnCancel: true,
        },
        function (isConfirm) {
            if (isConfirm) {
                axios
                    .post(url + "Brummy/views/clientes/eliminarCliente.php", {
                        ID,
                    })
                    .then(function (response) {
                        console.log(response);
                        if (response.status === 200) {
                            $(".sheet-close").trigger("click");
                            obtenerClientes();
                        }
                    })
                    .catch(function (error) {
                        app.dialog.alert("Algo salió mal", "Aviso");
                        console.log(error);
                    });
            } else {
            }
        }
    );
}

function HistorialCliente(ID) {
    axios
        .post(url + "Brummy/views/clientes/traerHistorialCliente.php", {
            ID,
        })
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                } else {
                    result.forEach((data, index) => {
                        console.log(data);
                        html += `<div class="timeline-item">
                            <div class="timeline-item-divider"></div>
                            <div class="timeline-item-content">
                                <div class="timeline-item-inner"> 
                                    <strong style="color: #5f5f5f;position: relative;font-size: 14px;font-weight: bold;font-style: italic;margin-left: 20px;"> 
                                        ${volteaFecha(data.fecha, 1)} </strong> <br> 
                                    <strong style="color: #009071;font-weight: bold;font-size: 1rem;">
                                        ${data.motivo_movimiento} 
                                    </strong>
                                </div>
                            </div>
                        </div>`;
                    });

                    let modalTemplate = app.popup.create({
                        content: `<div class="sheet-modal demo-sheet">
                            <div class="swipe-handler">
                                <h1 class="link sheet-close" style="text-align: end; margin-right: 15px; display: block; margin-top: 10px">
                                    <span class="material-icons" style="font-size: 35px; color: #ff0037"> cancel </span>
                                </h1>
                            </div>
                            <div class="sheet-modal-inner">
                                <div class="page-content">
                                    <div class="block" style="margin-top: 60px; align-items: center; display: flex; flex-direction: column">
                                        <div class="timeline">
                                            ${html}
                                        </div>
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