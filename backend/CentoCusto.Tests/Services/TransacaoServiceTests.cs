using System;
using System.Threading.Tasks;
using CentroCusto.Api.DTOs.Transacao;
using CentroCusto.Api.Models;
using CentroCusto.Api.Models.Enums;
using CentroCusto.Api.Repositories.Interfaces;
using CentroCusto.Api.Services;
using FluentAssertions;
using Moq;
using Xunit;

namespace CentroCusto.Tests.Services
{
    public class TransacaoServiceTests
    {
        private readonly Mock<ITransacaoRepository> _transacaoRepoMock;
        private readonly Mock<IPessoaRepository> _pessoaRepoMock;
        private readonly Mock<ICategoriaRepository> _categoriaRepoMock;
        private readonly TransacaoService _service;

        public TransacaoServiceTests()
        {
            _transacaoRepoMock = new Mock<ITransacaoRepository>();
            _pessoaRepoMock = new Mock<IPessoaRepository>();
            _categoriaRepoMock = new Mock<ICategoriaRepository>();

            _service = new TransacaoService(
                _transacaoRepoMock.Object,
                _pessoaRepoMock.Object,
                _categoriaRepoMock.Object);
        }

        [Fact]
        public async Task AdicionarAsync_DeveLancarExcecao_QuandoPessoaNaoExistir()
        {
            var dto = new TransacaoCreateDto { PessoaId = 99, CategoriaId = 1 };
            _pessoaRepoMock.Setup(repo => repo.BuscarPorIdAsync(dto.PessoaId)).ReturnsAsync((Pessoa?)null);

            Func<Task> acao = async () => await _service.AdicionarAsync(dto);
            await acao.Should().ThrowAsync<ArgumentException>().WithMessage("A pessoa informada não existe.");
        }

        [Fact]
        public async Task AdicionarAsync_DeveLancarExcecao_QuandoMenorDe18AnosTentarRegistrarReceita()
        {
            var dto = new TransacaoCreateDto { PessoaId = 1, CategoriaId = 1, Tipo = TipoTransacao.Receita };
            var pessoaMenorDeIdade = new Pessoa { Id = 1, Nome = "João", Idade = 17 };
            var categoriaAmbas = new Categoria { Id = 1, Finalidade = FinalidadeCategoria.Ambas };

            _pessoaRepoMock.Setup(r => r.BuscarPorIdAsync(dto.PessoaId)).ReturnsAsync(pessoaMenorDeIdade);
            _categoriaRepoMock.Setup(r => r.BuscarPorIdAsync(dto.CategoriaId)).ReturnsAsync(categoriaAmbas);

            Func<Task> acao = async () => await _service.AdicionarAsync(dto);
            await acao.Should().ThrowAsync<InvalidOperationException>()
                .WithMessage("Pessoas menores de 18 anos só podem registrar transações do tipo Despesa.");
        }

        [Fact]
        public async Task AdicionarAsync_DeveLancarExcecao_QuandoCategoriaForIncompativelComTipo()
        {
            var dto = new TransacaoCreateDto { PessoaId = 1, CategoriaId = 1, Tipo = TipoTransacao.Despesa };
            var pessoaMaior = new Pessoa { Id = 1, Nome = "Maria", Idade = 30 };
            var categoriaReceita = new Categoria { Id = 1, Descricao = "Salário", Finalidade = FinalidadeCategoria.Receita };

            _pessoaRepoMock.Setup(r => r.BuscarPorIdAsync(dto.PessoaId)).ReturnsAsync(pessoaMaior);
            _categoriaRepoMock.Setup(r => r.BuscarPorIdAsync(dto.CategoriaId)).ReturnsAsync(categoriaReceita);

            Func<Task> acao = async () => await _service.AdicionarAsync(dto);
            await acao.Should().ThrowAsync<InvalidOperationException>()
                .WithMessage("A categoria 'Salário' (Receita) não permite transações do tipo Despesa.");
        }
    }
}