function obtenerDataSatisfaccion(mes, anio) {
    let url = localStorage.getItem("url");
    if (mes && anio) {
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "Brummy/views/satisfaccion/obtenerDataSatisfaccion.php",
            data: { mes, anio },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                let estrellas_5 = 0,
                    estrellas_4 = 0,
                    estrellas_3 = 0,
                    estrellas_2 = 0,
                    estrellas_1 = 0;
                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                        } else {
                            // dataTableDestroy();
                            result.forEach((data, index) => {
                                $("#encuestasContestadas").html(data.encuestasContestadas);
                                $("#encuestasGeneradas").html(data.encuestasGeneradas);
                                $("#encuestasPorContestar").html(data.encuestasPorContestar);
                                $("#5_estrellas").html(data.estrellas_5);
                                $("#4_estrellas").html(data.estrellas_4);
                                $("#3_estrellas").html(data.estrellas_3);
                                $("#2_estrellas").html(data.estrellas_2);
                                $("#1_estrellas").html(data.estrellas_1);
                                estrellas_5 = data.estrellas_5;
                                estrellas_4 = data.estrellas_4;
                                estrellas_3 = data.estrellas_3;
                                estrellas_2 = data.estrellas_2;
                                estrellas_1 = data.estrellas_1;
                            });
                            // dataTableCreate();
                            obtenerDataInitialSatisfaccion(mes, anio);
                            if (estrellas_5 == 0 && estrellas_4 == 0 && estrellas_3 == 0 && estrellas_2 == 0 && estrellas_1 == 0) {
                                $("#bar-chart_gg").css("display", "none");
                            } else {
                                $("#bar-chart_gg").css("display", "block");
                            }
                            new Chart(document.getElementById("bar-chart_gg"), {
                                type: "bar",
                                data: {
                                    labels: ["1 estrellas", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas"],
                                    datasets: [
                                        {
                                            label: "Calificaciones",
                                            backgroundColor: ["#009071", "#009071", "#009071", "#009071", "#009071"],
                                            data: [estrellas_1, estrellas_2, estrellas_3, estrellas_4, estrellas_5],
                                        },
                                    ],
                                },
                                options: {
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: "",
                                    },
                                },
                            });
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
}

function obtenerDataInitialSatisfaccion(mes, anio) {
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
                        // dataTableDestroy();
                        $("#preguntasBody").html(html);
                        // dataTableCreate();
                    } else {
                        // dataTableDestroy();
                        $("#preguntasBody").html(html);
                        result.forEach((data, index) => {
                            $("#preguntasBody").append(`
                                <tr>
                                    <td style="padding: 8px 12px;">${Number(index + 1)}</td>
                                    <td style="padding: 8px 12px;">${data.Pregunta}</td>
                                    <td style="padding: 8px 12px;" id="td_${data.ID}"></td>
                                    <td style="padding: 8px 12px;"><canvas id="bar-chart_${data.ID}" width="200" height="150"></canvas></td>
                                </tr>
                            `);
                            let IDPregunta = data.ID;
                            $.ajax({
                                method: "POST",
                                dataType: "JSON",
                                url: url + "Brummy/views/satisfaccion/obtenerDataPreguntas.php",
                                data: { mes, anio, IDPregunta },
                            })
                                .done(function (results) {
                                    let success = results.success;
                                    let result = results.result;
                                    switch (success) {
                                        case true:
                                            if (result == "Sin Datos") {
                                                // dataTableDestroy();
                                                // dataTableCreate();
                                            } else {
                                                // dataTableDestroy();
                                                let html = "";
                                                let dataValues = [];
                                                let dataLabel = [];
                                                result.forEach((data, index) => {
                                                    html += `
                                                        <div>${data.respuesta1}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion1}</div>
                                                        <div>${data.respuesta2}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion2}</div>
                                                        <div>${data.respuesta3}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion3}</div>
                                                        <div>${data.respuesta4}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion4}</div>
                                                        <div>${data.respuesta5}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion5}</div>
                                                    `;
                                                    dataValues = [
                                                        Number(data.respuesta1),
                                                        Number(data.respuesta2),
                                                        Number(data.respuesta3),
                                                        Number(data.respuesta4),
                                                        Number(data.respuesta5),
                                                    ];
                                                    // dataValues = [6, 5, 4, 5, 4];
                                                    dataLabel = [data.opcion1, data.opcion2, data.opcion3, data.opcion4, data.opcion5];
                                                });
                                                $(`#td_${data.ID}`).html(`
                                                    <div style="font-weight: bold;">
                                                        ${html}
                                                    </div>
                                                `);
                                                new Chart(document.getElementById("bar-chart_" + data.ID), {
                                                    type: "doughnut",
                                                    data: {
                                                        datasets: [
                                                            {
                                                                data: dataValues,
                                                                backgroundColor: ["#ffcd56", "#ff6384", "#36a2eb", "#009071", "#a87dff"],
                                                            },
                                                        ],

                                                        // These labels appear in the legend and in the tooltips when hovering different arcs
                                                        labels: dataLabel,
                                                    },
                                                    options: {
                                                        legend: { display: false },
                                                        title: {
                                                            display: true,
                                                            text: "",
                                                        },
                                                    },
                                                });

                                                // dataTableCreate();
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
                        });
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

function generarReporteInventario() {
    if (!$("#fechaReporteInicio").val() || !$("#fechaReporteInicio").val()) {
        // msj.show("Aviso", ".", [{ text1: "OK" }]);
        // Swal.fire({
        //     icon: "warning",
        //     title: "Aviso",
        //     text: "Debes indicar una Fecha Inicio y una Fecha Fin a buscar.",
        // });
        app.dialog.alert("Debes indicar una Fecha Inicio y una Fecha Fin a buscar.", "Aviso");
        return false;
    }

    let fechaReporteInicio = $("#fechaReporteInicio").val();
    let fechaReporteFin = $("#fechaReporteFin").val();
    let url = localStorage.getItem("url");
    // preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "./Brummy/views/inventario/generarReporteInventario.php",
        data: { fechaReporteInicio, fechaReporteFin },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        // msj.show("Aviso", "No se encontró información en este rango de fechas.", [{ text1: "OK" }]);
                        app.dialog.alert("No se encontró información en este rango de fechas.", "Aviso");
                        // preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${Number(index + 1)}</td>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${data.FlagProducto}</td>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${data.suma}</td>
                            </tr>`;
                        });

                        $("#tbodyExportInventario").html(html);
                        let table = document.getElementsByClassName("tableExport");
                        let now = String(Date.now());
                        let lastFive = now.substr(now.length - 8);
                        TableToExcel.convert(table[0], {
                            name: `Reporte_${lastFive}.xlsx`,
                            sheet: {
                                name: "Ventas",
                            },
                        });
                        // $("#modalTemplate").modal("hide");
                        // $("#btnClose").off("click");
                        // preloader.hide();
                    }
                    break;
                case false:
                    // preloader.hide();
                    // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    app.dialog.alert("Algo salió mal.", "Aviso");
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // preloader.hide();
            // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            app.dialog.alert("Algo salió mal.", "Aviso");
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function reporteProductosVendidos() {
    let modalTemplate = app.popup.create({
        content: `<div class="sheet-modal demo-sheet">
            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;width: fit-content;left: 94%;"> 
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
                                            <div class="item-title item-floating-label">Fecha Inicio</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused " type="date" placeholder="Fecha Inicio" id="fechaReporteInicio" name="Fecha Inicio">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="item-content item-input item-input-outline">
                                        <div class="item-inner">
                                            <div class="item-title item-floating-label">Fecha Fin</div>
                                            <div class="item-input-wrap">
                                                <input class="floating obligatorio input-focused " type="date" placeholder="Fecha Fin" id="fechaReporteFin" name="Fecha Fin">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                
                        <button class="button button-outline button-round" onclick="generarReporteInventario()">
                            Generar <span class="material-icons iconBtn"> file_download </span>
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
