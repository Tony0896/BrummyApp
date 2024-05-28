let url = localStorage.getItem("url");

function crearNuevaEspecie() {
    let modalTemplate = app.popup.create({
        content: `<div class="sheet-modal demo-sheet">
            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
            </div>
            <div class="sheet-modal-inner">
                <div class="page-content">
                    <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                        <div id="formEspecies" style=" width: 100%; ">
                            <div class="list list-strong-ios list-dividers-ios inset-ios">
                                <ul>
                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Nombre Especie</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused " type="text" placeholder="Nombre Especie" id="nombreEspecie" name="Nombre Especie">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                
                        <button class="button button-outline button-round" onclick="guardarEspecie()">
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

function guardarEspecie() {
    let values = get_datos_completos("formEspecies");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombreEspecie = String($("#nombreEspecie").val()).trim();

        nombreEspecie.replaceAll("'", '"');

        // app.dialog.progress("Cargando...", "#009071");

        axios
            .post(url + "Brummy/views/catalogos/guardarEspecie.php", {
                nombreEspecie,
            })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    $(".sheet-close").trigger("click");
                    app.dialog.alert("Guardado correctamente", "Aviso");
                    obtenerEspecies();
                }
            })
            .catch(function (error) {
                app.dialog.alert("Algo salió mal", "Aviso");
                console.log(error);
            });
    } else {
        let html =
            '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic; margin-top: 20px;"> ';
        response.forEach((data) => {
            html += `<li style="list-style: disc;">${data}.</li> `;
        });
        html += `</ul>`;
        Swal.fire({ icon: "warning", title: "", html: html });
    }
}

function obtenerEspecies() {
    axios
        .get(url + "Brummy/views/catalogos/obtenerEspecies.php", {})
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                    dataTableDestroy();
                    $("#especiesBody").html(html);
                    dataTableCreate();
                } else {
                    dataTableDestroy();
                    result.forEach((data, index) => {
                        html += `<tr>
                            <td>${index + 1}</td>
                            <td class="capitalize">${data.nombreEspecie}</td>
                            <td>
                                <button class="button button-outline button-round btnEliminar" onclick="deleteEspecie(${data.ID})">
                                    <span class="material-icons iconBtn"> delete </span>
                                </button>
                            </td>
                        </tr>`;
                    });
                    $("#especiesBody").html(html);
                    dataTableCreate();
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

function obtenerRazas() {
    axios
        .get(url + "Brummy/views/catalogos/obtenerRazas.php", {})
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                    dataTableDestroy();
                    $("#razasBody").html(html);
                    dataTableCreate();
                } else {
                    dataTableDestroy();
                    result.forEach((data, index) => {
                        html += `<tr>
                            <td>${index + 1}</td>
                            <td class="capitalize">${data.nombreRaza}</td>
                            <td class="capitalize">${data.especie}</td>
                            <td>
                                <button class="button button-outline button-round btnEliminar" onclick="deleteRaza(${data.ID})">
                                    <span class="material-icons iconBtn"> delete </span>
                                </button>
                            </td>
                        </tr>`;
                    });
                    $("#razasBody").html(html);
                    dataTableCreate();
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

function crearNuevaRaza() {
    axios
        .get(url + "Brummy/views/catalogos/obtenerEspecies.php", {})
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                    app.dialog.alert("No se logró obtener especies.", "Aviso");
                } else {
                    result.forEach((data, index) => {
                        html += `<option value="${data.ID}">${data.nombreEspecie}</option>`;
                    });

                    let modalTemplate = app.popup.create({
                        content: `<div class="sheet-modal demo-sheet" id="sheetModal">
                                <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                                    <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                                </div>
                                <div class="sheet-modal-inner">
                                    <div class="page-content">
                                        <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                            <div id="formRazas" style=" width: 100%; ">
                                                <div class="list list-strong-ios list-dividers-ios inset-ios">
                                                    <ul>
                                                        <li class="item-content item-input item-input-outline">
                                                            <div class="item-inner">
                                                                <div class="item-title item-floating-label">Nombre Raza</div>
                                                                <div class="item-input-wrap">
                                                                    <input class="floating obligatorio input-focused " type="text" placeholder="Nombre Raza" id="nombreRaza" name="Nombre Raza">
                                                                    <span class="input-clear-button"></span>
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li class="item-content item-input item-input-outline">
                                                            <div class="item-inner">
                                                                <div class="item-title item-floating-label">Relación Especie</div>
                                                                <div class="item-input-wrap">
                                                                    <select class="floating obligatorio input-focused " type="text" placeholder="Relación Especie" id="relacionEspecie" name="Relación Especie">
                                                                        <option value="">Selecciona una opción</option>
                                                                        ${html}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                    
                                            <button class="button button-outline button-round" onclick="guardarRaza()">
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
                                new TomSelect("#relacionEspecie", {
                                    create: false,
                                    sortField: {
                                        field: "text",
                                    },
                                });
                                $("#relacionEspecie").on("keydown", (e) => {
                                    console.log("ekeydow");
                                    if (e.keyCode == 13) {
                                        console.log("ekey");
                                        $("#relacionEspecie").blur();
                                    }
                                });
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

function guardarRaza() {
    let values = get_datos_completos("formRazas");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombreRaza = String($("#nombreRaza").val()).trim();
        let FK_especie = $("#relacionEspecie").val();
        let especie = $("#relacionEspecie").find("option:selected").text();

        nombreRaza.replaceAll("'", '"');

        axios
            .post(url + "Brummy/views/catalogos/guardarRaza.php", {
                nombreRaza,
                FK_especie,
                especie,
            })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    $(".sheet-close").trigger("click");
                    app.dialog.alert("Guardado correctamente", "Aviso");
                    obtenerRazas();
                }
            })
            .catch(function (error) {
                app.dialog.alert("Algo salió mal", "Aviso");
                console.log(error);
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

function deleteEspecie(ID) {
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
                        axios
                            .post(url + "Brummy/views/catalogos/deleteEspecie.php", {
                                ID,
                            })
                            .then(function (response) {
                                console.log(response);
                                if (response.status === 200) {
                                    app.dialog.alert("Eliminado correctamente", "Aviso");
                                    obtenerEspecies();
                                }
                            })
                            .catch(function (error) {
                                app.dialog.alert("Algo salió mal", "Aviso");
                                console.log(error);
                            });
                    },
                },
            ],
        })
        .open();
}

function deleteRaza(ID) {
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
                        axios
                            .post(url + "Brummy/views/catalogos/deleteRaza.php", {
                                ID,
                            })
                            .then(function (response) {
                                console.log(response);
                                if (response.status === 200) {
                                    app.dialog.alert("Eliminado correctamente", "Aviso");
                                    obtenerRazas();
                                }
                            })
                            .catch(function (error) {
                                app.dialog.alert("Algo salió mal", "Aviso");
                                console.log(error);
                            });
                    },
                },
            ],
        })
        .open();
}

function obtenerMotivos() {
    axios
        .get(url + "Brummy/views/catalogos/obtenerMotivos.php", {})
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                    dataTableDestroy();
                    $("#motivosCitaBody").html(html);
                    dataTableCreate();
                } else {
                    dataTableDestroy();
                    result.forEach((data, index) => {
                        html += `<tr>
                            <td>${index + 1}</td>
                            <td class="capitalize">${data.motivoCita}</td>
                            <td>
                                <button class="button button-outline button-round btnEliminar" onclick="deleteMotivoCita(${data.ID})">
                                    <span class="material-icons iconBtn"> delete </span>
                                </button>
                            </td>
                        </tr>`;
                    });
                    $("#motivosCitaBody").html(html);
                    dataTableCreate();
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            app.dialog.alert("Algo salió mal", "Aviso");
        })
        .finally(function () {
            // siempre sera ejecutado
        });
}

function crearNuevoMotivo() {
    let modalTemplate = app.popup.create({
        content: `<div class="sheet-modal demo-sheet">
            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
            </div>
            <div class="sheet-modal-inner">
                <div class="page-content">
                    <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                        <div id="formMotivoCita" style=" width: 100%; ">
                            <div class="list list-strong-ios list-dividers-ios inset-ios">
                                <ul>
                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Motivo</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused " type="text" placeholder="Motivo" id="motivo" name="Motivo">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                
                        <button class="button button-outline button-round" onclick="guardarMotivoCita()">
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

function guardarMotivoCita() {
    let values = get_datos_completos("formMotivoCita");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let motivoCita = String($("#motivo").val()).trim();

        motivoCita.replaceAll("'", '"');

        axios
            .post(url + "Brummy/views/catalogos/guardarMotivoCita.php", {
                motivoCita,
            })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    $(".sheet-close").trigger("click");
                    app.dialog.alert("Guardado correctamente", "Aviso");
                    obtenerMotivos();
                }
            })
            .catch(function (error) {
                app.dialog.alert("Algo salió mal", "Aviso");
                console.log(error);
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

function deleteMotivoCita(ID) {
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
                        axios
                            .post(url + "Brummy/views/catalogos/deleteMotivoCita.php", {
                                ID,
                            })
                            .then(function (response) {
                                console.log(response);
                                if (response.status === 200) {
                                    app.dialog.alert("Eliminado correctamente", "Aviso");
                                    obtenerMotivos();
                                }
                            })
                            .catch(function (error) {
                                app.dialog.alert("Algo salió mal", "Aviso");
                                console.log(error);
                            });
                    },
                },
            ],
        })
        .open();
}
