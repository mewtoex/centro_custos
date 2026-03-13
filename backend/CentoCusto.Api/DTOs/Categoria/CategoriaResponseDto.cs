using CentroCusto.Api.Models.Enums;

namespace CentroCusto.Api.DTOs.Categoria
{
    public class CategoriaResponseDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string FinalidadeDescricao { get; set; } = string.Empty; 
    }
}