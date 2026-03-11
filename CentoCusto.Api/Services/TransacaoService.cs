using CentroCusto.Api.DTOs.Transacao;
using CentroCusto.Api.Models;
using CentroCusto.Api.Models.Enums;
using CentroCusto.Api.Repositories.Interfaces;
using CentroCusto.Api.Services.Interfaces;

namespace CentroCusto.Api.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ICategoriaRepository _categoriaRepository;

        public TransacaoService(
            ITransacaoRepository transacaoRepository,
            IPessoaRepository pessoaRepository,
            ICategoriaRepository categoriaRepository)
        {
            _transacaoRepository = transacaoRepository;
            _pessoaRepository = pessoaRepository;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<IEnumerable<TransacaoResponseDto>> BuscarTodasAsync()
        {
            var transacoes = await _transacaoRepository.BuscarTodasComDetalhesAsync();

            return transacoes.Select(t => new TransacaoResponseDto
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                TipoDescricao = t.Tipo.ToString(),
                PessoaId = t.PessoaId,
                PessoaNome = t.Pessoa?.Nome ?? "Desconhecido", 
                CategoriaId = t.CategoriaId,
                CategoriaDescricao = t.Categoria?.Descricao ?? "Desconhecida"
            });
        }

        public async Task<TransacaoResponseDto> AdicionarAsync(TransacaoCreateDto dto)
        {
            var pessoa = await _pessoaRepository.BuscarPorIdAsync(dto.PessoaId);
            if (pessoa == null)
                throw new ArgumentException("A pessoa informada não existe.");

            var categoria = await _categoriaRepository.BuscarPorIdAsync(dto.CategoriaId);
            if (categoria == null)
                throw new ArgumentException("A categoria informada não existe.");

            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
            {
                throw new InvalidOperationException("Pessoas menores de 18 anos só podem registrar transações do tipo Despesa.");
            }

            bool categoriaValida = categoria.Finalidade == FinalidadeCategoria.Ambas ||
                                  (categoria.Finalidade == FinalidadeCategoria.Despesa && dto.Tipo == TipoTransacao.Despesa) ||
                                  (categoria.Finalidade == FinalidadeCategoria.Receita && dto.Tipo == TipoTransacao.Receita);

            if (!categoriaValida)
            {
                throw new InvalidOperationException($"A categoria '{categoria.Descricao}' ({categoria.Finalidade}) não permite transações do tipo {dto.Tipo}.");
            }

            var novaTransacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId,
                CategoriaId = dto.CategoriaId
            };

            var transacaoSalva = await _transacaoRepository.AdicionarAsync(novaTransacao);

            return new TransacaoResponseDto
            {
                Id = transacaoSalva.Id,
                Descricao = transacaoSalva.Descricao,
                Valor = transacaoSalva.Valor,
                TipoDescricao = transacaoSalva.Tipo.ToString(),
                PessoaId = pessoa.Id,
                PessoaNome = pessoa.Nome,
                CategoriaId = categoria.Id,
                CategoriaDescricao = categoria.Descricao
            };
        }
    }
}