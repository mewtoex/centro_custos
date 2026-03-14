import { useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CategoriaForm() {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!finalidade) {
      toast.warning("Por favor, selecione uma finalidade.");
      return;
    }

    try {
      await api.post("/categorias", {
        descricao: descricao,
        finalidade: parseInt(finalidade),
      });

      toast.success("Categoria registada com sucesso! 🎉"); 
      setDescricao(""); 
      setFinalidade("");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao registar categoria. Verifique a API."); 
    }
  };

  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Registar Nova Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição da Categoria</Label>
            <Input 
              id="descricao" 
              placeholder="Ex: Conta de Luz, Salário..." 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="finalidade">Finalidade</Label>
            <select
              id="finalidade"
              value={finalidade}
              onChange={(e) => setFinalidade(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="" disabled>Selecione a finalidade</option>
              <option value="0">Receita</option>
              <option value="1">Despesa</option>
              <option value="2">Ambas</option>
            </select>
          </div>

          <Button type="submit" className="w-full">
            Guardar Categoria
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}