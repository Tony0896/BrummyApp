document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);

    document.addEventListener("backbutton", function (e) {
        app.views.main.router.back();
    });

    // console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
    // document.getElementById("deviceready").classList.add("ready");
    StatusBar.styleLightContent();
    let Usuario = localStorage.getItem("Usuario");
    localStorage.setItem("version", "1.0.0");
    let url = "http://192.168.100.5:8080/";
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
                <p>Right Panel content here</p>
                <p style="text-align: center;"><a href="#" onclick="return: false;"> Versión ${version} </a></p>
                <p style="text-align: center;"><a href="#" onclick="cerrarSesion();" style="color: #FF0037;"> Cerrar Sesión </a></p>
            </div>
        </div>
        <div class="view view-main view-init">
            <div class="page animate__animated animate__slideInRight" id="panel-page">
                <div class="navbar" style="height: 5px">
                    <div class="left top-left" style="justify-content: space-between;background-color: #009071;">
                        <div> &nbsp; </div>
                        <div class="title" style="font-size: 18px;margin-left: 15px;">Bienvenido</div>
                        <div>
                            <a class="panel-open" href="#" data-panel="right">
                                <i class="icon material-icons md-only" style="margin-right: 15px;"> menu </i>
                            </a>
                        </div>
                    </div>
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
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="travel_explore_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> travel_explore </i>
                                <p style="margin: 8px;"> Portal </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col card" style="margin-left: 0;margin-right: 0;" id="settings_menu" onclick="moveMenu(this.id)">
                                <i class="icon material-icons md-only" style="color: #009071;font-size: 50px;"> settings </i>
                                <p style="margin: 8px;"> Configuración </p>
                            </div>
                            <div class="col" style="margin-left: 0;margin-right: 0;">
                                &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);

    StatusBar.styleLightContent();
}

function pintaLogin() {
    $("#app").html(`
        <div class="page animate__animated animate__slideInRight" id="panel-page" style="background-color: #009071; background: #009071">
            <div class="container-login100" id="bodyLogin">
                <div class="wrap-login100">
                    <div style="text-align: center; padding-bottom: 25px; width: 100%; padding-top: 25px">
                        <img src="img/logo.png" height="100px" alt="Logo CISA" id="img_logo" />
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

function dataTableCreate() {
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
