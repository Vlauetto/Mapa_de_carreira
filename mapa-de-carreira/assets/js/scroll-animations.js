/*
scroll-animations.js
Animacoes de entrada e saida ao rolar a pagina.
*/

console.log("scroll-animations carregado");

(function () {
"use strict";

var observerAtivo = null;

function marcarTodosComoVisiveis(elementos) {
    elementos.forEach(function (el) {
        el.classList.add("is-visible");
    });
}

function criarObserver() {
    return new IntersectionObserver(
        function (entradas) {
            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");
                    observerAtivo.unobserve(entrada.target);
                }

            });
        },
        {
            threshold: 0.15
        }
    );
}

function observarNovosElementos() {
    var seletor =
        ".scroll-fade, .scroll-fade-left, .scroll-fade-right";

    var elementos = document.querySelectorAll(seletor);

    if (!elementos.length) return;

    if (!("IntersectionObserver" in window)) {
        marcarTodosComoVisiveis(elementos);
        return;
    }

    if (!observerAtivo) {
        observerAtivo = criarObserver();
    }

    elementos.forEach(function (el) {

        if (el.dataset.scrollObservado === "1") {
            return;
        }

        el.dataset.scrollObservado = "1";
        observerAtivo.observe(el);

    });
}

function aplicarClassesAutomaticamente() {

    document
        .querySelectorAll(".resume-section")
        .forEach(function (secao) {
            secao.classList.add("scroll-fade");
        });

    var colTimeline = document.querySelector(".col-lg-9");
    var colLateral = document.querySelector(".col-lg-3");

    if (colTimeline) {
        colTimeline.classList.add("scroll-fade-left");
    }

    if (colLateral) {
        colLateral.classList.add("scroll-fade-right");
    }

    document
        .querySelectorAll(".resume-timeline-item")
        .forEach(function (item, indice) {

            item.classList.add("scroll-fade");

            var grupoDelay = (indice % 5) + 1;

            item.classList.add("delay-" + grupoDelay);
        });
}

function executarQuandoProntoOConteudoDinamico() {

    aplicarClassesAutomaticamente();
    observarNovosElementos();

    var containerTimeline =
        document.getElementById("career-timeline");

    if (
        containerTimeline &&
        "MutationObserver" in window
    ) {

        var mo = new MutationObserver(function () {

            aplicarClassesAutomaticamente();
            observarNovosElementos();

        });

        mo.observe(containerTimeline, {
            childList: true,
            subtree: true
        });
    }
}

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        executarQuandoProntoOConteudoDinamico
    );

} else {

    executarQuandoProntoOConteudoDinamico();

}

});
