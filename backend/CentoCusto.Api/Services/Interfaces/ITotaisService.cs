using CentroCusto.Api.DTOs.Totais;

namespace CentroCusto.Api.Services.Interfaces
{
    public interface ITotaisService
    {
        Task<ResultadoTotaisDto<TotalPessoaDto>> ObterTotaisPorPessoaAsync();
        Task<ResultadoTotaisDto<TotalCategoriaDto>> ObterTotaisPorCategoriaAsync();
    }
}