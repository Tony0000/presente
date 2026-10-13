/* ==========================================================================
   CONTEÚDO DO SITE
   É AQUI que você troca todos os textos, fotos e perguntas do quiz.
   Não precisa mexer em mais nenhum arquivo.

   Regras rápidas:
   - Mantenha as aspas "..." e as vírgulas no fim de cada linha.
   - Para usar uma foto, coloque o arquivo na pasta  fotos/  e escreva o
     caminho aqui, por exemplo:  src: "fotos/01-praia.jpg"
   - Enquanto "src" estiver vazio ("") aparece um quadrinho colorido de
     reserva com o texto [SUA FOTO]. Quando você preencher, ele some.
   - Para ESPELHAR uma foto (inverter esquerda/direita), acrescente
     espelhar: true  no bloco dela, por exemplo:
       { src: "fotos/foto3.jpg", legenda: "...", espelhar: true }
     Nas perguntas do quiz, a opção se chama  espelharFoto: true.
   ========================================================================== */

window.CONTEUDO = {

  /* ---- Topo, título e rodapé ------------------------------------------- */
  nome1: "Antonio",
  nome2: "Fernanda",
  desde: "Abril/2025",                         // ex.: "12 de março de 2021"

  dedicatoria: "para o meu amor",          // frase em letra cursiva acima do título
  tituloAntes: "Nossa ",                   // título = antes + destaque + depois
  tituloDestaque: "vida",              // palavra com sublinhado ondulado
  tituloDepois: " até aqui",
  introducao: "Balões, fotos e lembranças em um cantinho só nosso. No fim, um quiz para descobrir quem conhece melhor quem.",

  /* ---- Foto grande do começo da página --------------------------------- */
  fotoPrincipal: {
    src: "fotos/foto-capa.jpg",
    legenda: "",
    espelhar: true                         // inverte esquerda/direita (só na exibição)
  },

  /* ---- Álbum ----------------------------------------------------------- */
  /* Pode ter quantas fotos quiser: copie/cole um bloco { ... }, para
     remover apague o bloco. A numeração "Figurinha 01, 02..." é automática. */
  album: {
    subtitulo: "nosso álbum",
    titulo: "Figurinhas do nosso amor",
    fotos: [
      { src: "fotos/foto1.jpg", legenda: "No meio de tanta gente, eu só vejo você" },
      { src: "fotos/foto2.jpg", legenda: "Meu abrigo favorito tem o seu sorriso" },
      { src: "fotos/foto3.jpg", legenda: "Combinando sem ensaiar" },
      { src: "fotos/foto4.jpg", legenda: "Sorriso que nasce quando a gente se encontra" },
      { src: "fotos/foto5.jpg", legenda: "Noite bonita, companhia ainda melhor" },
      { src: "fotos/foto6.jpg", legenda: "Dividir a batata frita também é prova de amor" }
    ]
  },

  /* ---- Quiz ------------------------------------------------------------ */
  quiz: {
    subtitulo: "hora da brincadeira",
    titulo: "Marque o X",
    introducao: "Quanto você sabe sobre a nós? Escolha uma resposta por pergunta.",

    /* Cada pergunta:
         texto   - a pergunta
         opcoes  - lista de respostas (2 a 5 funciona bem)
         correta - NÚMERO da opção certa, contando de 1
                   (1 = primeira opção, 2 = segunda, ...)
         foto    - foto "prova" que aparece depois de responder.
                   ""    -> mostra o quadrinho de reserva
                   false -> não mostra foto nessa pergunta
         legenda - texto curto embaixo da foto prova
       Pode ter quantas perguntas quiser (copie/cole/apague blocos). */
    perguntas: [
      {
        texto: "Quem tem o bico mais bonito?",
        opcoes: ["Fernanda", "Antônio", "Ninguém"],
        correta: 1,
        foto: "fotos/quiz1.jpg",
        legenda: "Um bico lindo desses"
      },
      {
        texto: "Quem fica linda de tranças?",
        opcoes: ["Antônio", "Fernanda", "Ninguém"],
        correta: 2,
        foto: "fotos/quiz2.jpg",
        legenda: "Jamais vi tranças mais fofas"
      },
      {
        texto: "Quem gosta mais de doces?",
        opcoes: ["Antônio", "Fernanda", "Os dois ao mesmo tempo"],
        correta: 2,
        foto: "fotos/quiz3.jpg",
        legenda: "Um certo alguém tem dente de açúcar"
      },
      {
        texto: "Com o quê/quem você acha que Antônio mais se diverte?",
        opcoes: ["Cinema", "Orla da praia", "Fernanda", "Todas, ao mesmo tempo"],
        correta: 3,
        foto: "fotos/quiz4.jpg",
        legenda: "O gosto é meu. Me deixe!"
      }
    ],

    /* Mensagem final conforme o número de acertos */
    mensagens: {
      tudo:  "Gabaritou! Ninguém me conhece melhor que você.",           // acertou todas
      metade: "Quase lá! Mais um sorvete e a gente confere o resto.",    // acertou metade ou mais
      pouco: "Hora de marcar um encontro para recuperar o tempo perdido." // acertou menos da metade
    }
  },

  /* ---- Rodapé ---------------------------------------------------------- */
  rodape: {
    abertura: "com todo o carinho,"
  }
};
