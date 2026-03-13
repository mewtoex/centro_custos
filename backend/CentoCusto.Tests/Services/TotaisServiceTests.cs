using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CentroCusto.Api.Models;
using CentroCusto.Api.Models.Enums;
using CentroCusto.Api.Repositories.Interfaces;
using CentroCusto.Api.Services;
using FluentAssertions;
using Moq;
using Xunit;

namespace CentroCusto.Tests.Services
{
    public class TotaisServiceTests
    {
        private readonly Mock<IPessoaRepository> _pessoaRepoMock;
        private readonly Mock<ICategoriaRepository> _categoriaRepoMock;
        private readonly Mock<ITransacaoRepository> _transacaoRepoMock;
        private readonly TotaisService _service;

        public TotaisServiceTests()
        {
            _pessoaRepoMock = new Mock<IPessoaRepository>();
            _categoriaRepoMock = new Mock<ICategoriaRepository>();
            _transacaoRepoMock = new Mock<ITransacaoRepository>();

            _service = new TotaisService(
                _pessoaRepoMock.Object,
                _categoriaRepoMock.Object,
                _transacaoRepoMock.Object);
        }

        [Fact]
        public async Task ObterTotaisPorPessoaAsync_DeveCalcularSaldosCorretamente()
        {
            var pessoas = new List<Pessoa>
            {
                new Pessoa { Id = 1, Nome = "Ana" },
                new Pessoa { Id = 2, Nome = "Carlos" } 
            };

            var transacoes = new List<Transacao>
            {
                new Transacao { PessoaId = 1, Tipo = TipoTransacao.Receita, Valor = 1000 },
                new Transacao { PessoaId = 1, Tipo = TipoTransacao.Despesa, Valor = 200 }
            };

            _pessoaRepoMock.Setup(r => r.BuscarTodasAsync()).ReturnsAsync(pessoas);
            _transacaoRepoMock.Setup(r => r.BuscarTodasComDetalhesAsync()).ReturnsAsync(transacoes);

            var resultado = await _service.ObterTotaisPorPessoaAsync();

            resultado.Itens.Should().HaveCount(2);
            
            var totalAna = resultado.Itens.First(i => i.NomePessoa == "Ana");
            totalAna.TotalReceitas.Should().Be(1000);
            totalAna.TotalDespesas.Should().Be(200);
            totalAna.Saldo.Should().Be(800); // 1000 - 200

            var totalCarlos = resultado.Itens.First(i => i.NomePessoa == "Carlos");
            totalCarlos.Saldo.Should().Be(0);

            resultado.SaldoLiquidoGeral.Should().Be(800);
        }
    }
}