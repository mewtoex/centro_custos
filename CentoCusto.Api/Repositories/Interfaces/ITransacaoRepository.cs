using CentroCusto.Api.Models;

namespace CentroCusto.Api.Repositories.Interfaces
{
    public interface ITransacaoRepository
    {
        Task<IEnumerable<Transacao>> BuscarTodasComDetalhesAsync(); 
        Task<Transacao> AdicionarAsync(Transacao transacao);
        Task<IEnumerable<Transacao>> BuscarTodasParaRelatorioAsync();
    }
}