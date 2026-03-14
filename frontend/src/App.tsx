import { PessoaForm } from "@/components/PessoaForm";
import { CategoriaForm } from "@/components/CategoriaForm";
import { TransacaoForm } from "@/components/TransacaoForm";
import { Toaster } from "@/components/ui/sonner"; // <-- Importação do Toast

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">
        💰 Centro de Custos
      </h1>
      
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl px-4">
        <div className="flex flex-col gap-8">
          <PessoaForm />
          <CategoriaForm />
        </div>

        <div className="flex flex-col">
          <TransacaoForm />
        </div>
      </div>

      {/* Este componente invisível é quem dispara os Toasts na tela */}
      <Toaster richColors position="top-right" /> 
    </div>
  );
}

export default App;