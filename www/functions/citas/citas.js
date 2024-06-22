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

    console.log(estatus, flagEstatus, comentariosAdicionales);

    let url = localStorage.getItem("url");

    axios
        .post(url + "Brummy/views/citas/guardarEstausCita.php", { estatus, flagEstatus, comentariosAdicionales, ID })
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
