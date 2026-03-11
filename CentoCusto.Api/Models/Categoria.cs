using System.ComponentModel.DataAnnotations;
using CentroCusto.Api.Models.Enums;

namespace CentroCusto.Api.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "A finalidade da categoria é obrigatória.")]
        public FinalidadeCategoria Finalidade { get; set; }

        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}