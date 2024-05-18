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

    //?Fin tecnologiasHmo
    {
        path: "(.*)",
        url: "./pages/404.html",
    },
];
