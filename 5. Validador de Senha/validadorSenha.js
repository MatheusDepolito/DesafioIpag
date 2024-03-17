import readline from 'readline';





export default class ValidadorSenha {
    constructor() {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    #validarSenha(senha) {
        if (senha.length < 8) {
            return false;
        }
    
        const temMaiuscula = /[A-Z]/.test(senha);
        const temMinuscula = /[a-z]/.test(senha);
        const temNumero = /[0-9]/.test(senha);
    
        return temMaiuscula && temMinuscula && temNumero;
    }
    
    validador() {
        const prompt = (pergunta) => {
            return new Promise((resolve) => {
                this.readline.question(pergunta, (resposta) => {
                    resolve(resposta);
                });
            });
        }
        
        (async () => {
            let senhaCorreta = false;               
                while(!senhaCorreta) {
                var senha = await prompt("Digite uma senha com as seguintes especificações a senha deve ter no mínimo 8 caracteres e conter pelo menos uma letra maiúscula, uma letra minúscula e um número:")
                if(this.#validarSenha(senha)) {
                    console.log("Senha digitada corretamente.");
                    senhaCorreta=true;  
                } else {
                    console.log("Senha incorreta, siga as insruções e tente novamente.")
                }
            }
            this.readline.close();
        })();
    }


}