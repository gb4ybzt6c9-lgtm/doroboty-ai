/* DoRoboty.ai · zachowanie komponentów (v1.18, 10.11.2026)
   Dołącz na końcu <body>, po doroboty.css. Bez bibliotek, bez zależności.
   1) Podgląd szczegółów (.dr-peek-btn, .dr-spec-btn + <template>) w jednym dymku #dr-peek-pop
   2) Filtry segmentowe (.dr-seg button[aria-pressed])
   3) Pole formularza: DRForm.invalid(input, on) ustawia błąd przy polu */
(() => {
  /* ---------- 1. Podgląd szczegółów ---------- */
  let pop = document.getElementById('dr-peek-pop');
  if (!pop) { pop = document.createElement('div'); pop.className = 'dr-peek-pop'; pop.id = 'dr-peek-pop'; pop.hidden = true; (document.querySelector('.dr') || document.body).append(pop); }
  let cur = null, timer = null, pinned = false;
  function place(btn) {
    const r = btn.getBoundingClientRect(), w = Math.min(360, innerWidth - 32);
    pop.style.width = w + 'px';
    const x = Math.min(Math.max(16, btn.classList.contains('dr-spec-btn') ? r.left : r.right - w), innerWidth - w - 16);
    pop.style.left = x + 'px'; pop.hidden = false;
    const ph = pop.offsetHeight; let y = r.bottom + 8; if (y + ph > innerHeight - 12) y = Math.max(12, r.top - ph - 8);
    pop.style.top = y + 'px';
  }
  function open(btn) {
    clearTimeout(timer);
    if (cur && cur !== btn) cur.setAttribute('aria-expanded', 'false');
    cur = btn; pop.innerHTML = '';
    const tpl = btn.parentElement.querySelector('template'); if (!tpl) return;
    pop.append(tpl.content.cloneNode(true));
    btn.setAttribute('aria-expanded', 'true'); place(btn);
  }
  function close() { pop.hidden = true; pinned = false; if (cur) cur.setAttribute('aria-expanded', 'false'); cur = null; }
  function later() { if (!pinned) { clearTimeout(timer); timer = setTimeout(close, 180); } }
  document.querySelectorAll('.dr-peek-btn,.dr-spec-btn').forEach(b => {
    b.setAttribute('aria-controls', 'dr-peek-pop'); if (!b.hasAttribute('aria-expanded')) b.setAttribute('aria-expanded', 'false');
    b.addEventListener('mouseenter', () => { if (!pinned) open(b); });
    b.addEventListener('mouseleave', later);
    b.addEventListener('focus', () => { if (!pinned) open(b); });
    b.addEventListener('blur', later);
    b.addEventListener('click', e => { e.stopPropagation(); if (pinned && cur === b) close(); else { open(b); pinned = true; } });
  });
  pop.addEventListener('mouseenter', () => clearTimeout(timer));
  pop.addEventListener('mouseleave', later);
  document.addEventListener('click', e => { if (!pop.contains(e.target)) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) { const b = cur; close(); b && b.focus(); } });
  addEventListener('scroll', close, true); addEventListener('resize', close);

  /* ---------- 2. Filtry segmentowe ---------- */
  document.querySelectorAll('.dr-seg').forEach(g => g.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    g.dispatchEvent(new CustomEvent('dr-seg-change', { detail: b.textContent.trim(), bubbles: true }));
  }));

  /* ---------- 3. Formularz ---------- */
  window.DRForm = {
    invalid(input, on) {
      input.setAttribute('aria-invalid', on ? 'true' : 'false');
      const err = input.closest('.dr-field')?.querySelector('.err'); if (err) err.hidden = !on;
    }
  };
})();
