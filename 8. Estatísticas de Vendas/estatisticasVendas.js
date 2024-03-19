import csv from 'csv-parser';
import fs from 'fs';

export default class EstatisticasVendas {

    constructor(caminho) {
        this.caminhoArquivo = caminho;
        this.dados = [];
    }

    async pegaDadosArquivo() {
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.caminhoArquivo)
                .pipe(csv())
                .on('data', (row) => {
                    this.dados.push(row);
                })
                .on('end', () => {
                    console.log('Arquivo lido com sucesso.');
                    resolve();
                })
                .on('error', (err) => {
                    console.error('Erro ao ler o arquivo:', err);
                    reject(err);
                });
        });
    }

    calcularEstatisticasPorTipoProduto() {
        const estatisticasPorTipoProduto = this.calcularEstatisticasPorCampo('Item Type');

        this.formatarValoresMoeda(estatisticasPorTipoProduto);

        console.log('Estatísticas por Tipo de Produto:', estatisticasPorTipoProduto);
    }

    async calcularEstatisticasPorTipoProdutoERegiao() {
        const estatisticasPorTipoProdutoERegiao = this.calcularEstatisticasPorDoisCampos('Item Type', 'Region');

        this.formatarValoresMoeda(estatisticasPorTipoProdutoERegiao);

        console.log('Estatísticas por Tipo de Produto e Região:', estatisticasPorTipoProdutoERegiao);
    }

    async calcularTipoProdutoMaiorReceitaPorPais() {
        const tipoProdutoMaiorReceitaPorPais = this.calcularValorMaxPorCampo('Item Type', 'Country', 'Total Revenue');

        this.formatarValoresMoedaPorPais(tipoProdutoMaiorReceitaPorPais);

        console.log('Tipo de Produto com Maior Receita por País:', tipoProdutoMaiorReceitaPorPais);
    }

    calcularEstatisticasPorCampo(campo) {
        const estatisticasPorCampo = {};

        this.dados.forEach((item) => {
            const valorCampo = item[campo];

            if (!estatisticasPorCampo[valorCampo]) {
                estatisticasPorCampo[valorCampo] = {
                    totalUnidadesVendidas: 0,
                    totalReceita: 0,
                    totalCusto: 0,
                    totalLucro: 0,
                };
            }

            const unidadesVendidas = parseInt(item['Units Sold']);
            const receita = parseFloat(item['Total Revenue']);
            const custo = parseFloat(item['Total Cost']);
            const lucro = parseFloat(item['Total Profit']);

            estatisticasPorCampo[valorCampo].totalUnidadesVendidas += unidadesVendidas;
            estatisticasPorCampo[valorCampo].totalReceita += receita;
            estatisticasPorCampo[valorCampo].totalCusto += custo;
            estatisticasPorCampo[valorCampo].totalLucro += lucro;
        });
        
        return estatisticasPorCampo;
    }

    calcularEstatisticasPorDoisCampos(campo1, campo2) {
        const estatisticasPorDoisCampos = {};

        this.dados.forEach((item) => {
            const valorCampo1 = item[campo1];
            const valorCampo2 = item[campo2];

            if (!estatisticasPorDoisCampos[valorCampo1]) {
                estatisticasPorDoisCampos[valorCampo1] = {};
            }

            if (!estatisticasPorDoisCampos[valorCampo1][valorCampo2]) {
                estatisticasPorDoisCampos[valorCampo1][valorCampo2] = {
                    totalUnidadesVendidas: 0,
                    totalReceita: 0,
                    totalCusto: 0,
                    totalLucro: 0,
                };
            }

            const unidadesVendidas = parseInt(item['Units Sold']);
            const receita = parseFloat(item['Total Revenue']);
            const custo = parseFloat(item['Total Cost']);
            const lucro = parseFloat(item['Total Profit']);

            estatisticasPorDoisCampos[valorCampo1][valorCampo2].totalUnidadesVendidas += unidadesVendidas;
            estatisticasPorDoisCampos[valorCampo1][valorCampo2].totalReceita += receita;
            estatisticasPorDoisCampos[valorCampo1][valorCampo2].totalCusto += custo;
            estatisticasPorDoisCampos[valorCampo1][valorCampo2].totalLucro += lucro;
        });

        return estatisticasPorDoisCampos;
    }

    calcularValorMaxPorCampo(campo1, campo2, campoValor) {
        const valorMaxPorCampo = {};

        this.dados.forEach((item) => {
            const valorCampo1 = item[campo1];
            const valorCampo2 = item[campo2];
            const valor = parseFloat(item[campoValor]);

            if (!valorMaxPorCampo[valorCampo1]) {
                valorMaxPorCampo[valorCampo1] = {};
            }

            if (!valorMaxPorCampo[valorCampo1][valorCampo2]) {
                valorMaxPorCampo[valorCampo1][valorCampo2] = 0;
            }

            if (valor > valorMaxPorCampo[valorCampo1][valorCampo2]) {
                valorMaxPorCampo[valorCampo1][valorCampo2] = valor;
            }
        });

        return valorMaxPorCampo;
    }

    formatarValoresMoeda(objeto) {
        for (const chave1 in objeto) {
            for (const chave2 in objeto[chave1]) {
                const dados = objeto[chave1][chave2];
                dados.totalReceita = dados.totalReceita.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                dados.totalCusto = dados.totalCusto.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                dados.totalLucro = dados.totalLucro.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            }
        }
    }

    formatarValoresMoedaPorPais(objeto) {
        for (const chave1 in objeto) {
            for (const chave2 in objeto[chave1]) {
                objeto[chave1][chave2] = objeto[chave1][chave2].toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            }
        }
    }
}
