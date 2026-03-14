import { useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function PessoaForm() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !idade) {
      toast.warning("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await api.post("/pessoas", {
        nome: nome,
        idade: parseInt(idade),
      });

      toast.success("Pessoa registada com sucesso! 🎉");
      setNome(""); 
      setIdade("");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao registar pessoa. Verifique a API.");
    }
  };

  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Registar Nova Pessoa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input 
              id="nome" 
              placeholder="Ex: João Silva" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idade">Idade</Label>
            <Input 
              id="idade" 
              type="number" 
              placeholder="Ex: 30" 
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required 
              min="0"
            />
          </div>

          <Button type="submit" className="w-full">
            Guardar Registo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}