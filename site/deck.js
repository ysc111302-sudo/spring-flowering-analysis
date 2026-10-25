(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const forced = new URLSearchParams(location.search).get('static') === '1';
  let reduced = forced || media.matches;
  let current = 0;
  let animation;
  let sceneRun = 0;
  const motion = document.querySelector('#motion');
  const fullscreen = document.querySelector('#fullscreen');
  const feedback = document.querySelector('#feedback');
  function stop() {
    sceneRun += 1;
    if (animation) animation.pause();
    if (window.anime) anime.remove('.mean-mover,.gap-point,.year-point,.slide-photo,.interval-end,.interval-span');
    document.querySelectorAll('.mean-mover').forEach(el => { el.style.transform = 'none'; });
    document.querySelectorAll('.gap-point,.year-point').forEach(el => { el.style.opacity = ''; });
    document.querySelectorAll('.slide-photo').forEach(el => { el.style.opacity = '1'; });
    document.querySelectorAll('.interval-end').forEach(el => { el.style.transform = 'none'; });
    document.querySelectorAll('.interval-span').forEach(el => { el.style.strokeDashoffset = '0'; });
  }
  function animate() {
    stop();
    const photos = slides[current].querySelectorAll('.slide-photo');
    const run = sceneRun;
    const decoded = Promise.allSettled([...photos].map(img => img.decode()));
    if (reduced || !window.anime) return;
    const scene = slides[current].dataset.scene;
    if (photos.length) decoded.then(() => {
      if (run === sceneRun && !reduced) animation = anime({targets:photos, opacity:[0,1], duration:450, easing:'easeOutQuad'});
    });
    if (scene === 'calendar') animation = anime({targets: '#slide-6 .mean-mover[data-period="recent"]', translateX: el => [Number(el.dataset.shift), 0], duration: 1000, delay: anime.stagger(160), easing: 'easeInOutCubic'});
    if (scene === 'gaps') animation = anime({targets: '.gap-point', opacity: [0, 1], duration: 350, delay: anime.stagger(7), easing: 'linear'});
    if (scene === 'yearly') animation = anime({targets: '#slide-5 .year-point', opacity:[0,1], duration:450, delay:el=>['개나리','진달래','벚나무'].indexOf(el.dataset.species)*170, easing:'linear'});
    if (scene === 'intervals') animation = anime.timeline({easing:'easeInOutCubic'}).add({targets:'.interval-span',strokeDashoffset:[anime.setDashoffset,0],duration:750,delay:anime.stagger(180)},0).add({targets:'.interval-end',translateX:el=>[-Number(el.dataset.distance),0],duration:750,delay:anime.stagger(180)},0);
  }
  function motionState() {
    document.body.classList.toggle('static', reduced);
    motion.textContent = reduced ? '모션 켜기' : '모션 끄기';
    motion.setAttribute('aria-pressed', String(reduced));
    motion.disabled = forced;
  }
  function pageFromHash() {
    const value = Number(location.hash.slice(1));
    return Number.isFinite(value) ? Math.max(0, Math.min(slides.length - 1, Math.floor(value) - 1)) : 0;
  }
  function show(n, updateHash = true) {
    current = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((slide, i) => { slide.hidden = i !== current; slide.classList.toggle('active', i === current); });
    document.querySelector('#counter').textContent = `${String(current + 1).padStart(2, '0')} / ${slides.length}`;
    document.querySelector('#progress').style.width = `${(current + 1) / slides.length * 100}%`;
    document.querySelector('.progress-track').setAttribute('aria-valuenow', String(current + 1));
    document.querySelector('#prev').disabled = current === 0;
    document.querySelector('#next').disabled = current === slides.length - 1;
    if (updateHash) history.replaceState(null, '', `#${current + 1}`);
    window.scrollTo({top: 0, behavior: 'instant'});
    animate();
  }
  async function toggleFullscreen() {
    feedback.textContent = '';
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      feedback.textContent = '이 브라우저에서는 전체화면을 열지 못했습니다.';
    }
  }
  document.querySelector('#prev').addEventListener('click', () => show(current - 1));
  document.querySelector('#next').addEventListener('click', () => show(current + 1));
  fullscreen.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement ? '화면 복귀' : '전체화면';
    fullscreen.setAttribute('aria-pressed', String(Boolean(document.fullscreenElement)));
  });
  motion.addEventListener('click', () => { reduced = !reduced; motionState(); animate(); });
  media.addEventListener('change', e => { reduced = forced || e.matches; motionState(); animate(); });
  document.querySelector('#replay').addEventListener('click', animate);
  const prediction = document.querySelector('#prediction');
  prediction.addEventListener('click', () => {
    const answer = document.querySelector('#prediction-answer');
    answer.hidden = !answer.hidden;
    prediction.setAttribute('aria-expanded', String(!answer.hidden));
    prediction.textContent = answer.hidden ? '내가 예상한 순서 확인하기' : '예상 다시 접기';
  });
  const recent = document.querySelector('#recent-toggle');
  recent.addEventListener('click', () => {
    const on = recent.getAttribute('aria-pressed') !== 'true';
    recent.setAttribute('aria-pressed', String(on));
    recent.textContent = on ? '전체 25년 보기' : '최근 10년 강조';
    document.querySelector('.gaps').classList.toggle('emphasize-recent', on);
  });
  const exceptions = document.querySelector('#exceptions-toggle');
  exceptions.addEventListener('click', () => {
    const on = exceptions.getAttribute('aria-pressed') !== 'true';
    exceptions.setAttribute('aria-pressed', String(on));
    exceptions.textContent = on ? '모든 연도 보기' : '동률·역전 연도 강조';
    document.querySelector('.order-grid').classList.toggle('exceptions-only', on);
  });
  document.querySelectorAll('[data-highlight-year]').forEach(button => button.addEventListener('click', () => {
    const year = button.dataset.highlightYear;
    const on = button.getAttribute('aria-pressed') !== 'true';
    document.querySelectorAll('[data-highlight-year]').forEach(b => b.setAttribute('aria-pressed', String(on && b === button)));
    document.querySelectorAll('.case-year').forEach(g => g.classList.toggle('case-muted', on && g.dataset.caseYear !== year));
  }));
  document.addEventListener('keydown', e => {
    if (e.target.closest('input,select,textarea') || e.ctrlKey || e.metaKey || e.altKey) return;
    if (['ArrowRight', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.target.closest('button,a'))) { e.preventDefault(); show(current + 1); }
    if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); show(current - 1); }
    if (e.key === 'Home') { e.preventDefault(); show(0); }
    if (e.key === 'End') { e.preventDefault(); show(slides.length - 1); }
    if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFullscreen(); }
  });
  window.addEventListener('hashchange', () => show(pageFromHash(), false));
  window.addEventListener('beforeprint', stop);
  motionState();
  show(pageFromHash());
})();
