using CentroCusto.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CentroCusto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly ITotaisService _totaisService;

        public RelatoriosController(ITotaisService totaisService)
        {
            _totaisService = totaisService;
        }

        [HttpGet("totais-por-pessoa")]
        public async Task<IActionResult> ObterTotaisPorPessoa()
        {
            var relatorio = await _totaisService.ObterTotaisPorPessoaAsync();
            return Ok(relatorio);
        }

        [HttpGet("totais-por-categoria")]
        public async Task<IActionResult> ObterTotaisPorCategoria()
        {
            var relatorio = await _totaisService.ObterTotaisPorCategoriaAsync();
            return Ok(relatorio);
        }
    }
}