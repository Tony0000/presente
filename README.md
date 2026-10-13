# Nossa festinha de dois

Site estático (HTML + CSS + JS puro, sem build) pronto para o GitHub Pages.

```
index.html          estrutura da página (não precisa editar)
css/style.css       visual (cores, animações) — vindo do mockup
js/conteudo.js      ⭐ TODOS os textos, fotos e perguntas do quiz
js/app.js           monta a página a partir do conteudo.js (não editar)
fotos/              coloque aqui as suas fotos
```

## 1. Preparar as fotos

1. Copie as fotos para a pasta `fotos/` com nomes simples, sem espaços nem
   acentos: `01-praia.jpg`, `prova-1.jpg`, `casal.jpg`…
2. O navegador não abre `.heic` (formato do iPhone). Converta e reduza o
   tamanho (fotos de celular têm 3–5 MB; ~1600 px de largura é suficiente):

```bash
cd fotos
# HEIC -> JPG
sips -s format jpeg foto.heic --out foto.jpg
# reduzir para no máximo 1600 px no maior lado (altera o arquivo)
sips -Z 1600 *.jpg
```

## 2. Trocar os textos e apontar para as fotos

Abra **`js/conteudo.js`** — é o único arquivo que você precisa editar.

| O que mudar | Onde no arquivo |
| --- | --- |
| Nomes, data, frases do topo e rodapé | `nome1`, `nome2`, `desde`, `dedicatoria`, `tituloAntes/Destaque/Depois`, `introducao`, `rodape` |
| Foto grande do início | `fotoPrincipal: { src: "fotos/casal.jpg", legenda: "…" }` |
| Álbum | `album.fotos` — um bloco `{ src, legenda }` por foto |
| Perguntas do quiz | `quiz.perguntas` |
| Mensagem final | `quiz.mensagens` |

### Fotos

```js
fotoPrincipal: { src: "fotos/casal.jpg", legenda: "Nós dois em Paris" },

album: {
  fotos: [
    { src: "fotos/01-praia.jpg", legenda: "Nossa primeira viagem" },
    { src: "fotos/02-bolo.jpg",  legenda: "Aniversário de 1 ano" }
    // copie/cole um bloco para adicionar, apague um bloco para remover
  ]
}
```

- Para **espelhar** uma foto (inverter esquerda/direita), adicione
  `espelhar: true` no bloco dela. Nas perguntas do quiz, use
  `espelharFoto: true`. O arquivo original não é alterado.
- `src` é o caminho **a partir da raiz do projeto**, sempre `fotos/nome.jpg`.
- Maiúsculas/minúsculas importam no GitHub Pages: `Foto.JPG` ≠ `foto.jpg`.
- Com `src: ""` aparece um quadrinho colorido de reserva — ótimo para ver o
  que ainda falta.

### Perguntas do quiz

```js
perguntas: [
  {
    texto: "Onde foi o nosso primeiro encontro?",
    opcoes: ["Cinema", "Parque", "Pizzaria"],
    correta: 2,                  // 2 = a segunda opção ("Parque")
    foto: "fotos/prova-1.jpg",   // aparece depois que a pessoa responde
    legenda: "Foi no Ibirapuera, lembra?"
  },
  // ...mais perguntas
]
```

- `correta` conta a partir de **1** (1 = primeira opção).
- `foto: ""` mostra o quadrinho de reserva; `foto: false` não mostra foto
  naquela pergunta.
- Pode ter 2 a 5 opções por pergunta e quantas perguntas quiser; os
  indicadores de progresso e o "X de Y" se ajustam sozinhos.
- Se `correta` estiver fora do intervalo, o console do navegador (F12) avisa.

## 3. Ver o resultado no computador

Dá para abrir o `index.html` direto no navegador (duplo clique). Se preferir
um servidor local:

```bash
python3 -m http.server 8000
```

e acesse <http://localhost:8000>.

## 4. Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `presente`).
2. Envie os arquivos:

```bash
git remote add origin git@github.com:SEU-USUARIO/presente.git
git add .
git commit -m "feat: site da festinha"
git push -u origin main
```

3. No GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from
   a branch"**, branch `main`, pasta `/ (root)` → **Save**.
4. Em ~1 minuto o site fica em `https://SEU-USUARIO.github.io/presente/`.

Para atualizar depois: edite, `git add . && git commit -m "..." && git push`.

> **Privacidade:** no plano gratuito o repositório precisa ser público, e as
> fotos ficam acessíveis a quem tiver o link. A página tem `noindex` para não
> aparecer em buscadores, mas não é protegida por senha.
