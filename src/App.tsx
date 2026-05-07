function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind funciona 🚀
        </h1>

        <p className="text-gray-600 mb-6">
          Si ves estilos, colores y sombras, está correctamente configurado.
        </p>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
          Botón de prueba
        </button>
      </div>
    </div>
  );
}

export default App;