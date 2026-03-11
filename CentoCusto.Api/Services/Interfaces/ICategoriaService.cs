using CentroCusto.Api.DTOs.Categoria;

namespace CentroCusto.Api.Services.Interfaces
{
    public interface ICategoriaService
    {
        Task<IEnumerable<CategoriaResponseDto>> BuscarTodasAsync();
        Task<CategoriaResponseDto> AdicionarAsync(CategoriaCreateDto dto);
    }
}