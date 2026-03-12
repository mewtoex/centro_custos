using CentroCusto.Api.DTOs.Transacao;
using CentroCusto.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CentroCusto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly ITransacaoService _transacaoService;

        public TransacoesController(ITransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        [HttpGet]
        public async Task<IActionResult> BuscarTodas()
        {
            var transacoes = await _transacaoService.BuscarTodasAsync();
            return Ok(transacoes);
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] TransacaoCreateDto dto)
        {
            try
            {
                var transacaoCriada = await _transacaoService.AdicionarAsync(dto);
                return StatusCode(201, transacaoCriada);
            }
            catch (ArgumentException ex) 
            {
                return NotFound(new { erro = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }
    }
}