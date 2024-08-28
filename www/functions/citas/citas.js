function marcarCita(ID) {
    let modalTemplate = app.popup.create({
        content: `<div class="sheet-modal demo-sheet">
            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
            </div>
            <div class="sheet-modal-inner">
                <div class="page-content">
                    <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                        <div id="nuevaCita" style=" width: 100%; ">
                            <div class="list list-strong-ios list-dividers-ios inset-ios">
                                <ul>
                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">La cita fue:</div>
                                            <div class="item-input-wrap">
                                                <select class="floating obligatorio input-focused " type="text" placeholder="Cliente" id="newEstatusCita" name="Cliente" style="padding-top: 0 !important;">
                                                    <option value=""> - - </option>
                                                    <option value="2">ATENDIDA</option>
                                                    <option value="3">CANCELADA</option>
                                                    <option value="4">REAGENDADA</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Comentarios Adicionales</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused " type="text" placeholder="Comentarios Adicionales" id="comentariosAdicionales" name="Comentarios Adicionales">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                
                        <button class="button button-outline button-round" onclick="guardarEstausCita(${ID});">
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
                $("#btnGuardarCita").click(() => {
                    validacioesCita();
                });
            },
        },
    });

    modalTemplate.open();
}

function guardarEstausCita(ID) {
    let estatus = $("#newEstatusCita").val();
    let flagEstatus = String($("#newEstatusCita").find("option:selected").text());
    let comentariosAdicionales = String($("#comentariosAdicionales").val()).trim();

    let FK_mascota = $("#input_FK_mascota_" + ID).val();
    let nombre = $("#input_nombre_" + ID).val();

    console.log(estatus, flagEstatus, comentariosAdicionales);

    let url = localStorage.getItem("url");

    axios
        .post(url + "Brummy/views/citas/guardarEstausCita.php", { estatus, flagEstatus, comentariosAdicionales, ID, FK_mascota, nombre })
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                $(".sheet-close").trigger("click");
                app.dialog.alert("Cita actualizada correctamente", "Aviso");
                console.log("Aquie meter actulizacion de evento");
                // recargaEventosDay($("#fechaActual").val());

                if (estatus == 2) {
                    TextEstatus = `<h4 class="card-title text-primary" style="margin: 0px;"><strong>ATENDIDA</strong></h4>`;
                    colorText = "#0277BD";
                } else if (estatus == 3) {
                    TextEstatus = `<h4 class="card-title text-danger" style="margin: 0px;"><strong>CANCELADA</strong></h4>`;
                    colorText = "#F95F53";
                } else if (estatus == 4) {
                    TextEstatus = `<h4 class="card-title text-warning" style="margin: 0px;"><strong>REAGENDADA</strong></h4>`;
                    colorText = "#FFAF00";
                }
                console.log(colorText);
                $(`#card_evt_${ID} div.card-body`).css(`border-left-color`, colorText);
                $(`#div_evt_${ID}`).html(TextEstatus);
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

function generarLinkEncuesta(ID) {
    // preloader.show();
    let url = localStorage.getItem("url");

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/citas/generarLinkEncuesta.php",
        data: {
            ID,
        },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    // preloader.hide();
                    let data = window.btoa(`data#-${ID}`);
                    let url2 = url + "/Brummy/pages/encuesta/index.php?data=" + data;
                    $(`#foo_${ID}`).val(url2);
                    setTimeout(function () {
                        $(`#btn_foo_${ID}`).trigger("click");
                        cordova.plugins.clipboard.copy(url2);
                        // msj.show("Aviso", "URL Copiada correctamente", [{ text1: "OK" }]);
                        app.dialog.alert("URL Copiada correctamente", "Aviso");
                    }, 1500);
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

function muestraDomicilio() {
    if ($("#cbx-46").prop("checked")) {
        $("#div_servicioDomicilio").css("display", "block");
    } else {
        $("#div_servicioDomicilio").css("display", "none");
    }
}

function getDireecionCliente(FK_dueno) {
    let url = localStorage.getItem("url");

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/clientes/getDireecionCliente.php",
        data: { FK_dueno },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html2 = "<option value=''> Selecciona una opción </option>";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        $("#calleDomi_input").val("");
                        $("#LIcalleDomi_input").removeClass("item-input-focused");
                        $("#calleDomi_input").removeClass("input-with-value input-focused item-input-outline");
                        $("#numeroDomi_input").val("");
                        $("#LInumeroDomi_input").removeClass("item-input-focused");
                        $("#numeroDomi_input").removeClass("input-with-value input-focused item-input-outline");
                        $("#cpDomi_input").val("");
                        $("#LIcpDomi_input").removeClass("item-input-focused");
                        $("#cpDomi_input").removeClass("input-with-value input-focused item-input-outline");
                        $("#colDomi_input").val("");
                        $("#LIcolDomi_input").removeClass("item-input-focused");
                        $("#colDomi_input").removeClass("input-with-value input-focused item-input-outline");
                        $("#municipioDomi_input").val("");
                        $("#LImunicipioDomi_input").removeClass("item-input-focused");
                        $("#municipioDomi_input").removeClass("input-with-value input-focused item-input-outline");
                        $("#estadoDomi_input").val("");
                        $("#LIestadoDomi_input").removeClass("item-input-focused");
                        $("#estadoDomi_input").removeClass("input-with-value input-focused item-input-outline");
                    } else {
                        result.forEach((data, index) => {
                            if (data.calle) {
                                $("#calleDomi_input").val(data.calle);
                                $("#LIcalleDomi_input").addClass("item-input-focused");
                                $("#calleDomi_input").addClass("input-with-value input-focused item-input-outline");
                            }

                            if (data.numero) {
                                $("#numeroDomi_input").val(data.numero);
                                $("#LInumeroDomi_input").addClass("item-input-focused");
                                $("#numeroDomi_input").addClass("input-with-value input-focused item-input-outline");
                            }

                            if (data.cp) {
                                $("#cpDomi_input").val(data.cp);
                                $("#LIcpDomi_input").addClass("item-input-focused");
                                $("#cpDomi_input").addClass("input-with-value input-focused item-input-outline");
                            }

                            if (data.col) {
                                $("#colDomi_input").val(data.col);
                                $("#LIcolDomi_input").addClass("item-input-focused");
                                $("#colDomi_input").addClass("input-with-value input-focused item-input-outline");
                            }

                            if (data.municipio) {
                                $("#municipioDomi_input").val(data.municipio);
                                $("#LImunicipioDomi_input").addClass("item-input-focused");
                                $("#municipioDomi_input").addClass("input-with-value input-focused item-input-outline");
                            }

                            if (data.estado) {
                                $("#estadoDomi_input").val(data.estado);
                                $("#LIestadoDomi_input").addClass("item-input-focused");
                                $("#estadoDomi_input").addClass("input-with-value input-focused item-input-outline");
                            }
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

function muestraRecurrencia() {
    if ($("#cbx-47").prop("checked")) {
        $("#div_Recurrencia").css("display", "block");
    } else {
        $("#div_Recurrencia").css("display", "none");
    }
}
