import readline from 'readline';
import ListaTarefas from './ListaTarefas.js'
import { Tarefa, Prioridade, StatusTarefa } from './Tarefa.js'

export default class AppListaTarefas {

    listaTarefas;

    constructor() {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.listaTarefas = new ListaTarefas();
    }

    async execAppListaTarefas() {
        var continuar = true;
        console.log(`Olá seja bem vindo ao AppListaTarefas, o app consiste em você cadastrar novas tarefas, remover, editar e visualizar as tarefas, as tarefas tem descrição, prioridade(3 - Maxima, 2 - Normal e 1 - Minima) e status(pendente ou concluída).
Ao iniciar o programa você tera opções como, Adicionar nova tarefa, remover tarefa, ordernar tarefas, visualizar tarefas e editar tarefas.`)
        while (continuar) {
            let opcao = parseInt(await this.prompt(`Digite 1 para iniciar ou 0 para sair:
            1 - Iniciar App
            0 - Sair   
            `));

            if(!opcao || opcao !== 1) {
                break;
            }
            let persistir = true;
            while(persistir) {
                let operacao = parseInt(await this.prompt(`Escolha uma operação:
                1 - Adicionar nova tarefa
                2 - Editar tarefa
                3 - Excluir tarefa
                4 - Listar tarefas
                5 - Ordenar tarefas por prioridade
                0 - Sair  
                `))

                switch (operacao) {
                    case 0:
                        persistir = false;
                        break;
                    case 1:
                        await this.#adicionarTarefa();
                        break;
                    case 2:
                        await this.#editarTarefa();
                        break;
                    case 3:
                        await this.#removerTarefa();
                        break;
                    case 4:
                        await this.#listarTarefas();
                        break;
                    case 5:
                        await this.#ordenarTarefasPorPrioridade();
                        break;

                    default:
                    console.log("Opção inválida.");
                        break;
                }
            } 
        }
        this.readline.close();
    }

    async #listarTarefas() {
        if (this.listaTarefas.listaTarefas.length === 0) {
            console.log("Não há tarefas cadastradas para listar.");
            return;
        }
    
        let opcaoListagem = parseInt(await this.prompt(`Escolha uma opção de listagem:
            1 - Listar todas as tarefas
            2 - Listar uma tarefa específica
            0 - Voltar
        `));
    
        switch (opcaoListagem) {
            case 0:
                break;
            case 1:
                console.log("Listando todas as tarefas:");
                this.listaTarefas.visualizarTarefas();
                break;
            case 2:
                let idTarefa;
                let tarefaParaListar;
            
                while (true) {
                    idTarefa = parseInt(await this.prompt("Digite o ID da tarefa que deseja listar:"));
            
                    tarefaParaListar = this.listaTarefas.obterTarefaPorId(idTarefa);
                    if (tarefaParaListar) {
                        console.log("Tarefa encontrada:");
                        console.log(`ID: ${tarefaParaListar.id}, Descrição: ${tarefaParaListar.descricao}, Prioridade: ${tarefaParaListar.prioridade}, Status: ${tarefaParaListar.status}`);
                        break;
                    } else {
                        console.log("ID de tarefa inválido. Por favor, digite um ID válido.");
                    }
                }
                break;
            default:
                console.log("Opção inválida.");
                break;
        }
    }
    
    async #ordenarTarefasPorPrioridade() {
        if (this.listaTarefas.listaTarefas.length === 0) {
            console.log("Não há tarefas cadastradas para ordenar.");
            return;
        }
    
        this.listaTarefas.ordenarTarefasPorPrioridade();
        console.log("Tarefas ordenadas por prioridade:");
        this.listaTarefas.visualizarTarefas();
    }

    async #removerTarefa() {
        if (this.listaTarefas.listaTarefas.length === 0) {
            console.log("Não há tarefas cadastradas para remover.");
            return;
        }
    
        let idTarefa;
        let tarefaParaRemover;
    
        while (true) {
            idTarefa = parseInt(await this.prompt("Digite o ID da tarefa que deseja remover:"));
    
            tarefaParaRemover = this.listaTarefas.obterTarefaPorId(idTarefa);
            if (tarefaParaRemover) {
                break;
            } else {
                console.log("ID de tarefa inválido. Por favor, digite um ID válido.");
            }
        }
    
        this.listaTarefas.removerTarefa(idTarefa);
        console.log("Tarefa removida com sucesso.");
        this.listaTarefas.visualizarTarefas();
    }

    async #editarTarefa() {
        if (this.listaTarefas.listaTarefas.length === 0) {
            console.log("Não há tarefas cadastradas para editar.");
            return;
        }
    
        let idTarefa;
        let tarefaParaEditar;
    
        while (true) {
            idTarefa = parseInt(await this.prompt("Digite o ID da tarefa que deseja editar:"));
    
            tarefaParaEditar = this.listaTarefas.obterTarefaPorId(idTarefa);
            if (tarefaParaEditar) {
                break;
            } else {
                console.log("ID de tarefa inválido. Por favor, digite um ID válido.");
            }
        }
    
        console.log("Tarefa encontrada. Informe os novos dados:");
    
        let novaDescricao = await this.prompt(`Descrição atual: ${tarefaParaEditar.descricao}. Digite a nova descrição da tarefa:`);
        let prioridadeNum = parseInt(await this.prompt(`Prioridade atual: ${tarefaParaEditar.prioridade}. Digite o novo nível de prioridade (1 - Minima, 2 - Normal, 3 - Maxima):`));
        let novaPrioridade = await this.#validarPrioridade(prioridadeNum);
    
        let statusStr = await this.prompt(`Status atual: ${tarefaParaEditar.status}. Digite o novo status da tarefa (pendente ou concluida):`);
        let novoStatus = await this.#validarStatus(statusStr);
    
        this.listaTarefas.editarTarefa(idTarefa, novaDescricao, novaPrioridade, novoStatus);
        console.log("Tarefa editada com sucesso.");
        this.listaTarefas.visualizarTarefas();
    }
    
    
    
    async #adicionarTarefa() {
        while (true) {
            if (this.listaTarefas.listaTarefas.length === 0) {
                console.log("Você ainda não tem tarefas cadastradas, cadastre uma:");
            } else {
                console.log("Adicione uma nova tarefa:");
            }
        
            let descricao = await this.prompt("Digite a descrição da tarefa:");
            let prioridadeNum = parseInt(await this.prompt("Digite o nível de prioridade da tarefa (1 - Minima, 2 - Normal, 3 - Maxima):"));
            let prioridade = await this.#validarPrioridade(prioridadeNum);
        
            let statusStr = await this.prompt("Digite o status da tarefa (pendente ou concluida):");
            let status = await this.#validarStatus(statusStr);
        
            this.listaTarefas.adicionarTarefa(descricao, prioridade, status);
            this.listaTarefas.visualizarTarefas();
            
            let confirmacao = await this.prompt("Deseja adicionar outra tarefa? (s/n)");
            if (confirmacao.toLowerCase() !== 's') {
                break;// Sai do loop principal se não desejar adicionar outra tarefa
            }
        }  
    }
    
    async #validarPrioridade(prioridadeNum) {
        let prioridade;
        let p = prioridadeNum;
        while (true) {
            switch (p) {
                case 1:
                    prioridade = Prioridade.Minima;
                    break;
                case 2:
                    prioridade = Prioridade.Normal;
                    break;
                case 3:
                    prioridade = Prioridade.Maxima;
                    break;
                default:
                    console.log("Prioridade inválida. Digite 1, 2 ou 3.");
                    p = parseInt(await this.prompt("Digite o nível de prioridade da tarefa novamente (1 - Minima, 2 - Normal, 3 - Maxima):"));
                    continue; // Reinicia o loop interno para pedir a prioridade novamente
            }
            break; // Sai do loop interno se a prioridade for válida
        }
        return prioridade;
    }

    async #validarStatus(statusStr) {
        let status;
        let s = statusStr;
        while (true) {
            if (s.toLowerCase() === 'pendente') {
                status = StatusTarefa.PENDENTE;
                break; // Sai do loop interno se o status for válido
            } else if (s.toLowerCase() === 'concluida') {
                status = StatusTarefa.CONCLUIDA;
                break; // Sai do loop interno se o status for válido
            } else {
                console.log("Status inválido. Digite pendente ou concluida.");
                s = await this.prompt("Digite o status da tarefa novamente (pendente ou concluida):");
                continue; // Reinicia o loop interno para pedir o status novamente
            }
        }
        return status;
    }

    prompt(pergunta) {
        return new Promise((resolve) => {
            this.readline.question(pergunta, (resposta) => {
                resolve(resposta);
            });
        });
    }   
}