using CentroCusto.Api.Models;

namespace CentroCusto.Api.Repositories.Interfaces
{
    public interface ICategoriaRepository
    {
        Task<IEnumerable<Categoria>> BuscarTodasAsync();
        Task<Categoria?> BuscarPorIdAsync(int id);
        Task<Categoria> AdicionarAsync(Categoria categoria);
    }
}