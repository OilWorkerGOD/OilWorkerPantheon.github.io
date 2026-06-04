// CONTADOR DE VISITAS
async function loadVisitorCount() {
  try {
    const r = await fetch('https://api.counterapi.dev/v1/oilworkerpantheon/visits/up');
    const d = await r.json();

    const value = d.count !== undefined ? d.count : d.Count;

    document.getElementById('visitor-count').textContent =
      parseInt(value).toLocaleString('en-US');

  } catch (e) {
    document.getElementById('visitor-count').textContent = '—';
  }
}


// SISTEMA DE LIKES
function initLikes() {
  document.querySelectorAll('.like-btn').forEach(btn => {

    const id = btn.dataset.id;
    const countEl = btn.querySelector('.count');
    const key = 'liked_' + id;

    async function loadLikes() {
      try {
        const r = await fetch(`https://api.counterapi.dev/v1/oilworkerpantheon/likes_${id}`);
        const d = await r.json();

        countEl.textContent = d.count ?? d.Count ?? 0;

      } catch {
        countEl.textContent = '0';
      }

      if (localStorage.getItem(key)) {
        btn.classList.add('liked');
      }
    }

    // cargar likes al iniciar
    loadLikes();

    btn.addEventListener('click', async () => {

      if (localStorage.getItem(key)) {

        const r = await fetch(`https://api.counterapi.dev/v1/oilworkerpantheon/likes_${id}/down`);
        const d = await r.json();

        countEl.textContent = d.count ?? d.Count ?? 0;
        localStorage.removeItem(key);
        btn.classList.remove('liked');

      } else {

        const r = await fetch(`https://api.counterapi.dev/v1/oilworkerpantheon/likes_${id}/up`);
        const d = await r.json();

        countEl.textContent = d.count ?? d.Count ?? 0;
        localStorage.setItem(key, '1');
        btn.classList.add('liked');
      }

    });

  });
}


// INICIALIZACIÓN GLOBAL
document.addEventListener('DOMContentLoaded', () => {
  loadVisitorCount();
  initLikes();
});