using CentroCusto.Api.DTOs.Totais;
using CentroCusto.Api.Models.Enums;
using CentroCusto.Api.Repositories.Interfaces;
using CentroCusto.Api.Services.Interfaces;

namespace CentroCusto.Api.Services
{
    public class TotaisService : ITotaisService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ICategoriaRepository _categoriaRepository;
        private readonly ITransacaoRepository _transacaoRepository;

        public TotaisService(
            IPessoaRepository pessoaRepository,
            ICategoriaRepository categoriaRepository,
            ITransacaoRepository transacaoRepository)
        {
            _pessoaRepository = pessoaRepository;
            _categoriaRepository = categoriaRepository;
            _transacaoRepository = transacaoRepository;
        }

        public async Task<ResultadoTotaisDto<TotalPessoaDto>> ObterTotaisPorPessoaAsync()
        {
            var pessoas = await _pessoaRepository.BuscarTodasAsync();
            var transacoes = await _transacaoRepository.BuscarTodasComDetalhesAsync();

            var itens = pessoas.Select(p => 
            {
                var transacoesPessoa = transacoes.Where(t => t.PessoaId == p.Id).ToList();
                var receitas = transacoesPessoa.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
                var despesas = transacoesPessoa.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);

                return new TotalPessoaDto
                {
                    NomePessoa = p.Nome,
                    TotalReceitas = receitas,
                    TotalDespesas = despesas,
                    Saldo = receitas - despesas
                };
            }).ToList();

            return new ResultadoTotaisDto<TotalPessoaDto>
            {
                Itens = itens,
                TotalGeralReceitas = itens.Sum(i => i.TotalReceitas),
                TotalGeralDespesas = itens.Sum(i => i.TotalDespesas),
                SaldoLiquidoGeral = itens.Sum(i => i.Saldo)
            };
        }

        public async Task<ResultadoTotaisDto<TotalCategoriaDto>> ObterTotaisPorCategoriaAsync()
        {
            var categorias = await _categoriaRepository.BuscarTodasAsync();
            var transacoes = await _transacaoRepository.BuscarTodasComDetalhesAsync();

            var itens = categorias.Select(c => 
            {
                var transacoesCategoria = transacoes.Where(t => t.CategoriaId == c.Id).ToList();
                var receitas = transacoesCategoria.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
                var despesas = transacoesCategoria.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);

                return new TotalCategoriaDto
                {
                    DescricaoCategoria = c.Descricao,
                    TotalReceitas = receitas,
                    TotalDespesas = despesas,
                    Saldo = receitas - despesas
                };
            }).ToList();

            return new ResultadoTotaisDto<TotalCategoriaDto>
            {
                Itens = itens,
                TotalGeralReceitas = itens.Sum(i => i.TotalReceitas),
                TotalGeralDespesas = itens.Sum(i => i.TotalDespesas),
                SaldoLiquidoGeral = itens.Sum(i => i.Saldo)
            };
        }
    }
}