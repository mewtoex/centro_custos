namespace CentroCusto.Api.DTOs.Transacao
{
    public class TransacaoResponseDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string TipoDescricao { get; set; } = string.Empty; 
        
        public int PessoaId { get; set; }
        public string PessoaNome { get; set; } = string.Empty; 
        
        public int CategoriaId { get; set; }
        public string CategoriaDescricao { get; set; } = string.Empty; 
    }
}