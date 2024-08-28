document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);

    document.addEventListener(
        "backbutton",
        function (e) {
            try {
                let length = app.views.main.router.history.length;
                if (length > 1) {
                    app.views.main.router.history.pop();
                    let path = app.views.main.router.history.pop();
                    if (path) {
                        if (path == "/android_asset/www/index.html") {
                            window.location.href = "index.html";
                        } else {
                            app.views.main.router.navigate(path);
                        }
                    }
                } else {
                    e.preventDefault();
                    app.dialog
                        .create({
                            title: "¿Deseas salir de la aplicación?",
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
                                        navigator.app.exitApp();
                                    },
                                },
                            ],
                        })
                        .open();
                }
            } catch (error) {}
        },
        false
    );

    // console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
    // document.getElementById("deviceready").classList.add("ready");
    StatusBar.styleLightContent();
    let Usuario = localStorage.getItem("Usuario");
    localStorage.setItem("version", "1.0.0");
    let url = "http://192.168.100.4:8080/";
    localStorage.setItem("url", url);
    if (Usuario) {
        pintaMenu();
    } else {
        pintaLogin();
    }

    let toastOffline = app.toast.create({ text: "Sin Conexión a internet", closeTimeout: 2600 });

    function networkInfo() {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = "Unknown connection";
        states[Connection.ETHERNET] = "Ethernet connection";
        states[Connection.WIFI] = "WiFi connection";
        states[Connection.CELL_2G] = "Cell 2G connection";
        states[Connection.CELL_3G] = "Cell 3G connection";
        states[Connection.CELL_4G] = "Cell 4G connection";
        states[Connection.CELL] = "Cell generic connection";
        states[Connection.NONE] = "No network connection";
        alert("Connection type: " + states[networkState]);
    }

    function onOffline() {
        StatusBar.backgroundColorByHexString("#CB4335");
        StatusBar.styleLightContent();
        toastOffline.open();
    }

    function onOnline() {
        StatusBar.styleLightContent();
        StatusBar.backgroundColorByHexString("#009071");
        // alert("You are now online!");
    }

    setTimeout(() => {
        StatusBar.styleLightContent();
    }, 800);

    if (typeof String.prototype.replaceAll === "undefined") {
        String.prototype.replaceAll = function (match, replace) {
            return this.replace(new RegExp(match, "g"), () => replace);
        };
    }
}

function globalBack() {
    let length = app.views.main.router.history.length;
    if (length > 1) {
        app.views.main.router.history.pop();
        let path = app.views.main.router.history.pop();
        if (path) {
            if (path == "/android_asset/www/index.html") {
                window.location.href = "index.html";
            } else {
                app.views.main.router.navigate(path);
            }
        }
    }
}

function cerrarSesion() {
    localStorage.removeItem("Usuario");
    window.location.href = "index.html";
}

function pintaMenu() {
    let version = localStorage.getItem("version");
    $("#app").html(`
        <div class="panel panel-right panel-cover panel-resizable">
            <div class="block">
                <p style="text-align: center;"><a href="#" onclick="return: false;"> Versión ${version} </a></p>
                <p style="text-align: center;"><a href="#" onclick="cerrarSesion();" style="color: #FF0037;"> Cerrar Sesión </a></p>
            </div>
        </div>
        <div class="view view-main view-init">
            <div class="page animate__animated animate__slideInRight" id="panel-page">
                <div class="navbar" style="height: 5px">
                    <div class="left top-left" style="justify-content: space-between;background-color: #009071;flex-direction: column;height: auto;min-height: 50px;">
                        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;margin-top: 10px;">
                            <div style="width: 33.3%"> &nbsp; </div>
                            <div class="title" style="font-size: 18px;margin-left: 15px;width: 33.3%;text-align: center">Bienvenido</div>
                            <div style="width: 33.3%;text-align: end;">
                                <a class="panel-open" href="#" data-panel="right">
                                    <i class="icon material-icons md-only" style="margin-right: 15px;"> menu </i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="marquee_index" style="background-color: #009071;"></div> 
                </div>
                
                <div class="page-content grid-demo">
                    <div class="block">
                        <div class="row">
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="dashboard_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> dashboard </i>
                                <p style="margin: 8px;"> Métricas </p>
                            </div>
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="apps_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> apps </i>
                                <p style="margin: 8px;"> Catálogos </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="paid_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> paid </i>
                                <p style="margin: 8px;"> Venta </p>
                            </div>
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="people_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> people </i>
                                <p style="margin: 8px;"> Clientes </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="pets_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> pets </i>
                                <p style="margin: 8px;"> Mascotas </p>
                            </div>
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="event_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> event </i>
                                <p style="margin: 8px;"> Citas </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="inventory_2_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> inventory_2 </i>
                                <p style="margin: 8px;"> Inventario </p>
                            </div>
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="grade_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;">  grade  </i>
                                <p style="margin: 8px;"> Encuestas </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="bar_chart_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;">  bar_chart  </i>
                                <p style="margin: 8px;"> KPI Satisfacción </p>
                            </div>
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="campaign_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;">  campaign  </i>
                                <p style="margin: 8px;"> Avisos </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="store_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;">  store  </i>
                                <p style="margin: 8px;"> Perfil Veterinaria </p>
                            </div>
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="person_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;">  person  </i>
                                <p style="margin: 8px;"> Clientes Frecunetes </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="travel_explore_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> travel_explore </i>
                                <p style="margin: 8px;"> Portal </p>
                            </div>
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="settings_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> settings </i>
                                <p style="margin: 8px;"> Configuración </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);

    StatusBar.styleLightContent();
    cargaDataMarquee("marquee_index");
}

function pintaLogin() {
    $("#app").html(`
        <div class="page animate__animated animate__slideInRight" id="panel-page" style="background-color: #009071; background: #009071">
            <div class="container-login100" id="bodyLogin">
                <div class="wrap-login100">
                    <div style="text-align: center; padding-bottom: 25px; width: 100%; padding-top: 25px">
                        <img src="img/logoLogin.png" height="150px" alt="Logo CISA" id="img_logo" />
                    </div>
                    <form method="post" class="login100-form validate-form" id="formulario">
                        <div class="wrap-input100 validate-input m-b-18">
                            <input class="input100" type="text" name="nombre" id="nombre" placeholder="Usuario" required />
                            <input type="hidden" id="id_user" />
                        </div>

                        <div class="wrap-input100 validate-input m-b-18">
                            <div style="position: relative">
                                <input class="input100" type="password" name="contra" id="contra" placeholder="Contraseña" required />
                                <i
                                    style="position: absolute; top: 30%; right: 7px; font-size: 29px; color: gray"
                                    class="bi bi-eye-slash"
                                    id="togglePassword"
                                ></i>
                            </div>
                        </div>

                        <div class="container-login100-form-btn">
                            <br />
                            <a onclick="iniciaSesion()" class="login100-form-btn" style="text-decoration: none">Ingresar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `);

    StatusBar.styleLightContent();
}

function iniciaSesion() {
    localStorage.setItem("Usuario", "Usuario");
    window.location.href = "index.html";
}

function moveMenu(id) {
    let name = String(id).replace("_menu", "");
    app.views.main.router.navigate({ name: name });
}

function dataTableCreate(flag) {
    if (flag) {
        if (flag == 1) {
            $(".datatable")
                .DataTable({
                    responsive: true,
                    language: {
                        lengthMenu: "_MENU_ registros por pagina",
                        zeroRecords: "No hay resultados",
                        info: "Pagina _PAGE_ de _PAGES_",
                        infoEmpty: "No hay registros disponibles",
                        infoFiltered: "(Mostrar _MAX_ registros)",
                        paginate: {
                            previous: "‹-",
                            next: "-›",
                        },
                        aria: {
                            paginate: {
                                previous: "Previous",
                                next: "Next",
                            },
                        },
                        search: "Buscar",
                    },
                    order: [[0, "desc"]],
                })
                .draw();
        }
    } else {
        $(".datatable")
            .DataTable({
                responsive: true,
                language: {
                    lengthMenu: "_MENU_ registros por pagina",
                    zeroRecords: "No hay resultados",
                    info: "Pagina _PAGE_ de _PAGES_",
                    infoEmpty: "No hay registros disponibles",
                    infoFiltered: "(Mostrar _MAX_ registros)",
                    paginate: {
                        previous: "‹-",
                        next: "-›",
                    },
                    aria: {
                        paginate: {
                            previous: "Previous",
                            next: "Next",
                        },
                    },
                    search: "Buscar",
                },
                order: [[0, "asc"]],
            })
            .draw();
    }

    $(".paginate_button.current").attr("style", "color: #FFF ! important");
}

function dataTableDestroy() {
    $(".datatable").DataTable().destroy();
}

function get_datos_completos(form) {
    let campos;
    let trae_los_campos_sin_llennar = [];
    campos = document.querySelectorAll("#" + form + " .obligatorio");
    let valido = true;

    [].slice.call(campos).forEach(function (campo) {
        if ($(campo).get(0).tagName == "SELECT") {
            if (campo.value.trim() == 0 || campo.value.trim() == "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        } else if ($(campo).get(0).tagName == "TEXTAREA") {
            if (campo.value.trim() === "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        } else if ($(campo).get(0).tagName == "DIV") {
        } else {
            if (campo.value.trim() === "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        }
    });

    if (valido) {
        return {
            valido: valido,
            reponse: 1,
        };
    } else {
        return {
            valido: valido,
            response: trae_los_campos_sin_llennar,
        };
    }
}

function capitalizeLetras(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function genRandom() {
    const digitHundreds = Math.floor(Math.random() * 900) + 1;
    let digitTens = Math.floor(Math.random() * 9);
    if (digitTens >= digitHundreds) digitTens++;
    let digitUnits = Math.floor(Math.random() * 8);
    if (digitUnits >= digitHundreds || digitUnits >= digitTens) digitUnits++;
    if (digitUnits >= digitHundreds && digitUnits >= digitTens) digitUnits++;
    return digitHundreds * 100 + digitTens * 10 + digitUnits;
}

function FormatDate(fecha) {
    let n = "";
    if (String(fecha).includes("00:00:00")) {
        n = new Date(fecha);
    } else {
        n = new Date(fecha + " 00:00:00");
    }

    n = String(n.toLocaleString("es-CL")).split(",")[0];
    console.log(n);
    return n;
}

function volteaFecha(fecha, tipo) {
    if (tipo == 1) {
        //? recibe 2024-04-27 => 27-04-2024
        let anio = fecha.split("-")[0];
        let mes = fecha.split("-")[1];
        let day = fecha.split("-")[2];

        let nuevaFecha = day + "-" + mes + "-" + anio;
        return nuevaFecha;
    } else if (tipo == 2) {
        //? recibe 27-04-2024 => 2024-04-27
        let anio = fecha.split("-")[2];
        let mes = fecha.split("-")[1];
        let day = fecha.split("-")[0];

        let nuevaFecha = anio + "-" + mes + "-" + day;
        return nuevaFecha;
    }
}

function obtenerFechaLarga(date) {
    //* ejemplo se recibe 14-06-2024 o 2024-06-14
    //* y devuelve '14 de junio de 2024'

    let nuevaFecha = new Date(date);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return nuevaFecha.toLocaleDateString("es-MX", options);
}

function getDateWhitZeros() {
    let MyDate = new Date();
    let MyDateString =
        MyDate.getFullYear() +
        "-" +
        ("0" + (MyDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + MyDate.getDate()).slice(-2) +
        " " +
        ("0" + MyDate.getHours()).slice(-2) +
        ":" +
        ("0" + MyDate.getMinutes()).slice(-2) +
        ":" +
        ("0" + MyDate.getSeconds()).slice(-2);
    return MyDateString;
}

function dataTableCreateDes() {
    $(".datatable")
        .DataTable({
            responsive: true,
            language: {
                lengthMenu: "_MENU_ registros por pagina",
                zeroRecords: "No hay resultados",
                info: "Pagina _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(Mostrar _MAX_ registros)",
                paginate: {
                    previous: "‹",
                    next: "›",
                },
                aria: {
                    paginate: {
                        previous: "Previous",
                        next: "Next",
                    },
                },
                search: "Buscar",
            },
            order: [[0, "desc"]],
        })
        .draw();
}

function cargaDataMarquee(idMarquee) {
    console.log(idMarquee);
    let url = localStorage.getItem("url");

    $.ajax({
        method: "POST",
        dataType: "json",
        url: url + "Brummy/views/avisos/obtenerAvisosToday.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let htmlAviso = "",
                html;
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        html = `<marquee class="card2"><p class="p_marquee" style="padding-bottom: 1px;margin-bottom: 0;color: #FFF;font-size: 17px;font-weight: bold;margin-top: 0;">&nbsp;</p></marquee>`;
                        $("#" + idMarquee).html(html);
                        $(".page-content > .block").css("padding-top", "35px");
                    } else {
                        results.forEach((data, index) => {
                            htmlAviso += data.aviso + `&emsp;- -&emsp;`;
                        });

                        htmlAviso = String(htmlAviso).slice(0, -9);
                        html = `<marquee class="card2"><p class="p_marquee" style="padding-bottom: 1px;margin-bottom: 0;color: #FFF;font-size: 17px;font-weight: bold;margin-top: 0;">${htmlAviso}</p></marquee>`;
                        $("#" + idMarquee).html(html);
                        $(".page-content > .block").css("padding-top", "35px");
                    }
                    break;
                case false:
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

const msj = function () {};

msj.show = function (title, subtile, buttons) {
    app.dialog.alert(subtile, title);
};

function CantidadConCommas(valor) {
    let retorno = 0;
    if (String(valor).includes(".")) {
        let newValor = valor.split(".");
        valor = String(newValor[0]).replaceAll(",", "");
        let newValor2 = numberWithCommas(valor);
        retorno = newValor2 + "." + newValor[1];
    } else {
        valor = String(valor).replaceAll(",", "");
        let newValor = numberWithCommas(valor);
        retorno = newValor;
    }

    return retorno;
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getCitasPorConfirmar() {
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url + "Brummy/views/login/getCitasPorConfirmar.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        $("#bodyCitasConfirmarDashbora").html(html);
                        getCitasPorConfirmarMes();
                    } else {
                        results.forEach((data, index) => {
                            // console.log(data);
                            html += `
                                <tr>
                                    <td>${data.nombreCliente}</td>
                                    <td>${data.nombreMascota}</td>
                                    <td>${volteaFecha(data.fechaRecurrenca, 1)}</td>
                                    <td>
                                        <div class="my-0" style="display: flex;"> 
                                            <button class="button button-outline button-round btnGreen" onclick="generarCitaPropuesta(${data.ID_mov}, 
                                                '${volteaFecha(data.fechaRecurrenca, 1)}', 
                                                '${data.fechaRecurrenca}', 
                                                '${data.tipoRecurrencia}',
                                                ${data.ID})" >
                                                <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> date_range </span>
                                            </button>

                                            <button class="button button-outline button-round btnRed" onclick="EliminarCitaPropuesta(${
                                                data.ID
                                            })" style="margin-left: 15px;margin-right: 10px;">
                                                    <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> delete </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        });
                        $("#bodyCitasConfirmarDashbora").html(html);
                        getCitasPorConfirmarMes();
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function getCitasPorConfirmarMes() {
    let url = localStorage.getItem("url");
    let fecha = getDateActual();
    fecha = moment(fecha).add(Number(5), "days").format("YYYY-MM-DD");
    $.ajax({
        method: "POST",
        dataType: "json",
        url: url + "Brummy/views/login/getCitasPorConfirmarMes.php",
        data: { fecha },
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        // $("#bodyCitasConfirmarDashbora").html(html);
                        dataTableDestroy();
                        dataTableCreate();
                    } else {
                        results.forEach((data, index) => {
                            let fecha = data.fechaRecurrenca;
                            let nombreCliente = data.nombreCliente;
                            let nombreMascota = data.nombreMascota;
                            let ID_mov = data.ID_mov;
                            let fechaRecurrenca = data.fechaRecurrenca;
                            let tipoRecurrencia = data.tipoRecurrencia;
                            let ID = data.ID;

                            validaFechasConfirmar(fecha, nombreCliente, nombreMascota, ID_mov, fechaRecurrenca, tipoRecurrencia, ID);
                        });
                        // $("#bodyCitasConfirmarDashbora").append(html);
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function validaFechasConfirmar(fecha, nombreCliente, nombreMascota, ID_mov, fechaRecurrenca, tipoRecurrencia, ID) {
    console.log(fecha, nombreCliente, nombreMascota, ID_mov, fechaRecurrenca, tipoRecurrencia, ID);
    // let html = "";
    // // console.log(tipoRecurrencia);
    // if (tipoRecurrencia == 30) {
    //     fecha = moment(fecha).add(Number(1), "months").format("YYYY-MM-DD");
    // } else if (tipoRecurrencia == 14) {
    //     fecha = moment(fecha).add(Number(2), "weeks").format("YYYY-MM-DD");
    // } else if (tipoRecurrencia == 7) {
    //     fecha = moment(fecha).add(Number(1), "weeks").format("YYYY-MM-DD");
    // } else {
    //     fecha = moment(fecha).add(Number(1), "years").format("YYYY-MM-DD");
    // }

    // // console.log(fecha);
    // if (fecha >= getDateActual()) {
    //     // console.log("gg1");
    //     let start = moment(getDateActual(), "YYYY-MM-DD");
    //     let end = moment(fecha, "YYYY-MM-DD");

    //     //Difference in number of days
    //     let days = moment.duration(end.diff(start)).asDays();
    //     // console.log(days);
    //     if (days >= 0 && days <= 3) {
    //         // console.log("mostrar");
    //         dataTableDestroy();
    //         html = `
    //             <tr>
    //                 <td>${nombreCliente}</td>
    //                 <td>${nombreMascota}</td>
    //                 <td>${volteaFecha(fecha, 1)}</td>
    //                 <td>
    //                     <div class="my-0" style="display: flex;">
    //                         <button class="button button-outline button-round btnGreen" onclick="generarCitaPropuesta(${ID_mov},
    //                             '${volteaFecha(fechaRecurrenca, 1)}',
    //                             '${fechaRecurrenca}',
    //                             '${tipoRecurrencia}',
    //                             ${ID})" >
    //                             <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> date_range </span>
    //                         </button>

    //                         <button class="button button-outline button-round btnRed" onclick="EliminarCitaPropuesta(${ID})" style="margin-left: 15px;margin-right: 10px;">
    //                                 <span class="material-icons iconBtn" style="margin: auto;vertical-align: middle;"> delete </span>
    //                         </button>
    //                     </div>
    //                 </td>
    //             </tr>
    //         `;
    //         $("#bodyCitasConfirmarDashbora").append(html);
    //         dataTableCreate();
    //     } else {
    //         // console.log("no mostrar");
    //     }
    // } else {
    //     // console.log("gg2");
    //     let start = moment(getDateActual(), "YYYY-MM-DD");
    //     let end = moment(fecha, "YYYY-MM-DD");

    //     //Difference in number of days
    //     let days = moment.duration(end.diff(start)).asDays();
    //     // console.log(days);
    //     validaFechasConfirmar(end, nombreCliente, nombreMascota, ID_mov, fechaRecurrenca, tipoRecurrencia, ID);
    // }
}

function getDateActual() {
    let fecha_actual_val = new Date();

    const year = fecha_actual_val.getFullYear();
    const month = String(fecha_actual_val.getMonth() + 1).padStart(2, "0");
    const day = String(fecha_actual_val.getDate()).padStart(2, "0");

    let fecha_actual_format = `${year}-${month}-${day}`;
    return fecha_actual_format;
}

function generarCitaPropuesta(ID, fechaPropuesta, fechaRecurrenca, tipoRecurrencia, IDRec) {
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/citas/generarCitaPropuesta.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "No se encontró información para generar la cita.", [{ text1: "OK" }]);
                        // preloader.hide();
                    } else {
                        let nombreCita = "",
                            nombreMascota = "",
                            motivoCita = "",
                            domicilio = "",
                            FKnombreCita = "",
                            FKMascota = "",
                            FKMotivoCita = "";
                        result.forEach((data, index) => {
                            console.log(data);
                            nombreCita = data.nombreCita;
                            nombreMascota = data.nombreMascota;
                            motivoCita = data.motivoCita;
                            domicilio = data.Flagdomicilio;
                            FKnombreCita = data.FKnombreCita;
                            FKMascota = data.FKnombreMascota;
                            FKMotivoCita = data.FKMotivo;
                        });

                        $("#labelModal").html(`Crear Nueva Cita`);

                        $("#body_modal").html(`<br>
                            <div id="nuevaCita">
                                <div class="coolinput">
                                    <label for="nombreCitainput" class="text">Cliente: </label>
                                    <input name="Cliente" type="text" class="input obligatorio" id="nombreCitainput" autocomplete="off" readonly/>
                                    <input type="hidden" id="nombreCita">
                                </div>

                                <div class="coolinput">
                                    <label for="nombreMascota" class="text">Mascota: </label>
                                    <input name="Mascota" type="text" class="input obligatorio" id="nombreMascotaInput" autocomplete="off" readonly/>
                                    <input type="hidden" id="nombreMascota">
                                </div>

                                <div class="coolinput">
                                    <label for="fechaCita" class="text">Fecha:</label>
                                    <!-- <input name="Fecha" type="date" class="input obligatorio" id="fechaCita" autocomplete="off" maxlength"50"/> -->
                                    <input name="Fecha" type="text" class="input obligatorio" id="fechaCita" autocomplete="off" />
                                </div>

                                <div class="coolinput">
                                    <label for="horaCita" class="text">Hora:</label>
                                    <!-- <input name="Hora" type="time" class="input obligatorio" id="horaCita" autocomplete="off" maxlength"50"/> -->
                                    <input type="text" name="Hora" class="input obligatorio" id="horaCita" autocomplete="off"/>
                                </div>

                                <div class="coolinput">
                                    <label for="motivoCita" class="text">Motivo de Cita:</label>
                                    <input name="Motivo Cita" type="text" class="input obligatorio" id="motivoCitaInput" autocomplete="off" readonly/>
                                    <input type="hidden" id="motivoCita">
                                </div>

                                <div class="coolinput">
                                    <label for="comentariosCita" class="text">Comentarios:</label>
                                    <input name="Comentarios" type="text" class="input capitalize" id="comentariosCita" autocomplete="off" maxlength"50"/>
                                </div>

                                <div class="checkbox-wrapper-46" style="margin: 22px 0px 12px 8px;">
                                    <input type="checkbox" id="cbx-46" class="inp-cbx" onchange="muestraDomicilio1()"/>
                                    <label for="cbx-46" class="cbx">
                                        <span style="transform: scale(1.3);">
                                            <svg viewBox="0 0 12 10" height="10px" width="12px">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span>¿Es Servicio a domicilio?</span>
                                    </label>
                                </div>

                                <div id="div_servicioDomicilio" style="display: none;padding: 15px 10px 25px;margin: 10px 0px;" class="card2">
                                    <div class="coolinput">
                                        <label name="Calle" for="direccionVete" class="text">Calle</label>
                                        <input name="Calle" type="text" class="input capitalize" id="calleDomi_input" autocomplete="off" />
                                    </div>
                                    <div style="display:flex; flex-direction: row;">
                                        <div class="coolinput">
                                            <label name="Número" for="direccionVete" class="text">Número</label>
                                            <input name="Número" type="text" class="input capitalize" id="numeroDomi_input" autocomplete="off" />
                                        </div>
                                        <div class="coolinput" style="margin-left: 20px;">
                                            <label name="C.P." for="direccionVete" class="text">C.P.</label>
                                            <input name="C.P." type="text" class="input capitalize" id="cpDomi_input" autocomplete="off" />
                                        </div>
                                    </div>
                                    <div class="coolinput">
                                        <label name="Col." for="direccionVete" class="text">Col.</label>
                                        <input name="Col." type="text" class="input capitalize" id="colDomi_input" autocomplete="off" />
                                    </div>
                                    <div class="coolinput">
                                        <label name="Municipio" for="direccionVete" class="text">Municipio/Alcaldía</label>
                                        <input name="Municipio" type="text" class="input capitalize" id="municipioDomi_input" autocomplete="off" />
                                    </div>
                                    <div class="coolinput">
                                        <label name="Estado" for="direccionVete" class="text">Estado</label>
                                        <input name="Estado" type="text" class="input capitalize" id="estadoDomi_input" autocomplete="off" />
                                    </div>
                                </div>

                                <input type="hidden" id="fechaRecurrenca">
                                <input type="hidden" id="eachRecurrencia">
                            </div>

                            <div class="center-fitcomponent" style="width: 100%;">
                                <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" id="btnGuardarCita">
                                    <span class="text-sm mb-0 span-buttom"> 
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>
                        `);

                        $("#modalTemplate").modal({
                            backdrop: "static",
                            keyboard: false,
                        });

                        $("#modalTemplate").modal("show");

                        $("#btnClose").on("click", () => {
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                        });

                        $("#nombreCitainput").val(nombreCita);
                        $("#nombreMascota").val(FKMascota);
                        $("#nombreMascotaInput").val(nombreMascota);
                        $("#motivoCitaInput").val(motivoCita);
                        $("#motivoCita").val(FKMotivoCita);
                        $("#nombreCita").val(FKnombreCita);
                        $("#fechaRecurrenca").val(fechaRecurrenca);
                        $("#eachRecurrencia").val(tipoRecurrencia);

                        if (domicilio == 1) {
                            $("#cbx-46").prop("checked", true);
                            muestraDomicilio1();
                        }

                        $("#horaCita").mdtimepicker({
                            timeFormat: "hh:mm:ss", // format of the time value (data-time attribute)
                            format: "hh:mm", // format of the input value
                            theme: "blue", // theme of the timepicker
                            clearBtn: true, // determines if clear button is visible
                            is24hour: true, // determines if the clock will use 24-hour format in the UI; format config will be forced to `hh:mm` if not specified
                        });

                        $("#fechaCita").val(fechaPropuesta);
                        $("#fechaCita").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });

                        $("#btnGuardarCita").click(() => {
                            validacioesCita1(IDRec);
                        });

                        // preloader.hide();
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

function EliminarCitaPropuesta(IDRec) {
    app.dialog
        .create({
            title: "¿Estás seguro de querer eliminar las propuestas de citas recurrentes definitivamente de este ciiente?",
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
                        cambiaEstatusCitaRecurente(IDRec, 0, 0);
                    },
                },
            ],
        })
        .open();
}

function cambiaEstatusCitaRecurente(IDRec, agendada, tipoRecurrencia) {
    let url = localStorage.getItem("url");
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: url + "Brummy/views/citas/cambiaEstatusCitaRecurente.php",
        data: {
            IDRec,
            agendada,
            tipoRecurrencia,
        },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    // preloader.hide();
                    getCitasPorConfirmar();
                    break;
                case false:
                    // preloader.hide();
                    // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // preloader.hide();
            // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function muestraDomicilio1() {
    if ($("#cbx-46").prop("checked")) {
        $("#div_servicioDomicilio").css("display", "block");
        getDireecionCliente($("#nombreCita").val());
    } else {
        $("#div_servicioDomicilio").css("display", "none");
    }
}
function validacioesCita1(IDRec) {
    let valido = true;
    let fecha_actual_val = new Date();

    const year = fecha_actual_val.getFullYear();
    const month = String(fecha_actual_val.getMonth() + 1).padStart(2, "0");
    const day = String(fecha_actual_val.getDate()).padStart(2, "0");

    let fecha_actual_format = `${year}-${month}-${day}`;

    if (valido) {
        // preloader.show();
        let fechaCita = volteaFecha($("#fechaCita").val(), 2);
        let horaCita = $("#horaCita").val();

        if (fechaCita < fecha_actual_format) {
            console.log("La fecha seleccionada es menor a la actual");
            msj.show("Aviso", "La fecha de la cita no puede ser menor a la actual", [{ text1: "OK" }]);
            // preloader.hide();
            return false;
        }

        if (!horaCita) {
            msj.show("Aviso", "Debes indicar la hora de la cita", [{ text1: "OK" }]);
            // preloader.hide();
            return false;
        }

        if ($("#cbx-46").prop("checked")) {
            let calleDomi = String($("#calleDomi_input").val()).trim();
            let numeroDomi = String($("#numeroDomi_input").val()).trim();
            let cpDomi = String($("#cpDomi_input").val()).trim();
            let colDomi = String($("#colDomi_input").val()).trim();
            let municipioDomi = String($("#municipioDomi_input").val()).trim();
            let estadoDomi = String($("#estadoDomi_input").val()).trim();

            calleDomi.replaceAll("'", '"');
            numeroDomi.replaceAll("'", '"');
            cpDomi.replaceAll("'", '"');
            colDomi.replaceAll("'", '"');
            municipioDomi.replaceAll("'", '"');
            estadoDomi.replaceAll("'", '"');

            if (!calleDomi || !numeroDomi || !cpDomi || !colDomi || !municipioDomi || !estadoDomi) {
                msj.show("Aviso", "El domicilio esta incompleto", [{ text1: "OK" }]);
                return false;
            }
        }

        let url = localStorage.getItem("url");
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url + "Brummy/views/citas/validaCita.php",
            data: { fechaCita, horaCita },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                let disponible = true;
                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                            guardarCita1(IDRec);
                        } else {
                            disponible = false;
                            let Texto = "";
                            result.forEach((data, index) => {
                                Texto += ` ${data.nombreCita} y ${data.nombreMascota} que podria empalmarse. ¿Deseas continuar?`;
                            });
                            Swal.fire({
                                title: "Hay una cita ya agendada de:",
                                text: Texto,
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonColor: "#7066e0",
                                cancelButtonColor: "#FF0037",
                                confirmButtonText: "OK",
                                cancelButtonText: "Cancelar",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    guardarCita1(IDRec);
                                }
                            });
                            // preloader.hide();
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
