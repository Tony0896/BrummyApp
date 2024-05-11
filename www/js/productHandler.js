var productHandler = {
    addCedulayb: function (
        id_usuario,
        nombre_usuario,
        fecha_entrada,
        geolocalizacion_entrada,
        id_cliente,
        nombre_cliente,
        horario_programado,
        estatus,
        tipo_cedula
    ) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "insert into cedulas_general(id_usuario,nombre_usuario,fecha_entrada,geolocalizacion_entrada,id_cliente,nombre_cliente,horario_programado,estatus,tipo_cedula) values(?,?,?,?,?,?,?,?,?)",
                    [
                        id_usuario,
                        nombre_usuario,
                        fecha_entrada,
                        geolocalizacion_entrada,
                        id_cliente,
                        nombre_cliente,
                        horario_programado,
                        estatus,
                        tipo_cedula,
                    ],
                    function (tx, results) {
                        // console.log("Registro de cedula creado exitosamente");
                    },
                    function (tx, error) {
                        console.error("Error registrar cedula general:" + error.message);
                    }
                );
            },
            function (error) {},
            function () {}
        );
    },
    addDatosGenerales: function (
        id_cedula,
        Unidad,
        Chasis,
        Familia,
        marca,
        Empresa,
        FK_id_unidad,
        id_unidad_vs,
        FK_id_empresa,
        id_modelo_check,
        fecha_revision
    ) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "insert into datos_generales_checklist(id_cedula, Unidad, Chasis, Familia, marca, Empresa, FK_id_unidad, id_unidad_vs, FK_id_empresa, id_modelo_check, fecha_revision) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [id_cedula, Unidad, Chasis, Familia, marca, Empresa, FK_id_unidad, id_unidad_vs, FK_id_empresa, id_modelo_check, fecha_revision],
                    function (tx, results) {
                        //console.log("Frio correcto");
                    },
                    function (tx, error) {
                        console.error("Error registrar:" + error.message);
                    }
                );
            },
            function (error) {
                console.log(error);
            },

            function () {}
        );
    },
};
