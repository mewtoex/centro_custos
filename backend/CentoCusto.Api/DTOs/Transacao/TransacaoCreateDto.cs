using System.ComponentModel.DataAnnotations;
using CentroCusto.Api.Models.Enums;

namespace CentroCusto.Api.DTOs.Transacao
{
    public class TransacaoCreateDto
    {
        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "O valor é obrigatório.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
        public decimal Valor { get; set; }

        [Required(ErrorMessage = "O tipo da transação é obrigatório.")]
        public TipoTransacao Tipo { get; set; }

        [Required(ErrorMessage = "O ID da Pessoa é obrigatório.")]
        public int PessoaId { get; set; }

        [Required(ErrorMessage = "O ID da Categoria é obrigatório.")]
        public int CategoriaId { get; set; }
    }
}