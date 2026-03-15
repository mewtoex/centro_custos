import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PessoaForm } from "./PessoaForm";
import { toast } from "sonner";
import { Trash2, Plus, Pencil, ArrowUpDown } from "lucide-react"; 

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

type Ordenacao = { coluna: keyof Pessoa | null; direcao: "asc" | "desc" };

export function PessoasList() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);
  
  const [ordem, setOrdem] = useState<Ordenacao>({ coluna: "id", direcao: "asc" });

  const carregarPessoas = async () => {
    try {
      const response = await api.get("/pessoas");
      setPessoas(response.data);
    } catch (error) {
      toast.error("Erro ao carregar lista de pessoas.");
    }
  };

  useEffect(() => { carregarPessoas(); }, []);

  const deletarPessoa = async (id: number) => {
    if (!confirm("Tem a certeza que deseja excluir esta pessoa? Todas as transações dela também serão apagadas!")) return;
    try {
      await api.delete(`/pessoas/${id}`);
      toast.success("Pessoa excluída com sucesso!");
      carregarPessoas();
    } catch (error) {
      toast.error("Erro ao excluir pessoa.");
    }
  };

  const abrirModalNova = () => { setPessoaEditando(null); setModalAberto(true); };
  const abrirModalEditar = (pessoa: Pessoa) => { setPessoaEditando(pessoa); setModalAberto(true); };
  const handleSucessoFormulario = () => { setModalAberto(false); carregarPessoas(); };

  const alternarOrdem = (coluna: keyof Pessoa) => {
    setOrdem({
      coluna,
      direcao: ordem.coluna === coluna && ordem.direcao === "asc" ? "desc" : "asc",
    });
  };

  const pessoasOrdenadas = [...pessoas].sort((a, b) => {
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
        <h2 className="text-2xl font-semibold text-slate-800">Gerir Pessoas</h2>
        <Button onClick={abrirModalNova} className="flex gap-2"><Plus className="w-4 h-4" /> Nova Pessoa</Button>
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{pessoaEditando ? "Editar Pessoa" : "Registar Nova Pessoa"}</DialogTitle>
            </DialogHeader>
            <PessoaForm onSuccess={handleSucessoFormulario} pessoaParaEditar={pessoaEditando} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer hover:bg-slate-50 select-none" onClick={() => alternarOrdem("id")}>
                <div className="flex items-center gap-1">ID <ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-slate-50 select-none" onClick={() => alternarOrdem("nome")}>
                <div className="flex items-center gap-1">Nome <ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-slate-50 select-none" onClick={() => alternarOrdem("idade")}>
                <div className="flex items-center gap-1">Idade <ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pessoasOrdenadas.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-6 text-slate-500">Nenhuma pessoa registada.</TableCell></TableRow>
            ) : (
              pessoasOrdenadas.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.idade} anos</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => abrirModalEditar(p)} title="Editar"><Pencil className="w-4 h-4 text-slate-600" /></Button>
                    <Button variant="destructive" size="icon" onClick={() => deletarPessoa(p.id)} title="Excluir"><Trash2 className="w-4 h-4" /></Button>
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