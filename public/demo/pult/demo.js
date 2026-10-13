(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var T = {
    uk: {
      demoTag: 'ДЕМО', demoText: 'Дані вигадані, зміни не зберігаються. Потикайте: ставте галочки, міняйте статуси, додавайте записи.',
      reset: 'Скинути', cta: 'Хочу такий пульт', kick: '// пульт керування салоном', brand: 'Салон краси «Ліра»', mark: 'Л', cur: '₴',
      sTasks: 'Задачі тижня', sPosts: 'Пости опубліковано', sClients: 'Візити цього тижня', sMoney: 'Баланс місяця',
      tTasks: 'Задачі', tPosts: 'Контент', tClients: 'Записи', tMoney: 'Фінанси', add: 'Додати',
      postsNote: 'План публікацій. «Готово» означає, що пост погоджено, і автопостинг опублікує його в дату.',
      thDate: 'Дата', thRubric: 'Рубрика', thTopic: 'Тема', thWhere: 'Куди', thStatus: 'Статус', thClient: 'Клієнтка', thService: 'Послуга · майстер', thStage: 'Статус', thAmount: 'Сума', thNote: 'Опис',
      foot: 'Це демо. Справжній пульт синхронізується з ботом запису: нові записи, підтвердження і нагадування з’являються тут самі, а AI-асистент рахує завантаження майстрів і виручку.',
      phTask: 'Нова задача…', phClient: 'Ім’я клієнтки', phService: 'Послуга · майстер', phAmount: 'Сума, ₴', phNote: 'За що',
      week: 'Тиждень з ', days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'], owner: 'Олена', ai: 'AI', ownerFull: 'Олена (власниця)', aiFull: 'AI-асистент',
      status: { draft: 'Чернетка', ready: 'Готово', done: 'Опубліковано', err: 'Помилка' },
      stages: ['Нова заявка', 'Підтверджено', 'Прийшла', 'Не прийшла', 'Скасовано'], leads: 'нових і підтверджених: ', income: ' дохід · ', expense: ' витрати',
      inOut: { out: 'Витрата', 'in': 'Дохід' }, emptyTasks: 'На цей тиждень задач немає. Додайте першу.',
      tasks: [
        ['Пн', 'ai', 'Нагадати 14 клієнткам про запис на завтра', true], ['Пн', 'me', 'Замовити гель-лаки і базу у постачальника', true],
        ['Пн', 'ai', 'Знайти «вікна» у графіку й запропонувати їх у сторіз', true], ['Вт', 'me', 'Погодити графік майстрів на листопад', true],
        ['Вт', 'ai', 'Написати клієнткам, які не були 6+ тижнів', false], ['Ср', 'me', 'Співбесіда з новою майстринею педикюру', false],
        ['Ср', 'ai', 'Зібрати відгуки після вчорашніх візитів', false], ['Чт', 'me', 'Зйомка робіт для Instagram', false],
        ['Чт', 'ai', 'Звіт: завантаження майстрів і виручка за тиждень', false], ['Пт', 'me', 'Підсумки тижня і акція на вихідні', false]
      ],
      posts: [
        [-3, 'Роботи', 'Нюдовий манікюр на короткі нігті: до і після', 'done'], [-1, 'Порада', 'Як продовжити носіння покриття до 4 тижнів', 'done'],
        [1, 'Акція', 'Манікюр + педикюр у четвер: −15%', 'ready'], [3, 'Майстри', 'Знайомтесь: Іра, топ-майстер манікюру', 'ready'],
        [5, 'Порада', 'Догляд за кутикулою вдома', 'draft'], [8, 'Роботи', 'Осінні дизайни: 6 ідей', 'draft']
      ],
      clients: [['Анна К.', 'Манікюр + покриття · Іра', 'Прийшла', 650], ['Марина Т.', 'Педикюр · Оля', 'Прийшла', 750],
        ['Софія Л.', 'Корекція брів · Таня', 'Підтверджено', 400], ['Юлія М.', 'Манікюр + дизайн · Іра', 'Підтверджено', 800],
        ['Катерина Р.', 'Нарощування · Іра', 'Нова заявка', 1100], ['Олена Д.', 'Педикюр · Оля', 'Не прийшла', 0]],
      money: [[-9, 'in', 18400, 'Виручка за минулий тиждень'], [-6, 'in', 2600, 'Продаж догляду (олійки, креми)'], [-5, 'out', 4200, 'Матеріали: гель-лаки, база, топ'],
        [-4, 'out', 900, 'Бот запису і AI-асистент'], [-2, 'out', 1500, 'Реклама в Instagram']]
    },
    en: {
      demoTag: 'DEMO', demoText: 'Sample data, changes are not saved. Try it: tick tasks, change statuses, add rows.',
      reset: 'Reset', cta: 'I want this cockpit', kick: '// salon cockpit', brand: '«Lyra» Beauty Salon', mark: 'L', cur: '$',
      sTasks: 'Tasks this week', sPosts: 'Posts published', sClients: 'Visits this week', sMoney: 'Month balance',
      tTasks: 'Tasks', tPosts: 'Content', tClients: 'Bookings', tMoney: 'Finance', add: 'Add',
      postsNote: 'Publishing plan. “Ready” means the post is approved and autoposting will publish it on the date.',
      thDate: 'Date', thRubric: 'Rubric', thTopic: 'Topic', thWhere: 'Where', thStatus: 'Status', thClient: 'Client', thService: 'Service · master', thStage: 'Status', thAmount: 'Amount', thNote: 'Note',
      foot: 'This is a demo. The real cockpit syncs with the booking bot: new bookings, confirmations and reminders appear here automatically, and the AI assistant tracks master workload and revenue.',
      phTask: 'New task…', phClient: 'Client name', phService: 'Service · master', phAmount: 'Amount, $', phNote: 'What for',
      week: 'Week of ', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], owner: 'Olena', ai: 'AI', ownerFull: 'Olena (owner)', aiFull: 'AI assistant',
      status: { draft: 'Draft', ready: 'Ready', done: 'Published', err: 'Error' },
      stages: ['New request', 'Confirmed', 'Came', 'No-show', 'Cancelled'], leads: 'new and confirmed: ', income: ' income · ', expense: ' expenses',
      inOut: { out: 'Expense', 'in': 'Income' }, emptyTasks: 'No tasks this week yet. Add the first one.',
      tasks: [
        ['Mon', 'ai', 'Remind 14 clients about tomorrow\'s bookings', true], ['Mon', 'me', 'Order gel polish and base from the supplier', true],
        ['Mon', 'ai', 'Find free slots and offer them in Stories', true], ['Tue', 'me', 'Approve the masters\' November schedule', true],
        ['Tue', 'ai', 'Message clients who haven\'t visited in 6+ weeks', false], ['Wed', 'me', 'Interview a new pedicure master', false],
        ['Wed', 'ai', 'Collect reviews after yesterday\'s visits', false], ['Thu', 'me', 'Photo shoot of works for Instagram', false],
        ['Thu', 'ai', 'Report: master workload and weekly revenue', false], ['Fri', 'me', 'Weekly review and a weekend offer', false]
      ],
      posts: [
        [-3, 'Works', 'Nude manicure on short nails: before and after', 'done'], [-1, 'Tip', 'How to make your polish last 4 weeks', 'done'],
        [1, 'Offer', 'Manicure + pedicure on Thursday: −15%', 'ready'], [3, 'Team', 'Meet Ira, our top manicure master', 'ready'],
        [5, 'Tip', 'Cuticle care at home', 'draft'], [8, 'Works', 'Autumn designs: 6 ideas', 'draft']
      ],
      clients: [['Anna K.', 'Manicure + gel · Ira', 'Came', 18], ['Maryna T.', 'Pedicure · Olia', 'Came', 20],
        ['Sofia L.', 'Brow shaping · Tania', 'Confirmed', 11], ['Yulia M.', 'Manicure + design · Ira', 'Confirmed', 22],
        ['Kateryna R.', 'Nail extensions · Ira', 'New request', 30], ['Olena D.', 'Pedicure · Olia', 'No-show', 0]],
      money: [[-9, 'in', 450, 'Last week\'s revenue'], [-6, 'in', 65, 'Retail: oils and creams'], [-5, 'out', 100, 'Supplies: gel polish, base, top'],
        [-4, 'out', 22, 'Booking bot and AI assistant'], [-2, 'out', 36, 'Instagram ads']]
    }
  };

  var lang = /[?&]lang=en/.test(location.search) ? 'en' : 'uk';
  var STATUS_CLS = { draft: 's-draft', ready: 's-ready', done: 's-done', err: 's-err' };
  var state;

  function iso(d) { return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10); }
  function shift(n) { var d = new Date(); d.setDate(d.getDate() + n); return iso(d); }
  function monday() { var d = new Date(); var w = (d.getDay() + 6) % 7; d.setDate(d.getDate() - w); return iso(d); }
  function fmtDate(s) { var p = s.split('-'); return p[2] + '.' + p[1]; }
  function money(n) { var c = T[lang].cur; return (n < 0 ? '−' : '') + (c === '$' ? '$' : '') + Math.abs(n).toLocaleString(lang === 'uk' ? 'uk-UA' : 'en-US', { maximumFractionDigits: 2 }) + (c === '$' ? '' : ' ' + c); }

  function seed() {
    var t = T[lang], id = 0;
    state = {
      tasks: t.tasks.map(function (x) { return { id: ++id, day: x[0], who: x[1], title: x[2], done: x[3] }; }),
      posts: t.posts.map(function (x) { return { id: ++id, date: shift(x[0]), rubric: x[1], topic: x[2], status: x[3] }; }),
      clients: t.clients.map(function (x) { return { id: ++id, name: x[0], service: x[1], stage: x[2], amount: x[3] }; }),
      money: t.money.map(function (x) { return { id: ++id, date: shift(x[0]), type: x[1], amount: x[2], note: x[3] }; })
    };
  }

  function applyText() {
    var t = T[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) { if (t[el.dataset.t]) el.textContent = t[el.dataset.t]; });
    document.querySelectorAll('[data-ph]').forEach(function (el) { el.placeholder = t[el.dataset.ph]; });
    $('#langBtn').textContent = lang === 'uk' ? 'EN' : 'UA';
    document.querySelector('[data-t="cta"]').setAttribute('href', lang === 'uk' ? '/contact/' : '/en/contact/');
    $('.mark').textContent = T[lang].mark;
    $('#newTaskDay').innerHTML = t.days.map(function (d) { return '<option>' + d + '</option>'; }).join('');
    $('#newTaskWho').innerHTML = '<option value="me">' + t.ownerFull + '</option><option value="ai">' + t.aiFull + '</option>';
    $('#mType').innerHTML = '<option value="out">' + t.inOut.out + '</option><option value="in">' + t.inOut['in'] + '</option>';
  }

  function render() {
    var t = T[lang];
    $('#weekLabel').textContent = t.week + fmtDate(monday());
    var wt = state.tasks;
    if (!wt.length) { $('#taskList').innerHTML = '<div class="empty">' + t.emptyTasks + '</div>'; }
    else {
      $('#taskList').innerHTML = t.days.filter(function (d) { return wt.some(function (x) { return x.day === d; }); }).map(function (d) {
        return '<div class="day box"><h3>' + d + '</h3>' + wt.filter(function (x) { return x.day === d; }).map(function (x) {
          return '<label class="task ' + (x.who === 'ai' ? '' : 'me') + ' ' + (x.done ? 'done' : '') + '"><input type="checkbox" data-task="' + x.id + '"' + (x.done ? ' checked' : '') + '>' +
            '<span class="tt">' + esc(x.title) + '</span><span class="who ' + (x.who === 'ai' ? 'c' : '') + '">' + (x.who === 'ai' ? t.ai : t.owner) + '</span></label>';
        }).join('') + '</div>';
      }).join('');
    }
    var done = wt.filter(function (x) { return x.done; }).length;
    $('#kTasks').textContent = wt.length ? done + ' / ' + wt.length : '—';
    $('#kTasksBar').style.width = (wt.length ? done / wt.length * 100 : 0) + '%';

    var posts = state.posts.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
    $('#postRows').innerHTML = posts.map(function (p) {
      return '<tr><td class="num">' + fmtDate(p.date) + '</td><td>' + esc(p.rubric) + '</td><td>' + esc(p.topic) + '</td><td class="plat">Instagram · Telegram</td>' +
        '<td><select data-post="' + p.id + '" aria-label="' + t.thStatus + '">' + Object.keys(t.status).map(function (k) { return '<option value="' + k + '"' + (k === p.status ? ' selected' : '') + '>' + t.status[k] + '</option>'; }).join('') + '</select></td></tr>';
    }).join('');
    var pub = posts.filter(function (p) { return p.status === 'done'; }).length;
    $('#kPosts').textContent = pub + ' / ' + posts.length;
    $('#kPostsBar').style.width = (posts.length ? pub / posts.length * 100 : 0) + '%';

    $('#clientRows').innerHTML = state.clients.map(function (c) {
      return '<tr><td><b>' + esc(c.name) + '</b></td><td>' + esc(c.service) + '</td><td><select data-client="' + c.id + '" aria-label="' + t.thStage + '">' +
        t.stages.map(function (s) { return '<option' + (s === c.stage ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></td><td class="num">' + (c.amount ? money(c.amount) : '—') + '</td></tr>';
    }).join('');
    $('#kClients').textContent = state.clients.filter(function (c) { return c.stage === t.stages[2]; }).length;
    $('#kLeads').textContent = t.leads + state.clients.filter(function (c) { return c.stage === t.stages[0] || c.stage === t.stages[1]; }).length;

    var ms = state.money.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    $('#moneyRows').innerHTML = ms.map(function (m) {
      return '<tr><td class="num">' + fmtDate(m.date) + '</td><td>' + esc(m.note) + '</td><td class="num ' + (m.type === 'in' ? 'money-in' : 'money-out') + '">' + (m.type === 'in' ? '+' : '−') + money(+m.amount).replace('−', '') + '</td></tr>';
    }).join('');
    var inM = ms.filter(function (m) { return m.type === 'in'; }).reduce(function (s, m) { return s + (+m.amount); }, 0);
    var outM = ms.filter(function (m) { return m.type !== 'in'; }).reduce(function (s, m) { return s + (+m.amount); }, 0);
    $('#kMoney').textContent = money(inM - outM);
    $('#kMoneySub').textContent = money(inM) + t.income + money(outM) + t.expense;
  }

  var nextId = 1000;
  document.querySelectorAll('nav.tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('nav.tabs button').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
      document.querySelectorAll('section.pane').forEach(function (p) { p.hidden = p.id !== 'p-' + b.dataset.tab; });
    });
  });
  document.addEventListener('change', function (e) {
    var el = e.target, find = function (arr, id) { return arr.filter(function (x) { return x.id === +id; })[0]; };
    if (el.dataset.task) { find(state.tasks, el.dataset.task).done = el.checked; render(); }
    if (el.dataset.post) { find(state.posts, el.dataset.post).status = el.value; render(); }
    if (el.dataset.client) { find(state.clients, el.dataset.client).stage = el.value; render(); }
  });
  $('#addTask').addEventListener('click', function () {
    var title = $('#newTask').value.trim(); if (!title) return;
    state.tasks.push({ id: ++nextId, title: title, day: $('#newTaskDay').value, who: $('#newTaskWho').value, done: false });
    $('#newTask').value = ''; render();
  });
  $('#newTask').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('#addTask').click(); });
  $('#addClient').addEventListener('click', function () {
    var name = $('#cName').value.trim(); if (!name) return;
    state.clients.unshift({ id: ++nextId, name: name, service: $('#cService').value.trim(), amount: +$('#cAmount').value || 0, stage: T[lang].stages[0] });
    $('#cName').value = ''; $('#cService').value = ''; $('#cAmount').value = ''; render();
  });
  $('#addMoney').addEventListener('click', function () {
    var amount = +$('#mAmount').value; if (!amount) return;
    state.money.push({ id: ++nextId, date: shift(0), type: $('#mType').value, amount: amount, note: $('#mNote').value.trim() });
    $('#mAmount').value = ''; $('#mNote').value = ''; render();
  });
  $('#resetBtn').addEventListener('click', function () { seed(); render(); });
  $('#langBtn').addEventListener('click', function () { lang = lang === 'uk' ? 'en' : 'uk'; seed(); applyText(); render(); });

  seed(); applyText(); render();
})();
