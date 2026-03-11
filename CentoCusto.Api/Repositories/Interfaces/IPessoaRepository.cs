using CentroCusto.Api.Models;

namespace CentroCusto.Api.Repositories.Interfaces
{
    public interface IPessoaRepository
    {
        Task<IEnumerable<Pessoa>> BuscarTodasAsync();
        Task<Pessoa?> BuscarPorIdAsync(int id);
        Task<Pessoa> AdicionarAsync(Pessoa pessoa);
        Task AtualizarAsync(Pessoa pessoa);
        Task DeletarAsync(Pessoa pessoa);
    }
}