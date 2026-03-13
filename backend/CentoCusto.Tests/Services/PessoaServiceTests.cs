using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CentroCusto.Api.DTOs.Pessoa;
using CentroCusto.Api.Models;
using CentroCusto.Api.Repositories.Interfaces;
using CentroCusto.Api.Services;
using FluentAssertions;
using Moq;
using Xunit;

namespace CentroCusto.Tests.Services
{
    public class PessoaServiceTests
    {
        private readonly Mock<IPessoaRepository> _pessoaRepoMock;
        private readonly PessoaService _service;

        public PessoaServiceTests()
        {
            _pessoaRepoMock = new Mock<IPessoaRepository>();
            _service = new PessoaService(_pessoaRepoMock.Object);
        }

        [Fact]
        public async Task AtualizarAsync_DeveLancarExcecao_QuandoPessoaNaoEncontrada()
        {
            var dto = new PessoaUpdateDto { Id = 99, Nome = "Teste", Idade = 20 };
            _pessoaRepoMock.Setup(r => r.BuscarPorIdAsync(dto.Id)).ReturnsAsync((Pessoa?)null);

            Func<Task> acao = async () => await _service.AtualizarAsync(dto);
            await acao.Should().ThrowAsync<KeyNotFoundException>().WithMessage("Pessoa não encontrada.");
        }

        [Fact]
        public async Task DeletarAsync_DeveLancarExcecao_QuandoPessoaNaoEncontrada()
        {
            _pessoaRepoMock.Setup(r => r.BuscarPorIdAsync(99)).ReturnsAsync((Pessoa?)null);

            Func<Task> acao = async () => await _service.DeletarAsync(99);
            await acao.Should().ThrowAsync<KeyNotFoundException>().WithMessage("Pessoa não encontrada.");
        }
    }
}