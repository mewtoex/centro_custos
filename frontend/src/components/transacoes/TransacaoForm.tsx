import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pessoa ,Categoria } from "@/types";

interface TransacaoFormProps {
  onSuccess: () => void;
}

export function TransacaoForm({ onSuccess }: TransacaoFormProps) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const resPessoas = await api.get("/pessoas");
        const resCategorias = await api.get("/categorias");
        setPessoas(resPessoas.data);
        setCategorias(resCategorias.data);
      } catch (error) {
        toast.error("Erro ao carregar pessoas e categorias.");
      }
    }
    carregarDados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tipo || !pessoaId || !categoriaId) {
      toast.warning("Por favor, preencha todos os campos de seleção.");
      return;
    }

    try {
      await api.post("/transacoes", {
        descricao,
        valor: parseFloat(valor),
        tipo: parseInt(tipo),
        pessoaId: parseInt(pessoaId),
        categoriaId: parseInt(categoriaId),
      });

      toast.success("Transação registada com sucesso! 💸");
      onSuccess(); 
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.erro) {
        toast.error(error.response.data.erro); 
      } else {
        toast.error("Erro ao registar transação. Verifique os dados.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Descrição</Label>
        <Input placeholder="Ex: Compra no supermercado" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label>Valor (R$)</Label>
        <Input type="number" step="0.01" min="0.01" placeholder="Ex: 150.50" value={valor} onChange={(e) => setValor(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label>Tipo de Transação</Label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring" required>
          <option value="" disabled>Selecione o tipo</option>
          <option value="0">Receita (Entrada)</option>
          <option value="1">Despesa (Saída)</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Pessoa</Label>
        <select value={pessoaId} onChange={(e) => setPessoaId(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring" required>
          <option value="" disabled>Quem realizou?</option>
          {pessoas.map((p) => (<option key={p.id} value={p.id.toString()}>{p.nome}</option>))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Categoria</Label>
        <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring" required>
          <option value="" disabled>Selecione a categoria</option>
          {categorias.map((c) => (<option key={c.id} value={c.id.toString()}>{c.descricao}</option>))}
        </select>
      </div>

      <Button type="submit" className="w-full">Registar Transação</Button>
    </form>
  );
}