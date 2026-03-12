using CentroCusto.Api.DTOs.Pessoa;
using CentroCusto.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CentroCusto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoasController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpGet]
        public async Task<IActionResult> BuscarTodas()
        {
            var pessoas = await _pessoaService.BuscarTodasAsync();
            return Ok(pessoas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarPorId(int id)
        {
            var pessoa = await _pessoaService.BuscarPorIdAsync(id);
            if (pessoa == null) return NotFound("Pessoa não encontrada.");
            return Ok(pessoa);
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] PessoaCreateDto dto)
        {
            var pessoaCriada = await _pessoaService.AdicionarAsync(dto);
            return CreatedAtAction(nameof(BuscarPorId), new { id = pessoaCriada.Id }, pessoaCriada);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] PessoaUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest("O ID da URL não confere com o ID do corpo da requisição.");

            try
            {
                await _pessoaService.AtualizarAsync(dto);
                return NoContent(); 
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            try
            {
                await _pessoaService.DeletarAsync(id);
                return NoContent(); 
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}