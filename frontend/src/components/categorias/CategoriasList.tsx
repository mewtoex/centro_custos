import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CategoriaForm } from "./CategoriaForm";
import { toast } from "sonner";
import { Plus, ArrowUpDown } from "lucide-react";
import { Categoria } from "@/types";

type Ordenacao = { coluna: keyof Categoria | null; direcao: "asc" | "desc" };

export function CategoriasList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [ordem, setOrdem] = useState<Ordenacao>({ coluna: "id", direcao: "asc" });

  const carregarCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (error) { toast.error("Erro ao carregar categorias."); }
  };

  useEffect(() => { carregarCategorias(); }, []);

  const handleSucessoFormulario = () => { setModalAberto(false); carregarCategorias(); };

  const alternarOrdem = (coluna: keyof Categoria) => {
    setOrdem({
      coluna,
      direcao: ordem.coluna === coluna && ordem.direcao === "asc" ? "desc" : "asc",
    });
  };

  const categoriasOrdenadas = [...categorias].sort((a, b) => {
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
        <h2 className="text-2xl font-semibold text-slate-800">Gerir Categorias</h2>
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="flex gap-2"><Plus className="w-4 h-4" /> Nova Categoria</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Registar Nova Categoria</DialogTitle></DialogHeader>
            <CategoriaForm onSuccess={handleSucessoFormulario} />
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
              <TableHead className="cursor-pointer hover:bg-slate-50 select-none" onClick={() => alternarOrdem("finalidadeDescricao")}>
                <div className="flex items-center gap-1">Finalidade <ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriasOrdenadas.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center py-6 text-slate-500">Nenhuma categoria registada.</TableCell></TableRow>
            ) : (
              categoriasOrdenadas.map((c) => (
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