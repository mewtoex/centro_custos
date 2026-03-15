import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PessoaForm } from "./PessoaForm";
import { toast } from "sonner";
import { Trash2, Plus, Pencil } from "lucide-react"; 

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export function PessoasList() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);

  const carregarPessoas = async () => {
    try {
      const response = await api.get("/pessoas");
      setPessoas(response.data);
    } catch (error) {
      toast.error("Erro ao carregar lista de pessoas.");
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

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

  const abrirModalNova = () => {
    setPessoaEditando(null); 
    setModalAberto(true);
  };

  const abrirModalEditar = (pessoa: Pessoa) => {
    setPessoaEditando(pessoa); 
    setModalAberto(true);
  };

  const handleSucessoFormulario = () => {
    setModalAberto(false);
    carregarPessoas();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-800">Gerir Pessoas</h2>
        
        <Button onClick={abrirModalNova} className="flex gap-2">
          <Plus className="w-4 h-4" /> Nova Pessoa
        </Button>

        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {pessoaEditando ? "Editar Pessoa" : "Registar Nova Pessoa"}
              </DialogTitle>
            </DialogHeader>
            <PessoaForm onSuccess={handleSucessoFormulario} pessoaParaEditar={pessoaEditando} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pessoas.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-6 text-slate-500">Nenhuma pessoa registada.</TableCell></TableRow>
            ) : (
              pessoas.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.idade} anos</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => abrirModalEditar(p)} title="Editar">
                      <Pencil className="w-4 h-4 text-slate-600" />
                    </Button>
                    
                    <Button variant="destructive" size="icon" onClick={() => deletarPessoa(p.id)} title="Excluir">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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