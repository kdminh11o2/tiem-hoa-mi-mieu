/* Tiệm hoa mĩ miều — script */
(() => {
  const root = document.documentElement;
  const body = document.body;
  root.classList.add('js');
  const ASSET_V = '20260926b'; // đổi số này mỗi lần thay ảnh để khách không thấy ảnh cũ
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Dữ liệu mẫu hoa (sửa tên / giá / mô tả tại đây) ---------- */
  const FLOWERS = [
    {
      id: 'nang-hong',
      name: 'nắng hồng',
      price: 300000,
      img: 'assets/flowers/hoa-5.webp',
      tone: 'hong', toneLabel: 'Tông hồng', toneColor: '#f5b3c7',
      badge: 'Bán chạy',
      short: 'Hồng tím, cúc hoạ mi, tờ báo cài bên trong.',
      desc: 'Những bông hồng tím nhạt đan cùng cúc hoạ mi và cỏ lau hồng, thêm tờ báo cổ điển cài phía sau. Hợp tặng người thương vào ngày kỷ niệm.',
      meta: ['Khoảng 15 bông hồng', 'Giấy gói hồng phấn + ruy băng chữ', 'Cao khoảng 55 cm'],
    },
    {
      id: 'keo-bong-gon',
      name: 'kẹo bông gòn',
      price: 220000,
      img: 'assets/flowers/hoa-2.webp',
      tone: 'hong', toneLabel: 'Tông hồng', toneColor: '#f5c3cf',
      short: 'Hồng pastel loang xanh, ngọt như kẹo bông.',
      desc: 'Hồng loang hồng xanh, cẩm chướng trắng và một bông môn hồng nổi bật, gói trong giấy nhăn hồng phấn. Nhẹ nhàng, dễ thương cho sinh nhật bạn thân.',
      meta: ['Hồng loang, cẩm chướng, môn hồng', 'Giấy nhăn hồng + ruy băng “Best wishes”', 'Cao khoảng 45 cm'],
    },
    {
      id: 'no-hong',
      name: 'nơ hồng',
      price: 250000,
      img: 'assets/flowers/hoa-3.webp',
      tone: 'hong', toneLabel: 'Tông hồng', toneColor: '#f5c3cf',
      badge: 'Mới',
      short: 'Hồng phấn, lan trắng và chiếc nơ xinh.',
      desc: 'Hồng phấn, lan hồ điệp, hoa sao xanh nhỏ xíu, ôm trong lớp giấy tổ ong trắng và đính một chiếc nơ hồng to. Dành cho cô gái bánh bèo.',
      meta: ['Hồng phấn, lan, sao xanh', 'Giấy tổ ong trắng + nơ hồng', 'Cao khoảng 45 cm'],
    },
    {
      id: 'thu-xanh',
      name: 'thu xanh',
      price: 260000,
      img: 'assets/flowers/hoa-1.webp',
      tone: 'xanh', toneLabel: 'Tông xanh', toneColor: '#a8c79b',
      short: 'Xanh non, trắng tinh khôi, trong trẻo.',
      desc: 'Hồng xanh cốm, hồng trắng, cúc hoạ mi và môn trắng, gói trong giấy xanh rêu với nơ voan. Thanh lịch, hợp tặng thầy cô hoặc chúc mừng khai trương.',
      meta: ['Hồng xanh, hồng trắng, môn trắng', 'Giấy xanh rêu + nơ voan trắng', 'Cao khoảng 50 cm'],
    },
    {
      id: 'may-hong',
      name: 'mây hồng',
      price: 180000,
      img: 'assets/flowers/hoa-4.webp',
      tone: 'hong', toneLabel: 'Tông hồng', toneColor: '#f5c3cf',
      short: 'Bó tròn nhỏ xinh, hồng như má ửng.',
      desc: 'Bó tròn gọn tay với mẫu đơn, hồng, đồng tiền và cúc nhỏ trong sắc hồng đào. Nhỏ nhắn mà đầy đặn, món quà “không cần dịp gì cả”.',
      meta: ['Mẫu đơn, hồng, đồng tiền, cúc', 'Giấy lụa trắng + ruy băng hồng', 'Cao khoảng 35 cm'],
    },
    {
      id: 'banh-dau-tay',
      name: 'bánh dâu tây',
      price: 150000,
      img: 'assets/flowers/hoa-6.webp',
      tone: 'hong', toneLabel: 'Tông hồng', toneColor: '#f5c3cf',
      short: 'Tròn xoe như chiếc bánh kem dâu.',
      desc: 'Hồng trắng, hồng phấn, tulip đỏ và linh lan, xếp trên vòng giấy hoa nhí như một chiếc bánh kem dâu tây. Đáng yêu cho mọi dịp.',
      meta: ['Hồng, tulip, linh lan, cúc', 'Giấy hoa nhí + bóng kính + nơ voan', 'Cao khoảng 40 cm'],
    },
  ];

  const num = n => n.toLocaleString('vi-VN');
  const fmt = n => num(n) + ' đồng';

  /* ---------- Render lưới ---------- */
  const grid = document.getElementById('grid');
  grid.innerHTML = FLOWERS.map((f, i) => `
    <article class="card glass reveal" tabindex="0" role="button"
      data-id="${f.id}" data-tone="${f.tone}"
      aria-label="${f.name}, ${fmt(f.price)}. Xem chi tiết"
      style="--rd:${(i % 3) * 0.08}s; --sd:${-i * 1.3}s">
      ${f.badge ? `<span class="card-badge">${f.badge}</span>` : ''}
      <div class="card-media"><img src="${f.img}?v=${ASSET_V}" alt="Bó hoa ${f.name}" loading="lazy"></div>
      <div class="card-body">
        <h3>${f.name}</h3>
        <p>${f.short}</p>
      </div>
      <div class="card-foot">
        <span class="card-price">${num(f.price)}<small>đồng</small></span>
        <span class="card-btn" aria-hidden="true">
          <svg viewBox="0 0 20 20"><path d="M5.5 7h9l-.8 9.2a1 1 0 0 1-1 .8H7.3a1 1 0 0 1-1-.8L5.5 7Zm2 0V5.8a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
        </span>
      </div>
    </article>`).join('');

  /* ---------- Bộ lọc ---------- */
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-selected', c === chip); });
    const f = chip.dataset.filter;
    grid.querySelectorAll('.card').forEach((card, i) => {
      const show = f === 'all' || card.dataset.tone === f;
      card.classList.toggle('is-hidden', !show);
      if (show) {
        card.animate(
          [{ opacity: 0, transform: 'translateY(24px) scale(.96)' }, { opacity: 1, transform: 'none' }],
          { duration: 600, delay: i * 50, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }
        );
      }
    });
  }));

  /* ---------- Modal chi tiết ---------- */
  const modal = document.getElementById('modal');
  let lastFocus = null;
  const openModal = id => {
    const f = FLOWERS.find(x => x.id === id);
    if (!f) return;
    lastFocus = document.activeElement;
    document.getElementById('modal-img').src = f.img + '?v=' + ASSET_V;
    document.getElementById('modal-img').alt = 'Bó hoa ' + f.name;
    document.getElementById('modal-title').textContent = f.name;
    document.getElementById('modal-price').textContent = fmt(f.price);
    document.getElementById('modal-desc').textContent = f.desc;
    document.getElementById('modal-tone').innerHTML = `<span class="tone-dot" style="background:${f.toneColor}"></span>${f.toneLabel}`;
    document.getElementById('modal-meta').innerHTML = f.meta.map(m => `<li>${m}</li>`).join('');
    modal.hidden = false;
    body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  };
  const closeModal = () => {
    modal.hidden = true;
    body.classList.remove('modal-open');
    lastFocus && lastFocus.focus();
  };
  grid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card) openModal(card.dataset.id);
  });
  grid.addEventListener('keydown', e => {
    const card = e.target.closest('.card');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openModal(card.dataset.id); }
  });
  modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  /* ---------- Reveal khi cuộn ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  /* ---------- Liquid glass: vệt sáng theo con trỏ + nghiêng 3D ---------- */
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer) {
    document.addEventListener('pointermove', e => {
      const el = e.target.closest && e.target.closest('.glass');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });

    {
      const tilt = (el, max) => {
        el.addEventListener('pointermove', e => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - .5;
          const y = (e.clientY - r.top) / r.height - .5;
          el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateY(-6px)`;
        });
        el.addEventListener('pointerleave', () => { el.style.transform = ''; });
      };
      grid.querySelectorAll('.card').forEach(c => tilt(c, 8));
      const feature = document.querySelector('.hero-feature');
      feature.addEventListener('animationend', () => {
        feature.style.opacity = 1;
        feature.style.animation = 'none';
        tilt(feature, 10);
      }, { once: true });
    }
  }

  /* =====================================================
     CHUYỂN ĐỘNG NỀN
     - gió thổi liên tục + "cơn gió" mỗi lần cuộn / vuốt
     - cành hoa đu đưa (canvas #branch, nằm sau lớp kính)
     - cánh hoa rơi + lấp lánh (canvas #petals, nằm trên cùng)
     ===================================================== */
  const branchCv = document.getElementById('branch');
  const bctx = branchCv.getContext('2d');
  const canvas = document.getElementById('petals');
  const ctx = canvas.getContext('2d');
  const leaves = document.querySelectorAll('.leafy');
  let W = 0, H = 0, dpr = 1, running = false;
  let items = [], sparks = [], branches = [];

  /* ----- trạng thái gió ----- */
  let lastY = window.scrollY, gust = 0, gustDir = 1, scrollDy = 0;
  const onScrollFrame = () => {
    const y = window.scrollY;
    scrollDy = y - lastY;
    lastY = y;
    const target = Math.min(Math.abs(scrollDy) / 28, 1.6);
    if (target > gust) { gust += (target - gust) * 0.35; gustDir = scrollDy >= 0 ? 1 : -1; }
    else gust *= 0.955; // gió lặng dần
  };

  /* ----- sprite vẽ sẵn cho nhanh ----- */
  const makeSprite = (size, draw) => {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    draw(c.getContext('2d'), size);
    return c;
  };
  const blossom = (edge, mid) => makeSprite(96, (g, S) => {
    g.translate(S / 2, S / 2);
    for (let i = 0; i < 5; i++) {
      g.save();
      g.rotate((i / 5) * Math.PI * 2);
      const grad = g.createLinearGradient(0, 0, 0, -S * 0.46);
      grad.addColorStop(0, '#fff8f9');
      grad.addColorStop(0.45, mid);
      grad.addColorStop(1, edge);
      g.fillStyle = grad;
      g.beginPath();
      g.moveTo(0, 0);
      g.bezierCurveTo(S * 0.2, -S * 0.12, S * 0.2, -S * 0.4, S * 0.05, -S * 0.46);
      g.lineTo(0, -S * 0.41); // khía nhỏ đầu cánh
      g.lineTo(-S * 0.05, -S * 0.46);
      g.bezierCurveTo(-S * 0.2, -S * 0.4, -S * 0.2, -S * 0.12, 0, 0);
      g.fill();
      g.restore();
    }
    g.fillStyle = '#f6d77a';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      g.beginPath(); g.arc(Math.cos(a) * S * 0.07, Math.sin(a) * S * 0.07, S * 0.018, 0, 7); g.fill();
    }
    g.fillStyle = '#e8839c';
    g.beginPath(); g.arc(0, 0, S * 0.045, 0, 7); g.fill();
  });
  const BLOSSOMS = [
    blossom('#e8678f', '#f9b8cb'),
    blossom('#f08fae', '#fcd5e1'),
    blossom('#d95b85', '#f5a9c0'),
    blossom('#b58ce8', '#e7d8fb'),
  ];
  const BUD = makeSprite(40, (g, S) => {
    const grad = g.createRadialGradient(S * 0.45, S * 0.4, 1, S / 2, S / 2, S * 0.4);
    grad.addColorStop(0, '#fbd3dd'); grad.addColorStop(1, '#d9708f');
    g.fillStyle = grad;
    g.beginPath(); g.ellipse(S / 2, S / 2, S * 0.26, S * 0.36, 0, 0, 7); g.fill();
  });
  const sparkle = (color, core) => makeSprite(64, (g, S) => {
    const c = S / 2;
    const glow = g.createRadialGradient(c, c, 0, c, c, c);
    glow.addColorStop(0, color + 'cc'); glow.addColorStop(0.22, color + '55'); glow.addColorStop(1, color + '00');
    g.fillStyle = glow; g.fillRect(0, 0, S, S);
    g.fillStyle = core;
    g.beginPath(); // ngôi sao 4 cánh
    g.moveTo(c, 2); g.quadraticCurveTo(c, c, S - 2, c); g.quadraticCurveTo(c, c, c, S - 2);
    g.quadraticCurveTo(c, c, 2, c); g.quadraticCurveTo(c, c, c, 2);
    g.fill();
  });
  const SPARKS = [sparkle('#ff8fb1', '#ffffff'), sparkle('#f2b84b', '#fff7dc'), sparkle('#b98ae6', '#ffffff'), sparkle('#ff7fa6', '#ffe6ee')];

  /* ----- cành hoa: sinh cấu trúc cố định (seeded) ----- */
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const grow = (depth, len, angle, maxDepth, bend) => {
    const node = { len, angle, depth, w: Math.max(0.8, (maxDepth - depth + 1) * 1.2), kids: [], flowers: [], phase: rnd() * 6.28 };
    if (depth > 0) {
      const n = (rnd() * 3) | 0;
      for (let i = 0; i < n; i++) node.flowers.push({ t: 0.35 + rnd() * 0.6, off: (rnd() < 0.5 ? -1 : 1) * (4 + rnd() * 6), s: 16 + rnd() * 14, k: (rnd() * 4) | 0, bud: rnd() < 0.25, r: rnd() * 6.28, ph: rnd() * 6.28 });
    }
    if (depth < maxDepth) {
      node.kids.push(grow(depth + 1, len * (0.78 + rnd() * 0.1), bend + (rnd() - 0.5) * 0.35, maxDepth, bend));
      if (rnd() < 0.72) node.kids.push(grow(depth + 1, len * (0.5 + rnd() * 0.2), (rnd() < 0.5 ? -1 : 1) * (0.5 + rnd() * 0.45), maxDepth, bend));
    } else {
      for (let i = 0; i < 3; i++) node.flowers.push({ t: 1, off: (i - 1) * 7, s: 18 + rnd() * 14, k: (rnd() * 4) | 0, bud: i === 2 && rnd() < 0.5, r: rnd() * 6.28, ph: rnd() * 6.28 });
    }
    return node;
  };
  const buildBranches = () => {
    const m = Math.min(W, H);
    const mobile = W < 700;
    seed = 7;
    branches = [{
      // cành rủ từ góc phải trên
      x: W + 6, y: H * (mobile ? 0.1 : 0.14), rot: Math.PI - 0.28, sign: 1,
      alpha: mobile ? 0.6 : 0.95,
      root: grow(0, m * (mobile ? 0.15 : 0.12), 0, mobile ? 5 : 6, -0.12),
    }];
    if (!mobile) branches.push({
      // cành vươn lên từ góc trái dưới
      x: -6, y: H + 6, rot: -Math.PI / 2 + 0.55, sign: -1, alpha: 0.75,
      root: grow(0, m * 0.1, 0, 5, 0.1),
    });
  };

  const drawNode = (node, time, wind, sign) => {
    const bendAmt = 0.25 + node.depth * 0.3;
    const sway = (wind * 0.07 + Math.sin(time * 1.4 + node.phase + node.depth * 0.7) * (0.018 + gust * 0.03)) * bendAmt * sign;
    bctx.save();
    bctx.rotate(node.angle + sway);
    // thân cành hơi cong
    bctx.strokeStyle = '#c49199';
    bctx.lineWidth = node.w;
    bctx.lineCap = 'round';
    bctx.beginPath();
    bctx.moveTo(0, 0);
    bctx.quadraticCurveTo(node.len * 0.5, node.len * 0.06, node.len, 0);
    bctx.stroke();
    // lá non
    if (node.depth > 1 && node.depth % 2 === 0) {
      bctx.save();
      bctx.translate(node.len * 0.5, 0);
      bctx.rotate(-0.9 + Math.sin(time * 2 + node.phase) * 0.15 * (1 + gust));
      bctx.fillStyle = '#a9cba2';
      bctx.beginPath();
      bctx.moveTo(0, 0); bctx.quadraticCurveTo(8, -9, 20, 0); bctx.quadraticCurveTo(8, 9, 0, 0);
      bctx.fill();
      bctx.restore();
    }
    for (const k of node.kids) { bctx.save(); bctx.translate(node.len, 0); drawNode(k, time, wind, sign); bctx.restore(); }
    for (const f of node.flowers) {
      const img = f.bud ? BUD : BLOSSOMS[f.k];
      const size = f.bud ? f.s * 0.55 : f.s;
      bctx.save();
      bctx.translate(node.len * f.t, f.off);
      bctx.rotate(f.r + Math.sin(time * 2.4 + f.ph) * (0.08 + gust * 0.25));
      bctx.drawImage(img, -size / 2, -size / 2, size, size);
      bctx.restore();
    }
    bctx.restore();
  };

  /* ----- cánh hoa rơi ----- */
  const COLORS = ['#f7a8c0', '#ffffff', '#f28bab', '#d4bdf5', '#ffd0dc'];
  const LEAF_COLORS = ['#b9d4ae', '#a9cba2', '#ffffff'];
  const spawn = (initial, fromBranch) => {
    const leaf = !fromBranch && Math.random() < 0.15;
    return {
      leaf,
      x: fromBranch ? W - Math.random() * W * 0.35 : Math.random() * W,
      y: fromBranch ? H * 0.05 + Math.random() * H * 0.25 : initial ? Math.random() * H : -20 - Math.random() * 60,
      z: 0.35 + Math.random() * 0.65, // độ sâu: gần thì trôi nhanh hơn khi cuộn
      s: (leaf ? 7 : 5) + Math.random() * 7,
      vy: 0.35 + Math.random() * 0.7,
      vx: -0.2 + Math.random() * 0.4,
      rot: Math.random() * Math.PI * 2,
      vr: (-1 + Math.random() * 2) * 0.02,
      phase: Math.random() * Math.PI * 2,
      flip: Math.random() * Math.PI * 2,
      c: leaf ? LEAF_COLORS[(Math.random() * LEAF_COLORS.length) | 0] : COLORS[(Math.random() * COLORS.length) | 0],
      a: 0.5 + Math.random() * 0.4,
    };
  };
  const drawPetal = p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.scale(1, Math.abs(Math.cos(p.flip)) * 0.8 + 0.2); // lật cánh 3D
    ctx.globalAlpha = p.a;
    ctx.fillStyle = p.c;
    ctx.beginPath();
    if (p.leaf) {
      ctx.moveTo(0, -p.s);
      ctx.quadraticCurveTo(p.s * 0.8, 0, 0, p.s);
      ctx.quadraticCurveTo(-p.s * 0.8, 0, 0, -p.s);
    } else {
      ctx.moveTo(0, -p.s * 0.9);
      ctx.bezierCurveTo(p.s * 0.9, -p.s * 0.6, p.s * 0.7, p.s * 0.8, 0, p.s);
      ctx.bezierCurveTo(-p.s * 0.7, p.s * 0.8, -p.s * 0.9, -p.s * 0.6, 0, -p.s * 0.9);
    }
    ctx.fill();
    ctx.restore();
  };

  /* ----- lấp lánh ----- */
  const addSpark = (x, y, big) => {
    if (sparks.length > 140) return;
    sparks.push({
      x, y,
      s: (big ? 16 : 8) + Math.random() * (big ? 22 : 12),
      life: 0, max: 40 + Math.random() * 50,
      vx: (Math.random() - 0.5) * 0.6, vy: -0.2 - Math.random() * 0.5,
      r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.06,
      img: SPARKS[(Math.random() * SPARKS.length) | 0],
    });
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const bd = Math.min(dpr, 1.5);
    branchCv.width = W * bd; branchCv.height = H * bd;
    bctx.setTransform(bd, 0, 0, bd, 0, 0);
    const count = Math.round(Math.min(26, Math.max(10, W / 55)));
    items = Array.from({ length: count }, () => spawn(true));
    buildBranches();
  };

  let t = 0;
  const tick = () => {
    if (!running) return;
    t += 1;
    const time = t / 60;
    onScrollFrame();
    const g = gust * gustDir;
    const wind = Math.sin(time * 0.6) * 0.7 + Math.sin(time * 1.9) * 0.25 + g * 1.4;

    /* nền lá SVG: trôi parallax + nghiêng theo gió */
    leaves[0].style.translate = `0 ${lastY * -0.08}px`;
    leaves[1].style.translate = `0 ${lastY * -0.14}px`;
    leaves[0].style.rotate = `${wind * 1.2}deg`;
    leaves[1].style.rotate = `${-wind * 1.2}deg`;

    /* cành hoa */
    bctx.clearRect(0, 0, W, H);
    for (const b of branches) {
      bctx.save();
      bctx.globalAlpha = b.alpha;
      bctx.translate(b.x, b.y);
      bctx.rotate(b.rot);
      drawNode(b.root, time, wind, b.sign);
      bctx.restore();
    }

    /* cánh hoa rơi */
    ctx.clearRect(0, 0, W, H);
    if (gust > 0.5 && Math.random() < gust * 0.25) items.push(spawn(false, true));
    for (let i = items.length - 1; i >= 0; i--) {
      const p = items[i];
      p.y += p.vy - scrollDy * p.z * 0.35;          // cuộn trang → cánh hoa trôi theo chiều sâu
      p.x += p.vx + Math.sin(time * 0.6 + p.phase) * 0.5 - wind * 0.9 * p.z;
      p.rot += p.vr * (1 + gust * 4);
      p.flip += 0.025 + gust * 0.08;
      if (p.y > H + 40 || p.y < -80 || p.x < -60 || p.x > W + 60) {
        if (items.length > 60) { items.splice(i, 1); continue; }
        items[i] = spawn(false);
        if (scrollDy < 0) items[i].y = H + 20; // cuộn lên thì hoa vào từ dưới
      }
      drawPetal(p);
    }

    /* lấp lánh: lác đác khi yên, bùng lên khi cuộn */
    if (Math.random() < 0.06) addSpark(Math.random() * W, Math.random() * H, false);
    const burst = Math.min(Math.abs(scrollDy) / 10, 7);
    for (let i = 0; i < burst; i++) addSpark(Math.random() * W, Math.random() * H, Math.random() < 0.3);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life++;
      if (s.life > s.max) { sparks.splice(i, 1); continue; }
      s.x += s.vx - wind * 0.4; s.y += s.vy - scrollDy * 0.15; s.r += s.vr;
      const k = Math.sin((s.life / s.max) * Math.PI); // nở ra rồi tắt
      const size = s.s * (0.4 + k * 0.8);
      ctx.globalAlpha = k;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.r);
      ctx.drawImage(s.img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(tick);
  };
  const startPetals = () => {
    resize();
    lastY = window.scrollY;
    running = true;
    tick();
  };
  let rz;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(resize, 200); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) running = false;
    else if (!running && W) { running = true; tick(); }
  });

  /* ---------- Intro → mở màn ---------- */
  const intro = document.getElementById('intro');
  const ready = () => {
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    startPetals();
  };
  if (reduceMotion) {
    intro.remove();
    ready();
  } else {
    body.classList.add('is-loading');
    const minTime = new Promise(r => setTimeout(r, 2300));
    const loaded = new Promise(r => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
    const cap = new Promise(r => setTimeout(r, 4500)); // không bắt khách chờ quá lâu
    Promise.race([Promise.all([minTime, loaded]), cap]).then(() => {
      intro.classList.add('is-done');
      ready();
      setTimeout(() => intro.remove(), 1200);
    });
  }
})();
