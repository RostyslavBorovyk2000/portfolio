(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var T = {
    uk: {
      demoTag: 'ДЕМО', demoText: 'Дані вигадані, зміни не зберігаються. Потикайте: ставте галочки, міняйте статуси, додавайте записи.',
      reset: 'Скинути', cta: 'Хочу такий пульт', kick: '// пульт керування', brand: 'SMM-агенція «Хвиля»',
      sTasks: 'Задачі тижня', sPosts: 'Пости опубліковано', sClients: 'Клієнти в роботі', sMoney: 'Баланс місяця',
      tTasks: 'Задачі', tPosts: 'Контент', tClients: 'Клієнти', tMoney: 'Фінанси', add: 'Додати',
      postsNote: 'План публікацій. «Готово» означає, що пост погоджено, і автопостинг опублікує його в дату.',
      thDate: 'Дата', thRubric: 'Рубрика', thTopic: 'Тема', thWhere: 'Куди', thStatus: 'Статус', thClient: 'Клієнт', thService: 'Що потрібно', thStage: 'Етап', thAmount: 'Сума', thNote: 'Опис',
      foot: 'Це демо. Справжній пульт синхронізується між власником, командою і AI-асистентом, який сам оновлює задачі, контент-план і звіти.',
      phTask: 'Нова задача…', phClient: 'Клієнт або компанія', phService: 'Що потрібно', phAmount: 'Сума, $', phNote: 'За що',
      week: 'Тиждень з ', days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'], owner: 'Марта', ai: 'AI', ownerFull: 'Марта', aiFull: 'AI-асистент',
      status: { draft: 'Чернетка', ready: 'Готово', done: 'Опубліковано', err: 'Помилка' },
      stages: ['Заявка', 'Переговори', 'В роботі', 'Здано', 'Відмова'], leads: 'заявок і переговорів: ', income: ' дохід · ', expense: ' витрати',
      inOut: { out: 'Витрата', 'in': 'Дохід' }, emptyTasks: 'На цей тиждень задач немає. Додайте першу.',
      tasks: [
        ['Пн', 'me', 'Погодити контент-план для кав\'ярні «Зерно»', true], ['Пн', 'ai', 'Зібрати статистику постів за минулий тиждень', true],
        ['Пн', 'ai', 'Підготувати 5 чернеток постів для студії йоги', true], ['Вт', 'me', 'Дзвінок з новим клієнтом: магазин квітів', true],
        ['Вт', 'ai', 'Комерційна пропозиція для магазину квітів', false], ['Ср', 'me', 'Зйомка для салону краси «Ліра»', false],
        ['Ср', 'ai', 'Нагадати клієнтам про оплату за жовтень', false], ['Чт', 'me', 'Перевірити й погодити пости на наступний тиждень', false],
        ['Чт', 'ai', 'Звіт для кав\'ярні «Зерно»: охоплення і заявки', false], ['Пт', 'me', 'Підсумки тижня і план на наступний', false]
      ],
      posts: [
        [-3, 'Кейс', 'Як кав\'ярня отримала 40 замовлень через Instagram', 'done'], [-1, 'Порада', '5 помилок у сторіз малого бізнесу', 'done'],
        [1, 'Практика', 'Контент-план на місяць за 1 годину', 'ready'], [3, 'Кейс', 'Студія йоги: запуск з нуля', 'ready'],
        [5, 'Порада', 'Як відповідати на негативні коментарі', 'draft'], [8, 'Практика', 'Шаблони сторіз для салону краси', 'draft']
      ],
      clients: [['Кав\'ярня «Зерно»', 'Ведення Instagram', 'В роботі', 450], ['Студія йоги «Прана»', 'Запуск акаунта', 'В роботі', 600],
        ['Магазин квітів «Букет»', 'Таргетована реклама', 'Переговори', 350], ['Салон краси «Ліра»', 'Контент і зйомка', 'Заявка', 0]],
      money: [[-9, 'in', 450, 'Кав\'ярня «Зерно», жовтень'], [-6, 'in', 300, 'Студія йоги, передоплата 50%'], [-5, 'out', 29, 'Сервіс автопостингу'],
        [-4, 'out', 20, 'Підписка на AI'], [-2, 'out', 60, 'Реклама агенції']]
    },
    en: {
      demoTag: 'DEMO', demoText: 'Sample data, changes are not saved. Try it: tick tasks, change statuses, add rows.',
      reset: 'Reset', cta: 'I want this cockpit', kick: '// business cockpit', brand: '«Wave» SMM Agency',
      sTasks: 'Tasks this week', sPosts: 'Posts published', sClients: 'Active clients', sMoney: 'Month balance',
      tTasks: 'Tasks', tPosts: 'Content', tClients: 'Clients', tMoney: 'Finance', add: 'Add',
      postsNote: 'Publishing plan. “Ready” means the post is approved and autoposting will publish it on the date.',
      thDate: 'Date', thRubric: 'Rubric', thTopic: 'Topic', thWhere: 'Where', thStatus: 'Status', thClient: 'Client', thService: 'Need', thStage: 'Stage', thAmount: 'Amount', thNote: 'Note',
      foot: 'This is a demo. The real cockpit syncs between the owner, the team and an AI assistant that updates tasks, the content plan and reports by itself.',
      phTask: 'New task…', phClient: 'Client or company', phService: 'What they need', phAmount: 'Amount, $', phNote: 'What for',
      week: 'Week of ', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], owner: 'Marta', ai: 'AI', ownerFull: 'Marta', aiFull: 'AI assistant',
      status: { draft: 'Draft', ready: 'Ready', done: 'Published', err: 'Error' },
      stages: ['Lead', 'Talks', 'In progress', 'Delivered', 'Lost'], leads: 'leads and talks: ', income: ' income · ', expense: ' expenses',
      inOut: { out: 'Expense', 'in': 'Income' }, emptyTasks: 'No tasks this week yet. Add the first one.',
      tasks: [
        ['Mon', 'me', 'Approve the content plan for “Grain” café', true], ['Mon', 'ai', 'Collect last week\'s post statistics', true],
        ['Mon', 'ai', 'Draft 5 posts for the yoga studio', true], ['Tue', 'me', 'Call with a new client: flower shop', true],
        ['Tue', 'ai', 'Proposal for the flower shop', false], ['Wed', 'me', 'Photo shoot for “Lyra” beauty salon', false],
        ['Wed', 'ai', 'Remind clients about October invoices', false], ['Thu', 'me', 'Review and approve next week\'s posts', false],
        ['Thu', 'ai', 'Report for “Grain” café: reach and leads', false], ['Fri', 'me', 'Weekly review and next week\'s plan', false]
      ],
      posts: [
        [-3, 'Case', 'How a café got 40 orders from Instagram', 'done'], [-1, 'Tip', '5 Stories mistakes small businesses make', 'done'],
        [1, 'How-to', 'A month of content planned in 1 hour', 'ready'], [3, 'Case', 'Yoga studio: launch from scratch', 'ready'],
        [5, 'Tip', 'How to answer negative comments', 'draft'], [8, 'How-to', 'Stories templates for a beauty salon', 'draft']
      ],
      clients: [['“Grain” café', 'Instagram management', 'In progress', 450], ['“Prana” yoga studio', 'Account launch', 'In progress', 600],
        ['“Bouquet” flower shop', 'Paid ads', 'Talks', 350], ['“Lyra” beauty salon', 'Content and photo', 'Lead', 0]],
      money: [[-9, 'in', 450, '“Grain” café, October'], [-6, 'in', 300, 'Yoga studio, 50% prepayment'], [-5, 'out', 29, 'Autoposting service'],
        [-4, 'out', 20, 'AI subscription'], [-2, 'out', 60, 'Agency ads']]
    }
  };

  var lang = /[?&]lang=en/.test(location.search) ? 'en' : 'uk';
  var STATUS_CLS = { draft: 's-draft', ready: 's-ready', done: 's-done', err: 's-err' };
  var state;

  function iso(d) { return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10); }
  function shift(n) { var d = new Date(); d.setDate(d.getDate() + n); return iso(d); }
  function monday() { var d = new Date(); var w = (d.getDay() + 6) % 7; d.setDate(d.getDate() - w); return iso(d); }
  function fmtDate(s) { var p = s.split('-'); return p[2] + '.' + p[1]; }
  function money(n) { return (n < 0 ? '−' : '') + '$' + Math.abs(n).toLocaleString(lang === 'uk' ? 'uk-UA' : 'en-US', { maximumFractionDigits: 2 }); }

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
    $('.mark').textContent = lang === 'uk' ? 'Х' : 'W';
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
