/* Monta a página a partir de js/conteudo.js. Não precisa editar este arquivo. */
(function () {
  'use strict';

  var C = window.CONTEUDO;
  if (!C) {
    console.error('js/conteudo.js não foi carregado.');
    return;
  }

  var HEART_PATH = 'M12 21C7 17.2 2.5 13.4 2.5 8.8 2.5 6 4.6 4 7.2 4c1.9 0 3.6 1 4.8 2.7C13.2 5 14.9 4 16.8 4c2.6 0 4.7 2 4.7 4.8 0 4.6-4.5 8.4-9.5 12.2z';

  function heartOutline(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="' + HEART_PATH + '" fill="none" stroke="#3A1E3B" stroke-width="1.6" stroke-linejoin="round"></path></svg>';
  }

  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }

  function el(tag, props, children) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === 'class') node.className = props[k];
      else if (k === 'text') node.textContent = props[k];
      else if (k === 'html') node.innerHTML = props[k];
      else if (k === 'style') node.setAttribute('style', props[k]);
      else node.setAttribute(k, props[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  /* Quadrinho da foto: <img> se houver arquivo, senão o reserva colorido. */
  function photoBox(src, placeholderLabel, alt, iconSize, extraStyle, mirror) {
    var box = el('div', { class: 'ph', style: extraStyle || '' });
    if (src) {
      box.classList.add('has-img');
      box.appendChild(el('img', { src: src, alt: alt || '', loading: 'lazy', class: mirror ? 'espelhada' : '' }));
    } else {
      box.innerHTML = heartOutline(iconSize);
      box.appendChild(el('span', { text: placeholderLabel }));
    }
    return box;
  }

  /* ---- textos simples (data-bind="chave" ou "grupo.chave") ---------------- */
  document.querySelectorAll('[data-bind]').forEach(function (n) {
    var v = get(n.getAttribute('data-bind'));
    if (v != null) n.textContent = v;
  });
  document.title = (C.tituloAntes || '') + (C.tituloDestaque || '') + (C.tituloDepois || '');

  /* ---- bandeirinhas ------------------------------------------------------- */
  var bunting = document.getElementById('bunting');
  for (var i = 0; i < 60; i++) bunting.appendChild(el('div', { class: 'flag f' + (i % 4) }));

  /* ---- foto principal ----------------------------------------------------- */
  var heroPol = document.getElementById('hero-pol');
  var fp = C.fotoPrincipal || {};
  heroPol.appendChild(el('div', { class: 'tape' }));
  heroPol.appendChild(photoBox(fp.src, '[FOTO DO CASAL]', fp.legenda, 64, 'background:#FFD6E0', fp.espelhar));
  if (fp.legenda) heroPol.appendChild(el('div', { class: 'script pol-caption', text: fp.legenda }));

  /* ---- álbum -------------------------------------------------------------- */
  var grid = document.getElementById('album-grid');
  ((C.album && C.album.fotos) || []).forEach(function (f, idx) {
    var n = idx + 1;
    var pol = el('div', { class: 'pol' }, [
      el('div', { class: 'tape' }),
      photoBox(f.src, '[SUA FOTO ' + n + ']', f.legenda, 48, '', f.espelhar),
      el('figcaption', { text: 'Figurinha ' + (n < 10 ? '0' + n : n) + (f.legenda ? ' · ' + f.legenda : '') })
    ]);
    grid.appendChild(el('figure', { class: 'cell reveal' }, [pol]));
  });

  /* ---- quiz --------------------------------------------------------------- */
  var Q = (C.quiz && C.quiz.perguntas) || [];
  var total = Q.length;
  var step = 0;
  var picks = Q.map(function () { return null; });

  var dotsBox = document.getElementById('quiz-dots');
  var stage = document.getElementById('quiz-stage');
  var dots = Q.map(function () { var d = el('span', { class: 'dot' }); dotsBox.appendChild(d); return d; });

  Q.forEach(function (q, qi) {
    var n = (q.opcoes || []).length;
    if (!(q.correta >= 1 && q.correta <= n)) {
      console.warn('Pergunta ' + (qi + 1) + ': "correta" deve ser um número de 1 a ' + n + ' (valor atual: ' + q.correta + ').');
    }
  });

  function updateDots() {
    dots.forEach(function (d, i) {
      d.className = 'dot' + (i < step ? ' done' : (i === step ? ' now' : ''));
    });
  }

  function showQuestion() {
    var qi = step;
    var q = Q[qi];
    var correct = q.correta - 1;
    updateDots();
    stage.innerHTML = '';

    var optsBox = el('div', { class: 'opts' });
    var buttons = [];
    var nextBtn = el('button', {
      class: 'btn primary',
      type: 'button',
      text: qi === total - 1 ? 'Ver resultado' : 'Próxima'
    });
    nextBtn.disabled = true;

    function pick(oi) {
      if (picks[qi] !== null) return;
      picks[qi] = oi;

      /* distância que a resposta certa percorre ao subir para o topo */
      var from = buttons[correct].offsetTop - buttons[0].offsetTop;

      buttons.forEach(function (b, i) {
        b.disabled = true;
        var isRight = i === correct;
        var isMiss = i === oi && i !== correct;
        if (isRight) {
          b.className = 'opt right';
          b.style.setProperty('--from', from + 'px');
          b.insertAdjacentHTML('beforeend',
            '<svg class="xmark" width="28" height="28" viewBox="0 0 24 24" aria-label="Resposta certa" role="img">' +
            '<path d="M4 12.5L9.5 18L20 6" stroke="#1F8F57" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"></path></svg>');
        } else if (isMiss) {
          b.className = 'opt other miss';
          b.insertAdjacentHTML('beforeend',
            '<svg class="xmark" width="26" height="26" viewBox="0 0 24 24" aria-label="Sua escolha" role="img">' +
            '<path d="M5 5L19 19" stroke="#C93A64" stroke-width="4" stroke-linecap="round" fill="none"></path>' +
            '<path d="M19 5L5 19" stroke="#C93A64" stroke-width="4" stroke-linecap="round" fill="none"></path></svg>');
        } else {
          b.className = 'opt other';
        }
      });

      if (q.foto !== false) {
        var proofPol = el('div', { class: 'pol', style: '--r:-2deg' }, [
          el('div', { class: 'tape' }),
          photoBox(q.foto, '[FOTO PROVA ' + (qi + 1) + ']', q.legenda, 44, '', q.espelharFoto),
          q.legenda ? el('div', { class: 'script proof-caption', text: q.legenda }) : null
        ]);
        /* a foto prova aparece inteira (sem corte); o quadro acompanha a proporção dela */
        var proofImg = proofPol.querySelector('img');
        if (proofImg) {
          var setRatio = function () {
            if (proofImg.naturalWidth && proofImg.naturalHeight) {
              proofPol.style.setProperty('--ar', proofImg.naturalWidth / proofImg.naturalHeight);
            }
          };
          if (proofImg.complete) setRatio(); else proofImg.addEventListener('load', setRatio);
        }
        var proof = el('div', { class: 'proof' }, [proofPol]);
        optsBox.appendChild(proof);
      }
      nextBtn.disabled = false;
    }

    (q.opcoes || []).forEach(function (label, oi) {
      var b = el('button', { class: 'opt', type: 'button' }, [el('span', { class: 'lbl', text: label })]);
      b.addEventListener('click', function () { pick(oi); });
      buttons.push(b);
      optsBox.appendChild(b);
    });

    nextBtn.addEventListener('click', function () {
      if (picks[qi] === null) return;
      step = qi + 1;
      render();
    });

    stage.appendChild(el('div', { class: 'slide' }, [
      el('div', { class: 'script q-number', text: 'Pergunta ' + (qi + 1) + ' de ' + total }),
      el('h3', { class: 'q-text', text: q.texto }),
      optsBox,
      el('div', { class: 'q-footer' }, [nextBtn])
    ]));
  }

  function showResult() {
    updateDots();
    stage.innerHTML = '';
    var score = 0;
    Q.forEach(function (q, qi) { if (picks[qi] === q.correta - 1) score += 1; });

    var M = C.quiz.mensagens || {};
    var message = M.pouco;
    if (score === total) message = M.tudo;
    else if (score >= Math.ceil(total / 2)) message = M.metade;

    var conf = el('div', { class: 'confwrap', 'aria-hidden': 'true' });
    for (var i = 0; i < 10; i++) {
      conf.insertAdjacentHTML('beforeend',
        '<svg class="conf" viewBox="0 0 24 24"><path d="' + HEART_PATH + '"></path></svg>');
    }
    var restart = el('button', { class: 'btn ghost', type: 'button', text: 'Jogar de novo' });
    restart.addEventListener('click', function () {
      step = 0;
      picks = Q.map(function () { return null; });
      render();
    });

    var res = el('div', { class: 'slide result' }, [
      conf,
      el('div', {
        html: '<svg class="beat" width="96" height="96" viewBox="0 0 24 24" aria-hidden="true"><path d="' + HEART_PATH +
          '" fill="#C93A64" stroke="#3A1E3B" stroke-width="1.2" stroke-linejoin="round"></path></svg>'
      }),
      el('div', { class: 'script result-kicker', text: 'seu resultado' }),
      el('h3', { text: score + ' de ' + total }),
      el('p', { text: message || '' }),
      restart
    ]);
    stage.appendChild(res);
  }

  function render() {
    if (!total) { stage.textContent = ''; return; }
    if (step >= total) showResult(); else showQuestion();
  }

  render();
})();
