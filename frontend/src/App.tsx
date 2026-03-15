import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PessoasList } from "@/components/pessoas/PessoasList";
import { CategoriasList } from "@/components/categorias/CategoriasList";
import { TransacoesList } from "@/components/transacoes/TransacoesList";
import { Relatorios } from "@/components/dashboard/Relatorios";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      <Tabs defaultValue="pessoas" className="flex-1 flex flex-col">
        
        {/* CABEÇALHO 100% LARGURA */}
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10 w-full px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>💰</span> Centro de Custos
            </h1>

            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger value="pessoas" className="px-4">👥 Pessoas</TabsTrigger>
              <TabsTrigger value="categorias" className="px-4">🏷️ Categorias</TabsTrigger>
              <TabsTrigger value="transacoes" className="px-4">💸 Transações</TabsTrigger>
              <TabsTrigger value="relatorios" className="px-4">📊 Dashboard</TabsTrigger>
            </TabsList>
          </div>
        </header>

        {/* ÁREA DE CONTEÚDO CENTRALIZADA EM BAIXO */}
        <main className="flex-1 w-full max-w-6xl mx-auto p-6">
          <TabsContent value="pessoas" className="m-0 focus-visible:outline-none">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <PessoasList />
            </div>
          </TabsContent>
          
          <TabsContent value="categorias" className="m-0 focus-visible:outline-none">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <CategoriasList />
            </div>
          </TabsContent>
          
          <TabsContent value="transacoes" className="m-0 focus-visible:outline-none">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <TransacoesList />
            </div>
          </TabsContent>
          
          <TabsContent value="relatorios" className="m-0 focus-visible:outline-none">
            <Relatorios />
          </TabsContent>
        </main>
      </Tabs>

      <Toaster richColors position="top-right" /> 
    </div>
  );
}

export default App;