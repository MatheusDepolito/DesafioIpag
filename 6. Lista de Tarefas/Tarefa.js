

export class Tarefa {

    static contador = 0;

    constructor(descricao, prioridade, status) {
        this.id = Tarefa.contador++;
        this.descricao = descricao;
        this.prioridade = prioridade || Prioridade.Minima;
        this.status = status || StatusTarefa.PENDENTE;
    }

    id;
    descricao;
    prioridade;
    status;
}

export const StatusTarefa = {
    PENDENTE: "Pendente",
    CONCLUIDA: "Concluída"
};

export const Prioridade = {
    Maxima: 3,
    Normal: 2,
    Minima: 1
};