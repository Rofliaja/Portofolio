/**
 * Portfolio Interactive Engine
 * Mahasiswa Teknik Informatika - Universitas Malikussaleh
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initPhotoManager();
  initCounters();
  initFilters();
  initMobileMenu();
  initDetailModals();
  initContactActions();
});

/* -------------------------------------------------------------
 * 1. THEME CONTROLLER (Dark / Light Mode)
 * ----------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const storedTheme = localStorage.getItem('portfolio_theme') || 'dark';

  if (storedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon('light');
  } else {
    document.body.classList.remove('light-theme');
    updateThemeIcon('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      const newTheme = isLight ? 'light' : 'dark';
      localStorage.setItem('portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(newTheme === 'light' ? 'Mode Terang Diaktifkan' : 'Mode Gelap Cyber Diaktifkan');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      `;
    } else {
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    }
  }
}

/* -------------------------------------------------------------
 * 2. TYPEWRITER EFFECT IN HERO SECTION
 * ----------------------------------------------------------- */
function initTypewriter() {
  const targetElement = document.getElementById('typewriter-text');
  if (!targetElement) return;

  const phrases = [
    'Mahasiswa Teknik Informatika @ UNIMAL',
    'Awardee Pendanaan Program P2MW (Semester 3)',
    'Penggerak Perpustakaan Keliling & Relawan SD',
    'Ex-Ketua Bidang Humas OSIS SMA',
    'Pramuka Penegak Bantara & Pegiat Voli'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before new phrase
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* -------------------------------------------------------------
 * 3. PROFILE PHOTO LOADER (Manual / Controlled via VS Code)
 * ----------------------------------------------------------- */
function initPhotoManager() {
  const profileImg = document.getElementById('profile-img');
  const miniProfileImg = document.getElementById('mini-profile-img');
  const officialPhotoSrc = 'assets/Foto.jpg';
  const defaultPhotoSrc = 'assets/profile-default.svg';

  function setAllProfileImages(src) {
    if (profileImg) {
      profileImg.src = src;
      profileImg.style.objectPosition = 'center 20%';
    }
    if (miniProfileImg) {
      miniProfileImg.src = src;
      miniProfileImg.style.objectPosition = 'center 20%';
    }
  }

  // Clear any legacy client localStorage cache so physical file always rules
  localStorage.removeItem('portfolio_user_photo');

  // Verify and load physical assets/Foto.jpg
  const testImg = new Image();
  testImg.src = officialPhotoSrc;
  testImg.onload = () => setAllProfileImages(officialPhotoSrc);
  testImg.onerror = () => {
    const testFallback = new Image();
    testFallback.src = 'assets/profile.jpg';
    testFallback.onload = () => setAllProfileImages('assets/profile.jpg');
    testFallback.onerror = () => setAllProfileImages(defaultPhotoSrc);
  };
}

/* -------------------------------------------------------------
 * 4. STATS COUNTER ANIMATION
 * ----------------------------------------------------------- */
function initCounters() {
  const counterElements = document.querySelectorAll('[data-target-count]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }
}

/* -------------------------------------------------------------
 * 5. FILTER TABS (Achievements, Pengabdian, Leadership)
 * ----------------------------------------------------------- */
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(' ');
        if (filterVal === 'all' || itemCategories.includes(filterVal)) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 6. MOBILE NAVBAR
 * ----------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileToggle || !mobileMenu) return;

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* -------------------------------------------------------------
 * 7. STORY & DETAIL MODAL
 * ----------------------------------------------------------- */
const storyDatabase = {
  p2mw: {
    title: 'Program Pembinaan Mahasiswa Wirausaha (P2MW)',
    subtitle: 'Lolos Pendanaan Kemendikbudristek di Semester 3',
    badge: 'Prestasi Nasional Kewirausahaan',
    date: 'Semester 3 | Kemendikbudristek & Belmawa',
    icon: '💡',
    content: `
      <div class="space-y-4 text-slate-300">
        <p class="leading-relaxed">
          Pada semester 3 di Program Studi Teknik Informatika Universitas Malikussaleh, saya bersama tim merumuskan gagasan inovasi kewirausahaan berbasis teknologi untuk mengikuti <strong>Program Pembinaan Mahasiswa Wirausaha (P2MW)</strong> yang diselenggarakan oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek).
        </p>
        <div class="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-200">
          <h4 class="font-bold text-white mb-1">Key Milestones:</h4>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Menyusun Business Model Canvas (BMC), studi kelayakan pasar, dan rancangan sistem digital.</li>
            <li>Melewati tahap seleksi ketat administrasi dan substansi perguruan tinggi hingga tingkat nasional.</li>
            <li>Berhasil <strong>lolos pendanaan resmi</strong> untuk tahap inkubasi dan pengembangan bisnis mahasiswa.</li>
          </ul>
        </div>
        <p class="leading-relaxed">
          Pencapaian ini melatih ketajaman berpikir komersial, penyusunan strategi operasional, pitching di hadapan reviewer nasional, serta pembagian peran kepemimpinan dalam tim.
        </p>
      </div>
    `
  },
  pengabdian_literasi: {
    title: 'Aksi Pengabdian: Perpustakaan Keliling & Sekolah SD',
    subtitle: 'Menghadirkan Akses Literasi & Semangat Pendidikan di Pelosok Desa',
    badge: 'Social Impact & Pengabdian Masyarakat',
    date: 'Kabupaten Asal | Inisiatif Mahasiswa Rantau UNIMAL',
    icon: '📚',
    content: `
      <div class="space-y-4 text-slate-300">
        <p class="leading-relaxed">
          Sebagai mahasiswa daerah asal kabupaten yang sedang menuntut ilmu di Lhokseumawe (Aceh Utara), saya merasa memiliki tanggung jawab moril untuk kembali dan berkontribusi secara nyata ke daerah asal melalui aksi sosial kemasyarakatan.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div class="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <span class="text-amber-400 font-semibold block mb-1">🚐 Perpustakaan Keliling</span>
            Menginisiasi dan mengawal kedatangan armada mobil perpustakaan keliling langsung ke halaman sekolah dasar untuk menghadirkan ratusan buku bacaan edukatif baru bagi para murid.
          </div>
          <div class="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <span class="text-cyan-400 font-semibold block mb-1">🏫 Motivasi & Edukasi SD</span>
            Masuk ke ruang kelas sekolah dasar, memandu sesi membaca interaktif, pengenalan dasar dunia teknologi informatika, dan memotivasi anak-anak desa untuk berani bercita-cita tinggi.
          </div>
        </div>
        <p class="leading-relaxed">
          Program ini disambut dengan antusiasme yang luar biasa oleh dewan guru dan anak-anak desa, sekaligus menjadi bukti bahwa mahasiswa rantau dapat menjadi katalisator kemajuan di tanah kelahirannya.
        </p>
      </div>
    `
  },
  hut_ri: {
    title: 'Kepanitiaan & Perayaan HUT RI di Desa',
    subtitle: 'Mempererat Semangat Gotong Royong & Nasionalisme Warga',
    badge: 'Community Organizing & Youth Movement',
    date: 'Desa Pengabdian | Peringatan 17 Agustus',
    icon: '🇮🇩',
    content: `
      <div class="space-y-4 text-slate-300">
        <p class="leading-relaxed">
          Dalam rangkaian pengabdian di desa, saya turut aktif mengambil peran kunci dalam kepanitiaan persiapan peringatan Hari Ulang Tahun Republik Indonesia (HUT RI) bersama pemuda dan aparatur desa.
        </p>
        <div class="p-4 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-200 text-sm space-y-2">
          <p><strong>Peran & Tanggung Jawab:</strong></p>
          <ul class="list-disc list-inside space-y-1">
            <li>Merancang dan mengoordinasikan berbagai perlombaan rakyat yang mendidik, meriah, dan inklusif untuk anak-anak hingga orang tua.</li>
            <li>Mengatur logistik lapangan, manajemen panggung, dan koordinasi dengan tokoh masyarakat desa.</li>
            <li>Menggalang kekompakan antara mahasiswa pengabdi dan karang taruna setempat, membangkitkan suasana pesta kemerdekaan yang penuh kehangatan.</li>
          </ul>
        </div>
      </div>
    `
  },
  osis_humas: {
    title: 'Ex-Ketua Bidang Humas OSIS SMA',
    subtitle: 'Membangun Komunikasi Publik, Diplomasi Antarsekolah, & Event Organizer',
    badge: 'Kepemimpinan & Public Relations',
    date: 'Masa Sekolah Menengah Atas (SMA)',
    icon: '🤝',
    content: `
      <div class="space-y-4 text-slate-300">
        <p class="leading-relaxed">
          Dipercaya mengemban amanah sebagai <strong>Ketua Bidang Hubungan Masyarakat (Humas) OSIS</strong> di masa SMA, menjadi wadah krusial dalam menempa kecakapan komunikasi verbal, negosiasi, dan kepemimpinan formal.
        </p>
        <div class="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-200 text-sm space-y-2">
          <h4 class="font-bold text-white mb-1">Pencapaian & Kontribusi:</h4>
          <ul class="list-disc list-inside space-y-1">
            <li>Menjadi juru bicara resmi OSIS untuk koordinasi dengan kepala sekolah, dewan guru, paguyuban alumni, dan perwakilan OSIS sekolah lain.</li>
            <li>Mengelola publikasi media informasi, mading, dokumentasi acara sekolah besar seperti Pentas Seni, Class Meeting, dan Masa Pengenalan Lingkungan Sekolah (MPLS).</li>
            <li>Membangun networking dan menjalin kesepakatan kerjasama/sponsorship kegiatan kesiswaan.</li>
          </ul>
        </div>
      </div>
    `
  },
  pramuka_bantara: {
    title: 'Pramuka Penegak Bantara',
    subtitle: 'Karakter Tangguh, Kedisiplinan Tinggi, & Kepanduan Lapangan',
    badge: 'Kepanduan & Survival Lapangan',
    date: 'Gugus Depan Pramuka SMA',
    icon: '⚜️',
    content: `
      <div class="space-y-4 text-slate-300">
        <p class="leading-relaxed">
          Menempuh jenjang kepramukaan hingga dilantik resmi sebagai <strong>Penegak Bantara</strong> setelah berhasil menuntaskan seluruh butir Syarat Kecakapan Umum (SKU) tingkat Penegak Bantara.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div class="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-200">
            <span class="font-bold block text-white mb-1">Disiplin & Mentalitas</span>
            Terbiasa dengan tata cara protokoler, ketahanan fisik, manajemen perkemahan, dan navigasi darat.
          </div>
          <div class="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-200">
            <span class="font-bold block text-white mb-1">Jiwa Gotong Royong</span>
            Penerapan nyata kode kehormatan Tri Satya dan Dasa Darma dalam keseharian: kesetiakawanan sosial dan kepedulian lingkungan.
          </div>
        </div>
      </div>
    `
  },
  esports_swords: {
    title: 'Esports: Semifinalis Free Fire Medan & Guild Master EXS SWORDS',
    subtitle: 'Kepemimpinan Taktis, Fast Decision Making, & Manajemen Roster Kompetitif',
    badge: 'Competitive Esports & Team Leadership',
    date: 'Tournament Kota Medan | Guild Leader EXS SWORDS',
    icon: '⚔️',
    content: `
      <div class="space-y-4 text-slate-300">
        <p class="leading-relaxed">
          Di luar akademik, saya mendedikasikan minat strategis dalam dunia esports kompetitif Free Fire. Sebagai <strong>Ketua Guild tim "EXS SWORDS"</strong>, saya memimpin skuad kompetitif dalam berbagai turnamen berkelas.
        </p>
        <div class="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-200 text-sm space-y-2">
          <h4 class="font-bold text-white mb-1">Highlights Kompetitif:</h4>
          <ul class="list-disc list-inside space-y-1">
            <li>Berhasil membawa tim melaju hingga babak <strong>Semi Final Tournament Free Fire Kota Medan</strong>, bertanding melawan tim-tim esports terkuat dari berbagai penjuru kota.</li>
            <li>Bertindak sebagai In-Game Leader (IGL) sekaligus manajer guild: merancang rotasi drop-zone, pembagian roleplay, analisa gameplay lawan, dan manajemen roster tim.</li>
            <li>Mengasah kemampuan berpikir tenang di bawah tekanan intens, komunikasi cepat (call-out), dan evaluasi performa objektif pasca-pertandingan.</li>
          </ul>
        </div>
        <p class="leading-relaxed">
          Keahlian strategic thinking dan teamwork di ranah gaming ini secara nyata memperkuat kapabilitas saya dalam manajemen proyek dan kerja sama tim teknologi di dunia nyata.
        </p>
      </div>
    `
  },
  siswa_berprestasi: {
    title: 'Siswa Berprestasi Tingkat SMP se-Kabupaten',
    subtitle: 'Seleksi Akademik & Potensi Unggul Menjaring 3 Siswa Terbaik per Sekolah',
    badge: 'Pondasi Akademik Unggulan',
    date: 'Tingkat SMP | Seleksi Kabupaten',
    icon: '🏆',
    content: `
      <div class="space-y-4 text-slate-300">
        <p class="leading-relaxed">
          Merupakan bukti pondasi kecerdasan dan dedikasi belajar sejak usia muda. Dalam ajang pemilihan <strong>Siswa Berprestasi tingkat SMP se-Kabupaten</strong>, dilakukan penyaringan dan pengujian komprehensif yang sangat kompetitif.
        </p>
        <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-200 text-sm space-y-2">
          <p><strong>Format & Seleksi:</strong></p>
          <ul class="list-disc list-inside space-y-1">
            <li>Testing berstandar kabupaten meliputi kemampuan akademik sains, matematika, wawasan kebangsaan, dan kepribadian.</li>
            <li>Hanya menyaring kuota <strong>3 siswa terbaik dari setiap sekolah negeri</strong> di seluruh kabupaten.</li>
            <li>Saya berhasil lolos sebagai salah satu perwakilan terpilih yang mengukir nama baik sekolah di tingkat kabupaten.</li>
          </ul>
        </div>
      </div>
    `
  },
  volly: {
    title: 'Ekstrakurikuler Bola Voli SMA',
    subtitle: 'Kebugaran Fisik, Refleks Cepat, & Jiwa Sportivitas Lapangan',
    badge: 'Atletik & Kesehatan Fisik',
    date: 'Masa SMA',
    icon: '🏐',
    content: `
      <div class="space-y-4 text-slate-300">
        <p class="leading-relaxed">
          Mengikuti ekstrakurikuler bola voli selama masa SMA secara konsisten menjadi penyeimbang antara aktivitas kognitif di kelas dengan ketangkasan jasmani.
        </p>
        <ul class="list-disc list-inside space-y-1 text-sm text-slate-300">
          <li>Melatih refleks cepat, vertical jump, teknik smash, passing bawah/atas, serta koordinasi formasi pertahanan.</li>
          <li>Menanamkan mentalitas pantang menyerah sebelum peluit akhir, saling percaya antarposisi pemain, dan respek tinggi kepada lawan tanding.</li>
        </ul>
      </div>
    `
  }
};

function initDetailModals() {
  const detailModal = document.getElementById('story-detail-modal');
  const modalContentContainer = document.getElementById('story-modal-content');
  const closeBtn = document.getElementById('close-story-modal-btn');
  const triggerBtns = document.querySelectorAll('[data-story-key]');

  if (!detailModal || !modalContentContainer) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const storyKey = btn.getAttribute('data-story-key');
      const data = storyDatabase[storyKey];
      if (!data) return;

      modalContentContainer.innerHTML = `
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl shadow-inner">
            ${data.icon}
          </div>
          <div>
            <span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-1">
              ${data.badge}
            </span>
            <h3 class="text-xl sm:text-2xl font-bold font-heading text-white">
              ${data.title}
            </h3>
            <p class="text-xs sm:text-sm text-cyan-300 font-medium">${data.subtitle}</p>
          </div>
        </div>
        <div class="text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
          <span>📅 ${data.date}</span>
        </div>
        <div>
          ${data.content}
        </div>
      `;

      detailModal.classList.remove('hidden');
      detailModal.classList.add('flex');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      detailModal.classList.add('hidden');
      detailModal.classList.remove('flex');
    });
  }

  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      detailModal.classList.add('hidden');
      detailModal.classList.remove('flex');
    }
  });
}

/* -------------------------------------------------------------
 * 8. CONTACT & CLIPBOARD ACTIONS
 * ----------------------------------------------------------- */
function initContactActions() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactForm = document.getElementById('contact-form');
  const emailVal = 'steealrofli@gmail.com'; // Actual personal contact email

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailVal).then(() => {
        showToast('📋 Email steealrofli@gmail.com berhasil disalin!');
      }).catch(() => {
        showToast(`Email: ${emailVal}`);
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || 'Teman';
      const inputs = contactForm.querySelectorAll('input');
      const contactInfo = inputs.length > 1 ? inputs[1].value : '';
      const subjectSelect = contactForm.querySelector('select');
      const subject = subjectSelect ? subjectSelect.options[subjectSelect.selectedIndex].text : 'Diskusi / Kolaborasi';
      const message = contactForm.querySelector('textarea')?.value || '';

      showToast(`Terima kasih ${name}! Mengarahkan pesan Anda ke WhatsApp...`);

      const formattedText = encodeURIComponent(
        `Halo Rofli,\n\nPerkenalkan saya: ${name}\nKontak/Email: ${contactInfo}\nSubjek: ${subject}\n\nPesan:\n${message}`
      );

      setTimeout(() => {
        window.open(`https://wa.me/6283173854937?text=${formattedText}`, '_blank');
      }, 500);

      contactForm.reset();
    });
  }
}

/* -------------------------------------------------------------
 * 9. GLOBAL TOAST NOTIFICATION
 * ----------------------------------------------------------- */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'error' ? 'bg-red-950/90 border-red-500 text-red-200' :
                  type === 'warning' ? 'bg-amber-950/90 border-amber-500 text-amber-200' :
                  'bg-slate-900/90 border-cyan-500 text-cyan-200';

  toast.className = `px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl flex items-center gap-3 text-sm pointer-events-auto transform translate-y-3 opacity-0 transition-all duration-300 ${bgColor}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
