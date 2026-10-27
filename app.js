(function () {
  const M = window.MATH;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("math_" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("math_" + k, JSON.stringify(v)); } catch (e) {} }
  };
  const root = document.documentElement;
  const theme = store.get("theme", null);
  if (theme) root.setAttribute("data-theme", theme);
  $("#theme").addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark" || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    const next = dark ? "light" : "dark"; root.setAttribute("data-theme", next); store.set("theme", next);
  });
  $("#menu").addEventListener("click", () => document.body.classList.toggle("navopen"));

  const qDone = store.get("q", {});       // номер вопроса -> true
  const tDone = store.get("topics", {});  // id темы -> true
  const ytUrl = (q) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  const rtUrl = (q) => "https://rutube.ru/search/?query=" + encodeURIComponent(q);

  // Markdown + KaTeX: формулы прячем от marked и возвращаем после.
  function renderMd(src) {
    const store_ = [];
    const keep = (tex, display) => { store_.push([tex, display]); return "@@M" + (store_.length - 1) + "@@"; };
    let s = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => keep(t, true)).replace(/\$([^$\n]+?)\$/g, (_, t) => keep(t, false));
    let html = marked.parse(s, { gfm: true, breaks: false });
    html = html.replace(/@@M(\d+)@@/g, (_, i) => {
      const [tex, display] = store_[+i];
      try { return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false }); }
      catch (e) { return "<code>" + esc(tex) + "</code>"; }
    });
    return html;
  }

  function questionList(idxs) {
    const box = el("div", "qs");
    const bar = el("div", "bar", "<i></i>"); const cnt = el("div", "cnt");
    const upd = () => { const n = idxs.filter((i) => qDone[i]).length; cnt.textContent = n + " из " + idxs.length + " вопросов выучено"; bar.firstChild.style.width = (100 * n / idxs.length) + "%"; renderNavProgress(); };
    idxs.forEach((i) => {
      const lab = el("label", qDone[i] ? "done" : "", '<input type="checkbox"' + (qDone[i] ? " checked" : "") + '><span class="n">' + i + '.</span><span class="t">' + esc(M.questions[i - 1]) + "</span>");
      lab.querySelector("input").addEventListener("change", (e) => { if (e.target.checked) qDone[i] = true; else delete qDone[i]; store.set("q", qDone); lab.classList.toggle("done", e.target.checked); upd(); });
      box.append(lab);
    });
    const wrap = el("div"); wrap.append(cnt, bar, box); upd(); return wrap;
  }

  // Навигация
  const nav = $("#nav");
  const pages = [["home", "Главная"], ...M.topics.map((t, i) => [t.id, (i + 1) + ". " + t.short]), ["questions", "Все вопросы"], ["plan", "План и оценка"], ["sources", "Видео и литература"]];
  function buildNav() {
    nav.innerHTML = "";
    pages.forEach(([id, label]) => {
      const a = el("a", "", "<span>" + esc(label) + "</span>"); a.href = "#" + id; a.dataset.id = id;
      const t = M.topics.find((x) => x.id === id);
      if (t) { const b = el("em", "", ""); b.dataset.t = id; a.append(b); }
      nav.append(a);
    });
    renderNavProgress();
  }
  function renderNavProgress() {
    M.topics.forEach((t) => {
      const b = nav.querySelector('em[data-t="' + t.id + '"]'); if (!b) return;
      const n = t.q.filter((i) => qDone[i]).length;
      b.textContent = tDone[t.id] ? "✓" : n ? n + "/" + t.q.length : "";
      b.className = tDone[t.id] ? "ok" : "";
    });
  }
  function setActive(id) {
    nav.querySelectorAll("a").forEach((a) => a.classList.toggle("on", a.dataset.id === id));
    document.body.classList.remove("navopen");
  }

  const main = $("#main");
  const cache = {};
  async function loadNote(t) {
    if (cache[t.id]) return cache[t.id];
    const r = await fetch(t.file); if (!r.ok) throw new Error(r.status);
    cache[t.id] = await r.text(); return cache[t.id];
  }

  function resourceBlock(t) {
    const b = el("section", "res");
    b.innerHTML = "<h2>Видео, литература, проверка</h2>";
    const v = el("div", "row", "<h3>Видео (поиск по теме)</h3>");
    const ul = el("ul");
    t.video.forEach((q) => ul.append(el("li", "", '<span>«' + esc(q) + '»</span> <a href="' + ytUrl(q) + '" target="_blank" rel="noopener">YouTube</a> <a href="' + rtUrl(q) + '" target="_blank" rel="noopener">Rutube</a>')));
    v.append(ul); b.append(v);
    const w = el("div", "row", "<h3>Справка</h3>");
    const ul2 = el("ul"); t.wiki.forEach(([n, u]) => ul2.append(el("li", "", '<a href="' + u + '" target="_blank" rel="noopener">' + esc(n) + "</a> (Википедия)")));
    t.pdf.forEach(([n, u]) => ul2.append(el("li", "", '<a href="' + u + '" target="_blank" rel="noopener">' + esc(n) + "</a>")));
    ul2.append(el("li", "", '<a href="#sources">Учебники, курсы, калькуляторы</a>'));
    w.append(ul2); b.append(w);
    return b;
  }

  async function renderTopic(id) {
    const i = M.topics.findIndex((t) => t.id === id); const t = M.topics[i];
    main.innerHTML = "";
    const head = el("div", "head");
    head.append(el("div", "kicker", "Тема " + (i + 1) + " из " + M.topics.length + (t.kr ? " · " + t.kr : "")), el("h1", "", esc(t.title)));
    const done = el("label", "chk", '<input type="checkbox"' + (tDone[t.id] ? " checked" : "") + "> тема изучена");
    done.querySelector("input").addEventListener("change", (e) => { if (e.target.checked) tDone[t.id] = true; else delete tDone[t.id]; store.set("topics", tDone); renderNavProgress(); });
    head.append(done); main.append(head);
    const art = el("article", "note", "<p>Загрузка…</p>"); main.append(art);
    try {
      const md = await loadNote(t);
      art.innerHTML = renderMd(md);
      const toc = el("nav", "toc", "<b>На странице:</b> ");
      art.querySelectorAll("h2").forEach((h) => {
        const a = el("a", "", esc(h.textContent)); a.href = "#" + t.id;
        a.addEventListener("click", (e) => { e.preventDefault(); h.scrollIntoView({ behavior: "smooth" }); });
        toc.append(a, document.createTextNode(" "));
      });
      art.prepend(toc);
    } catch (e) { art.innerHTML = '<p class="err">Не удалось загрузить конспект (' + esc(e.message) + "). Запустите сайт через локальный сервер.</p>"; }
    const qs = el("section", "qsec", "<h2>Вопросы к экзамену по теме</h2>"); qs.append(questionList(t.q)); main.append(qs);
    main.append(resourceBlock(t));
    const pn = el("div", "pager");
    if (i > 0) { const a = el("a", "prev", "← " + esc(M.topics[i - 1].short)); a.href = "#" + M.topics[i - 1].id; pn.append(a); }
    if (i < M.topics.length - 1) { const a = el("a", "next", esc(M.topics[i + 1].short) + " →"); a.href = "#" + M.topics[i + 1].id; pn.append(a); }
    main.append(pn);
  }

  function renderHome() {
    main.innerHTML = "";
    main.append(el("div", "head", '<div class="kicker">1 семестр, группа 26ПИ(б)РКСиЦР, экзамен</div><h1>Подготовка по математике</h1>'));
    main.append(el("p", "lead", "Конспекты по 10 темам: определения, формулы, алгоритмы, разобранные примеры, типичные ошибки и вопросы к экзамену. Ссылки на видео ведут на поиск по теме: проверяйте, что видео подходит к вашему курсу."));
    const total = M.questions.length, n = Object.keys(qDone).length, tn = Object.keys(tDone).length;
    const kp = el("div", "kpis");
    kp.append(el("div", "kpi", "<b>" + tn + " / " + M.topics.length + "</b><span>тем изучено</span>"), el("div", "kpi", "<b>" + n + " / " + total + "</b><span>вопросов выучено</span>"), el("div", "kpi", "<b>5</b><span>контрольных по программе</span>"));
    main.append(kp);
    const grid = el("div", "cards");
    M.topics.forEach((t, i) => {
      const c = el("a", "card", "<span class=\"cn\">" + (i + 1) + "</span><div><b>" + esc(t.title) + "</b><small>" + esc(t.kr || "") + " · вопросы " + t.q[0] + "–" + t.q[t.q.length - 1] + "</small></div>");
      c.href = "#" + t.id; grid.append(c);
    });
    main.append(grid);
    const g = el("section", "box", "<h2>Как оценивают</h2>"); const u = el("ul"); M.grading.forEach((x) => u.append(el("li", "", esc(x)))); g.append(u); main.append(g);
    main.append(el("section", "box", "<h2>Что не найдено</h2><p>Дат контрольных работ, письменных опросов и экзамена нет ни в Moodle, ни в личном кабинете. Нумерация контрольных в рабочей программе (5) и в ФОС (7 примерных вариантов) расходится: уточните у Харитоновой С. В.</p>"));
  }

  function renderQuestions() {
    main.innerHTML = ""; main.append(el("div", "head", "<h1>Все вопросы к экзамену</h1>"));
    const wrap = el("div"); wrap.append(questionList(M.questions.map((_, i) => i + 1))); main.append(wrap);
  }

  function renderPlan() {
    main.innerHTML = ""; main.append(el("div", "head", "<h1>План и оценка</h1>"));
    main.append(el("p", "lead", "План — моё предложение по неделям до конца семестра: по одной теме в неделю, запас на повторение. Даты контрольных и экзамена неизвестны, подстройте под график преподавателя."));
    const t = el("table", "tbl"); t.innerHTML = "<thead><tr><th>Когда</th><th>Что</th><th>Задачи</th></tr></thead>";
    const tb = el("tbody"); M.plan.forEach((r) => tb.append(el("tr", "", "<td>" + esc(r[0]) + "</td><td><b>" + esc(r[1]) + "</b></td><td>" + esc(r[2]) + "</td>"))); t.append(tb); main.append(t);
    const g = el("section", "box", "<h2>Как складывается оценка</h2>"); const u = el("ul"); M.grading.forEach((x) => u.append(el("li", "", esc(x)))); g.append(u); main.append(g);
  }

  function renderSources() {
    main.innerHTML = ""; main.append(el("div", "head", "<h1>Видео, учебники, инструменты</h1>"));
    const a = el("section", "box", "<h2>Курсы и инструменты</h2>"); const u = el("ul", "big");
    M.courses.forEach(([n, h, d]) => u.append(el("li", "", '<a href="' + h + '" target="_blank" rel="noopener">' + esc(n) + "</a><br><small>" + esc(d) + "</small>"))); a.append(u); main.append(a);
    const b = el("section", "box", "<h2>Литература (из рабочей программы)</h2>"); const u2 = el("ul", "big");
    M.literature.forEach(([n, h, d]) => u2.append(el("li", "", (h ? '<a href="' + h + '" target="_blank" rel="noopener">' + esc(n) + "</a>" : esc(n)) + "<br><small>" + esc(d) + "</small>"))); b.append(u2); main.append(b);
    const c = el("section", "box", "<h2>Видео по темам</h2><p>Для каждой темы ниже готовы поисковые запросы: так вы сами выберете лектора и уровень.</p>");
    const u3 = el("ul", "big");
    M.topics.forEach((t, i) => u3.append(el("li", "", "<b>" + (i + 1) + ". " + esc(t.title) + "</b><br>" + t.video.map((q) => '<a href="' + ytUrl(q) + '" target="_blank" rel="noopener">' + esc(q) + "</a>").join("<br>"))));
    c.append(u3); main.append(c);
  }

  async function route() {
    const id = (location.hash || "#home").slice(1) || "home";
    setActive(id); window.scrollTo(0, 0);
    if (id === "home") renderHome();
    else if (id === "questions") renderQuestions();
    else if (id === "plan") renderPlan();
    else if (id === "sources") renderSources();
    else if (M.topics.some((t) => t.id === id)) await renderTopic(id);
    else renderHome();
  }
  buildNav();
  window.addEventListener("hashchange", route);
  route();
})();
