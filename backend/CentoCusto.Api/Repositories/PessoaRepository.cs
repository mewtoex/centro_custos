using CentroCusto.Api.Data;
using CentroCusto.Api.Models;
using CentroCusto.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CentroCusto.Api.Repositories
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly AppDbContext _context;

        public PessoaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pessoa>> BuscarTodasAsync()
        {
            return await _context.Pessoas.AsNoTracking().ToListAsync();
        }

        public async Task<Pessoa?> BuscarPorIdAsync(int id)
        {
            return await _context.Pessoas.FindAsync(id);
        }

        public async Task<Pessoa> AdicionarAsync(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return pessoa;
        }

        public async Task AtualizarAsync(Pessoa pessoa)
        {
            _context.Pessoas.Update(pessoa);
            await _context.SaveChangesAsync();
        }

        public async Task DeletarAsync(Pessoa pessoa)
        {
            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
        }
    }
}