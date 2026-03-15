import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react"; 

interface ResultadoTotais<T> {
  itens: T[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}

interface TotalPessoa {
  nomePessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface TotalCategoria {
  descricaoCategoria: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export function Relatorios() {
  const [totaisPessoa, setTotaisPessoa] = useState<ResultadoTotais<TotalPessoa> | null>(null);
  const [totaisCategoria, setTotaisCategoria] = useState<ResultadoTotais<TotalCategoria> | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregarRelatorios = async () => {
    setCarregando(true);
    try {
      const [resPessoas, resCategorias] = await Promise.all([
        api.get("/relatorios/totais-por-pessoa"),
        api.get("/relatorios/totais-por-categoria")
      ]);
      setTotaisPessoa(resPessoas.data);
      setTotaisCategoria(resCategorias.data);
      toast.success("Relatórios atualizados com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar os relatórios.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  if (!totaisPessoa || !totaisCategoria) return null;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 mt-12">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📊 Dashboard Financeiro</h2>
          <p className="text-slate-500">Resumo de receitas, despesas e saldos líquidos.</p>
        </div>
        <Button onClick={carregarRelatorios} disabled={carregando} variant="outline" className="flex gap-2">
          <RefreshCw className={`w-4 h-4 ${carregando ? "animate-spin" : ""}`} />
          Atualizar Dados
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* TABELA 1: TOTAIS POR PESSOA */}
        <Card className="shadow-md">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle>Totais por Pessoa</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pessoa</TableHead>
                  <TableHead className="text-right text-green-600">Receitas</TableHead>
                  <TableHead className="text-right text-red-600">Despesas</TableHead>
                  <TableHead className="text-right font-bold">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {totaisPessoa.itens.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.nomePessoa}</TableCell>
                    <TableCell className="text-right text-green-600">{formatarMoeda(item.totalReceitas)}</TableCell>
                    <TableCell className="text-right text-red-600">{formatarMoeda(item.totalDespesas)}</TableCell>
                    <TableCell className={`text-right font-bold ${item.saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatarMoeda(item.saldo)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* TABELA 2: TOTAIS POR CATEGORIA */}
        <Card className="shadow-md">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle>Totais por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right text-green-600">Receitas</TableHead>
                  <TableHead className="text-right text-red-600">Despesas</TableHead>
                  <TableHead className="text-right font-bold">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {totaisCategoria.itens.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.descricaoCategoria}</TableCell>
                    <TableCell className="text-right text-green-600">{formatarMoeda(item.totalReceitas)}</TableCell>
                    <TableCell className="text-right text-red-600">{formatarMoeda(item.totalDespesas)}</TableCell>
                    <TableCell className={`text-right font-bold ${item.saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatarMoeda(item.saldo)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* RODAPÉ COM O SALDO GERAL */}
      <Card className="bg-slate-900 text-white shadow-xl">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Balanço Geral da Residência</p>
            <h3 className="text-3xl font-extrabold mt-1">
              {formatarMoeda(totaisPessoa.saldoLiquidoGeral)}
            </h3>
          </div>
          <div className="flex gap-8 text-right">
            <div>
              <p className="text-slate-400 text-sm">Total Entradas</p>
              <p className="text-green-400 font-bold text-lg">{formatarMoeda(totaisPessoa.totalGeralReceitas)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Saídas</p>
              <p className="text-red-400 font-bold text-lg">{formatarMoeda(totaisPessoa.totalGeralDespesas)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}