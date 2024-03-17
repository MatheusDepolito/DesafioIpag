import readline from 'readline';



export default class AreaFormasGeometricas {
    constructor() {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    #calcularAreaQuadrado(lado) {
        const areaQuadrado = lado * lado;
        return areaQuadrado.toFixed(3);
    }

    #calcularAreaRetangulo(altura, comprimento) {
        const areaRetangulo = altura * comprimento;
        return areaRetangulo.toFixed(3);
    }

    #calcularAreaTriangulo(base, altura) {
        const areaTriangulo = (base * altura) / 2
        return areaTriangulo.toFixed(3);
    }

    #calcularAreaCirculo(raio) {
        const pi = Math.PI;
        const areaCirc = pi * (raio ** 2);
        return areaCirc.toFixed(3);
    }

    calcula() {
        let continuar = true;
        const prompt = (pergunta) => {
            return new Promise((resolve) => {
                this.readline.question(pergunta, (resposta) => {
                    resolve(resposta);
                });
            });
        };

        (async () => {
            while(continuar) {
                let opcao = parseInt(await prompt(`Bem vindo, aqui podemos calcular a área de um quadrado, retangulo, triangulo e circulo, selecione em continuar ou sair:
                1 - Quadrado
                2 - Retangulo
                3 - Triangulo
                4 - Circulo
                0 - Sair
                `));

                switch (opcao) {
                    case 0:
                        continuar = false;
                        break;

                    case 1:
                        var lado = parseFloat(await prompt("Digite o valor do lado do quadrado:"));
                        console.log(`Resultado a área do quadrado é ${this.#calcularAreaQuadrado(lado)}`);
                        break;

                    case 2:
                        var comprimento = parseFloat(await prompt("Digite o comprimento do retangulo:"));
                        var altura = parseFloat(await prompt("Digite a altura do retangulo:"));
                        console.log(`A área do retangulo é ${this.#calcularAreaRetangulo(altura, comprimento)}`);
                        break;  

                    case 3:
                        var base = parseFloat(await prompt("Digite a base do triangulo:"));
                        var altura = parseFloat(await prompt("Digite a altura do triangulo:"));
                        console.log(`A área do triangulo é ${this.#calcularAreaTriangulo(base, altura)}`);
                        break;    

                    case 4:
                        var raio = parseFloat(await prompt("Digite o raio do circulo:"));
                        console.log(`A área do circulo é ${this.#calcularAreaCirculo(raio)}`);
                        break;   
                    default:
                        console.log("Opção inválida.");
                        break;
                }
            }
            this.readline.close();
        })();

    }
}