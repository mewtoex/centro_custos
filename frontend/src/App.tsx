import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Centro de Custos UI</h1>
        <p className="text-gray-600">Shadcn e Tailwind configurados com sucesso!</p>
        <Button>Testar Botão Shadcn</Button>
      </div>
    </div>
  )
}

export default App