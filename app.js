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
   const app = new AppListaTarefas();
   app.execAppListaTarefas();
}

if( condicao === 7) {
    const app = new AppTvControle();
    app.execApp();
}

if( condicao === 8 ) {

    const est = new EstatisticasVendas("./8. Estatísticas de Vendas/sales.csv");
    await est.pegaDadosArquivo();
    //est.calcularEstatisticasPorTipoProduto();
    //est.calcularEstatisticasPorTipoProdutoERegiao();
    est.calcularTipoProdutoMaiorReceitaPorPais();
}

if( condicao === 9 ) {
    const appsf = new AppSF();
    appsf.execAppSimuladorFinanciamento();
}