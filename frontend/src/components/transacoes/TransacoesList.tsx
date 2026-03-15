import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransacaoForm } from "./TransacaoForm";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipoDescricao: string;
}

export function TransacoesList() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  const carregarTransacoes = async () => {
    try {
      const response = await api.get("/transacoes");
      setTransacoes(response.data);
    } catch (error) {
      toast.error("Erro ao carregar transações.");
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleSucessoFormulario = () => {
    setModalAberto(false);
    carregarTransacoes();
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-800">Gerir Transações</h2>
        
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="flex gap-2"><Plus className="w-4 h-4" /> Nova Transação</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registar Nova Transação</DialogTitle>
            </DialogHeader>
            <TransacaoForm onSuccess={handleSucessoFormulario} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacoes.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-6 text-slate-500">Nenhuma transação registada.</TableCell></TableRow>
            ) : (
              transacoes.map((t) => (
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