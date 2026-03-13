using CentroCusto.Api.DTOs.Pessoa;

namespace CentroCusto.Api.Services.Interfaces
{
    public interface IPessoaService
    {
        Task<IEnumerable<PessoaResponseDto>> BuscarTodasAsync();
        Task<PessoaResponseDto?> BuscarPorIdAsync(int id);
        Task<PessoaResponseDto> AdicionarAsync(PessoaCreateDto dto);
        Task AtualizarAsync(PessoaUpdateDto dto);
        Task DeletarAsync(int id);
    }
}