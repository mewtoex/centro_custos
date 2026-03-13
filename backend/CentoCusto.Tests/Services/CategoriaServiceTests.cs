using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CentroCusto.Api.DTOs.Categoria;
using CentroCusto.Api.Models;
using CentroCusto.Api.Models.Enums;
using CentroCusto.Api.Repositories.Interfaces;
using CentroCusto.Api.Services;
using FluentAssertions;
using Moq;
using Xunit;

namespace CentroCusto.Tests.Services
{
    public class CategoriaServiceTests
    {
        private readonly Mock<ICategoriaRepository> _categoriaRepoMock;
        private readonly CategoriaService _service;

        public CategoriaServiceTests()
        {
            _categoriaRepoMock = new Mock<ICategoriaRepository>();
            _service = new CategoriaService(_categoriaRepoMock.Object);
        }

        [Fact]
        public async Task BuscarTodasAsync_DeveRetornarCategoriasMapeadas()
        {
            var categoriasMock = new List<Categoria>
            {
                new Categoria { Id = 1, Descricao = "Luz", Finalidade = FinalidadeCategoria.Despesa }
            };
            _categoriaRepoMock.Setup(r => r.BuscarTodasAsync()).ReturnsAsync(categoriasMock);

            var resultado = await _service.BuscarTodasAsync();

            resultado.Should().NotBeNull();
            resultado.Should().HaveCount(1);
            resultado.First().FinalidadeDescricao.Should().Be("Despesa");
        }
    }
}