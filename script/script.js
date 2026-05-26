document.addEventListener('DOMContentLoaded', () => {
    // Tenta encontrar elementos únicos de cada página
    const containerJogos = document.querySelector('.container-jogos');
    const containerDetalhes = document.getElementById('container-detalhes');

    // LÓGICA DO CATÁLOGO (projetos.html)
    if (containerJogos) {
        containerJogos.addEventListener('click', (evento) => {
            const linkClicado = evento.target.closest('a');
            if (linkClicado) {
                evento.preventDefault();
                localStorage.setItem('selectedGame', linkClicado.getAttribute('data-id'));
                window.location.href = "detalhes.html";
            }
        });
    }

    // LÓGICA DOS DETALHES (detalhes.html)
    if (containerDetalhes) {
        const id = localStorage.getItem('selectedGame');
        fetch('jogos.json')
            .then(res => res.json())
            .then(dados => {
                const jogo = dados[id];
                if (jogo) {
                    document.getElementById('titulo-jogo').innerText = jogo.nome;
                    document.getElementById('descricao-jogo').innerText = jogo.descricao;
                } else {
                    document.getElementById('titulo-jogo').innerText = "Jogo não encontrado!";
                }
            })
            .catch(err => {
                console.error("Erro ao buscar JSON:", err);
                document.getElementById('titulo-jogo').innerText = "Erro ao carregar dados.";
            });
    }
});