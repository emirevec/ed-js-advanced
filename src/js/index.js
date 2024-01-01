let data = [];

function renderPage(url, id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', () => {
        const template = Handlebars.compile(xhr.response);
        $("#" + id).empty();
        $("#" + id).append(template({ data }));
        $("#search_order").on("change", (e) => {
            switch (e.target.value) {
                case 'mayorPrecio':
                    data = data.sort((a, b) =>
                        Number(a.precio) < Number(b.precio) ? 1 : -1
                    )
                    break;
                case 'menorPrecio':
                    data = data.sort((a, b) =>
                        Number(a.precio) > Number(b.precio) ? 1 : -1
                    )
                    break;
            };
            renderPage('../src/views/app.hbs', "app");
        });
        $("#search_submit").on("click", (e) => {
            e.preventDefault();
            const searchName = $("#search_name").val().toLocaleLowerCase();
            data = data.filter((item) => item.nombre.toLocaleLowerCase() == searchName);
            renderPage('../src/views/app.hbs', "app");
        });
    });
};

function getData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../src/data/products.json')
    xhr.send();
    xhr.addEventListener('load', () => {
        data = JSON.parse(xhr.response);
        renderPage('../src/views/app.hbs', "app");
    });
};

$(function () {
    renderPage('../src/views/app.hbs', "app");
    getData();
});