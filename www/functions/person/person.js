function obtenerCitasFrecuentes() {
    let url = localStorage.getItem("url");
    let filtroCitas = $("#filtroCitas").val();
    let filtroMesCitas = $("#filtroMesCitas").val();
    let filtroAnioCitas = $("#filtroAnioCitas").val();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/frecuentes/obtenerCitasFrecuentes.php",
        data: { filtroCitas, filtroMesCitas, filtroAnioCitas },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#frecuentesCitasBody").html(html);
                        dataTableCreate();
                    } else {
                        let indicadorCliente = "";
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            if (data.indicadorCliente == "verde") {
                                indicadorCliente = `#27AE60`;
                            } else if (data.indicadorCliente == "amarilo") {
                                indicadorCliente = `#ffb02e`;
                            } else if (data.indicadorCliente == "rojo") {
                                indicadorCliente = `#ff0300`;
                            }
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.FKnombreCita}</td>
                                <td class="capitalize d-sm-flex" style="align-items: center;text-wrap: nowrap;display: flex;">
                                    <div> <span class="material-icons" style="font-size: 18px;color: ${indicadorCliente}; margin-left: 5px; margin-right: 5px;"> fiber_manual_record </span> </div>
                                    ${data.nombreCita}
                                </td>
                                <td class="capitalize">${data.citas}</td>
                            </tr>`;
                        });
                        $("#frecuentesCitasBody").html(html);
                        dataTableCreate();
                    }
                    break;
                case false:
                    preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function obtenerComprasFrecuentes() {
    let filtroCompras = $("#filtroCompras").val();
    let filtroAnioCompras = $("#filtroAnioCompras").val();
    let filtroMesCompras = $("#filtroMesCompras").val();
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/frecuentes/obtenerComprasFrecuentes.php",
        data: { filtroCompras, filtroAnioCompras, filtroMesCompras },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#frecuentesComprasBody").html(html);
                        dataTableCreate();
                    } else {
                        dataTableDestroy();
                        let indicadorCliente = "";
                        result.forEach((data, index) => {
                            if (data.indicadorCliente == "verde") {
                                indicadorCliente = `#27AE60`;
                            } else if (data.indicadorCliente == "amarilo") {
                                indicadorCliente = `#ffb02e`;
                            } else if (data.indicadorCliente == "rojo") {
                                indicadorCliente = `#ff0300`;
                            }
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.cliente}</td>
                                <td class="capitalize d-sm-flex" style="align-items: center;text-wrap: nowrap;display: flex;">
                                    <div> <span class="material-icons" style="font-size: 18px;color: ${indicadorCliente}; margin-left: 5px; margin-right: 5px;"> fiber_manual_record </span> </div>
                                    ${data.nombreCompleto}
                                </td>
                                <td class="capitalize">${data.compras}</td>
                                <td class="capitalize">${data.sumaPiezas}</td>
                                <td class="capitalize">$ ${CantidadConCommas(data.sumaPrice)}</td>
                            </tr>`;
                        });
                        $("#frecuentesComprasBody").html(html);
                        dataTableCreate();
                    }
                    break;
                case false:
                    preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}
