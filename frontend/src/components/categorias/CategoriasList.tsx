import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CategoriaForm } from "./CategoriaForm";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface Categoria {
  id: number;
  descricao: string;
  finalidade: number;
  finalidadeDescricao: string; 
}

export function CategoriasList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  const carregarCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (error) {
      toast.error("Erro ao carregar categorias.");
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleSucessoFormulario = () => {
    setModalAberto(false);
    carregarCategorias();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-800">Gerir Categorias</h2>
        
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="flex gap-2"><Plus className="w-4 h-4" /> Nova Categoria</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registar Nova Categoria</DialogTitle>
            </DialogHeader>
            <CategoriaForm onSuccess={handleSucessoFormulario} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Finalidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorias.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center py-6 text-slate-500">Nenhuma categoria registada.</TableCell></TableRow>
            ) : (
              categorias.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell className="font-medium">{c.descricao}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      c.finalidadeDescricao === 'Receita' ? 'bg-green-100 text-green-700' : 
                      c.finalidadeDescricao === 'Despesa' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {c.finalidadeDescricao}
                    </span>
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