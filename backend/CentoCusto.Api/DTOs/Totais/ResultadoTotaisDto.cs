namespace CentroCusto.Api.DTOs.Totais
{
    public class ResultadoTotaisDto<T>
    {
        public IEnumerable<T> Itens { get; set; } = new List<T>();
        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }
        public decimal SaldoLiquidoGeral { get; set; }
    }
}