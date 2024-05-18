let url = localStorage.getItem("url");

function crearNuevaEspecie() {
    // $("#labelModal").html(`Crear Nueva Especie`);

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
                                    <li class="item-content item-input item-input-outline item-input-focused item-input-with-value">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Nombre Especie</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused input-with-value" type="text" placeholder="Nombre Especie" id="nombreEspecie" name="Nombre Especie">
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

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "Brummy/views/catalogos/guardarEspecie.php",
            data: { nombreEspecie },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $(".sheet-close").trigger("click");
                        app.dialog.alert("Guardado correctamente", "Aviso");
                        obtenerEspecies();
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
            '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic; margin-top: 20px;"> ';
        response.forEach((data) => {
            html += `<li style="list-style: disc;">${data}.</li> `;
        });
        html += `</ul>`;
        Swal.fire({ icon: "warning", title: "", html: html });
    }
}

function obtenerEspecies() {
    // app.dialog.progress("Cargando...", "#009071");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/catalogos/obtenerEspecies.php",
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

// function obtenerRazas() {
//     $.ajax({
//         method: "POST",
//         dataType: "JSON",
//         url: "./views/catalogos/obtenerRazas.php",
//         data: {},
//     })
//         .done(function (results) {
//             let success = results.success;
//             let result = results.result;
//             let html = "";
//             switch (success) {
//                 case true:
//                     if (result == "Sin Datos") {
//                         dataTableDestroy();
//                         $("#razasBody").html(html);
//                         dataTableCreate();
//                         app.dialog.close();
//                     } else {
//                         dataTableDestroy();
//                         let html;
//                         result.forEach((data, index) => {
//                             html += `<tr>
//                                 <td>${index + 1}</td>
//                                 <td class="capitalize">${data.nombreRaza}</td>
//                                 <td class="capitalize">${data.especie}</td>
//                                 <td>
//                                     <div style="display: flex; flex-direction: row;">
//                                         <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteRaza(${data.ID})">
//                                             <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
//                                         </div>
//                                     </div>
//                                 </td>
//                             </tr>`;
//                         });
//                         $("#razasBody").html(html);
//                         dataTableCreate();
//                     }
//                     break;
//                 case false:
//                     app.dialog.close();
//                     app.dialog.alert("Algo salió mal", "Aviso");
//                     break;
//             }
//         })
//         .fail(function (jqXHR, textStatus, errorThrown) {
//             app.dialog.close();
//             app.dialog.alert("Algo salió mal", "Aviso");
//             console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//         });
// }

// function crearNuevaRaza() {
//     preloader.show();

//     $.ajax({
//         method: "POST",
//         dataType: "JSON",
//         url: "./views/catalogos/obtenerEspecies.php",
//         data: {},
//     })
//         .done(function (results) {
//             let success = results.success;
//             let result = results.result;
//             switch (success) {
//                 case true:
//                     if (result == "Sin Datos") {
//                     } else {
//                         let html = "";
//                         result.forEach((data, index) => {
//                             html += `<option value="${data.ID}">${data.nombreEspecie}</option>`;
//                         });

//                         $("#labelModal").html(`Crear Nueva Raza`);

//                         $("#body_modal").html(`<br>
//                             <div id="formRazas">
//                                 <div class="coolinput">
//                                     <label name="Nombre Raza" for="nombreRaza" class="text">Nombre Raza</label>
//                                     <input name="Nombre Raza" type="text" class="input capitalize obligatorio" id="nombreRaza" autocomplete="off" maxlength"50"/>
//                                 </div>

//                                 <div class="coolinput">
//                                     <label for="relacionEspecie" class="text">Relación Especie</label>
//                                     <select class="input capitalize obligatorio" name="Relación Especie" id="relacionEspecie" style="background-color: rgb(255, 255, 255);width:100%;">
//                                         <option value="">Selecciona una opción</option>
//                                         ${html}
//                                     </select>
//                                 </div>
//                             </div>

//                             <div class="center-fitcomponent" style="width: 100%;">
//                                 <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarRaza();">
//                                     <span class="text-sm mb-0 span-buttom">
//                                         Guardar
//                                         <i class="material-icons"> save </i>
//                                     </span>
//                                 </div>
//                             </div>
//                         `);

//                         $("#modalTemplate").modal({
//                             backdrop: "static",
//                             keyboard: false,
//                         });

//                         $("#modalTemplate").modal("show");

//                         $("#btnClose").on("click", () => {
//                             $("#modalTemplate").modal("hide");
//                             $("#btnClose").off("click");
//                         });

//                         $("#relacionEspecie").select2({
//                             dropdownParent: $("#modalTemplate"),
//                         });

//                         app.dialog.close();
//                     }
//                     break;
//                 case false:
//                     app.dialog.close();
//                     app.dialog.alert("Algo salió mal", "Aviso");
//                     break;
//             }
//         })
//         .fail(function (jqXHR, textStatus, errorThrown) {
//             app.dialog.close();
//             app.dialog.alert("Algo salió mal", "Aviso");
//             console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//         });
// }

// function guardarRaza() {
//     let values = get_datos_completos("formRazas");
//     let response = values.response;
//     let valido = values.valido;
//     if (valido) {
//         let nombreRaza = String($("#nombreRaza").val()).trim();
//         let FK_especie = $("#relacionEspecie").val();
//         let especie = $("#relacionEspecie").find("option:selected").text();

//         nombreRaza.replaceAll("'", '"');
//         preloader.show();

//         $.ajax({
//             method: "POST",
//             dataType: "JSON",
//             url: "./views/catalogos/guardarRaza.php",
//             data: { nombreRaza, FK_especie, especie },
//         })
//             .done(function (results) {
//                 let success = results.success;
//                 let result = results.result;
//                 switch (success) {
//                     case true:
//                         $("#modalTemplate").modal("hide");
//                         $("#btnClose").off("click");
//                         msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
//                         obtenerRazas();
//                         break;
//                     case false:
//                         app.dialog.close();
//                         app.dialog.alert("Algo salió mal", "Aviso");
//                         break;
//                 }
//             })
//             .fail(function (jqXHR, textStatus, errorThrown) {
//                 app.dialog.close();
//                 app.dialog.alert("Algo salió mal", "Aviso");
//                 console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//             });
//     } else {
//         let html =
//             '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;"> ';
//         response.forEach((data) => {
//             html += `<li style="list-style: disc;">${data}.</li> `;
//         });
//         html += `</ul>`;
//         Swal.fire({ icon: "warning", title: "", html: html });
//     }
// }

// function deleteEspecie(ID) {
//     Swal.fire({
//         title: "",
//         text: "¿Estás seguro de querer eliminar el registro?",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#7066e0",
//         cancelButtonColor: "#FF0037",
//         confirmButtonText: "OK",
//         cancelButtonText: "Cancelar",
//     }).then((result) => {
//         if (result.isConfirmed) {
//             preloader.show();
//             $.ajax({
//                 method: "POST",
//                 dataType: "JSON",
//                 url: "./views/catalogos/deleteEspecie.php",
//                 data: { ID },
//             })
//                 .done(function (results) {
//                     let success = results.success;
//                     let result = results.result;
//                     switch (success) {
//                         case true:
//                             $("#modalTemplate").modal("hide");
//                             $("#btnClose").off("click");
//                             obtenerEspecies();
//                             break;
//                         case false:
//                             app.dialog.close();
//                             app.dialog.alert("Algo salió mal", "Aviso");
//                             break;
//                     }
//                 })
//                 .fail(function (jqXHR, textStatus, errorThrown) {
//                     app.dialog.close();
//                     app.dialog.alert("Algo salió mal", "Aviso");
//                     console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//                 });
//         }
//     });
// }

// function deleteRaza(ID) {
//     Swal.fire({
//         title: "",
//         text: "¿Estás seguro de querer eliminar el registro?",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#7066e0",
//         cancelButtonColor: "#FF0037",
//         confirmButtonText: "OK",
//         cancelButtonText: "Cancelar",
//     }).then((result) => {
//         if (result.isConfirmed) {
//             preloader.show();
//             $.ajax({
//                 method: "POST",
//                 dataType: "JSON",
//                 url: "./views/catalogos/deleteRaza.php",
//                 data: { ID },
//             })
//                 .done(function (results) {
//                     let success = results.success;
//                     let result = results.result;
//                     switch (success) {
//                         case true:
//                             $("#modalTemplate").modal("hide");
//                             $("#btnClose").off("click");
//                             obtenerRazas();
//                             break;
//                         case false:
//                             app.dialog.close();
//                             app.dialog.alert("Algo salió mal", "Aviso");
//                             break;
//                     }
//                 })
//                 .fail(function (jqXHR, textStatus, errorThrown) {
//                     app.dialog.close();
//                     app.dialog.alert("Algo salió mal", "Aviso");
//                     console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//                 });
//         }
//     });
// }

// function obtenerMotivos() {
//     $.ajax({
//         method: "POST",
//         dataType: "JSON",
//         url: "./views/catalogos/obtenerMotivos.php",
//         data: {},
//     })
//         .done(function (results) {
//             let success = results.success;
//             let result = results.result;
//             let html = "";
//             switch (success) {
//                 case true:
//                     if (result == "Sin Datos") {
//                         dataTableDestroy();
//                         $("#motivosCitaBody").html(html);
//                         dataTableCreate();
//                         app.dialog.close();
//                     } else {
//                         dataTableDestroy();
//                         let html;
//                         result.forEach((data, index) => {
//                             html += `<tr>
//                                 <td>${index + 1}</td>
//                                 <td class="capitalize">${data.motivoCita}</td>
//                                 <td>
//                                     <div style="display: flex; flex-direction: row;">
//                                         <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteMotivoCita(${data.ID})">
//                                             <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
//                                         </div>
//                                     </div>
//                                 </td>
//                             </tr>`;
//                         });
//                         $("#motivosCitaBody").html(html);
//                         dataTableCreate();
//                     }
//                     break;
//                 case false:
//                     app.dialog.close();
//                     app.dialog.alert("Algo salió mal", "Aviso");
//                     break;
//             }
//         })
//         .fail(function (jqXHR, textStatus, errorThrown) {
//             app.dialog.close();
//             app.dialog.alert("Algo salió mal", "Aviso");
//             console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//         });
// }

// function crearNuevoMotivo() {
//     $("#labelModal").html(`Crear Nuevo Motivo de Cita`);

//     $("#body_modal").html(`<br>
//         <div id="formMotivoCita">
//             <div class="coolinput">
//                 <label name="Motivo" for="motivo" class="text">Motivo</label>
//                 <input name="Motivo" type="text" class="capitalize obligatorio input" id="motivo" autocomplete="off" maxlength"50"/>
//             </div>
//         </div>

//         <div class="center-fitcomponent" style="width: 100%;">
//             <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarMotivoCita();">
//                 <span class="text-sm mb-0 span-buttom">
//                     Guardar
//                     <i class="material-icons"> save </i>
//                 </span>
//             </div>
//         </div>
//     `);

//     $("#modalTemplate").modal({
//         backdrop: "static",
//         keyboard: false,
//     });

//     $("#modalTemplate").modal("show");

//     $("#btnClose").on("click", () => {
//         $("#modalTemplate").modal("hide");
//         $("#btnClose").off("click");
//     });
// }

// function guardarMotivoCita() {
//     let values = get_datos_completos("formMotivoCita");
//     let response = values.response;
//     let valido = values.valido;
//     if (valido) {
//         let motivoCita = String($("#motivo").val()).trim();

//         motivoCita.replaceAll("'", '"');

//         preloader.show();

//         $.ajax({
//             method: "POST",
//             dataType: "JSON",
//             url: "./views/catalogos/guardarMotivoCita.php",
//             data: { motivoCita },
//         })
//             .done(function (results) {
//                 let success = results.success;
//                 let result = results.result;
//                 switch (success) {
//                     case true:
//                         $("#modalTemplate").modal("hide");
//                         $("#btnClose").off("click");
//                         msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
//                         obtenerMotivos();
//                         break;
//                     case false:
//                         app.dialog.close();
//                         app.dialog.alert("Algo salió mal", "Aviso");
//                         break;
//                 }
//             })
//             .fail(function (jqXHR, textStatus, errorThrown) {
//                 app.dialog.close();
//                 app.dialog.alert("Algo salió mal", "Aviso");
//                 console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//             });
//     } else {
//         let html =
//             '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;"> ';
//         response.forEach((data) => {
//             html += `<li style="list-style: disc;">${data}.</li> `;
//         });
//         html += `</ul>`;
//         Swal.fire({ icon: "warning", title: "", html: html });
//     }
// }

// function deleteMotivoCita(ID) {
//     Swal.fire({
//         title: "",
//         text: "¿Estás seguro de querer eliminar el registro?",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#7066e0",
//         cancelButtonColor: "#FF0037",
//         confirmButtonText: "OK",
//         cancelButtonText: "Cancelar",
//     }).then((result) => {
//         if (result.isConfirmed) {
//             preloader.show();
//             $.ajax({
//                 method: "POST",
//                 dataType: "JSON",
//                 url: "./views/catalogos/deleteMotivoCita.php",
//                 data: { ID },
//             })
//                 .done(function (results) {
//                     let success = results.success;
//                     let result = results.result;
//                     switch (success) {
//                         case true:
//                             $("#modalTemplate").modal("hide");
//                             $("#btnClose").off("click");
//                             obtenerMotivos();
//                             break;
//                         case false:
//                             app.dialog.close();
//                             app.dialog.alert("Algo salió mal", "Aviso");
//                             break;
//                     }
//                 })
//                 .fail(function (jqXHR, textStatus, errorThrown) {
//                     app.dialog.close();
//                     app.dialog.alert("Algo salió mal", "Aviso");
//                     console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//                 });
//         }
//     });
// }

// function obtenerMotivosRechazo() {
//     $.ajax({
//         method: "POST",
//         dataType: "JSON",
//         url: "./views/catalogos/obtenerMotivosRechazo.php",
//         data: {},
//     })
//         .done(function (results) {
//             let success = results.success;
//             let result = results.result;
//             let html = "";
//             switch (success) {
//                 case true:
//                     if (result == "Sin Datos") {
//                         dataTableDestroy();
//                         $("#rechazosCitaBody").html(html);
//                         dataTableCreate();
//                         app.dialog.close();
//                     } else {
//                         dataTableDestroy();
//                         let html;
//                         result.forEach((data, index) => {
//                             html += `<tr>
//                                 <td>${index + 1}</td>
//                                 <td class="capitalize">${data.motivoRechazo}</td>
//                                 <td>
//                                     <div style="display: flex; flex-direction: row;">
//                                         <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteMotivoRechazo(${data.ID})">
//                                             <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
//                                         </div>
//                                     </div>
//                                 </td>
//                             </tr>`;
//                         });
//                         $("#rechazosCitaBody").html(html);
//                         dataTableCreate();
//                     }
//                     break;
//                 case false:
//                     app.dialog.close();
//                     app.dialog.alert("Algo salió mal", "Aviso");
//                     break;
//             }
//         })
//         .fail(function (jqXHR, textStatus, errorThrown) {
//             app.dialog.close();
//             app.dialog.alert("Algo salió mal", "Aviso");
//             console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//         });
// }

// function crearNuevoMotivoRechazo() {
//     $("#labelModal").html(`Crear Nuevo Motivo de Rechazo`);

//     $("#body_modal").html(`<br>
//         <div id="formMotivoCitaRechazo">
//             <div class="coolinput">
//                 <label name="MotivoRechazo" for="motivoRechazo" class="text">Motivo Rechazo</label>
//                 <input name="Motivo Rechazo" type="text" class="capitalize obligatorio input" id="motivoRechazo" autocomplete="off" maxlength"50"/>
//             </div>
//         </div>

//         <div class="center-fitcomponent" style="width: 100%;">
//             <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarMotivoRechazo();">
//                 <span class="text-sm mb-0 span-buttom">
//                     Guardar
//                     <i class="material-icons"> save </i>
//                 </span>
//             </div>
//         </div>
//     `);

//     $("#modalTemplate").modal({
//         backdrop: "static",
//         keyboard: false,
//     });

//     $("#modalTemplate").modal("show");

//     $("#btnClose").on("click", () => {
//         $("#modalTemplate").modal("hide");
//         $("#btnClose").off("click");
//     });
// }

// function guardarMotivoRechazo() {
//     let values = get_datos_completos("formMotivoCitaRechazo");
//     let response = values.response;
//     let valido = values.valido;
//     if (valido) {
//         let motivoRechazo = String($("#motivoRechazo").val()).trim();

//         motivoRechazo.replaceAll("'", '"');

//         preloader.show();

//         $.ajax({
//             method: "POST",
//             dataType: "JSON",
//             url: "./views/catalogos/guardarMotivoRechazo.php",
//             data: { motivoRechazo },
//         })
//             .done(function (results) {
//                 let success = results.success;
//                 let result = results.result;
//                 switch (success) {
//                     case true:
//                         $("#modalTemplate").modal("hide");
//                         $("#btnClose").off("click");
//                         msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
//                         obtenerMotivosRechazo();
//                         break;
//                     case false:
//                         app.dialog.close();
//                         app.dialog.alert("Algo salió mal", "Aviso");
//                         break;
//                 }
//             })
//             .fail(function (jqXHR, textStatus, errorThrown) {
//                 app.dialog.close();
//                 app.dialog.alert("Algo salió mal", "Aviso");
//                 console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//             });
//     } else {
//         let html =
//             '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;"> ';
//         response.forEach((data) => {
//             html += `<li style="list-style: disc;">${data}.</li> `;
//         });
//         html += `</ul>`;
//         Swal.fire({ icon: "warning", title: "", html: html });
//     }
// }

// function deleteMotivoRechazo(ID) {
//     Swal.fire({
//         title: "",
//         text: "¿Estás seguro de querer eliminar el registro?",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#7066e0",
//         cancelButtonColor: "#FF0037",
//         confirmButtonText: "OK",
//         cancelButtonText: "Cancelar",
//     }).then((result) => {
//         if (result.isConfirmed) {
//             preloader.show();
//             $.ajax({
//                 method: "POST",
//                 dataType: "JSON",
//                 url: "./views/catalogos/deleteMotivoRechazo.php",
//                 data: { ID },
//             })
//                 .done(function (results) {
//                     let success = results.success;
//                     let result = results.result;
//                     switch (success) {
//                         case true:
//                             $("#modalTemplate").modal("hide");
//                             $("#btnClose").off("click");
//                             obtenerMotivosRechazo();
//                             break;
//                         case false:
//                             app.dialog.close();
//                             app.dialog.alert("Algo salió mal", "Aviso");
//                             break;
//                     }
//                 })
//                 .fail(function (jqXHR, textStatus, errorThrown) {
//                     app.dialog.close();
//                     app.dialog.alert("Algo salió mal", "Aviso");
//                     console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
//                 });
//         }
//     });
// }
