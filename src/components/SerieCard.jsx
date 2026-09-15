import './SerieCard.css'

export default function 

SerieCard({name,genres,emissora,emissoraURL,img,assistido,onToggleAssistido
}){
    return(
        <article className={`serie-card ${assistido ? "card-assistido" : "card-nao-assistido"}`}>
            <img src={img} alt={name}></img>
        <div>
            <h2>{name}</h2>
            <p>Gênero: {genres.join(", ")}</p>
            <a href={emissoraURL} target="_blank" rel="noopener noreferrer">
                Emissora: {emissora}
            </a>
        </div>
        <div className="status">
            <p>
                <strong>{assistido ? "Assistido" : "Não Assistido"}</strong>
            </p>
            <button onClick={onToggleAssistido}>
                {assistido ? "Marcar como não assistido" : "Marcar como assistido"}
            </button>
        </div>
    </article>
    )
}