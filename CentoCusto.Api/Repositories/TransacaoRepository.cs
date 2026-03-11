using CentroCusto.Api.Data;
using CentroCusto.Api.Models;
using CentroCusto.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CentroCusto.Api.Repositories
{
    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly AppDbContext _context;

        public TransacaoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transacao>> BuscarTodasComDetalhesAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Transacao> AdicionarAsync(Transacao transacao)
        {
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
            return transacao;
        }

        public async Task<IEnumerable<Transacao>> BuscarTodasParaRelatorioAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}