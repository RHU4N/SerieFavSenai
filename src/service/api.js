import axios from "axios";

// Cria uma instância do axios com a URL base da API e um tempo limite de 1000ms para as requisições. A instância é exportada como padrão para ser usada em outros arquivos do projeto.
export default axios.create({
    baseURL: 'https://api.tvmaze.com'
})

