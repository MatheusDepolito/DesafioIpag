import Calculadora from './1. Calculadora/Calculadora.js';
import MaiorMenor from './2. Maior e Menor entre Três Números/MaiorMenor.js';
import AreaFormasGeometricas from './3. Área de Formas Geométricas/AreaFormasGeometricas.js';
import JogoDaAdivinhacao from './4. Jogo da Adivinhação/JogodaAdivinhacao.js'
import ValidadorSenha from './5. Validador de Senha/validadorSenha.js   '
import { ListaTarefas, Tarefa, Prioridade, StatusTarefa, AppListaTarefas } from './6. Lista de Tarefas/ListaTarefas.js'


const condicao = 6;

if(condicao === 1) {
    let calculadora = new Calculadora();
    calculadora.operacao();
}

if(condicao === 2) {
    let maiorMenor = new MaiorMenor();
    maiorMenor.comparacao();
}

if(condicao === 3) {
    let afg = new AreaFormasGeometricas();
    afg.calcula();
}

if(condicao === 4){
    let jogoAdivinhacao = new JogoDaAdivinhacao();
    jogoAdivinhacao.jogoAdv();
}

if( condicao === 5) {
    let validadorSenha = new ValidadorSenha();
    validadorSenha.validador();
}

if( condicao === 6) {
    /*
    const lista = new ListaTarefas();
    lista.adicionarTarefa('Fazer compras', 2, 'pendente');
    lista.adicionarTarefa('Limpar a casa', 2, 2);
    lista.adicionarTarefa('Estudar JavaScript', 3, 3);

    lista.visualizarTarefas(); // Mostra todas as tarefas
    console.log('--- ordernar por prioridade agora');

    lista.ordenarTarefasPorPrioridade(); // Ordena as tarefas por prioridade
    lista.visualizarTarefas(); // Mostra as tarefas após a ordenação
        console.log('--- editar tarefa id 2');

    lista.editarTarefa(2, 'Fazer compras de mercado', Prioridade.Maxima); // Edita a segunda tarefa
    lista.visualizarTarefas(); // Mostra as tarefas após a edição
    console.log('--- remover tarefa id 1');

    lista.removerTarefa(1); // Remove a primeira tarefa
    lista.visualizarTarefas(); // Mostra as tarefas após a remoção
    */
   
   const app = new AppListaTarefas();
   app.execAppListaTarefas();
}