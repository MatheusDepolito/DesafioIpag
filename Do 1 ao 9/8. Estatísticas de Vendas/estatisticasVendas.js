import csv from 'csv-parser'; // Importa o módulo csv-parser para analisar arquivos CSV
import fs from 'fs'; // Importa o módulo fs para lidar com operações de arquivo

export default class EstatisticasVendas {
    constructor(caminho) {
        this.caminhoArquivo = caminho; // Caminho do arquivo CSV
        this.dados = []; // Array para armazenar os dados do arquivo CSV
    }

    async pegaDadosArquivo() {
        return new Promise((resolve, reject) => {
            // Lê o arquivo CSV e popula this.dados
            fs.createReadStream(this.caminhoArquivo)
                .pipe(csv())
                .on('data', (row) => {
                    this.dados.push(row); // Adiciona cada linha de dados ao array this.dados
                })
                .on('end', () => {
                    console.log('Arquivo lido com sucesso.'); // Exibe uma mensagem quando o arquivo é lido com sucesso
                    resolve(); // Resolve a promessa quando a leitura do arquivo é concluída com sucesso
                })
                .on('error', (err) => {
                    console.error('Erro ao ler o arquivo:', err); // Exibe uma mensagem de erro se houver problemas ao ler o arquivo
                    reject(err); // Rejeita a promessa se houver erros ao ler o arquivo
                });
        });
    }

    calcularEstatisticasPorTipoProduto() {
        // Objeto para armazenar as estatísticas por tipo de produto
        const estatisticasPorTipoProduto = {};

        // Calcula estatísticas com base nos dados do arquivo CSV
        this.dados.forEach((item) => {
            // Verifica se o tipo de produto ainda não está no objeto estatisticasPorTipoProduto e inicializa seus valores
            if (!estatisticasPorTipoProduto[item['Item Type']]) {
                estatisticasPorTipoProduto[item['Item Type']] = {
                    totalUnidadesVendidas: 0,
                    totalReceita: 0,
                    totalCusto: 0,
                    totalLucro: 0,
                };
            }

            // Converte os valores para números e os adiciona às estatísticas
            const unidadesVendidas = parseInt(item['Units Sold']);
            const receita = parseFloat(item['Total Revenue']);
            const custo = parseFloat(item['Total Cost']);
            const lucro = parseFloat(item['Total Profit']);

            estatisticasPorTipoProduto[item['Item Type']].totalUnidadesVendidas += unidadesVendidas;
            estatisticasPorTipoProduto[item['Item Type']].totalReceita += receita;
            estatisticasPorTipoProduto[item['Item Type']].totalCusto += custo;
            estatisticasPorTipoProduto[item['Item Type']].totalLucro += lucro;
        });

        // Formata os valores de receita, custo e lucro para exibição
        for (const tipoProduto in estatisticasPorTipoProduto) {
            const dadosProduto = estatisticasPorTipoProduto[tipoProduto];
            dadosProduto.totalReceita = dadosProduto.totalReceita.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            dadosProduto.totalCusto = dadosProduto.totalCusto.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            dadosProduto.totalLucro = dadosProduto.totalLucro.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }

        console.log('Estatísticas por Tipo de Produto:', estatisticasPorTipoProduto);
    }

    async calcularEstatisticasPorTipoProdutoERegiao() {
        // Objeto para armazenar as estatísticas por tipo de produto e região
        const estatisticasPorTipoProdutoERegiao = {};

        // Calcula estatísticas com base nos dados do arquivo CSV
        this.dados.forEach((item) => {
            const tipoProduto = item['Item Type'];
            const regiao = item['Region'];

            // Inicializa as estatísticas para cada tipo de produto e região, se ainda não existirem
            if (!estatisticasPorTipoProdutoERegiao[tipoProduto]) {
                estatisticasPorTipoProdutoERegiao[tipoProduto] = {};
            }

            if (!estatisticasPorTipoProdutoERegiao[tipoProduto][regiao]) {
                estatisticasPorTipoProdutoERegiao[tipoProduto][regiao] = {
                    totalUnidadesVendidas: 0,
                    totalReceita: 0,
                    totalCusto: 0,
                    totalLucro: 0,
                };
            }

            // Converte os valores para números e os adiciona às estatísticas
            const unidadesVendidas = parseInt(item['Units Sold']);
            const receita = parseFloat(item['Total Revenue']);
            const custo = parseFloat(item['Total Cost']);
            const lucro = parseFloat(item['Total Profit']);

            estatisticasPorTipoProdutoERegiao[tipoProduto][regiao].totalUnidadesVendidas += unidadesVendidas;
            estatisticasPorTipoProdutoERegiao[tipoProduto][regiao].totalReceita += receita;
            estatisticasPorTipoProdutoERegiao[tipoProduto][regiao].totalCusto += custo;
            estatisticasPorTipoProdutoERegiao[tipoProduto][regiao].totalLucro += lucro;
        });

        // Formata os valores de receita, custo e lucro para exibição
        for (const tipoProduto in estatisticasPorTipoProdutoERegiao) {
            for (const regiao in estatisticasPorTipoProdutoERegiao[tipoProduto]) {
                const dadosRegiao = estatisticasPorTipoProdutoERegiao[tipoProduto][regiao];
                dadosRegiao.totalReceita = dadosRegiao.totalReceita.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                dadosRegiao.totalCusto = dadosRegiao.totalCusto.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                dadosRegiao.totalLucro = dadosRegiao.totalLucro.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            }
        }

        console.log('Estatísticas por Tipo de Produto e Região:', estatisticasPorTipoProdutoERegiao);
    }

    async calcularTipoProdutoMaiorReceitaPorPais() {
        // Objeto para armazenar o tipo de produto com maior receita por país
        const tipoProdutoMaiorReceitaPorPais = {};

        // Calcula o tipo de produto com maior receita por pais com base nos dados 
        this.dados.forEach((item) => {
            const tipoProduto = item['Item Type'];
            const pais = item['Country'];
            const receita = parseFloat(item['Total Revenue']);

            // Inicializa as receitas para cada tipo de produto e pais se ainda nao existirem
            if (!tipoProdutoMaiorReceitaPorPais[tipoProduto]) {
                tipoProdutoMaiorReceitaPorPais[tipoProduto] = {};
            }

            if (!tipoProdutoMaiorReceitaPorPais[tipoProduto][pais]) {
                tipoProdutoMaiorReceitaPorPais[tipoProduto][pais] = 0;
            }

            // Atualiza a receita se a receita atual for maior do que a registrada anteriormente
            if (receita > tipoProdutoMaiorReceitaPorPais[tipoProduto][pais]) {
                tipoProdutoMaiorReceitaPorPais[tipoProduto][pais] = receita;
            }
        });

        for (const tipoProduto in tipoProdutoMaiorReceitaPorPais) {
            for (const pais in tipoProdutoMaiorReceitaPorPais[tipoProduto]) {
                tipoProdutoMaiorReceitaPorPais[tipoProduto][pais] = tipoProdutoMaiorReceitaPorPais[tipoProduto][pais].toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            }
        }

        console.log('Tipo de Produto com Maior Receita por País:', tipoProdutoMaiorReceitaPorPais);
    }
}
