var routes = [
    //-------------------
    // Index page
    {
        path: "/",
        url: "./index.html",
        name: "home",
    },
    // About page
    {
        path: "/about/",
        url: "./pages/about.html",
        name: "about",
    },
    //?Inicio tecnologiasHmo
    {
        name: "yallegueTecnologiasHMO",
        path: "/yallegueTecnologiasHMO/",
        componentUrl: "./pages/yallegueTecnologiasHMO.html",
    },
    {
        name: "formtecnologiasHmo1",
        path: "/formtecnologiasHmo1/",
        componentUrl: "./pages/formtecnologiasHmo1.html",
    },
    {
        name: "formtecnologiasHmo2",
        path: "/formtecnologiasHmo2/",
        componentUrl: "./pages/formtecnologiasHmo2.html",
    },
    //?Fin tecnologiasHmo
    {
        path: "(.*)",
        url: "./pages/404.html",
    },
];
