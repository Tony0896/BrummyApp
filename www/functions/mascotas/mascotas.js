function obtenerMascotas() {
    let url = localStorage.getItem("url");
    axios
        .get(url + "Brummy/views/mascotas/obtenerMascotas.php", {})
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result = response.data.result;
                let html = "";
                if (result == "Sin Datos") {
                    dataTableDestroy();
                    $("#mascotasBody").html(html);
                    dataTableCreate();
                } else {
                    dataTableDestroy();
                    let temperamento = "";
                    let html;
                    let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
                    result.forEach((data, index) => {
                        if (data.temperamentoMascota == "verde") {
                            temperamento = `#27AE60`;
                        } else if (data.temperamentoMascota == "amarilo") {
                            temperamento = `#ffb02e`;
                        } else if (data.temperamentoMascota == "rojo") {
                            temperamento = `#ff0300`;
                        } else {
                            temperamento = `#FFFFFF`;
                        }
                        html += `<tr>
                            <td>${index + 1}</td>
                            <td> <span class="material-icons" style="font-size: 18px;color: ${temperamento}"> fiber_manual_record </span> </td>
                            <td class="capitalize"> 
                                <div> 
                                    <div><span>${data.nombre}</span></div> 
                                    <div><span>${data.especie} - ${data.raza}</span></div> 
                                </div> 
                            </td>
                            <td class="capitalize">${data.NombreCliente}</td>
                            <td class="capitalize">${data.fechaNacimiento}</td>
                            <td class="capitalize">${data.sexo}</td>
                            <td>${data.color ? data.color : tdSinData}</td>
                            <td class="capitalize"><div> <div>${volteaFecha(String(data.fechaUlmitoMovimiento).split(" ")[0], 1)} ${
                            String(String(data.fechaUlmitoMovimiento).split(" ")[1]).split(":")[0]
                        }:${String(String(data.fechaUlmitoMovimiento).split(" ")[1]).split(":")[1]}</div> <div>${
                            data.motivoMovimiento
                        }</div> </div></td>
                            <td>
                                <div style="display: flex; flex-direction: row;">
                                    <button class="button button-outline button-round btnGreen" onclick="verMascota(${data.ID}, ${data.FK_dueno})">
                                        <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> pets </span>
                                    </button>
                                </div>
                            </td>
                        </tr>`;
                    });
                    $("#mascotasBody").html(html);
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

function crearMascota() {
    let url = localStorage.getItem("url");
    axios
        .get(url + "Brummy/views/catalogos/obtenerRazas.php", {})
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                let result2 = response.data.result;
                if (result2 == "Sin Datos") {
                } else {
                    let html2 = "";
                    result2.forEach((data2, index) => {
                        html2 += `<option value="${data2.ID}" FK_especie="${data2.FK_especie}" especie="${data2.especie}" raza="${data2.nombreRaza}">${data2.especie} - ${data2.nombreRaza}</option>`;
                    });
                    axios
                        .get(url + "Brummy/views/clientes/obtenerClientes.php", {})
                        .then(function (response) {
                            console.log(response);
                            if (response.status === 200) {
                                let result3 = response.data.result;
                                if (result3 == "Sin Datos") {
                                } else {
                                    let html3 = "";
                                    result3.forEach((data3, index) => {
                                        html3 += `<option value="${data3.ID}">${data3.nombre} ${data3.apellidoP} ${data3.apellidoM}</option>`;
                                    });

                                    let modalTemplate = app.popup.create({
                                        content: `<div class="sheet-modal demo-sheet">
                                            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;width: fit-content;left: 94%;"> 
                                                <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                                            </div>
                                            <div class="sheet-modal-inner">
                                                <div class="page-content">
                                                    <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                                        <div id="formMascotas" style=" width: 100%; ">
                                                            <div class="list list-strong-ios list-dividers-ios inset-ios">
                                                                <ul>
                                                                    <li class="item-content item-input item-input-outline">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Nombre</div>
                                                                            <div class="item-input-wrap">
                                                                                <input class="floating obligatorio input-focused " type="text" placeholder="Nombre Mascota" id="nombreMascota" name="Nombre Mascota">
                                                                                <span class="input-clear-button"></span>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li class="item-content item-input item-input-outline">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Fecha Nacimiento</div>
                                                                            <div class="item-input-wrap">
                                                                                <input class="floating obligatorio input-focused " type="date" placeholder="Fecha Nacimiento" id="fechaMascota" name="Fecha Nacimiento">
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
                                                                                    ${html2}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li class="item-content item-input item-input-outline">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Sexo Mascota</div>
                                                                            <div class="item-input-wrap">
                                                                                <select class="floating obligatorio input-focused " type="text" placeholder="Sexo Mascota" id="sexoMascota" name="Sexo Mascota">
                                                                                    <option value="">Selecciona una opción</option>
                                                                                    <option value="Macho">Macho</option>
                                                                                    <option value="Hembra">Hembra</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li class="item-content item-input item-input-outline">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Color Mascota</div>
                                                                            <div class="item-input-wrap">
                                                                                <input class="floating input-focused " type="text" placeholder="Color Mascota" id="colorMascota" name="Color Mascota">
                                                                                <span class="input-clear-button"></span>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li class="item-content item-input item-input-outline">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Rasgos Particulares</div>
                                                                            <div class="item-input-wrap">
                                                                                <input class="floating input-focused " type="text" placeholder="Rasgos Particulares" id="rasgosMascota" name="Rasgos Particulares">
                                                                                <span class="input-clear-button"></span>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li class="item-content item-input item-input-outline">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Dueño Mascota</div>
                                                                            <div class="item-input-wrap">
                                                                                <select class="floating obligatorio input-focused " type="text" placeholder="Dueño Mascota" id="FK_dueno" name="Dueño Mascota">
                                                                                    <option value="">Selecciona una opción</option>
                                                                                    ${html3}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    
                                                                    <li class="item-content item-input item-input-outline">
                                                                        <div class="item-inner">
                                                                            <div class="item-title item-floating-label">Temperamento Mascota</div>
                                                                            <div class="item-input-wrap">
                                                                                <select class="floating obligatorio input-focused " type="text" placeholder="Temperamento Mascota" id="temperamentoMascota" name="Temperamento Mascota" style="padding: 0px 10px !important;">
                                                                                    <option value="">Selecciona una opción</option>
                                                                                    <option value="verde">&#129001;</option>
                                                                                    <option value="amarilo">&#129000;</option>
                                                                                    <option value="rojo">&#128997;</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li class="item-content item-input item-input-outline">
                                                                        <div class="item-inner">
                                                                            <div class="container_upload"> 
                                                                                <div class="header_upload"> 
                                                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                                                                    <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#009071" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> <p>Adjuntar una foto de la mascota!</p>
                                                                                </div> 
                                                                                <input id="file" type="file"> 
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                
                                                        <button class="button button-outline button-round" onclick="guardarMascota()">
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

                                                new TomSelect("#sexoMascota", {
                                                    create: false,
                                                    sortField: {
                                                        field: "text",
                                                    },
                                                });

                                                new TomSelect("#FK_dueno", {
                                                    create: false,
                                                    sortField: {
                                                        field: "text",
                                                    },
                                                });
                                            },
                                        },
                                    });

                                    modalTemplate.open();
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

function guardarMascota() {
    let values = get_datos_completos("formMascotas");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombreMascota").val());
        let fechaNacimiento = String($("#fechaMascota").val());
        let FK_especie = String($("#relacionEspecie").find(":selected").attr("FK_especie"));
        let especie = String($("#relacionEspecie").find(":selected").attr("especie"));
        let raza = String($("#relacionEspecie").find(":selected").attr("raza"));
        let FK_raza = String($("#relacionEspecie").val());
        let sexo = String($("#sexoMascota").val());
        let color = String($("#colorMascota").val());
        let rasgosParticulares = String($("#rasgosMascota").val());
        let FK_dueno = String($("#FK_dueno").val());
        let temperamentoMascota = $("#temperamentoMascota").val();

        nombre.replaceAll("'", '"');
        fechaNacimiento.replaceAll("'", '"');
        FK_especie.replaceAll("'", '"');
        especie.replaceAll("'", '"');
        raza.replaceAll("'", '"');
        FK_raza.replaceAll("'", '"');
        sexo.replaceAll("'", '"');
        color.replaceAll("'", '"');
        rasgosParticulares.replaceAll("'", '"');
        FK_dueno.replaceAll("'", '"');
        let url = localStorage.getItem("url");
        // axios
        //     .post(url + "Brummy/views/mascotas/guardarMascota.php", {
        //         nombre,
        //         fechaNacimiento,
        //         FK_especie,
        //         especie,
        //         raza,
        //         FK_raza,
        //         sexo,
        //         color,
        //         rasgosParticulares,
        //         FK_dueno,
        //         temperamentoMascota,
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //         if (response.status === 200) {
        //             $(".sheet-close").trigger("click");
        //             app.dialog.alert("Guardado correctamente", "Aviso");
        //             obtenerMascotas();
        //         }
        //     })
        //     .catch(function (error) {
        //         app.dialog.alert("Algo salió mal", "Aviso");
        //         console.log(error);
        //     });

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "Brummy/views/mascotas/guardarMascota.php",
            data: {
                nombre,
                fechaNacimiento,
                FK_especie,
                especie,
                raza,
                FK_raza,
                sexo,
                color,
                rasgosParticulares,
                FK_dueno,
                temperamentoMascota,
            },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;

                switch (success) {
                    case true:
                        $(".sheet-close").trigger("click");
                        app.dialog.alert("Guardado correctamente", "Aviso");
                        obtenerMascotas();
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

function verMascota(ID, FK_dueno) {
    localStorage.setItem("IDMascota", ID);
    localStorage.setItem("FK_dueno", FK_dueno);
    let name = "perfilMascota";
    app.views.main.router.navigate({ name: name });
}

function eliminarMascota(ID) {
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
                        // axios
                        //     .post(url + "Brummy/views/mascotas/eliminarMascota.php", {
                        //         ID,
                        //     })
                        //     .then(function (response) {
                        //         console.log(response);
                        //         if (response.status === 200) {
                        //             app.dialog.alert("Eliminado correctamente", "Aviso");
                        //             regresaMascotas();
                        //         }
                        //     })
                        //     .catch(function (error) {
                        //         app.dialog.alert("Algo salió mal", "Aviso");
                        //         console.log(error);
                        //     });
                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: url + "Brummy/views/mascotas/eliminarMascota.php",
                            data: { ID },
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;

                                switch (success) {
                                    case true:
                                        app.dialog.alert("Eliminado correctamente", "Aviso");
                                        globalBack();
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

function editarMascota(data_mascota) {
    // preloader.show();
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/catalogos/obtenerRazas.php",
        data: {},
    })
        .done(function (results2) {
            let success2 = results2.success;
            let result2 = results2.result;
            switch (success2) {
                case true:
                    if (result2 == "Sin Datos") {
                    } else {
                        let html2 = "";
                        let attr_selected_especie = "";
                        let templates_sexo_animal =
                            data_mascota[0]["sexo"] == "Macho"
                                ? `<option value="Macho" selected>Macho</option> <option value="Hembra">Hembra</option>`
                                : `<option value="Macho">Macho</option> <option value="Hembra" selected>Hembra</option>`;

                        result2.forEach((data2, index) => {
                            attr_selected_especie =
                                data2.especie == data_mascota[0]["especie"] && data2.nombreRaza == data_mascota[0]["raza"] ? "selected" : "";
                            html2 += `<option value="${data2.ID}" FK_especie="${data2.FK_especie}" especie="${data2.especie}" raza="${data2.nombreRaza}" ${attr_selected_especie} >${data2.especie} - ${data2.nombreRaza}</option>`;
                        });
                        let url = localStorage.getItem("url");
                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: url + "Brummy/views/clientes/obtenerClientes.php",
                            data: {},
                        })
                            .done(function (results3) {
                                let success3 = results3.success;
                                let result3 = results3.result;
                                switch (success3) {
                                    case true:
                                        if (result3 == "Sin Datos") {
                                        } else {
                                            let html3 = "";
                                            let attr_selected_dueno = "";
                                            result3.forEach((data3, index) => {
                                                attr_selected_dueno = data3.ID == data_mascota[0]["FK_dueno"] ? "selected" : "";
                                                html3 += `<option value="${data3.ID}" ${attr_selected_dueno}>${data3.nombre} ${data3.apellidoP} ${data3.apellidoM}</option>`;
                                            });

                                            let modalTemplate = app.popup.create({
                                                content: `<div class="sheet-modal demo-sheet">
                                                                <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
                                                                    <span class="material-icons" style="font-size: 35px; color: #FF0037; "> cancel </span></h1>
                                                                </div>
                                                                <div class="sheet-modal-inner">
                                                                    <div class="page-content">
                                                                        <div class="block" style="margin-top: 60px;align-items: center;display: flex;flex-direction: column;">
                                                                            <div id="formMascotas" style=" width: 100%; ">
                                                                                <div class="list list-strong-ios list-dividers-ios inset-ios">
                                                                                    <ul>
                                                                                        <li class="item-content item-input item-input-outline" id="LIeditNombreMascota">
                                                                                            <div class="item-inner">
                                                                                                <div class="item-title item-floating-label">Nombre Mascota</div>
                                                                                                <div class="item-input-wrap">
                                                                                                    <input class="floating obligatorio input-focused " type="text" placeholder="Nombre Mascota" id="editNombreMascota" name="Nombre Mascota">
                                                                                                    <span class="input-clear-button"></span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>

                                                                                        <li class="item-content item-input item-input-outline" id="LIeditFechaMascota" >
                                                                                            <div class="item-inner">
                                                                                                <div class="item-title item-floating-label">Fecha Nacimiento</div>
                                                                                                <div class="item-input-wrap">
                                                                                                    <input class="floating obligatorio input-focused " type="text" placeholder="Fecha Nacimiento" id="editFechaMascota" name="Fecha Nacimiento">
                                                                                                    <span class="input-clear-button"></span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                            
                                                                                        <li class="item-content item-input item-input-outline" id="LIeditRelacionEspecie">
                                                                                            <div class="item-inner">
                                                                                                <div class="item-title item-floating-label">Relación Especie</div>
                                                                                                <div class="item-input-wrap">
                                                                                                    <select class="floating obligatorio input-focused " type="text" placeholder="Relación Especie" id="editRelacionEspecie" name="Relación Especie">
                                                                                                        <option value="">Selecciona una opción</option>
                                                                                                        ${html2}
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>

                                                                                        <li class="item-content item-input item-input-outline" id="LIeditSexoMascota">
                                                                                            <div class="item-inner">
                                                                                                <div class="item-title item-floating-label">Sexo Mascota</div>
                                                                                                <div class="item-input-wrap">
                                                                                                    <select class="floating obligatorio input-focused " style="padding-top: 0 !important;padding-bottom: 0 !important;" type="text" placeholder="Sexo Mascota" id="editSexoMascota" name="Sexo Mascota">
                                                                                                        <option value="">Selecciona una opción</option>
                                                                                                        ${templates_sexo_animal}
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>

                                                                                        <li class="item-content item-input item-input-outline" id="LIeditColorMascota">
                                                                                            <div class="item-inner">
                                                                                                <div class="item-title item-floating-label">Color Mascota</div>
                                                                                                <div class="item-input-wrap">
                                                                                                    <input class="floating obligatorio input-focused " type="text" placeholder="Color Mascota" id="editColorMascota" name="Color Mascota">
                                                                                                    <span class="input-clear-button"></span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>

                                                                                        <li class="item-content item-input item-input-outline" id="LIeditRasgosMascota">
                                                                                            <div class="item-inner">
                                                                                                <div class="item-title item-floating-label">Rasgos Particulares</div>
                                                                                                <div class="item-input-wrap">
                                                                                                    <input class="floating obligatorio input-focused " type="text" placeholder="Rasgos Particulares" id="editRasgosMascota" name="Rasgos Particulares">
                                                                                                    <span class="input-clear-button"></span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>

                                                                                        <li class="item-content item-input item-input-outline" id="LIEdit_FK_dueno">
                                                                                            <div class="item-inner">
                                                                                                <div class="item-title item-floating-label">Dueño Mascota</div>
                                                                                                <div class="item-input-wrap">
                                                                                                    <select class="floating obligatorio input-focused " placeholder="Dueño Mascota" id="Edit_FK_dueno" name="Dueño Mascota"
                                                                                                        <option value="">Selecciona una opción</option>
                                                                                                        ${html3}
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        
                                                                                    </ul>

                                                                                    <div class="coolinput">
                                                                                        <div class="container_upload"> 
                                                                                            <div class="header_upload"> 
                                                                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                                                                                <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#009071" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> <p>Adjuntar una foto de la mascota!</p>
                                                                                            </div> 
                                                                                            <input id="file" type="file"> 
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                    
                                                                            <button class="button button-outline button-round" onclick="guardarEdicionMascota()">
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
                                                        new TomSelect("#editRelacionEspecie", {
                                                            create: false,
                                                            sortField: {
                                                                field: "text",
                                                            },
                                                        });

                                                        new TomSelect("#Edit_FK_dueno", {
                                                            create: false,
                                                            sortField: {
                                                                field: "text",
                                                            },
                                                        });

                                                        if (data_mascota[0]["nombre"]) {
                                                            $("#editNombreMascota").val(data_mascota[0]["nombre"]);
                                                            $("#LIeditNombreMascota").addClass("item-input-focused");
                                                            $("#editNombreMascota").addClass("input-with-value input-focused item-input-outline");
                                                        }
                                                        if (data_mascota[0]["fechaNacimiento"]) {
                                                            $("#editFechaMascota").val(data_mascota[0]["fechaNacimiento"]);
                                                            $("#LIeditFechaMascota").addClass("item-input-focused");
                                                            $("#editFechaMascota").addClass("input-with-value input-focused item-input-outline");
                                                        }
                                                        if (data_mascota[0]["color"]) {
                                                            $("#editColorMascota").val(data_mascota[0]["color"]);
                                                            $("#LIeditColorMascota").addClass("item-input-focused");
                                                            $("#editColorMascota").addClass("input-with-value input-focused item-input-outline");
                                                        }
                                                        if (data_mascota[0]["rasgosParticulares"]) {
                                                            $("#editRasgosMascota").val(data_mascota[0]["rasgosParticulares"]);
                                                            $("#LIeditRasgosMascota").addClass("item-input-focused");
                                                            $("#editRasgosMascota").addClass("input-with-value input-focused item-input-outline");
                                                        }

                                                        if (data_mascota[0]["especie"]) {
                                                            $("#LIeditRelacionEspecie").addClass("item-input-focused");
                                                            $("#editRelacionEspecie").addClass("input-with-value input-focused item-input-outline");
                                                        }
                                                        if (data_mascota[0]["sexo"]) {
                                                            $("#LIeditSexoMascota").addClass("item-input-focused");
                                                            $("#editSexoMascota").addClass("input-with-value input-focused item-input-outline");
                                                        }
                                                        if (data_mascota[0]["FK_dueno"]) {
                                                            $("#LIEdit_FK_dueno").addClass("item-input-focused");
                                                            $("#Edit_FK_dueno").addClass("input-with-value input-focused item-input-outline");
                                                        }
                                                    },
                                                },
                                            });

                                            modalTemplate.open();
                                        }
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

function guardarEdicionMascota() {
    let url = localStorage.getItem("url");

    let arr_data = {
        ID: localStorage.getItem("IDMascota"),
        editNombreMascota: $("#editNombreMascota").val(),
        editFechaMascota: $("#editFechaMascota").val(),
        raza: String($("#editRelacionEspecie").find(":selected").attr("raza")),
        especie: String($("#editRelacionEspecie").find(":selected").attr("especie")),
        FK_especie: String($("#editRelacionEspecie").find(":selected").attr("FK_especie")),
        FK_raza: $("#editRelacionEspecie").val(),
        editSexoMascota: $("#editSexoMascota").val(),
        editColorMascota: $("#editColorMascota").val(),
        editRasgosMascota: $("#editRasgosMascota").val(),
        Edit_FK_dueno: $("#Edit_FK_dueno").val(),
    };

    axios
        .post(url + "Brummy/views/mascotas/guardarEdicionMascota.php", { arr_data: arr_data })
        .then((response) => {
            if (response.status == 200) {
                let success = response.data.success;
                let result = response.data.result;

                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                        } else {
                            app.dialog.alert("Guardado Correctamente", "Aviso");
                            // preloader.hide();
                            // $("#modalTemplate").modal("hide");
                            $(".sheet-close").trigger("click");
                            verPerfilMascota(localStorage.getItem("IDMascota"));
                        }
                        break;
                    case false:
                        // preloader.hide();
                        app.dialog.alert("Algo salió mal", "Aviso");
                        break;
                }
            }
        })
        .catch((error) => {
            // preloader.hide();
            app.dialog.alert("Algo salió mal", "Aviso");
            // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            console.error("Ocurrio un error : " + error);
        })
        .finally();
}

function verPerfilMascota(ID) {
    let url = localStorage.getItem("url");
    // axios
    //     .post(url + "Brummy/views/mascotas/obtenerMascota.php", { ID })
    //     .then(function (response) {
    //         console.log(response);
    //         if (response.status === 200) {
    //             let result = response.data.result;
    //             let html = "";
    //             let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
    //             let nombreMascota, fechaMascota, relacionEspecie, sexoMascota, colorMascota, rasgosMascota, FK_dueno;
    //             if (result == "Sin Datos") {
    //                 // Swal.fire({ icon: "warning", title: "Sin datos.", text: "" });
    //                 app.dialog.alert("Sin datos.", "Aviso");
    //             } else {
    //                 result.forEach((data, index) => {
    //                     // console.table(data);
    //                     nombreMascota = data.nombre;
    //                     fechaMascota = data.fechaNacimiento;
    //                     relacionEspecie = `${data.especie} - ${data.raza}`;
    //                     sexoMascota = data.sexo;
    //                     colorMascota = data.color ? data.color : tdSinData;
    //                     rasgosMascota = data.rasgosParticulares ? data.rasgosParticulares : tdSinData;
    //                     FK_dueno = data.NombreCliente;
    //                 });
    //                 // traerHistorialMascota(ID);
    //                 $("#nombreMascota").html(nombreMascota);
    //                 $("#fechaMascota").html(fechaMascota);
    //                 $("#relacionEspecie").html(relacionEspecie);
    //                 $("#sexoMascota").html(sexoMascota);
    //                 $("#colorMascota").html(colorMascota);
    //                 $("#rasgosMascota").html(rasgosMascota);
    //                 $("#FK_dueno").html(FK_dueno);
    //                 btn_edit_mascota = `<button
    //                                     class="button button-outline button-round btnBlue"
    //                                     onclick='editarMascota(${JSON.stringify(result)});'
    //                                 >
    //                                     Editar <span class="material-icons iconBtn"> edit </span>
    //                                 </button>`;

    //                 $("#btn_editar_mascota").html(btn_edit_mascota);
    //             }
    //             app.dialog.close();
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //         app.dialog.close();
    //         app.dialog.alert("Algo salió mal", "Aviso");
    //     })
    //     .finally(function () {
    //         // siempre sera ejecutado
    //     });

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/mascotas/obtenerMascota.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        // Swal.fire({ icon: "warning", title: "Sin datos.", text: "" });
                        app.dialog.alert("Sin datos.", "Aviso");
                    } else {
                        let html = "";
                        let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
                        result.forEach((data, index) => {
                            // console.table(data);
                            nombreMascota = data.nombre;
                            fechaMascota = data.fechaNacimiento;
                            relacionEspecie = `${data.especie} - ${data.raza}`;
                            sexoMascota = data.sexo;
                            colorMascota = data.color ? data.color : tdSinData;
                            rasgosMascota = data.rasgosParticulares ? data.rasgosParticulares : tdSinData;
                            FK_dueno = data.NombreCliente;
                        });
                        // traerHistorialMascota(ID);
                        $("#nombreMascota").html(nombreMascota);
                        $("#fechaMascota").html(fechaMascota);
                        $("#relacionEspecie").html(relacionEspecie);
                        $("#sexoMascota").html(sexoMascota);
                        $("#colorMascota").html(colorMascota);
                        $("#rasgosMascota").html(rasgosMascota);
                        $("#FK_dueno").html(FK_dueno);
                        btn_edit_mascota = `<button class="button button-outline button-round btnBlue"
                            onclick='editarMascota(${JSON.stringify(result)});'>
                                Editar <span class="material-icons iconBtn"> edit </span>
                            </button>`;

                        $("#btn_editar_mascota").html(btn_edit_mascota);
                    }
                    app.dialog.close();

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

function crearComentarioMascota() {
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
                                                        <div class="item-title item-floating-label">Comentario:</div>
                                                        <div class="item-input-wrap">
                                                            <textarea class="floating obligatorio input-focused " name="Contenido Comentario" class="input capitalize obligatorio" id="contenido_comentario" cols="30" rows="10"></textarea>
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                            
                                    <button class="button button-outline button-round" onclick="guardarComentario()">
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

function guardarComentario() {
    const ID_MASCOTA = localStorage.getItem("IDMascota");
    const FK_dueno = localStorage.getItem("FK_dueno");
    const contenido_comentario = $("#contenido_comentario").val();

    if (!contenido_comentario) {
        msj.show("Aviso", "El campo de comentarios no puede estar vacío.", [{ text1: "OK" }]);
        return false;
    }

    let arr_data = {
        ID_MASCOTA: ID_MASCOTA,
        contenido_comentario: contenido_comentario,
        FK_dueno: FK_dueno,
    };

    // preloader.show();

    let url = localStorage.getItem("url");
    axios
        .post(url + "Brummy/views/mascotas/guardarComentario.php", { arr_data: arr_data })
        .then((response) => {
            if (response.status == 200) {
                let success = response.data.success;
                let result = response.data.result;

                switch (success) {
                    case true:
                        if (result == "error_execute_query") {
                        } else {
                            msj.show("Aviso", "Se registro el comentario correctamente", [{ text1: "OK" }]);
                            // preloader.hide();
                            // $("#modalTemplate").modal("hide");
                            $(".sheet-close").trigger("click");
                            obtenerComentarios();
                        }
                        break;

                    case false:
                        // preloader.hide();
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        break;

                    default:
                        // ocurrio algo raro
                        break;
                }
            }
        })
        .catch((error) => {
            // preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            console.error("Ocurrio un error : " + error);
        })
        .finally(() => {
            // siempre se ejecuta
        });
}

function obtenerComentarios() {
    let id_mascota = localStorage.getItem("IDMascota");
    let url = localStorage.getItem("url");
    axios
        .post(url + "Brummy/views/mascotas/obtenerComentarios.php", { ID: id_mascota })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                let success = response.data.success;
                let result = response.data.result;

                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                            $("#content_comentario").html("");
                        } else {
                            let template_comentario = "";
                            result.forEach((data, index) => {
                                template_comentario += `
                                <div class="card_comentario">
                                    <div class="container_comentario">
                                        <div class="left">
                                            <div class="status-ind"></div>
                                        </div>
                                        <div class="right">
                                            <div class="text-wrap">
                                                <p class="text-content">
                                                    <a class="">${data.redaccion}</a>
                                                </p>
                                                <p class="time">${data.fecha_comentario_up}</p>
                                                <p class="time">${data.nombre_completo_up}</p>
                                            </div>
                                            <div class="button-wrap">
                                                <button class="primary-cta" onClick ="eliminarComentarioMascota(${data.ID})" >Eliminar</button>
                                                <button class="secondary-cta" onClick ='editarComentarioMascota(${data.ID} , ${JSON.stringify(
                                    data.redaccion
                                )})' >Editar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                            });

                            $("#content_comentario").html(template_comentario);
                        }
                        break;
                    case false:
                        // preloader.hide();
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        break;
                }
            }
        })
        .catch((error) => {
            // preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            console.error("Ocurrio un error : " + error);
        })
        .finally(() => {
            // siempre sera ejecutado
        });
}

function editarComentarioMascota(id_comentario, comentario_mascota) {
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
                                                <li class="item-content item-input item-input-outline ${
                                                    comentario_mascota ? "item-input-focused" : ""
                                                }">
                                                    <div class="item-inner">
                                                        <div class="item-title item-floating-label">Comentario:</div>
                                                        <div class="item-input-wrap">
                                                            <textarea class="floating obligatorio input-focused ${
                                                                comentario_mascota ? "input-with-value input-focused item-input-outline" : ""
                                                            }" name="Contenido Comentario" class="input capitalize obligatorio" id="contenido_comentario_update" cols="30" rows="10">${comentario_mascota}</textarea>
                                                            <span class="input-clear-button"></span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                            
                                    <button class="button button-outline button-round" onclick="actualizarComentarioMascota(${id_comentario})">
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

function actualizarComentarioMascota(id_comentario) {
    let comentario_act = $("#contenido_comentario_update").val();

    const arr_data = {
        comentario_act: comentario_act,
        id_comentario: id_comentario,
    };

    let url = localStorage.getItem("url");

    axios
        .post(url + "Brummy/views/mascotas/actualizarComentarioMascota.php", { arr_data: arr_data })
        .then((response) => {
            if (response.status == 200) {
                let success = response.data.success;
                let result = response.data.result;

                switch (success) {
                    case true:
                        if (result) {
                            if (result == "error_execute_query") {
                            } else {
                                msj.show("Aviso", "Se Actualizo el comentario correctamente", [{ text1: "OK" }]);
                                // preloader.hide();
                                // $("#modalTemplate").modal("hide");
                                $(".sheet-close").trigger("click");
                                obtenerComentarios();
                            }
                        }

                        break;
                    case false:
                        break;

                    default:
                        break;
                }
            }
        })
        .catch((error) => {
            // preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            console.error("Ocurrio un error : " + error);
        })
        .finally(() => {});
}

function eliminarComentarioMascota(id_comentario) {
    // preloader.show();
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
                        const FK_dueno = localStorage.getItem("FK_dueno");

                        const arr_data = {
                            FK_dueno: FK_dueno,
                            id_comentario: id_comentario,
                        };

                        axios
                            .post(url + "Brummy/views/mascotas/eliminarComentarioMascota.php", { arr_data: arr_data })
                            .then((response) => {
                                if (response.status == 200) {
                                    let success = response.data.success;
                                    let result = response.data.result;
                                    switch (success) {
                                        case true:
                                            console.info(2);
                                            if (result == "error_execute_query") {
                                            } else {
                                                msj.show("Aviso", "Se elimino el comentario correctamente", [{ text1: "OK" }]);
                                                // preloader.hide();
                                                obtenerComentarios();
                                            }
                                            break;
                                        case false:
                                            // preloader.hide();
                                            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })
                            .catch((error) => {
                                // preloader.hide();
                                msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                                console.error("Ocurrio un error : " + error);
                            })
                            .finally(() => {});
                    },
                },
            ],
        })
        .open();
}
