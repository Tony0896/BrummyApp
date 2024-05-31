function obtenerMascotas() {
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
                    let html;
                    let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
                    result.forEach((data, index) => {
                        html += `<tr>
                            <td>${index + 1}</td>
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
                                    <button class="button button-outline button-round btnGreen" onclick="verMascota(${data.ID})">
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
                                            <div class="swipe-handler"> <h1 class="link sheet-close" style="text-align: end;margin-right: 15px;display: block;margin-top: 10px;"> 
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

        axios
            .post(url + "Brummy/views/mascotas/guardarMascota.php", {
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
            })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    $(".sheet-close").trigger("click");
                    app.dialog.alert("Guardado correctamente", "Aviso");
                    obtenerMascotas();
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

function verMascota(ID) {
    localStorage.setItem("IDMascota", ID);
    let name = "perfilMascota";
    app.views.main.router.navigate({ name: name });
}

function regresaMascotas() {
    app.views.main.router.back();
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
                        axios
                            .post(url + "Brummy/views/mascotas/eliminarMascota.php", {
                                ID,
                            })
                            .then(function (response) {
                                console.log(response);
                                if (response.status === 200) {
                                    app.dialog.alert("Eliminado correctamente", "Aviso");
                                    regresaMascotas();
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
