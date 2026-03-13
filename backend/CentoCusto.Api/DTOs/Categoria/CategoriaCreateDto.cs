using System.ComponentModel.DataAnnotations;
using CentroCusto.Api.Models.Enums;

namespace CentroCusto.Api.DTOs.Categoria
{
    public class CategoriaCreateDto
    {
        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "A finalidade da categoria é obrigatória.")]
        public FinalidadeCategoria Finalidade { get; set; }
    }
}