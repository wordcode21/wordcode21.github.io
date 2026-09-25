/* ============================================================================
 * PORTFOLIO CONTENT
 * ----------------------------------------------------------------------------
 * This is the only file you need to edit. Everything on the page is rendered
 * from the object below — no HTML edits required.
 *
 * Text fields that appear in two languages look like: { en: "...", id: "..." }.
 * Fields that are the same in both languages are just plain strings.
 *
 * NOTE: the projects, prices and stats below are placeholders so the layout
 * has something to show. Replace them with your real work.
 * ========================================================================== */

window.PORTFOLIO = {

  /* ---------------------------------------------------------------- owner */
  owner: {
    /* Nama di sini yang menang. index.html hanya berisi teks cadangan kalau
       JavaScript mati — main.js akan menimpanya dari data ini saat halaman dibuka. */
    name: 'Adji Dwinanda Ardi',
    initials:'',                   // biarkan kosong = otomatis dari name (jadi "AD")
    handle: 'Masadji101',           // tampil di footer sebagai @Masadji101

    /* Logo / brand mark di navbar dan footer.
       Kosongkan ('') untuk memakai inisial nama di dalam kotak gradien.
       Isi dengan path gambar untuk memakai gambarmu, contoh: 'assets/img/logo.png'.
       Gambarnya dipotong bulat otomatis (object-fit: cover), jadi rasio apa pun aman —
       tidak harus persegi. Taruh file di assets/img/.
       Ukuran 256x256 sudah lebih dari cukup: mark-nya cuma 34px, file besar
       hanya memperlambat halaman. Sekali isi, favicon juga ikut memakai gambar ini. */
    logo: 'assets/img/logo.jpg',
    title: {
      en: 'Web Developer & Security Engineer',
      id: 'Web Developer & Security Engineer',
    },
    email: 'nanda404@wearehackerone.com',
    location: 'Kotawaringin Barat, Indonesia',
    resumeUrl: '',                  // opsional: isi kalau punya file/link CV
  },

  /* -------------------------------------------------------------- socials */
  /* GitHub dan X dikomentari dulu supaya situs tidak memasang link rusak.
     Isi handle-nya, lalu hapus tanda komentarnya. */
  socials: [
    { label: 'GitHub', url: 'https://github.com/wordcode21', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/adji-dwinanda-ardi/', icon: 'linkedin' },
    // { label: 'X',      url: 'https://x.com/USERNAME-KAMU',      icon: 'x' },
    { label: 'Email',    url: 'mailto:nanda404@wearehackerone.com',    icon: 'mail' },
  ],

  /* ------------------------------------------------------- hero / roles */
  roles: {
    en: ['Web Developer', 'Penetration Tester', 'Bug Hunter'],
    id: ['Web Developer', 'Pentester', 'Bug Hunter'],
  },

  /* Terminal card in the hero. Typed out line by line, then it stops. */
  terminal: {
    title: '~/portfolio — zsh',
    lines: [
      { cmd: 'whoami',                       out: 'masadji101 — web developer & security engineer' },
      { cmd: 'cat stack.json',               out: '{ "front": ["React","Astro","Vue"], "back": ["Node","Go"] }' },
      { cmd: './audit --target ./webapp',    out: '[ok] 128 routes mapped · 0 critical · 3 low' },
      { cmd: 'cat availability.txt',         out: 'open for freelance — reply within 24h' },
    ],
  },

  /* ------------------------------------------------------------- projects */
  projects: [
    {
      id: 'ahli-web-project-1',
      title: 'Company Profile Landing Page',
      category: 'web',
      year: '2025',
      cover: 1,
      image: '',
      tags: ['WordPress', 'Elementor Pro'],
      summary: {
        en: 'Company profile landing page developed as a freelance project for PT Ahli Web, focused on presenting the company, services, and business information in a clear and professional way.',
        id: 'Landing page company profile yang dikerjakan sebagai freelancer untuk PT Ahli Web, dengan fokus menyajikan informasi perusahaan, layanan, dan kebutuhan bisnis secara jelas dan profesional.',
      },
      highlights: {
        en: [
          'Developed a responsive company profile website using WordPress and Elementor Pro.',
          'Structured the page layout and content to clearly present company services and information.',
          'Worked directly on the project as a freelance web developer.',
        ],
        id: [
          'Mengembangkan website company profile responsif menggunakan WordPress dan Elementor Pro.',
          'Menyusun layout dan konten agar informasi perusahaan dan layanan mudah dipahami.',
          'Mengerjakan project secara langsung sebagai freelance web developer.',
        ],
      },
      links: { demo: '', repo: '' },
    },
    {
      id: 'ahli-web-project-2',
      title: 'Company Profile Website',
      category: 'web',
      year: '2025',
      cover: 2,
      image: '',
      tags: ['WordPress', 'Elementor Pro'],
      summary: {
        en: 'A second company profile website developed as a freelance project for PT Ahli Web, with a focus on responsive design, clear content structure, and a professional presentation.',
        id: 'Website company profile kedua yang dikerjakan sebagai freelancer untuk PT Ahli Web, dengan fokus pada desain responsif, struktur konten yang jelas, dan tampilan yang profesional.',
      },
      highlights: {
        en: [
          'Built and customized the website using WordPress and Elementor Pro.',
          'Implemented a responsive layout for desktop, tablet, and mobile devices.',
          'Collaborated on the project requirements and delivered the website according to the agreed needs.',
        ],
        id: [
          'Membangun dan melakukan kustomisasi website menggunakan WordPress dan Elementor Pro.',
          'Menerapkan layout responsif untuk desktop, tablet, dan perangkat mobile.',
          'Mengerjakan kebutuhan project dan menghasilkan website sesuai kebutuhan yang disepakati.',
        ],
      },
      links: { demo: '', repo: '' },
    },
  ],

  /* Filter labels. Category ids must match `category` values above. */
  categories: [
    { id: 'all',      label: { en: 'All work',  id: 'Semua' } },
    { id: 'web',      label: { en: 'Web apps',  id: 'Web app' } },
    { id: 'security', label: { en: 'Security',  id: 'Keamanan' } },
    { id: 'computer service',    label: { en: 'Computer Service',     id: 'Computer Service' } },
  ],

  /* ------------------------------------------------------------- services */
  services: [
    {
      id: 'webdev',
      icon: 'code',
      featured: false,
      title: { en: 'Web Development', id: 'Pengembangan Web' },
      tagline: {
        en: 'Landing pages, company profiles and dashboards that load fast and are easy to maintain.',
        id: 'Landing page, company profile, dan dashboard yang cepat dibuka dan mudah dirawat.',
      },
      price: 'Rp 1jt',
      priceNote: { en: 'starting from', id: 'mulai dari' },
      features: {
        en: [
          'Responsive, mobile-first build',
          'Core Web Vitals optimised (Lighthouse 95+)',
          'CMS or headless API wiring',
          'Deploy, domain and analytics setup',
          '14 days of post-launch support',
        ],
        id: [
          'Build responsive, mobile-first',
          'Dioptimalkan untuk Core Web Vitals (Lighthouse 95+)',
          'Integrasi CMS atau headless API',
          'Setup deploy, domain, dan analytics',
          'Support 14 hari setelah launch',
        ],
      },
      cta: { en: 'Start a project', id: 'Mulai proyek' },
    },
    {
      id: 'truenas-standard',

      icon: 'server',

      featured: false,

      title: {
        en: 'TrueNAS Private Cloud',
        id: 'TrueNAS Private Cloud',
      },

      tagline: {
        en: 'Turn your old PC into a private and centralized file storage server.',
        id: 'Ubah PC lama menjadi server penyimpanan file pribadi yang terpusat.',
      },

      price: 'Rp 250rb',

      priceNote: {
        en: 'starting from',
        id: 'mulai dari',
      },

      features: {
        en: [
          'TrueNAS installation and configuration',
          'Storage and folder configuration',
          'File sharing via SMB',
          'User and permission management',
          'Network configuration',
          'Access testing from multiple devices',
        ],

        id: [
          'Install dan konfigurasi TrueNAS',
          'Konfigurasi storage dan folder',
          'File sharing melalui SMB',
          'Pengaturan user dan permission',
          'Konfigurasi jaringan',
          'Testing akses dari beberapa perangkat',
        ],
      },

      cta: {
        en: 'Book this service',
        id: 'Pesan layanan',
      },
    },
    {
      id: 'truenas-remote',

      icon: 'globe',

      featured: false,

      title: {
        en: 'TrueNAS Remote Access',
        id: 'TrueNAS Remote Access',
      },

      tagline: {
        en: 'Access your private NAS securely from outside your home or local network.',
        id: 'Akses NAS pribadi dari luar rumah atau jaringan lokal dengan koneksi remote.',
      },

      price: 'Rp 350rb',

      priceNote: {
        en: 'starting from',
        id: 'mulai dari',
      },

      features: {
        en: [
          'Everything in the Standard package',
          'NAS access from outside the local network',
          'Tailscale setup for up to 6 users',
          'File Browser access',
          'Remote access testing and configuration',
        ],

        id: [
          'Semua fitur Paket Standard',
          'Akses NAS dari luar jaringan',
          'Konfigurasi Tailscale hingga 6 user',
          'Akses melalui File Browser',
          'Pengujian dan konfigurasi remote access',
        ],
      },

      cta: {
        en: 'Book this service',
        id: 'Pesan layanan',
      },
    },
    {
      id: 'Computer Service',
      icon: 'services',
      featured: false,
      title: { en: 'Computer Service', id: 'Layanan Komputer' },
      tagline: {
        en: 'Install and activate Windows or Office.',
        id: 'Install dan aktifkan Windows atau Office.',
      },
      price: 'Rp 50ribu',
      priceNote: { en: 'starting from', id: 'mulai dari' },
      features: {
        en: [
          'Install or activate Windows',
          'Install or activate Office',
        ],
        id: [
          'Install atau aktifkan Windows',
          'Install atau aktifkan Office',
        ],
      },
      cta: { en: 'Request a service', id: 'Ajukan service' },
    },
  ],

  /* ------------------------------------------------------------- stack */
  stack: [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Astro', 'Vue 3',
    'Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis', 'GraphQL',
    'Tailwind', 'Docker', 'Nginx', 'Cloudflare', 'Playwright', 'Burp Suite',
  ],

  /* Skill bars in the About section. level = 0–100 */
  skills: [
    { label: { en: 'JavaScript / TypeScript', id: 'JavaScript / TypeScript' }, level: 95 },
    { label: { en: 'Frontend architecture',   id: 'Arsitektur frontend' },     level: 90 },
    { label: { en: 'Web app pentesting',      id: 'Pentest aplikasi web' },    level: 88 },
    { label: { en: 'Backend & APIs',          id: 'Backend & API' },           level: 80 },
  ],

  /* Stats panel in the About section. */
  stats: [
    { value: 2, suffix: '+', label: { en: 'Projects delivered', id: 'Proyek selesai' } },
    { value: 18, suffix: '',  label: { en: 'Security audits',    id: 'Audit keamanan' } },
    { value: 2, suffix: '',  label: { en: 'Avg. Lighthouse',    id: 'Rata-rata Lighthouse' } },
  ],

  /* ------------------------------------------------------------ contact */
  contact: {
    /* Leave empty to fall back to opening the visitor's mail client.
       Set it to a Formspree/Netlify endpoint and remember to allow the
       domain in the CSP connect-src (see index.html). */
    endpoint: '',
    topics: [
      { value: 'webdev',  label: { en: 'Web development',     id: 'Pengembangan web' } },
      { value: 'pentest', label: { en: 'Penetration test',    id: 'Penetration test' } },
      { value: 'audit',   label: { en: 'Code audit',          id: 'Audit kode' } },
      { value: 'other',   label: { en: 'Something else',      id: 'Lainnya' } },
    ],
  },

  /* --------------------------------------------------------------- i18n */
  /* UI strings. Add a language by copying a block and changing the keys. */
  i18n: {
    en: {
      nav_projects: 'Projects',
      nav_services: 'Services',
      nav_stack: 'Stack',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_hire: 'Hire me',

      hero_available: 'Available for new projects',
      hero_hi: "Hi, I'm",
      hero_lead: 'Building websites, exploring application security, and delivering practical IT solutions for personal and business needs.',
      hero_cta1: 'View my work',
      hero_cta2: "Let's talk",

      projects_eyebrow: 'Selected work',
      projects_title: "Things I've shipped",
      projects_sub: 'A mix of product builds and security work. Click any card for the details.',
      projects_empty: 'Nothing in this category yet.',
      project_open: 'View details',
      project_overview: 'Overview',
      project_highlights: 'What I did',
      project_stack: 'Stack',
      project_demo: 'Live demo',
      project_repo: 'Source code',
      project_nolink: 'Private client work',

      services_eyebrow: 'What I sell',
      services_title: 'Services & pricing',
      services_sub: 'Fixed scope, fixed price, clear deliverables. Every package ends with documentation you can act on.',
      services_note: 'Prices are starting points — final quote depends on scope. Need something custom? Just ask.',

      stack_eyebrow: 'Toolbox',
      stack_title: 'Tools I reach for daily',

      about_eyebrow: 'About me',
      about_title: 'Build & Secure',
      about_p1: 'I have a background in Informatics Engineering and an interest in different areas of technology, particularly web development, IT, and cybersecurity. I enjoy understanding how applications work, building practical solutions, and testing them to find areas that can be improved.',
      about_p2: 'I build websites and IT solutions for personal and business needs while continuously developing my web security skills through CTFs, penetration testing, and bug bounty programs. For me, building something is not just about making it work, but also understanding how to make it practical, maintainable, and more secure.',
      about_now_title: 'Right now',
      about_now_text: 'Taking on two freelance slots this quarter. Security reviews and frontend rebuilds are the best fit.',
      about_cta: 'Get in touch',

      contact_eyebrow: 'Contact',
      contact_title: "Tell me what you're building",
      contact_sub: 'Send the scope, the deadline, and what "done" looks like. I reply within one business day.',
      contact_email_label: 'Email',
      contact_location_label: 'Based in',

      form_name: 'Name',
      form_email: 'Email',
      form_topic: 'What do you need?',
      form_message: 'Project details',
      form_submit: 'Send message',
      form_note: 'This form is static. Until you wire up an endpoint, it opens your mail client instead.',
      form_ph_name: 'Ada Lovelace',
      form_ph_email: 'you@company.com',
      form_ph_message: 'Scope, timeline, links…',
      form_err_name: 'Please tell me your name.',
      form_err_email: 'That email address does not look right.',
      form_err_message: 'A few more details would help — at least 10 characters.',
      form_sending: 'Sending…',

      footer_tag: 'Web development & security testing',
      footer_rights: 'All rights reserved.',
      footer_built: 'Hand-built, no frameworks, no trackers.',

      toast_lang: 'Language switched to English',
      toast_theme: 'Theme updated',
      toast_copied: 'Email copied to clipboard',
      toast_copy_fail: 'Copy failed — the address is selected, press Ctrl+C',
      toast_sent: 'Message sent. I’ll reply within one business day.',
      toast_mailto: 'Opening your mail client…',
      toast_error: 'That did not send. Email me directly instead.',
      toast_nothing: 'Nothing here yet — check back soon.',
    },

    id: {
      nav_projects: 'Proyek',
      nav_services: 'Layanan',
      nav_stack: 'Stack',
      nav_about: 'Tentang',
      nav_contact: 'Kontak',
      nav_hire: 'Sewa saya',

      hero_available: 'Terbuka untuk proyek baru',
      hero_hi: 'Halo, saya',
      hero_lead: 'Membangun website, mengeksplorasi keamanan aplikasi, dan menghadirkan solusi IT yang praktis untuk kebutuhan personal maupun bisnis.',
      hero_cta1: 'Lihat karya saya',
      hero_cta2: 'Ngobrol dulu',

      projects_eyebrow: 'Karya pilihan',
      projects_title: 'Yang sudah saya kerjakan',
      projects_sub: 'Campuran proyek produk dan kerja keamanan. Klik kartunya untuk detail.',
      projects_empty: 'Belum ada apa-apa di kategori ini.',
      project_open: 'Lihat detail',
      project_overview: 'Ringkasan',
      project_highlights: 'Yang saya kerjakan',
      project_stack: 'Teknologi',
      project_demo: 'Demo langsung',
      project_repo: 'Kode sumber',
      project_nolink: 'Proyek klien, tidak publik',

      services_eyebrow: 'Yang saya jual',
      services_title: 'Layanan & harga',
      services_sub: 'Scope jelas, harga jelas, hasil jelas. Setiap paket ditutup dengan dokumentasi yang bisa langsung dieksekusi.',
      services_note: 'Harga di atas titik awal — harga final tergantung scope. Butuh yang lain? Tanya saja.',

      stack_eyebrow: 'Perkakas',
      stack_title: 'Yang saya pakai tiap hari',

      about_eyebrow: 'Tentang saya',
      about_title: 'Membangun & Menguji',
      about_p1: 'Saya memiliki latar belakang Teknik Informatika dan tertarik pada berbagai sisi teknologi, terutama web development, IT, dan cybersecurity. Saya senang memahami bagaimana sebuah aplikasi bekerja, membangun solusi yang bisa digunakan, lalu mengujinya untuk melihat apa yang bisa diperbaiki.',
      about_p2: 'SSaya mengembangkan website dan solusi IT untuk kebutuhan personal maupun bisnis, sambil terus memperdalam web security melalui CTF, penetration testing, dan bug bounty. Bagi saya, membangun sesuatu bukan hanya tentang membuatnya berjalan, tetapi juga memahami bagaimana membuatnya lebih praktis, terawat, dan aman.',
      about_now_title: 'Saat ini',
      about_now_text: 'Menerima dua slot freelance kuartal ini. Review keamanan dan rebuild frontend paling cocok.',
      about_cta: 'Hubungi saya',

      contact_eyebrow: 'Kontak',
      contact_title: 'Ceritakan yang sedang kamu bangun',
      contact_sub: 'Kirim scope, deadline, dan definisi "selesai" versi kamu. Saya balas dalam satu hari kerja.',
      contact_email_label: 'Email',
      contact_location_label: 'Berbasis di',

      form_name: 'Nama',
      form_email: 'Email',
      form_topic: 'Butuh apa?',
      form_message: 'Detail proyek',
      form_submit: 'Kirim pesan',
      form_note: 'Form ini statis. Sampai endpoint-nya disambungkan, form akan membuka aplikasi email kamu.',
      form_ph_name: 'Nama kamu',
      form_ph_email: 'kamu@perusahaan.com',
      form_ph_message: 'Scope, timeline, link…',
      form_err_name: 'Nama kamu belum diisi.',
      form_err_email: 'Alamat emailnya sepertinya kurang tepat.',
      form_err_message: 'Tambahkan sedikit detail — minimal 10 karakter.',
      form_sending: 'Mengirim…',

      footer_tag: 'Pengembangan web & pengujian keamanan',
      footer_rights: 'Seluruh hak dilindungi.',
      footer_built: 'Dibuat manual, tanpa framework, tanpa tracker.',

      toast_lang: 'Bahasa diganti ke Indonesia',
      toast_theme: 'Tema diperbarui',
      toast_copied: 'Email disalin ke clipboard',
      toast_copy_fail: 'Gagal menyalin — alamatnya sudah diblok, tekan Ctrl+C',
      toast_sent: 'Pesan terkirim. Saya balas dalam satu hari kerja.',
      toast_mailto: 'Membuka aplikasi email kamu…',
      toast_error: 'Pesan gagal terkirim. Email saya langsung saja.',
      toast_nothing: 'Belum ada isinya — cek lagi nanti.',
    },
  },
};
