/*
"7. Manipulação e Comunicação de Objetos:
. Crie um programa que conecte controles de marcas diferentes (LG, Samsung, Sony, etc) a uma ou mais TVs.
. O programa deve permitir a seleção de um controle e a comunicação com a TV para ligar e desligar;
. As TVs e controles devem ser representados por objetos, e a comunicação entre eles deve ser feita por métodos.
. O programa deve exibir na tela as ações realizadas e o estado atual da TV.
. Caso o controle selecionado não seja compatível com a TV, o programa deve exibir uma mensagem de erro."
*/

export default class Tv {

    marca
    ligada

    constructor(marca) {
        this.marca = marca;
        this.ligada = false;
    }

    ligaDesligaTv() {
        !this.ligada 
        ? (this.ligada = true, console.log(`Tv da marca ${this.marca} foi ligada.`)) 
        : (this.ligada = false, console.log(`Tv da marca ${this.marca} foi desligada.`));
    }

    validaControle(marcaControle) {
        if(marcaControle === this.marca) return true;
    }

    recebeAcaoControle(marcaControle) {

        if(this.validaControle(marcaControle)) {
            this.ligaDesligaTv();
        } else {
            console.log("Controle não compativel com a Tv selecionada.");
        }

    }
}