using CentroCusto.Api.DTOs.Transacao;

namespace CentroCusto.Api.Services.Interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<TransacaoResponseDto>> BuscarTodasAsync();
        Task<TransacaoResponseDto> AdicionarAsync(TransacaoCreateDto dto);
    }
}