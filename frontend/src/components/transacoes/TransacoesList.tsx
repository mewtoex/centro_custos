import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransacaoForm } from "./TransacaoForm";
import { toast } from "sonner";
import { Plus, ArrowUpDown } from "lucide-react";

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipoDescricao: string;
}

type Ordenacao = { coluna: keyof Transacao | null; direcao: "asc" | "desc" };

export function TransacoesList() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [ordem, setOrdem] = useState<Ordenacao>({ coluna: "id", direcao: "asc" });

  const carregarTransacoes = async () => {
    try {
      const response = await api.get("/transacoes");
      setTransacoes(response.data);
    } catch (error) { toast.error("Erro ao carregar transações."); }
  };

  useEffect(() => { carregarTransacoes(); }, []);

  const handleSucessoFormulario = () => { setModalAberto(false); carregarTransacoes(); };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  };

  const alternarOrdem = (coluna: keyof Transacao) => {
    setOrdem({
      coluna,
      direcao: ordem.coluna === coluna && ordem.direcao === "asc" ? "desc" : "asc",
    });
  };

  const transacoesOrdenadas = [...transacoes].sort((a, b) => {
    if (!ordem.coluna) return 0;
    const valorA = a[ordem.coluna];
    const valorB = b[ordem.coluna];
    if (valorA < valorB) return ordem.direcao === "asc" ? -1 : 1;
    if (valorA > valorB) return ordem.direcao === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-800">Gerir Transações</h2>
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="flex gap-2"><Plus className="w-4 h-4" /> Nova Transação</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Registar Nova Transação</DialogTitle></DialogHeader>
            <TransacaoForm onSuccess={handleSucessoFormulario} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] cursor-pointer hover:bg-slate-50 select-none" onClick={() => alternarOrdem("id")}>
                <div className="flex items-center gap-1">ID <ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-slate-50 select-none" onClick={() => alternarOrdem("descricao")}>
                <div className="flex items-center gap-1">Descrição <ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-slate-50 select-none" onClick={() => alternarOrdem("tipoDescricao")}>
                <div className="flex items-center gap-1">Tipo <ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
              </TableHead>
              <TableHead className="text-right cursor-pointer hover:bg-slate-50 select-none" onClick={() => alternarOrdem("valor")}>
                <div className="flex items-center justify-end gap-1">Valor <ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacoesOrdenadas.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-6 text-slate-500">Nenhuma transação registada.</TableCell></TableRow>
            ) : (
              transacoesOrdenadas.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.id}</TableCell>
                  <TableCell className="font-medium">{t.descricao}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      t.tipoDescricao === 'Receita' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {t.tipoDescricao || "Registado"}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right font-bold ${t.tipoDescricao === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                    {formatarMoeda(t.valor)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}