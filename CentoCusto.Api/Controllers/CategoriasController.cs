using CentroCusto.Api.DTOs.Categoria;
using CentroCusto.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CentroCusto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriasController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<IActionResult> BuscarTodas()
        {
            var categorias = await _categoriaService.BuscarTodasAsync();
            return Ok(categorias);
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CategoriaCreateDto dto)
        {
            var categoriaCriada = await _categoriaService.AdicionarAsync(dto);
            return StatusCode(201, categoriaCriada); 
        }
    }
}