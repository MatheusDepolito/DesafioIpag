import Calculadora from './1. Calculadora/Calculadora.js';
import MaiorMenor from './2. Maior e Menor entre Três Números/MaiorMenor.js';
import AreaFormasGeometricas from './3. Área de Formas Geométricas/AreaFormasGeometricas.js';
import JogoDaAdivinhacao from './4. Jogo da Adivinhação/JogodaAdivinhacao.js'
import ValidadorSenha from './5. Validador de Senha/validadorSenha.js   '
import AppListaTarefas from './6. Lista de Tarefas/AppTarefa.js'
import AppTvControle from './7. Manipulação e Comunicação de Objetos/AppTvControle.js'
import EstatisticasVendas from './8. Estatísticas de Vendas/estatisticasVendas.js'
import AppSF from './9. Simulador de Financiamento/AppSF.js'

const condicao = 9;

// 1. Calculadora Básica
if(condicao === 1) {
    let calculadora = new Calculadora();
    calculadora.operacao();
}

// 2. Maior e Menor entre Três Números
if(condicao === 2) {
    let maiorMenor = new MaiorMenor();
    maiorMenor.comparacao();
}

// 3. Área de Formas Geométricas
if(condicao === 3) {
    let afg = new AreaFormasGeometricas();
    afg.calcula();
}

// 4. Jogo da Adivinhação
if(condicao === 4){
    let jogoAdivinhacao = new JogoDaAdivinhacao();
    jogoAdivinhacao.jogoAdv();
}

// 5. Validador de Senha
if( condicao === 5) {
    let validadorSenha = new ValidadorSenha();
    validadorSenha.validador();
}

// 6. Lista de Tarefas
if( condicao === 6) {
   const app = new AppListaTarefas();
   app.execAppListaTarefas();
}

// 7. Manipulação e Comunicação de Objetos ( relação da tv com o controle )
if( condicao === 7) {
    const app = new AppTvControle();
    app.execApp();
}

// 8. Estatísticas de vendas(manipulando um arquivo csv)
// Decidi não criar uma interface, pois os dados acabam poluindo o terminal, para verificação dos dados acaba sendo um pouco ruim, então basta descomentar a função que deseja testar
if( condicao === 8 ) {
    
    const est = new EstatisticasVendas("./8. Estatísticas de Vendas/sales.csv");
    await est.pegaDadosArquivo();
    est.calcularEstatisticasPorTipoProduto();
    //est.calcularEstatisticasPorTipoProdutoERegiao();
    //est.calcularTipoProdutoMaiorReceitaPorPais();
}

// 9. Simulador de Financiamento
if( condicao === 9 ) {
    const appsf = new AppSF();
    appsf.execAppSimuladorFinanciamento();
}