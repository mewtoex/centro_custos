import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

interface PessoaFormProps {
  onSuccess: () => void;
  pessoaParaEditar?: Pessoa | null; 
}

export function PessoaForm({ onSuccess, pessoaParaEditar }: PessoaFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  useEffect(() => {
    if (pessoaParaEditar) {
      setNome(pessoaParaEditar.nome);
      setIdade(pessoaParaEditar.idade.toString());
    } else {
      setNome("");
      setIdade("");
    }
  }, [pessoaParaEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !idade) {
      toast.warning("Por favor, preencha todos os campos.");
      return;
    }

    try {
      if (pessoaParaEditar) {
        await api.put(`/pessoas/${pessoaParaEditar.id}`, {
          id: pessoaParaEditar.id,
          nome: nome,
          idade: parseInt(idade),
        });
        toast.success("Dados da pessoa atualizados com sucesso! ✏️");
      } else {
        await api.post("/pessoas", {
          nome: nome,
          idade: parseInt(idade),
        });
        toast.success("Pessoa registada com sucesso! 🎉");
      }
      
      setNome(""); 
      setIdade("");
      onSuccess(); 
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar os dados da pessoa.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input 
          id="nome" 
          placeholder="Ex: João Silva" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          maxLength={200}
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
        {pessoaParaEditar ? "Guardar Alterações" : "Guardar Registo"}
      </Button>
    </form>
  );
}