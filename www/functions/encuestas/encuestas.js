function verPregunta(ID) {
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "./Brummy/views/encuestas/obtenerDataEncuesta.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            let preguntaModal;
            let tipoPreguntaModal;
            let IDPregunta;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                    } else {
                        result.forEach((data, index) => {
                            preguntaModal = data.Pregunta;
                            tipoPreguntaModal = data.tipoPregunta;
                            IDPregunta = data.ID;
                        });

                        let modalTemplate = app.popup.create({
                            content: `<div class="sheet-modal demo-sheet">
                                            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                                                <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                                            </div>
                                            <div class="sheet-modal-inner">
                                                <div class="page-content">
                                                    <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                                        <div id="formPreguntas" style=" width: 100%; ">
                                                            <div class="list list-strong-ios list-dividers-ios inset-ios">
                                                                <ul>
                                                                    <li class="item-content item-input item-input-outline" id="LIpreguntaModal">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Pregunta</div>
                                                                            <div class="item-input-wrap">
                                                                                <input class="floating obligatorio input-focused " type="text" placeholder="Pregunta" id="preguntaModal" name="Pregunta">
                                                                                <span class="input-clear-button"></span>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li class="item-content item-input item-input-outline" style="display:none;">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Tipo Pregunta</div>
                                                                            <div class="item-input-wrap">
                                                                                <select class="input capitalize obligatorio" name="Tipo Pregunta" id="tipoPreguntaModal" style="background-color: rgb(255, 255, 255);width:100%;">
                                                                                    <option value="">Selecciona una opción</option>
                                                                                    <option value="1" selected>Opciones</option>
                                                                                    <option value="2">Abierta</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    
                                                                </ul>
                                                            </div>
                                                        </div>
                                                
                                                        <button class="button button-outline button-round" onclick="actualizarPregunta(${IDPregunta})">
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
                                    if (preguntaModal) {
                                        $("#preguntaModal").val(preguntaModal);
                                        $("#LIpreguntaModal").addClass("item-input-focused");
                                        $("#preguntaModal").addClass("input-with-value input-focused item-input-outline");
                                    }

                                    if (tipoPreguntaModal) {
                                        $("#tipoPreguntaModal").val(tipoPreguntaModal);
                                    }
                                },
                            },
                        });

                        modalTemplate.open();
                    }
                    break;
                case false:
                    app.dialog.alert("Algo salió mal", "Aviso");
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            app.dialog.alert("Algo salió mal", "Aviso");
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function actualizarPregunta(ID) {
    let url = localStorage.getItem("url");
    let pregunta = $("#preguntaModal").val();
    let tipoPregunta = $("#tipoPreguntaModal").val();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "./Brummy/views/encuestas/actualizarPregunta.php",
        data: { ID, pregunta, tipoPregunta },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    $(".sheet-close").trigger("click");
                    app.dialog.alert("Actualizada correctamente", "Aviso");
                    obtenerEncuestas();
                    break;
                case false:
                    app.dialog.alert("Algo salió mal", "Aviso");
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            app.dialog.alert("Algo salió mal", "Aviso");
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function obtenerEncuestas() {
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/encuestas/obtenerEncuestas.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#encuestasBody").html(html);
                        dataTableCreate();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.Pregunta}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <button class="button button-outline button-round btnBlue" onclick="verPregunta(${
                                            data.ID
                                        })" style="margin-right: 10px;">
                                            <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> edit </span>
                                        </button>

                                        <button class="button button-outline button-round btnRed" onclick="eliminarPregunta(${data.ID})">
                                            <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> delete </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#encuestasBody").html(html);
                        dataTableCreate();
                    }
                    break;
                case false:
                    app.dialog.alert("Algo salió mal", "Aviso");
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            app.dialog.alert("Algo salió mal", "Aviso");
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function nuevaPregunta() {
    let modalTemplate = app.popup.create({
        content: `
        <div class="sheet-modal demo-sheet">
            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
            </div>
            <div class="sheet-modal-inner">
                <div class="page-content">
                    <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                        <div id="formPreguntas" style=" width: 100%; ">
                            <div class="list list-strong-ios list-dividers-ios inset-ios">
                                <ul>
                                    <li class="item-content item-input item-input-outline" id="LIpreguntaModal">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Pregunta</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused " type="text" placeholder="Pregunta" id="pregunta" name="Pregunta">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="item-content item-input item-input-outline" style="display:none;">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Tipo Pregunta</div>
                                            <div class="item-input-wrap">
                                                <select class="input capitalize obligatorio" name="Tipo Pregunta" id="tipoPregunta" style="background-color: rgb(255, 255, 255);width:100%;">
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="1" selected>Opciones</option>
                                                    <option value="2">Abierta</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                
                        <button class="button button-outline button-round" onclick="guardarPregunta()">
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

function guardarPregunta() {
    let values = get_datos_completos("formPreguntas");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let pregunta = String($("#pregunta").val());
        let tipoPregunta = String($("#tipoPregunta").val());

        pregunta.replaceAll("'", '"');
        tipoPregunta.replaceAll("'", '"');

        let url = localStorage.getItem("url");

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "./Brummy/views/encuestas/guardarPregunta.php",
            data: { pregunta, tipoPregunta },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $(".sheet-close").trigger("click");
                        app.dialog.alert("Actualizada correctamente", "Aviso");
                        obtenerEncuestas();
                        break;
                    case false:
                        app.dialog.alert("Algo salió mal", "Aviso");
                        break;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
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

function eliminarPregunta(ID) {
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
                            url: url + "Brummy/views/encuestas/eliminarPregunta.php",
                            data: { ID },
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;
                                switch (success) {
                                    case true:
                                        obtenerEncuestas();
                                        break;
                                    case false:
                                        app.dialog.alert("Algo salió mal", "Aviso");
                                        break;
                                }
                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                                app.dialog.alert("Algo salió mal", "Aviso");
                                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                            });
                    },
                },
            ],
        })
        .open();
}
