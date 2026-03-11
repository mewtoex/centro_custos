using System.ComponentModel.DataAnnotations;

namespace CentroCusto.Api.DTOs.Pessoa
{
    public class PessoaUpdateDto
    {
        [Required(ErrorMessage = "O ID é obrigatório para a edição.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "A idade é obrigatória.")]
        public int Idade { get; set; }
    }
}