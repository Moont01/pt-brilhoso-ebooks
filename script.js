// Lista de livros
const livros = [
    { id: 1, titulo: "O Voo 1549", descricao: "A história do 'Milagre no Hudson'.", link: "voo1549.html" },
    { id: 2, titulo: "A Viagem de Shackleton", descricao: "A incrível sobrevivência na Antártica.", link: "shackleton.html" },
    { id: 3, titulo: "A Queda de Berlim", descricao: "Os últimos dias da Segunda Guerra Mundial.", link: "berlim.html" }
];

// Armazena e recupera favoritos no localStorage
function carregarFavoritos() {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function salvarFavoritos(favoritos) {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Renderiza a lista de livros
function carregarLivros() {
    const lista = document.getElementById("livros");
    const favoritos = carregarFavoritos();

    livros.forEach(livro => {
        const livroDiv = document.createElement("div");
        livroDiv.classList.add("livro");
        livroDiv.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>${livro.descricao}</p>
            <a href="${livro.link}"><button>Ler Agora</button></a>
            <button class="favoritar ${favoritos.includes(livro.id) ? 'favorito' : ''}" data-id="${livro.id}">
                &#9733;
            </button>
        `;
        lista.appendChild(livroDiv);
    });

    adicionarEventosFavoritar();
}

// Adiciona evento de clique para favoritar
function adicionarEventosFavoritar() {
    const botoesFavoritar = document.querySelectorAll(".favoritar");

    botoesFavoritar.forEach(botao => {
        botao.addEventListener("click", () => {
            const id = parseInt(botao.getAttribute("data-id"));
            let favoritos = carregarFavoritos();

            if (favoritos.includes(id)) {
                favoritos = favoritos.filter(fav => fav !== id);
                botao.classList.remove("favorito");
            } else {
                favoritos.push(id);
                botao.classList.add("favorito");
            }

            salvarFavoritos(favoritos);
        });
    });
}

// Carrega os livros ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarLivros);
