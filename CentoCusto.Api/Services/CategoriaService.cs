using CentroCusto.Api.DTOs.Categoria;
using CentroCusto.Api.Models;
using CentroCusto.Api.Repositories.Interfaces;
using CentroCusto.Api.Services.Interfaces;

namespace CentroCusto.Api.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _categoriaRepository;

        public CategoriaService(ICategoriaRepository categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }

        public async Task<IEnumerable<CategoriaResponseDto>> BuscarTodasAsync()
        {
            var categorias = await _categoriaRepository.BuscarTodasAsync();

            return categorias.Select(c => new CategoriaResponseDto
            {
                Id = c.Id,
                Descricao = c.Descricao,
                FinalidadeDescricao = c.Finalidade.ToString() 
            });
        }

        public async Task<CategoriaResponseDto> AdicionarAsync(CategoriaCreateDto dto)
        {
            var novaCategoria = new Categoria
            {
                Descricao = dto.Descricao,
                Finalidade = dto.Finalidade
            };

            var categoriaSalva = await _categoriaRepository.AdicionarAsync(novaCategoria);

            return new CategoriaResponseDto
            {
                Id = categoriaSalva.Id,
                Descricao = categoriaSalva.Descricao,
                FinalidadeDescricao = categoriaSalva.Finalidade.ToString()
            };
        }
    }
}