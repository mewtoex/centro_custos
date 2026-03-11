namespace CentroCusto.Api.DTOs.Totais
{
    public class TotalCategoriaDto
    {
        public string DescricaoCategoria { get; set; } = string.Empty;
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }
}