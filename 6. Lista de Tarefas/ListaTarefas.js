
/*"6. Lista de Tarefas:
. Crie um programa que permita ao usuário adicionar, remover e visualizar tarefas Ok.
. Cada tarefa deve ter descrição, prioridade e um status (pendente ou concluída) Ok.
. O programa deve permitir a navegação, ordenação e edição da lista de tarefas."*/
import { Tarefa, Prioridade, StatusTarefa } from './Tarefa.js'
export default class ListaTarefas {

    constructor(listaTarefas = []) {
        this.listaTarefas = listaTarefas;
    }

    listaTarefas;


    adicionarTarefa(descricao, prioridade, status) {
        this.listaTarefas.push(new Tarefa(descricao, prioridade, status));
    }

    removerTarefa(id) {
        const indice = this.#buscarIndicePorId(id);
        if (indice !== -1) {
            this.listaTarefas.splice(indice, 1);
        }
    }

    visualizarTarefas() {
        this.listaTarefas.forEach(tarefa => {
            console.log(`ID: ${tarefa.id}, Descrição: ${tarefa.descricao}, Prioridade: ${tarefa.prioridade}, Status: ${tarefa.status}`);
        });
    }

    ordenarTarefasPorPrioridade() {
        
            this.listaTarefas.sort((a, b) => {
                if (a.prioridade === Prioridade.Maxima) {
                    return -1; // Coloca a tarefa a na frente de b se a é de prioridade máxima
                }
                if (b.prioridade === Prioridade.Maxima) {
                    return 1; // Coloca a tarefa b na frente de a se b é de prioridade máxima
                }
                if (a.prioridade === Prioridade.Normal && b.prioridade === Prioridade.Minima) {
                    return -1; // Coloca a tarefa a na frente de b se a é de prioridade normal e b é de prioridade mínima
                }
                if (a.prioridade === Prioridade.Minima && b.prioridade === Prioridade.Normal) {
                    return 1; // Coloca a tarefa b na frente de a se b é de prioridade normal e a é de prioridade mínima
                }
                return a.prioridade - b.prioridade; // Ordena por prioridade normalmente se não houver diferença significativa nas prioridades
            });
        
        
    }

    obterTarefaPorId(id) {
        const indice = this.#buscarIndicePorId(id);
        if (indice !== -1) {
            return this.listaTarefas[indice];
        } else {
            return null; // Retorna null se a tarefa não for encontrada
        }
    }

    editarTarefa(id, novaDescricao, novaPrioridade, novoStatus) {
        const indice = this.#buscarIndicePorId(id);
        if (indice !== -1) {
            const tarefa = this.listaTarefas[indice];
            tarefa.descricao = novaDescricao || tarefa.descricao;
            tarefa.prioridade = novaPrioridade || tarefa.prioridade;
            tarefa.status = novoStatus || tarefa.status;
        }
    }

    #buscarIndicePorId(id) {
        return this.listaTarefas.findIndex(tarefa => tarefa.id === id);
    }
}
