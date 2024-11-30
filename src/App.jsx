import React, { createContext, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

const ContextoTarefa = createContext();

const ProvedorTarefa = ({ children }) => {
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = (texto) =>
    texto && setTarefas((prev) => [...prev, { id: Date.now(), texto, concluida: false }]);

  const alternarTarefa = (id) =>
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );

  const excluirTarefa = (id) =>
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));

  return (
    <ContextoTarefa.Provider value={{ tarefas, adicionarTarefa, alternarTarefa, excluirTarefa }}>
      {children}
    </ContextoTarefa.Provider>
  );
};



function App() {
  const [novaTarefa, setNovaTarefa] = useState('');

  return (
    <ProvedorTarefa>
      <div className="min-h-screen w-screen bg-gray-800 text-cinza-100 antialiased">
        <header className="flex flex-1 justify-center items-center py-20 px-3 bg-gray-900">
          <img src="/logo.svg" alt="Logo" />
        </header>

        <section className="w-full max-w-3xl m-auto">
          <EntradaTarefa novaTarefa={novaTarefa} setNovaTarefa={setNovaTarefa} />
          <ListaTarefas />
        </section>
      </div>
    </ProvedorTarefa>
  );
}




const EntradaTarefa = ({ novaTarefa, setNovaTarefa }) => {
  const { adicionarTarefa } = useContext(ContextoTarefa);

  const handleAdicionarTarefa = () => {
    adicionarTarefa(novaTarefa.trim());
    setNovaTarefa('');
  };

  return (
    <div className="flex justify-between items-center gap-2 -translate-y-2/4">
      <input
        type="text"
        placeholder="Adicione uma nova tarefa aqui . . ."
        className="bg-gray-700 text-gray-600 border-[1px] border-black rounded-md h-12 p-4 leading-normal outline-none w-full"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />
      <button
        onClick={handleAdicionarTarefa}
        className="
          flex justify-center items-center
          h-12 p-4
          bg-cyan-600 text-white
          hover:bg-cyan-900
          border-0 rounded-md
          font-bold text-sm
          transition-all
          border-black
        "
      >
        Criar
      </button>
    </div>
  );
};




const ListaTarefas = () => {
  const { tarefas, alternarTarefa, excluirTarefa } = useContext(ContextoTarefa);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-1 justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-azul">
          <p className="text-sm text-blue-500">Tarefas criadas</p>
          <span className="px-2 py-1 rounded-2xl text-xs bg-cinza-400 text-cinza-200 text-blue-500">
            {tarefas.length}
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold text-roxo">
          <p className="text-sm text-blue-500">Concluídas</p>
          <span className="px-2 py-1 rounded-2xl text-xs bg-cinza-400 text-cinza-200 text-blue-500">
            {tarefas.filter((tarefa) => tarefa.concluida).length} de {tarefas.length}
          </span>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {tarefas.map((tarefa) => (
          <div
            key={tarefa.id}
            className="flex flex-1 justify-between items-center gap-3 p-4 rounded-lg bg-cinza-500 border-[1px] border-cinza-400"
          >
            <div className="flex">
              <label htmlFor={`checkbox-${tarefa.id}`} className="flex items-center gap-3 p-1">
                <input
                  id={`checkbox-${tarefa.id}`}
                  type="checkbox"
                  className="hidden"
                  checked={tarefa.concluida}
                  onChange={() => alternarTarefa(tarefa.id)}
                />
                <span
                  className={`rounded-full w-4 h-4 flex items-center justify-center border-2 ${
                    tarefa.concluida
                      ? 'border-roxo-dark bg-roxo-dark'
                      : 'border-blue-500 hover:border-blue-300'
                  }`}
                >
                  {tarefa.concluida && <FontAwesomeIcon className="text-white" icon={faCheck} />}
                </span>
                <p className={`${tarefa.concluida ? 'line-through text-cinza-300' : 'text-white'}`}>
                  {tarefa.texto}
                </p>
              </label>
            </div>
            <button onClick={() => excluirTarefa(tarefa.id)}>
              <FontAwesomeIcon className="text-white" icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
