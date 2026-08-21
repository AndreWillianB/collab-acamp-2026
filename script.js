const dataEvento = new Date("November 20, 2026 14:00:00").getTime();

const cronometro = setInterval(function () {

    const agora = new Date().getTime();

    const distancia = dataEvento - agora;


    const dias = Math.floor(
        distancia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (distancia % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (distancia % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const segundos = Math.floor(
        (distancia % (1000 * 60))
        / 1000
    );


    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;


    if (distancia < 0) {

        clearInterval(cronometro);

        document.querySelector(".contador").innerHTML =
            "<h2>O EVENTO COMEÇOU!</h2>";
    }

}, 1000);