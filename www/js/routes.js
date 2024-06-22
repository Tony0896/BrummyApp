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
        name: "dashboard",
        path: "/dashboard/",
        componentUrl: "./pages/brummy/dashboard.html",
    },
    {
        name: "apps",
        path: "/apps/",
        componentUrl: "./pages/brummy/apps.html",
    },
    {
        name: "paid",
        path: "/paid/",
        componentUrl: "./pages/brummy/paid.html",
    },
    {
        name: "people",
        path: "/people/",
        componentUrl: "./pages/brummy/people.html",
    },
    {
        name: "pets",
        path: "/pets/",
        componentUrl: "./pages/brummy/pets.html",
    },
    {
        name: "event",
        path: "/event/",
        componentUrl: "./pages/brummy/event.html",
    },
    {
        name: "inventory_2",
        path: "/inventory_2/",
        componentUrl: "./pages/brummy/inventory_2.html",
    },
    {
        name: "travel_explore",
        path: "/travel_explore/",
        componentUrl: "./pages/brummy/travel_explore.html",
    },
    {
        name: "settings",
        path: "/settings/",
        componentUrl: "./pages/brummy/settings.html",
    },
    {
        name: "perfilMascota",
        path: "/perfilMascota/",
        componentUrl: "./pages/brummy/perfilMascota.html",
    },
    {
        name: "nuevaVenta",
        path: "/nuevaVenta/",
        componentUrl: "./pages/brummy/nuevaVenta.html",
    },
    {
        name: "grade",
        path: "/grade/",
        componentUrl: "./pages/brummy/grade.html",
    },
    {
        name: "bar_chart",
        path: "/bar_chart/",
        componentUrl: "./pages/brummy/bar_chart.html",
    },
    {
        name: "campaign",
        path: "/campaign/",
        componentUrl: "./pages/brummy/campaign.html",
    },
    {
        name: "store",
        path: "/store/",
        componentUrl: "./pages/brummy/store.html",
    },
    {
        name: "person",
        path: "/person/",
        componentUrl: "./pages/brummy/person.html",
    },
    //?Fin tecnologiasHmo
    {
        path: "(.*)",
        url: "./pages/404.html",
    },
];
