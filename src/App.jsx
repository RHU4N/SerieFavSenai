import { useState, useEffect } from "react";
import SerieCard from "./components/SerieCard";
import serie from "./service/api";
import "./App.css";

export default function App() {
  const [series, setSeries] = useState([]); // estado para armazenar a lista de séries

  //função para alternar o status de assistido de uma série
  function alternarAssistido(id) {
    // atualiza o estado de series, mapeando sobre a lista atual e alternando o valor de assistido da série com o id correspondente a função set vem do useState, que é uma função que atualiza o estado de series, e recebe como argumento uma função que recebe o estado atual (seriesAtuais) e retorna um novo estado (uma nova lista de séries) com o valor de assistido da série com o id correspondente alternado. A função map percorre a lista de séries e verifica se o id da série atual é igual ao id passado como argumento. Se for, retorna uma nova série com o valor de assistido alternado, caso contrário, retorna a série atual sem alterações.
    setSeries((seriesAtuais) =>
      seriesAtuais.map((s) =>
        // se o id da série atual for igual ao id passado como argumento, retorna uma nova série com o valor de assistido alternado, caso contrário, retorna a série atual sem alterações.
        s.id === id ? { ...s, assistido: !s.assistido } : s,
      ),
    );
  }

  //useEffect para buscar a lista de séries da API quando o componente é montado. A função useEffect recebe como argumento uma função que é executada quando o componente é montado e um array de dependências (vazio neste caso, pois queremos que a função seja executada apenas uma vez). Dentro da função, fazemos uma requisição GET para a rota /shows da API usando o axios, e atualizamos o estado de series com a resposta da API. Caso ocorra algum erro na requisição, exibimos uma mensagem de erro no console.
  useEffect(() => {
    serie
      .get("/shows")
      .then((response) => {
        // mapeia a resposta da API para adicionar a propriedade assistido a cada série, caso ela não exista. A função map percorre a lista de séries e retorna uma nova lista com as séries atualizadas. A propriedade assistido é inicializada como false caso não exista na resposta da API.
        const data = response.data.map((s) => ({
          ...s,
          assistido: s.assistido || false,
        }));
        // atualiza o estado de series com a lista de séries atualizada. A função setSeries é chamada com a nova lista de séries como argumento, atualizando o estado do componente e fazendo com que ele seja re-renderizado com a nova lista de séries.
        setSeries(data);
      })
      .catch((error) => console.error("Error fetching series:", error));
  }, []);

  // calcula o total de séries assistidas e não assistidas usando a função filter para filtrar a lista de séries com base no valor da propriedade assistido. A função filter percorre a lista de séries e retorna uma nova lista com as séries que atendem à condição especificada (assistido ou não assistido). Em seguida, usamos a propriedade length para obter o número total de séries em cada lista filtrada.
  const totalAssistidos = series.filter((s) => s.assistido).length;
  const totalNaoAssistidos = series.filter((s) => !s.assistido).length;

  return (
    <main className="container">
      <header className="cabecalho">
        <h1>SerieFav</h1>
        <p>Minha lista de séries favoritas - React Básico</p>
      </header>

      <section className="resumo">
        <div className="resumo-grid">
          <div className="resumo-card">
            <span>Total</span>
            <strong>{series.length}</strong>
          </div>
          <div className="resumo-card presente">
            <span>Assistidos</span>
            <strong>{totalAssistidos}</strong>
          </div>
          <div className="resumo-card ausente">
            <span>Não assistidos</span>
            <strong>{totalNaoAssistidos}</strong>
          </div>
        </div>

{/* div pra listar cards de séries */}
        <div className="lista-filmes">
          {/* card de série, usando os dados da lista de séries para preencher os campos do card e o map serve para iterar sobre a lista de séries e criar um card para cada uma delas */}
          {series.map((s) => (
            <SerieCard
              key={s.id}
              name={s.name}
              genres={s.genres || []}
              emissora={s.network ? s.network.name : "N/A"}
              emissoraURL={s.network ? s.network.officialSite : "#"}
              img={s.image ? s.image.medium : ""}
              assistido={s.assistido}
              onToggleAssistido={() => alternarAssistido(s.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
