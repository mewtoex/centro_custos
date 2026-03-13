using CentroCusto.Api.DTOs.Pessoa;
using CentroCusto.Api.Models;
using CentroCusto.Api.Repositories.Interfaces;
using CentroCusto.Api.Services.Interfaces;

namespace CentroCusto.Api.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;

        public PessoaService(IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;
        }

        public async Task<IEnumerable<PessoaResponseDto>> BuscarTodasAsync()
        {
            var pessoas = await _pessoaRepository.BuscarTodasAsync();
            
            return pessoas.Select(p => new PessoaResponseDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade
            });
        }

        public async Task<PessoaResponseDto?> BuscarPorIdAsync(int id)
        {
            var pessoa = await _pessoaRepository.BuscarPorIdAsync(id);
            if (pessoa == null) return null;

            return new PessoaResponseDto
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            };
        }

        public async Task<PessoaResponseDto> AdicionarAsync(PessoaCreateDto dto)
        {
            var novaPessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            var pessoaSalva = await _pessoaRepository.AdicionarAsync(novaPessoa);

            return new PessoaResponseDto
            {
                Id = pessoaSalva.Id,
                Nome = pessoaSalva.Nome,
                Idade = pessoaSalva.Idade
            };
        }

        public async Task AtualizarAsync(PessoaUpdateDto dto)
        {
            var pessoaExistente = await _pessoaRepository.BuscarPorIdAsync(dto.Id);
            
            if (pessoaExistente == null)
                throw new KeyNotFoundException("Pessoa não encontrada.");

            pessoaExistente.Nome = dto.Nome;
            pessoaExistente.Idade = dto.Idade;

            await _pessoaRepository.AtualizarAsync(pessoaExistente);
        }

        public async Task DeletarAsync(int id)
        {
            var pessoaExistente = await _pessoaRepository.BuscarPorIdAsync(id);
            
            if (pessoaExistente == null)
                throw new KeyNotFoundException("Pessoa não encontrada.");

            await _pessoaRepository.DeletarAsync(pessoaExistente);
        }
    }
}