/* Academic Command Center, Fall 2026 */
(() => {
  "use strict";

  const STORAGE_KEY = "academicCommandCenter.fall2026.v1";
  const DEFAULT_TYPES = ["Reading", "Assignment", "Quiz", "Exam", "Project", "Presentation", "Paper", "Final", "Other"];
  const STATUSES = ["To Do", "In Progress", "Completed"];
  const CLASS_COLORS = ["#2d5b88", "#64795f", "#745e86", "#8a6448", "#3f7275", "#7d5e69"];

  const icons = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>',
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 7 4 12l5 5"/><path d="M5 12h8a6 6 0 0 1 6 6"/></svg>',
    scan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 9h8v6H8z"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM18.5 13l.8 2.7 2.7.8-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8.8-2.7ZM5 13l.7 2.3L8 16l-2.3.7L5 19l-.7-2.3L2 16l2.3-.7L5 13Z"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M8 3v5M16 3v5M3.5 10h17"/></svg>',
    week: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M8 3v5M16 3v5M3.5 10h17M8 14h2M14 14h2M8 17h2"/></svg>',
    progress: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M10.2 4.7 3.5 17a2 2 0 0 0 1.8 3h13.4a2 2 0 0 0 1.8-3L13.8 4.7a2 2 0 0 0-3.6 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 18 6-6-6-6"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m20 13-7 7-9-9V4h7l9 9Z"/><circle cx="8" cy="8" r="1"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4M7 9l5-5 5 5M4 20h16"/></svg>',
    sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 7h-5V2"/><path d="M20 7a8 8 0 1 0 1 6"/><path d="m15 7 5-5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    sort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 9 4-4 4 4M16 15l-4 4-4-4"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m15 18-6-6 6-6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m9 18 6-6-6-6"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m21 3-7 18-4-7-7-4 18-7Z"/><path d="m10 14 5-5"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13 7 4 4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>'
  };

  function hydrateIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((node) => {
      const key = node.dataset.icon.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      if (icons[key]) node.innerHTML = icons[key];
    });
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  const escapeRegExp = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const normalize = (value = "") => String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const titleCase = (value = "") => value.replace(/\w\S*/g, (w) => /^(a|an|and|of|for|to|the)$/i.test(w) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).replace(/^\w/, (c) => c.toUpperCase());
  const upperFirst = (value = "") => value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

  function initialState() {
    return {
      version: 1,
      semester: "Fall 2026",
      classes: [],
      types: [...DEFAULT_TYPES],
      tasks: [],
      canvasCourseMap: {},
      canvasLastSync: "",
      chat: [{ role: "assistant", text: "Ready when you are. Add a task in plain English or ask about your workload." }]
    };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!parsed || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.classes)) return initialState();
      parsed.types = Array.isArray(parsed.types) && parsed.types.length ? parsed.types : [...DEFAULT_TYPES];
      parsed.canvasCourseMap = parsed.canvasCourseMap || {};
      parsed.canvasLastSync = parsed.canvasLastSync || "";
      parsed.chat = Array.isArray(parsed.chat) ? parsed.chat.slice(-80) : [];
      return parsed;
    } catch (_) {
      return initialState();
    }
  }

  let state = loadState();
  let undoStack = [];
  let confirmHandler = null;
  let ocrWorker = null;
  let screenshotCandidates = [];
  let canvasCandidates = [];
  const ui = {
    view: "tasks",
    search: "",
    filters: { classId: "all", status: "all", date: "all", type: "all", rangeStart: "", rangeEnd: "" },
    sort: { key: "dueDate", direction: "asc" },
    calendarMode: "month",
    calendarDate: startOfDay(new Date()),
    selectedClassId: null,
    classFilters: { date: "all", type: "all", sort: "dueDate" },
    draggedTaskId: null,
    pendingChat: null
  };

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function commit(label, mutator) {
    undoStack.push({ label, state: clone(state) });
    if (undoStack.length > 30) undoStack.shift();
    mutator();
    saveState();
    renderAll();
    toast(label, true);
  }

  function undo() {
    const previous = undoStack.pop();
    if (!previous) return;
    state = previous.state;
    saveState();
    renderAll();
    toast(`Undid: ${previous.label}`, false);
  }

  function toast(message, withUndo = false) {
    const region = $("#toastRegion");
    const item = document.createElement("div");
    item.className = "toast";
    item.innerHTML = `<span>${escapeHtml(message)}</span>${withUndo ? '<button type="button">Undo</button>' : ""}`;
    if (withUndo) item.querySelector("button").addEventListener("click", () => { undo(); item.remove(); });
    region.appendChild(item);
    setTimeout(() => item.remove(), 4500);
  }

  function startOfDay(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function addDays(date, amount) {
    const d = new Date(date);
    d.setDate(d.getDate() + amount);
    return d;
  }

  function startOfWeek(date) {
    const d = startOfDay(date);
    const day = d.getDay();
    d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
    return d;
  }

  function endOfWeek(date) {
    const d = addDays(startOfWeek(date), 6);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  function toISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function fromISO(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return null;
    const [y, m, d] = iso.split("-").map(Number);
    const date = new Date(y, m - 1, d, 12, 0, 0, 0);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function deadline(task) {
    const d = fromISO(task.dueDate);
    if (!d) return new Date(8640000000000000);
    if (task.dueTime && /^\d{2}:\d{2}$/.test(task.dueTime)) {
      const [h, m] = task.dueTime.split(":").map(Number);
      d.setHours(h, m, 0, 0);
    } else {
      d.setHours(23, 59, 59, 999);
    }
    return d;
  }

  function isOverdue(task, now = new Date()) {
    return task.status !== "Completed" && deadline(task).getTime() < now.getTime();
  }

  function classById(id) {
    return state.classes.find((c) => c.id === id);
  }

  function className(task) {
    return classById(task.classId)?.name || "Archived class";
  }

  function formatDate(iso, options = {}) {
    const d = fromISO(iso);
    if (!d) return "No date";
    return new Intl.DateTimeFormat(undefined, options.short ? { month: "short", day: "numeric" } : { month: "short", day: "numeric", year: "numeric" }).format(d);
  }

  function formatTime(time) {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(2026, 0, 1, h, m));
  }

  function relativeDue(task) {
    const today = startOfDay(new Date());
    const due = startOfDay(fromISO(task.dueDate));
    const diff = Math.round((due - today) / 86400000);
    if (isOverdue(task)) return `Overdue · ${formatDate(task.dueDate, { short: true })}`;
    if (diff === 0) return `Today${task.dueTime ? ` · ${formatTime(task.dueTime)}` : ""}`;
    if (diff === 1) return `Tomorrow${task.dueTime ? ` · ${formatTime(task.dueTime)}` : ""}`;
    return `${formatDate(task.dueDate, { short: true })}${task.dueTime ? ` · ${formatTime(task.dueTime)}` : ""}`;
  }

  function optionHtml(values, selected, formatter = (v) => v) {
    return values.map((value) => `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(formatter(value))}</option>`).join("");
  }

  function activeClasses() {
    return state.classes.filter((c) => !c.archived).sort((a, b) => a.name.localeCompare(b.name));
  }

  function renderAll() {
    renderHeader();
    renderSummary();
    renderFilters();
    renderTaskTable();
    renderCalendar();
    renderClassView();
    renderManagers();
    renderChat();
    $("#undoButton").disabled = undoStack.length === 0;
    hydrateIcons();
  }

  function renderHeader() {
    const today = new Date();
    $("#todayLabel").textContent = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(today);
    const incomplete = state.tasks.filter((t) => t.status !== "Completed");
    const todayTasks = incomplete.filter((t) => t.dueDate === toISO(today));
    const overdue = incomplete.filter((t) => isOverdue(t));
    if (!state.tasks.length) {
      $("#greeting").textContent = "Build your semester, one task at a time.";
      $("#heroCopy").textContent = "Add your classes and first task to get started.";
    } else if (overdue.length) {
      $("#greeting").textContent = "Let’s get the urgent work under control.";
      $("#heroCopy").textContent = `${overdue.length} overdue ${overdue.length === 1 ? "task needs" : "tasks need"} attention${todayTasks.length ? `, and ${todayTasks.length} ${todayTasks.length === 1 ? "item is" : "items are"} due today` : ""}.`;
    } else if (todayTasks.length) {
      $("#greeting").textContent = "Here’s what needs your attention today.";
      $("#heroCopy").textContent = `${todayTasks.length} ${todayTasks.length === 1 ? "task is" : "tasks are"} due today, with no overdue work.`;
    } else {
      $("#greeting").textContent = "You’re clear for today.";
      $("#heroCopy").textContent = `${incomplete.length} incomplete ${incomplete.length === 1 ? "task remains" : "tasks remain"} this semester.`;
    }
  }

  function renderSummary() {
    const now = new Date();
    const today = toISO(now);
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    const incomplete = state.tasks.filter((t) => t.status !== "Completed");
    const dueToday = incomplete.filter((t) => t.dueDate === today).length;
    const dueWeek = incomplete.filter((t) => {
      const d = fromISO(t.dueDate);
      return d && d >= weekStart && d <= weekEnd;
    }).length;
    $("#dueTodayCount").textContent = dueToday;
    $("#dueWeekCount").textContent = dueWeek;
    $("#inProgressCount").textContent = state.tasks.filter((t) => t.status === "In Progress").length;
    $("#overdueCount").textContent = incomplete.filter((t) => isOverdue(t, now)).length;
    renderWorkload();
  }

  function renderWorkload() {
    const today = startOfDay(new Date());
    const data = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(today, i);
      return {
        date,
        count: state.tasks.filter((t) => t.status !== "Completed" && t.dueDate === toISO(date)).length
      };
    });
    const max = Math.max(1, ...data.map((d) => d.count));
    $("#workloadBars").innerHTML = data.map((item, index) => {
      const label = index === 0 ? "Today" : new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(item.date);
      const height = item.count ? Math.max(26, Math.round((item.count / max) * 100)) : 7;
      return `<div class="workload-day${index === 0 ? " is-today" : ""}${item.count ? " has-work" : ""}" title="${item.count} incomplete ${item.count === 1 ? "task" : "tasks"}">
        <div class="workload-track"><div class="workload-fill" style="height:${height}%"></div><strong>${item.count}</strong></div>
        <span>${label} · ${item.date.getDate()}</span>
      </div>`;
    }).join("");
  }

  function renderFilters() {
    const classFilter = $("#classFilter");
    const available = state.classes.filter((c) => !c.archived || state.tasks.some((t) => t.classId === c.id)).sort((a, b) => a.name.localeCompare(b.name));
    classFilter.innerHTML = '<option value="all">All classes</option>' + available.map((c) => `<option value="${c.id}"${ui.filters.classId === c.id ? " selected" : ""}>${escapeHtml(c.name)}${c.archived ? " (archived)" : ""}</option>`).join("");
    $("#statusFilter").value = ui.filters.status;
    $("#dateFilter").value = ui.filters.date;
    $("#typeFilter").innerHTML = '<option value="all">All types</option>' + optionHtml(state.types, ui.filters.type);
    $("#customRange").classList.toggle("hidden", ui.filters.date !== "custom");
    $("#rangeStart").value = ui.filters.rangeStart;
    $("#rangeEnd").value = ui.filters.rangeEnd;
    const hasFilters = Object.entries(ui.filters).some(([key, value]) => key.startsWith("range") ? Boolean(value) : value !== "all") || Boolean(ui.search);
    $("#clearFiltersButton").classList.toggle("hidden", !hasFilters);
  }

  function matchesDateFilter(task) {
    const filter = ui.filters.date;
    if (filter === "all") return true;
    const now = new Date();
    const today = startOfDay(now);
    const date = fromISO(task.dueDate);
    if (!date) return false;
    if (filter === "today") return task.dueDate === toISO(today);
    if (filter === "week") return date >= startOfWeek(today) && date <= endOfWeek(today);
    if (filter === "next7") return date >= today && date <= addDays(today, 6);
    if (filter === "next30") return date >= today && date <= addDays(today, 29);
    if (filter === "overdue") return isOverdue(task, now);
    if (filter === "custom") {
      const start = ui.filters.rangeStart ? fromISO(ui.filters.rangeStart) : new Date(-8640000000000000);
      const end = ui.filters.rangeEnd ? fromISO(ui.filters.rangeEnd) : new Date(8640000000000000);
      return date >= start && date <= end;
    }
    return true;
  }

  function filteredTasks(extra = {}) {
    const query = normalize(ui.search);
    const filters = { ...ui.filters, ...extra };
    let tasks = state.tasks.filter((task) => {
      if (filters.classId !== "all" && task.classId !== filters.classId) return false;
      if (filters.status !== "all" && task.status !== filters.status) return false;
      if (filters.type !== "all" && task.type !== filters.type) return false;
      if (!matchesDateFilter(task)) return false;
      if (query) {
        const haystack = normalize([task.name, task.notes, task.type, task.status, className(task), task.dueDate, task.dueTime].join(" "));
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
    return sortTasks(tasks);
  }

  function sortTasks(tasks) {
    const { key, direction } = ui.sort;
    const multiplier = direction === "asc" ? 1 : -1;
    return [...tasks].sort((a, b) => {
      if (key === "dueDate") {
        if (a.status === "Completed" && b.status !== "Completed") return 1;
        if (b.status === "Completed" && a.status !== "Completed") return -1;
        const diff = deadline(a) - deadline(b);
        return diff === 0 ? a.name.localeCompare(b.name) : diff * multiplier;
      }
      const av = key === "className" ? className(a) : (a[key] || "");
      const bv = key === "className" ? className(b) : (b[key] || "");
      return String(av).localeCompare(String(bv), undefined, { numeric: true }) * multiplier;
    });
  }

  function renderTaskTable() {
    const tasks = filteredTasks();
    const body = $("#taskTableBody");
    $("#taskCountLabel").textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}${tasks.length !== state.tasks.length ? ` shown of ${state.tasks.length}` : ""}`;
    $$(".sort-button").forEach((button) => button.classList.toggle("active", button.dataset.sort === ui.sort.key));
    body.innerHTML = tasks.map((task) => {
      const classOptions = state.classes.filter((c) => !c.archived || c.id === task.classId).sort((a,b) => a.name.localeCompare(b.name));
      return `<tr class="task-row${task.status === "Completed" ? " is-completed" : ""}${isOverdue(task) ? " is-overdue" : ""}" data-task-id="${task.id}" draggable="true">
        <td class="check-cell"><input class="task-check" type="checkbox" ${task.status === "Completed" ? "checked" : ""} aria-label="Mark ${escapeHtml(task.name)} completed" data-field="complete"></td>
        <td><input class="inline-field inline-name" data-field="name" maxlength="180" value="${escapeHtml(task.name)}" aria-label="Task name"></td>
        <td><select class="inline-field inline-select class-select" data-field="classId" aria-label="Class">${classOptions.map((c) => `<option value="${c.id}"${c.id === task.classId ? " selected" : ""}>${escapeHtml(c.name)}</option>`).join("")}</select></td>
        <td><div class="date-wrap"><input class="inline-field" data-field="dueDate" type="date" value="${escapeHtml(task.dueDate)}" aria-label="Due date"><input class="inline-field" data-field="dueTime" type="time" value="${escapeHtml(task.dueTime || "")}" aria-label="Due time"></div></td>
        <td><select class="inline-field inline-select status-select" data-field="status" data-status="${task.status}" aria-label="Status">${optionHtml(STATUSES, task.status)}</select></td>
        <td><select class="inline-field inline-select type-select" data-field="type" aria-label="Type">${optionHtml(state.types, task.type)}</select></td>
        <td><input class="inline-field inline-notes" data-field="notes" maxlength="1000" value="${escapeHtml(task.notes || "")}" placeholder="Add note" aria-label="Notes"></td>
        <td><button class="icon-button row-action" type="button" data-edit-task="${task.id}" aria-label="Edit ${escapeHtml(task.name)}">${icons.edit}</button></td>
      </tr>`;
    }).join("");
    const empty = $("#tasksEmptyState");
    empty.classList.toggle("hidden", tasks.length > 0);
    body.classList.toggle("hidden", tasks.length === 0);
    if (!tasks.length) {
      const hasAny = state.tasks.length > 0;
      empty.innerHTML = `<div class="empty-state-inner"><div class="empty-illustration">${icons[hasAny ? "search" : "book"]}</div><h3>${hasAny ? "No matching tasks" : "Your semester starts here"}</h3><p>${hasAny ? "Try clearing a filter or changing your search." : "Add your first class, then capture the work you need to do."}</p><button class="button button-primary" type="button" data-empty-action="${hasAny ? "clear" : "add"}">${hasAny ? "Clear filters" : "Add first task"}</button></div>`;
    }
  }

  function tasksForDate(iso) {
    return filteredTasks().filter((task) => task.dueDate === iso).sort((a, b) => deadline(a) - deadline(b));
  }

  function renderCalendar() {
    const title = $("#calendarTitle");
    const date = ui.calendarDate;
    const format = ui.calendarMode === "month" ? { month: "long", year: "numeric" } : ui.calendarMode === "week" ? { month: "short", day: "numeric", year: "numeric" } : { weekday: "long", month: "long", day: "numeric" };
    if (ui.calendarMode === "week") {
      const start = startOfWeek(date);
      const end = addDays(start, 6);
      title.textContent = `${new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(start)} – ${new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(end)}`;
    } else {
      title.textContent = new Intl.DateTimeFormat(undefined, format).format(date);
    }
    $$("[data-calendar-mode]").forEach((button) => button.classList.toggle("active", button.dataset.calendarMode === ui.calendarMode));
    if (ui.calendarMode === "month") renderMonthCalendar();
    if (ui.calendarMode === "week") renderWeekCalendar();
    if (ui.calendarMode === "day") renderDayCalendar();
  }

  function calendarTaskHtml(task) {
    return `<button class="calendar-task${task.status === "Completed" ? " completed" : ""}${isOverdue(task) ? " overdue" : ""}" type="button" draggable="true" data-calendar-task="${task.id}" title="${escapeHtml(task.name)} · ${escapeHtml(className(task))}">${task.dueTime ? `<span class="calendar-task-time">${escapeHtml(formatTime(task.dueTime))}</span>` : ""}${escapeHtml(task.name)}</button>`;
  }

  function renderMonthCalendar() {
    const first = new Date(ui.calendarDate.getFullYear(), ui.calendarDate.getMonth(), 1);
    const gridStart = startOfWeek(first);
    const todayIso = toISO(new Date());
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let html = `<div class="calendar-month">${weekdays.map((day) => `<div class="calendar-weekday">${day}</div>`).join("")}`;
    for (let i = 0; i < 42; i++) {
      const date = addDays(gridStart, i);
      const iso = toISO(date);
      const outside = date.getMonth() !== ui.calendarDate.getMonth();
      const tasks = tasksForDate(iso);
      html += `<div class="calendar-day-cell${outside ? " outside" : ""}" data-calendar-date="${iso}">
        <div class="calendar-day-number"><span class="${iso === todayIso ? "today-number" : ""}">${date.getDate()}</span><button type="button" data-add-on-date="${iso}" aria-label="Add task on ${formatDate(iso)}">+</button></div>
        ${tasks.slice(0, 4).map(calendarTaskHtml).join("")}
        ${tasks.length > 4 ? `<button class="calendar-task" type="button" data-show-day="${iso}">+${tasks.length - 4} more</button>` : ""}
      </div>`;
    }
    $("#calendarGrid").innerHTML = html + "</div>";
  }

  function renderWeekCalendar() {
    const start = startOfWeek(ui.calendarDate);
    const todayIso = toISO(new Date());
    let html = '<div class="calendar-week-view">';
    for (let i = 0; i < 7; i++) {
      const date = addDays(start, i);
      const iso = toISO(date);
      const tasks = tasksForDate(iso);
      html += `<div class="calendar-week-column" data-calendar-date="${iso}">
        <div class="week-column-heading"><span>${new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date)}</span><strong class="${iso === todayIso ? "today-number" : ""}">${date.getDate()}</strong></div>
        ${tasks.map(calendarTaskHtml).join("")}
        <button class="week-add" type="button" data-add-on-date="${iso}">+ Add task</button>
      </div>`;
    }
    $("#calendarGrid").innerHTML = html + "</div>";
  }

  function renderDayCalendar() {
    const iso = toISO(ui.calendarDate);
    const tasks = tasksForDate(iso);
    $("#calendarGrid").innerHTML = `<div class="calendar-day-view" data-calendar-date="${iso}">
      <div class="class-overview day-view-date">
        <div class="class-overview-copy"><h3>${new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(ui.calendarDate)}</h3><p>${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} due</p></div>
        <button class="button button-primary" type="button" data-add-on-date="${iso}">${icons.plus} Add task</button>
      </div>
      <div class="day-task-list">${tasks.length ? tasks.map((task) => `<div class="day-task-card${task.status === "Completed" ? " completed" : ""}" draggable="true" data-calendar-task="${task.id}">
        <time>${escapeHtml(task.dueTime ? formatTime(task.dueTime) : "Any time")}</time>
        <div><strong>${escapeHtml(task.name)}</strong><div class="task-card-meta"><span>${escapeHtml(className(task))}</span><span>${escapeHtml(task.type)}</span></div></div>
        <button class="button button-quiet" type="button" data-edit-task="${task.id}">Edit</button>
      </div>`).join("") : '<div class="empty-state"><div class="empty-state-inner"><div class="empty-illustration">' + icons.calendar + '</div><h3>No tasks due</h3><p>Select Add task to schedule something for this day.</p></div></div>'}</div>
    </div>`;
  }

  function renderClassView() {
    const classes = activeClasses();
    if (!ui.selectedClassId || !classes.some((c) => c.id === ui.selectedClassId)) ui.selectedClassId = classes[0]?.id || null;
    $("#classPills").innerHTML = classes.length ? classes.map((c) => `<button class="class-pill${c.id === ui.selectedClassId ? " active" : ""}" type="button" data-class-focus="${c.id}">${escapeHtml(c.name)}</button>`).join("") : '<span class="helper-text">No active classes yet.</span>';
    $("#classDateFilter").value = ui.classFilters.date;
    $("#classTypeFilter").innerHTML = '<option value="all">All types</option>' + optionHtml(state.types, ui.classFilters.type);
    $("#classSort").value = ui.classFilters.sort;
    $("#classFocusFilters").classList.toggle("hidden", !classes.length);
    const root = $("#classDashboard");
    if (!ui.selectedClassId) {
      root.innerHTML = `<div class="empty-state"><div class="empty-state-inner"><div class="empty-illustration">${icons.book}</div><h3>Add a class to focus your view</h3><p>Classes keep course workloads separate without adding unnecessary details.</p><button class="button button-primary" type="button" data-manage-classes>Add a class</button></div></div>`;
      return;
    }
    const course = classById(ui.selectedClassId);
    let tasks = state.tasks.filter((t) => t.classId === course.id);
    const query = normalize(ui.search);
    if (query) tasks = tasks.filter((t) => normalize([t.name, t.notes, t.type, course.name].join(" ")).includes(query));
    if (ui.classFilters.type !== "all") tasks = tasks.filter((t) => t.type === ui.classFilters.type);
    if (ui.classFilters.date === "upcoming") tasks = tasks.filter((t) => t.status !== "Completed" && deadline(t) >= new Date());
    if (ui.classFilters.date === "week") tasks = tasks.filter((t) => {
      const d = fromISO(t.dueDate);
      return d >= startOfWeek(new Date()) && d <= endOfWeek(new Date());
    });
    if (ui.classFilters.date === "overdue") tasks = tasks.filter((t) => isOverdue(t));
    tasks.sort((a, b) => {
      const key = ui.classFilters.sort;
      if (key === "dueDate") return deadline(a) - deadline(b);
      return String(a[key] || "").localeCompare(String(b[key] || ""));
    });
    const upcoming = tasks.filter((t) => t.status === "To Do");
    const progress = tasks.filter((t) => t.status === "In Progress");
    const completed = tasks.filter((t) => t.status === "Completed");
    const nextDue = [...state.tasks.filter((t) => t.classId === course.id && t.status !== "Completed" && deadline(t) >= new Date())].sort((a,b) => deadline(a) - deadline(b))[0];
    root.innerHTML = `<div class="class-dashboard">
      <div class="class-overview">
        <div class="class-overview-copy"><h3>${escapeHtml(course.name)}</h3><p>${nextDue ? `Next due: ${escapeHtml(nextDue.name)} · ${relativeDue(nextDue)}` : "No upcoming deadlines"}</p></div>
        <div class="class-mini-stats"><div class="mini-stat"><strong>${upcoming.length}</strong><span>To do</span></div><div class="mini-stat"><strong>${progress.length}</strong><span>In progress</span></div><div class="mini-stat"><strong>${completed.length}</strong><span>Completed</span></div></div>
      </div>
      <div class="status-columns">
        ${statusColumnHtml("To Do", upcoming)}
        ${statusColumnHtml("In Progress", progress)}
        ${statusColumnHtml("Completed", completed)}
      </div>
    </div>`;
  }

  function statusColumnHtml(status, tasks) {
    const classNameKey = status === "To Do" ? "todo" : status === "In Progress" ? "progress" : "completed";
    const label = status === "To Do" ? "Upcoming · To Do" : status;
    return `<div class="status-column" data-status-column="${status}">
      <div class="status-column-header"><span><span class="status-dot ${classNameKey}"></span>${label}</span><span class="status-count">${tasks.length}</span></div>
      ${tasks.length ? tasks.map((task) => `<article class="class-task-card${task.status === "Completed" ? " completed" : ""}" draggable="true" data-class-task="${task.id}" tabindex="0">
        <h4>${escapeHtml(task.name)}</h4><div class="task-card-meta"><span>${escapeHtml(relativeDue(task))}</span><span class="task-card-type">${escapeHtml(task.type)}</span></div>
      </article>`).join("") : `<div class="empty-column">Drag a task here<br>to change its status</div>`}
    </div>`;
  }

  function renderManagers() {
    const list = $("#classManagerList");
    const classes = [...state.classes].sort((a, b) => Number(a.archived) - Number(b.archived) || a.name.localeCompare(b.name));
    list.innerHTML = classes.length ? classes.map((course) => {
      const usage = state.tasks.filter((t) => t.classId === course.id).length;
      return `<div class="manager-row${course.archived ? " archived" : ""}" data-class-row="${course.id}">
        <span class="status-dot" style="background:${course.color || CLASS_COLORS[0]}"></span>
        <input value="${escapeHtml(course.name)}" maxlength="80" data-rename-class="${course.id}" ${course.archived ? "disabled" : ""} aria-label="Class name">
        <span class="task-usage">${usage} ${usage === 1 ? "task" : "tasks"}</span>
        ${course.archived ? `<button class="button button-quiet" type="button" data-restore-class="${course.id}">Restore</button>` : usage ? `<button class="button button-quiet" type="button" data-archive-class="${course.id}">Archive</button>` : `<button class="button button-danger button-text" type="button" data-delete-class="${course.id}">Delete</button>`}
      </div>`;
    }).join("") : '<div class="empty-column">No classes added yet.</div>';

    $("#typeManagerList").innerHTML = state.types.map((type) => {
      const usage = state.tasks.filter((t) => t.type === type).length;
      const isOther = type === "Other";
      return `<div class="manager-row" data-type-row="${escapeHtml(type)}"><span class="status-dot" style="background:#766390"></span><input value="${escapeHtml(type)}" maxlength="50" data-rename-type="${escapeHtml(type)}" ${isOther ? "disabled" : ""} aria-label="Task type"><span class="task-usage">${usage} ${usage === 1 ? "task" : "tasks"}</span>${isOther ? "" : `<button class="button button-danger button-text" type="button" data-delete-type="${escapeHtml(type)}">Delete</button>`}</div>`;
    }).join("");
  }

  function openTaskDialog(taskId = null, prefillDate = "") {
    const classes = activeClasses();
    if (!classes.length) {
      toast("Add a class before adding a task.");
      $("#classDialog").showModal();
      setTimeout(() => $("#newClassName").focus(), 50);
      return;
    }
    const task = taskId ? state.tasks.find((t) => t.id === taskId) : null;
    $("#taskDialogTitle").textContent = task ? "Edit task" : "Add task";
    $("#taskId").value = task?.id || "";
    $("#taskName").value = task?.name || "";
    const available = state.classes.filter((c) => !c.archived || c.id === task?.classId).sort((a,b) => a.name.localeCompare(b.name));
    $("#taskClass").innerHTML = available.map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join("");
    $("#taskClass").value = task?.classId || ui.selectedClassId || classes[0].id;
    $("#taskType").innerHTML = optionHtml(state.types, task?.type || "Assignment");
    $("#taskDueDate").value = task?.dueDate || prefillDate || toISO(new Date());
    $("#taskDueTime").value = task?.dueTime || "";
    $("#taskStatus").value = task?.status || "To Do";
    $("#taskNotes").value = task?.notes || "";
    $("#deleteTaskButton").classList.toggle("hidden", !task);
    $("#taskDialog").showModal();
    setTimeout(() => $("#taskName").focus(), 40);
  }

  function submitTaskForm(event) {
    event.preventDefault();
    const id = $("#taskId").value;
    const data = {
      name: $("#taskName").value.trim(),
      classId: $("#taskClass").value,
      dueDate: $("#taskDueDate").value,
      dueTime: $("#taskDueTime").value,
      status: $("#taskStatus").value,
      type: $("#taskType").value,
      notes: $("#taskNotes").value.trim()
    };
    if (!data.name || !data.classId || !data.dueDate) return;
    if (id) {
      commit(`Updated “${data.name}”`, () => Object.assign(state.tasks.find((t) => t.id === id), data, { updatedAt: new Date().toISOString() }));
    } else {
      commit(`Added “${data.name}”`, () => state.tasks.push({ id: uid(), ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
    }
    $("#taskDialog").close();
  }

  function deleteTask(id) {
    const task = state.tasks.find((t) => t.id === id);
    if (!task) return;
    askConfirm("Delete task?", `“${task.name}” will be removed. You can undo immediately afterward.`, "Delete", () => {
      commit(`Deleted “${task.name}”`, () => { state.tasks = state.tasks.filter((t) => t.id !== id); });
      if ($("#taskDialog").open) $("#taskDialog").close();
    });
  }

  function askConfirm(title, message, actionLabel, handler) {
    $("#confirmTitle").textContent = title;
    $("#confirmMessage").textContent = message;
    $("#confirmAction").textContent = actionLabel;
    confirmHandler = handler;
    $("#confirmDialog").showModal();
  }

  function addChat(role, text) {
    state.chat.push({ role, text, at: new Date().toISOString() });
    state.chat = state.chat.slice(-80);
    saveState();
    renderChat();
  }

  function renderChat() {
    const log = $("#chatLog");
    log.innerHTML = state.chat.map((message) => `<div class="chat-message ${message.role}">${escapeHtml(message.text)}</div>`).join("");
    log.scrollTop = log.scrollHeight;
  }

  function openAssistant() {
    $("#assistantDrawer").classList.add("open");
    $("#assistantDrawer").setAttribute("aria-hidden", "false");
    $("#drawerBackdrop").classList.remove("hidden");
    setTimeout(() => $("#chatInput").focus(), 150);
  }

  function closeAssistant() {
    $("#assistantDrawer").classList.remove("open");
    $("#assistantDrawer").setAttribute("aria-hidden", "true");
    $("#drawerBackdrop").classList.add("hidden");
  }

  function parseNaturalTime(text) {
    const match = text.match(/\b(?:at|by)\s+(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)\b/i) || text.match(/\b(?:at|by)\s+([01]?\d|2[0-3]):([0-5]\d)\b/i);
    if (!match) return { time: "", matched: "" };
    let hour = Number(match[1]);
    const minute = Number(match[2] || 0);
    const meridiem = match[3]?.toLowerCase().replace(/\./g, "");
    if (meridiem === "pm" && hour < 12) hour += 12;
    if (meridiem === "am" && hour === 12) hour = 0;
    if (hour > 23 || minute > 59) return { time: "", matched: match[0] };
    return { time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`, matched: match[0] };
  }

  function parseNaturalDate(text, baseDate = new Date()) {
    const lower = text.toLowerCase();
    const today = startOfDay(baseDate);
    if (/\btoday\b/.test(lower)) return { iso: toISO(today), matched: text.match(/\btoday\b/i)[0], certain: true };
    if (/\btomorrow\b/.test(lower)) return { iso: toISO(addDays(today, 1)), matched: text.match(/\btomorrow\b/i)[0], certain: true };
    const iso = text.match(/\b(20\d{2})-(\d{1,2})-(\d{1,2})\b/);
    if (iso) {
      const d = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]), 12);
      if (d.getMonth() === Number(iso[2]) - 1 && d.getDate() === Number(iso[3])) return { iso: toISO(d), matched: iso[0], certain: true };
    }
    const slash = text.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
    if (slash) {
      let year = slash[3] ? Number(slash[3]) : 2026;
      if (year < 100) year += 2000;
      const d = new Date(year, Number(slash[1]) - 1, Number(slash[2]), 12);
      if (d.getMonth() === Number(slash[1]) - 1 && d.getDate() === Number(slash[2])) return { iso: toISO(d), matched: slash[0], certain: true };
    }
    const months = { jan:0, january:0, feb:1, february:1, mar:2, march:2, apr:3, april:3, may:4, jun:5, june:5, jul:6, july:6, aug:7, august:7, sep:8, sept:8, september:8, oct:9, october:9, nov:10, november:10, dec:11, december:11 };
    const monthMatch = text.match(/\b(January|February|March|April|May|June|July|August|September|Sept|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s+(20\d{2}))?\b/i);
    if (monthMatch) {
      const month = months[monthMatch[1].toLowerCase()];
      const year = Number(monthMatch[3] || 2026);
      const d = new Date(year, month, Number(monthMatch[2]), 12);
      if (d.getMonth() === month && d.getDate() === Number(monthMatch[2])) return { iso: toISO(d), matched: monthMatch[0], certain: true };
    }
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const weekdayMatch = lower.match(/\b(?:this\s+|next\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/);
    if (weekdayMatch) {
      const target = weekdays.indexOf(weekdayMatch[1]);
      let offset = (target - today.getDay() + 7) % 7;
      if (lower.includes(`next ${weekdayMatch[1]}`)) offset += offset === 0 ? 7 : 7;
      const matched = text.match(new RegExp(`\\b(?:this\\s+|next\\s+)?${weekdayMatch[1]}\\b`, "i"))[0];
      return { iso: toISO(addDays(today, offset)), matched, certain: true };
    }
    return { iso: "", matched: "", certain: false };
  }

  function detectType(text) {
    const n = normalize(text);
    const rules = [
      ["Final", /\bfinal\b/], ["Exam", /\b(exam|midterm|test)\b/], ["Quiz", /\bquiz\b/],
      ["Presentation", /\b(presentation|present)\b/], ["Paper", /\b(paper|essay|brief|memo)\b/],
      ["Project", /\bproject\b/], ["Reading", /\b(reading|read|chapter|article)\b/], ["Assignment", /\b(assignment|homework|problem set|worksheet|case)\b/]
    ];
    return rules.find(([, regex]) => regex.test(n))?.[0] || "Other";
  }

  function detectClass(text, allowNew = false) {
    const normalizedText = normalize(text);
    const existing = activeClasses().find((course) => normalizedText.includes(normalize(course.name)));
    if (existing) return { classId: existing.id, name: existing.name, isNew: false };
    const match = text.match(/\b([A-Z]{2,}(?:\s*[-–]\s*|\s+)\d{2,4}[A-Z]?)\b/i);
    if (!match) return null;
    const cleaned = match[1].toUpperCase().replace(/\s*[-–]\s*/, " ").replace(/\s+/g, " ");
    const same = activeClasses().find((course) => normalize(course.name) === normalize(cleaned));
    if (same) return { classId: same.id, name: same.name, isNew: false };
    return allowNew ? { classId: "", name: cleaned, isNew: true } : null;
  }

  function taskSimilarity(a, b) {
    const at = new Set(normalize(a).split(" ").filter(Boolean));
    const bt = new Set(normalize(b).split(" ").filter(Boolean));
    if (!at.size || !bt.size) return 0;
    const intersection = [...at].filter((word) => bt.has(word)).length;
    const union = new Set([...at, ...bt]).size;
    return intersection / union;
  }

  function rankedTaskMatches(query, classId = null) {
    const q = normalize(query);
    return state.tasks.map((task) => {
      const name = normalize(task.name);
      let score = taskSimilarity(q, name);
      if (name === q) score = 1;
      else if (name.includes(q) || q.includes(name)) score = Math.max(score, .82);
      if (classId && task.classId === classId) score += .1;
      return { task, score };
    }).filter((item) => item.score >= .3).sort((a, b) => b.score - a.score || deadline(a.task) - deadline(b.task));
  }

  function findDuplicate(name, classId) {
    return state.tasks.find((task) => task.classId === classId && (normalize(task.name) === normalize(name) || taskSimilarity(task.name, name) >= .78));
  }

  function formatTaskLine(task) {
    return `${task.name} (${className(task)}) · ${relativeDue(task)} · ${task.status}`;
  }

  function listReply(tasks, emptyText, limit = 12) {
    if (!tasks.length) return emptyText;
    const shown = tasks.slice(0, limit);
    return shown.map((task, i) => `${i + 1}. ${formatTaskLine(task)}`).join("\n") + (tasks.length > limit ? `\n…and ${tasks.length - limit} more.` : "");
  }

  function answerTrackerQuestion(text) {
    const lower = text.toLowerCase();
    const now = new Date();
    const today = startOfDay(now);
    const incomplete = state.tasks.filter((t) => t.status !== "Completed");
    if (/three most urgent|3 most urgent|most urgent/.test(lower)) {
      const tasks = incomplete.sort((a,b) => deadline(a) - deadline(b)).slice(0, 3);
      return listReply(tasks, "You have no incomplete tasks.", 3);
    }
    if (/what should i work on today|work on today|prioriti[sz]e/.test(lower)) {
      const urgent = incomplete.filter((t) => isOverdue(t) || t.dueDate === toISO(today)).sort((a,b) => deadline(a) - deadline(b));
      const fallback = incomplete.filter((t) => !urgent.includes(t)).sort((a,b) => deadline(a) - deadline(b));
      return listReply([...urgent, ...fallback].slice(0, 3), "You are caught up. There are no incomplete tasks to prioritize.", 3);
    }
    if (/overdue/.test(lower)) {
      return listReply(incomplete.filter((t) => isOverdue(t)).sort((a,b) => deadline(a)-deadline(b)), "Nothing is overdue.");
    }
    if (/tomorrow/.test(lower)) {
      const iso = toISO(addDays(today, 1));
      return listReply(incomplete.filter((t) => t.dueDate === iso).sort((a,b) => deadline(a)-deadline(b)), "Nothing is due tomorrow.");
    }
    if (/next week/.test(lower)) {
      const start = addDays(startOfWeek(today), 7);
      const end = endOfWeek(start);
      const tasks = incomplete.filter((t) => { const d = fromISO(t.dueDate); return d >= start && d <= end; });
      if (/how many|count/.test(lower)) return `You have ${tasks.length} incomplete ${tasks.length === 1 ? "task" : "tasks"} due next week.`;
      return listReply(tasks.sort((a,b) => deadline(a)-deadline(b)), "Nothing is due next week.");
    }
    if (/this week|due this week/.test(lower)) {
      const tasks = incomplete.filter((t) => { const d = fromISO(t.dueDate); return d >= startOfWeek(today) && d <= endOfWeek(today); });
      return listReply(tasks.sort((a,b) => deadline(a)-deadline(b)), "Nothing is due this week.");
    }
    if (/\btoday\b/.test(lower)) {
      return listReply(incomplete.filter((t) => t.dueDate === toISO(today)).sort((a,b) => deadline(a)-deadline(b)), "Nothing is due today.");
    }
    if (/exam|final/.test(lower) && /(coming|upcoming|what|show)/.test(lower)) {
      const tasks = incomplete.filter((t) => ["Exam", "Final", "Quiz"].includes(t.type) && deadline(t) >= now).sort((a,b) => deadline(a)-deadline(b));
      return listReply(tasks, "No upcoming exams, finals, or quizzes are recorded.");
    }
    if (/completed|finished|already done/.test(lower) && /(what|show|have)/.test(lower)) {
      return listReply(state.tasks.filter((t) => t.status === "Completed").sort((a,b) => deadline(b)-deadline(a)), "No completed tasks are recorded.");
    }
    if (/what.*left|show.*for|tasks.*for/.test(lower)) {
      const course = detectClass(text);
      if (course) return listReply(incomplete.filter((t) => t.classId === course.classId).sort((a,b) => deadline(a)-deadline(b)), `Nothing is left for ${course.name}.`);
    }
    return null;
  }

  function createTaskFromDraft(draft) {
    let course = draft.course;
    let newClass = null;
    if (course.isNew) {
      newClass = { id: uid(), name: course.name, archived: false, color: CLASS_COLORS[state.classes.length % CLASS_COLORS.length] };
      course = { ...course, classId: newClass.id };
    }
    const duplicate = findDuplicate(draft.name, course.classId);
    if (duplicate) {
      if (duplicate.dueDate === draft.dueDate && (duplicate.dueTime || "") === (draft.dueTime || "")) {
        addChat("assistant", `That looks like an existing task: ${formatTaskLine(duplicate)}. I did not add a duplicate.`);
        return;
      }
      ui.pendingChat = { kind: "confirmDuplicateDate", taskId: duplicate.id, draft };
      addChat("assistant", `I found an existing task called “${duplicate.name}.” It is due ${formatDate(duplicate.dueDate)}${duplicate.dueTime ? ` at ${formatTime(duplicate.dueTime)}` : ""}, while your new request says ${formatDate(draft.dueDate)}${draft.dueTime ? ` at ${formatTime(draft.dueTime)}` : ""}. Update it? Reply yes or no.`);
      return;
    }
    const task = { id: uid(), name: draft.name, classId: course.classId, dueDate: draft.dueDate, dueTime: draft.dueTime || "", status: "To Do", type: draft.type || "Other", notes: draft.notes || "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    commit(`Added “${task.name}”`, () => {
      if (newClass) state.classes.push(newClass);
      state.tasks.push(task);
    });
    addChat("assistant", `Added “${task.name}” for ${course.name}, due ${formatDate(task.dueDate)}${task.dueTime ? ` at ${formatTime(task.dueTime)}` : ""}.${newClass ? ` I also added ${newClass.name} to your classes.` : ""}`);
  }

  function handleAddCommand(text) {
    const date = parseNaturalDate(text);
    if (!date.iso) {
      addChat("assistant", "I can add that, but I need a clear due date. For example: September 21, tomorrow, or Friday.");
      return;
    }
    const time = parseNaturalTime(text);
    const course = detectClass(text, true);
    let name = text.replace(/^\s*(?:please\s+)?add\s+/i, "")
      .replace(/^\s*(?:a|an|my)\s+/i, "")
      .replace(new RegExp(escapeRegExp(date.matched), "i"), "")
      .replace(time.matched ? new RegExp(escapeRegExp(time.matched), "i") : /$^/, "")
      .replace(course ? new RegExp(escapeRegExp(course.name).replace(/\s+/g, "\\s*[-–]?\\s*"), "i") : /$^/, "")
      .replace(/\b(?:due|on|for|by)\b/gi, " ")
      .replace(/[.,]+$/g, "").replace(/\s+/g, " ").trim();
    if (!name) name = detectType(text) === "Other" ? "Academic task" : detectType(text);
    name = upperFirst(name);
    const draft = { name, course, dueDate: date.iso, dueTime: time.time, type: detectType(name), notes: "" };
    if (!course) {
      ui.pendingChat = { kind: "finishAddClass", draft };
      addChat("assistant", `I found the task “${name}” due ${formatDate(date.iso)}${time.time ? ` at ${formatTime(time.time)}` : ""}. Which class is it for?`);
      return;
    }
    createTaskFromDraft(draft);
  }

  function completeTaskFromText(text) {
    const query = text.replace(/^\s*(?:i\s+)?(?:finished|completed|did|am done with)\s+(?:my\s+)?/i, "").replace(/^mark\s+/i, "").replace(/\s+(?:as\s+)?complete(?:d)?\s*$/i, "").replace(/[.!]+$/, "").trim();
    const matches = rankedTaskMatches(query).filter((item) => item.task.status !== "Completed");
    if (!matches.length) { addChat("assistant", `I could not find an incomplete task matching “${query}.” I did not change anything.`); return; }
    if (matches.length > 1 && matches[0].score - matches[1].score < .18) {
      ui.pendingChat = { kind: "chooseComplete", taskIds: matches.slice(0, 5).map((m) => m.task.id) };
      addChat("assistant", `I found more than one possible match. Reply with the number:\n${matches.slice(0,5).map((m,i) => `${i+1}. ${formatTaskLine(m.task)}`).join("\n")}`);
      return;
    }
    const task = matches[0].task;
    commit(`Completed “${task.name}”`, () => { task.status = "Completed"; task.updatedAt = new Date().toISOString(); });
    addChat("assistant", `Marked “${task.name}” as Completed.`);
  }

  function moveTaskFromText(text) {
    const match = text.match(/^\s*(?:please\s+)?move\s+(?:my\s+)?(.+?)\s+to\s+(.+?)\s*[.!]?$/i);
    if (!match) { addChat("assistant", "Tell me which task to move and the new date, such as “Move my statistics exam to Friday.”"); return; }
    const date = parseNaturalDate(match[2]);
    if (!date.iso) { addChat("assistant", "I could not determine the new date, so I did not change the task."); return; }
    const matches = rankedTaskMatches(match[1]);
    if (!matches.length) { addChat("assistant", `I could not find a task matching “${match[1]}.”`); return; }
    if (matches.length > 1 && matches[0].score - matches[1].score < .18) {
      ui.pendingChat = { kind: "chooseMove", taskIds: matches.slice(0,5).map((m) => m.task.id), dueDate: date.iso };
      addChat("assistant", `Which task should move to ${formatDate(date.iso)}? Reply with the number:\n${matches.slice(0,5).map((m,i) => `${i+1}. ${formatTaskLine(m.task)}`).join("\n")}`);
      return;
    }
    const task = matches[0].task;
    const oldDate = task.dueDate;
    commit(`Moved “${task.name}”`, () => { task.dueDate = date.iso; task.updatedAt = new Date().toISOString(); });
    addChat("assistant", `Moved “${task.name}” from ${formatDate(oldDate)} to ${formatDate(date.iso)}.`);
  }

  function handlePendingChat(text) {
    const pending = ui.pendingChat;
    if (!pending) return false;
    const answer = normalize(text);
    if (pending.kind === "confirmDuplicateDate") {
      ui.pendingChat = null;
      if (!/^(yes|y|update|change|do it)$/.test(answer)) { addChat("assistant", "No change made."); return true; }
      const task = state.tasks.find((t) => t.id === pending.taskId);
      if (!task) { addChat("assistant", "That task no longer exists, so I made no change."); return true; }
      commit(`Updated deadline for “${task.name}”`, () => { task.dueDate = pending.draft.dueDate; task.dueTime = pending.draft.dueTime; task.updatedAt = new Date().toISOString(); });
      addChat("assistant", `Updated “${task.name}” to ${formatDate(task.dueDate)}${task.dueTime ? ` at ${formatTime(task.dueTime)}` : ""}.`);
      return true;
    }
    if (pending.kind === "finishAddClass") {
      const course = detectClass(text, true) || (text.trim() ? { classId: "", name: text.trim().toUpperCase(), isNew: true } : null);
      if (!course) { addChat("assistant", "I still need a class name before I can add the task."); return true; }
      ui.pendingChat = null;
      createTaskFromDraft({ ...pending.draft, course });
      return true;
    }
    if (pending.kind === "chooseComplete" || pending.kind === "chooseMove") {
      const number = Number(answer);
      if (!Number.isInteger(number) || number < 1 || number > pending.taskIds.length) { addChat("assistant", `Reply with a number from 1 to ${pending.taskIds.length}, or type cancel.`); return true; }
      const task = state.tasks.find((t) => t.id === pending.taskIds[number - 1]);
      ui.pendingChat = null;
      if (!task) { addChat("assistant", "That task no longer exists."); return true; }
      if (pending.kind === "chooseComplete") {
        commit(`Completed “${task.name}”`, () => { task.status = "Completed"; task.updatedAt = new Date().toISOString(); });
        addChat("assistant", `Marked “${task.name}” as Completed.`);
      } else {
        const oldDate = task.dueDate;
        commit(`Moved “${task.name}”`, () => { task.dueDate = pending.dueDate; task.updatedAt = new Date().toISOString(); });
        addChat("assistant", `Moved “${task.name}” from ${formatDate(oldDate)} to ${formatDate(task.dueDate)}.`);
      }
      return true;
    }
    return false;
  }

  function handleChat(text) {
    const clean = text.trim();
    if (!clean) return;
    addChat("user", clean);
    if (ui.pendingChat && normalize(clean) === "cancel") { ui.pendingChat = null; addChat("assistant", "Cancelled. No change made."); return; }
    if (handlePendingChat(clean)) return;
    const answer = answerTrackerQuestion(clean);
    if (answer) { addChat("assistant", answer); return; }
    if (/^\s*(?:please\s+)?add\b/i.test(clean)) { handleAddCommand(clean); return; }
    if (/^\s*(?:please\s+)?move\b/i.test(clean)) { moveTaskFromText(clean); return; }
    if (/\b(finished|completed|done with)\b/i.test(clean) || /^\s*mark\b/i.test(clean)) { completeTaskFromText(clean); return; }
    addChat("assistant", "I did not make a change because I could not determine the request reliably. Try “Add [task] for [class] on [date],” “I finished [task],” or ask what is due this week.");
  }

  function openScreenshotDialog() {
    screenshotCandidates = [];
    $("#candidateList").innerHTML = "";
    $("#candidateSummary").textContent = "Upload a screenshot to find potential tasks. Nothing is added automatically.";
    $("#confirmCandidatesButton").disabled = true;
    $("#screenshotDialog").showModal();
  }

  async function processScreenshot(file) {
    if (!file || !file.type.startsWith("image/")) { toast("Choose a PNG, JPG, or WEBP image."); return; }
    $("#screenshotPreview").src = URL.createObjectURL(file);
    $("#screenshotPreview").classList.remove("hidden");
    $("#ocrProgress").classList.remove("hidden");
    $("#ocrProgressBar").style.width = "2%";
    $("#ocrProgressText").textContent = "Preparing screenshot reader…";
    if (location.protocol === "file:") {
      $("#ocrProgressText").textContent = "Screenshot reading needs start.command. You can paste text below instead.";
      return;
    }
    try {
      if (!window.Tesseract) throw new Error("Screenshot reader did not load");
      if (!ocrWorker) {
        ocrWorker = await Tesseract.createWorker("eng", 1, {
          workerPath: "./vendor/worker.min.js",
          langPath: "./vendor",
          corePath: "./vendor/tesseract-core-simd-lstm.wasm.js",
          logger: (message) => {
            if (typeof message.progress === "number") $("#ocrProgressBar").style.width = `${Math.max(3, Math.round(message.progress * 100))}%`;
            $("#ocrProgressText").textContent = message.status ? titleCase(message.status) : "Reading screenshot…";
          }
        });
      }
      const result = await ocrWorker.recognize(file);
      $("#ocrText").value = result.data.text.trim();
      $("#ocrProgressBar").style.width = "100%";
      $("#ocrProgressText").textContent = "Text recognized. Review the proposed tasks.";
      extractScreenshotCandidates();
    } catch (error) {
      console.error(error);
      $("#ocrProgressText").textContent = "Could not read this image. Paste or type the visible text below instead.";
    }
  }

  function cleanCandidateName(line, dateMatch, timeMatch) {
    let value = line;
    if (dateMatch) value = value.replace(new RegExp(escapeRegExp(dateMatch), "i"), " ");
    if (timeMatch) value = value.replace(new RegExp(escapeRegExp(timeMatch), "i"), " ");
    value = value.replace(/\b(due|deadline|available|until|closes?|at|by|on)\b[:\s-]*/gi, " ").replace(/[|•·]+/g, " ").replace(/\s+/g, " ").trim().replace(/^[-:,]+|[-:,]+$/g, "").trim();
    return value;
  }

  function extractScreenshotCandidates() {
    const text = $("#ocrText").value.trim();
    if (!text) { toast("Add recognized or pasted text first."); return; }
    const lines = text.split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
    const candidates = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const date = parseNaturalDate(line, new Date(2026, 8, 7));
      const time = parseNaturalTime(line);
      const dueSignal = /\b(due|deadline|closes?|available until)\b/i.test(line);
      if (!date.iso && !dueSignal) continue;
      let name = cleanCandidateName(line, date.matched, time.matched);
      if (!name || /^(assignment|assignments|module|week|course|calendar)$/i.test(name) || name.length < 3) {
        const previous = lines[i - 1] || "";
        name = cleanCandidateName(previous, "", "");
      }
      if (!name || name.length < 3 || name.length > 180) continue;
      const context = [lines[i - 2], lines[i - 1], line, lines[i + 1]].filter(Boolean).join(" ");
      const course = detectClass(context, true);
      const candidate = {
        id: uid(), name: upperFirst(name), classId: course?.classId || "", explicitClassName: course?.isNew ? course.name : "",
        dueDate: date.iso, dueTime: time.time, type: detectType(name), notes: "", selected: false, duplicate: null, flags: []
      };
      if (!candidate.classId && !candidate.explicitClassName) candidate.flags.push("Class unclear");
      if (!candidate.dueDate) candidate.flags.push("Due date unclear");
      candidates.push(candidate);
    }
    const seen = new Set();
    screenshotCandidates = candidates.filter((candidate) => {
      const key = `${normalize(candidate.name)}|${candidate.dueDate}|${candidate.classId || normalize(candidate.explicitClassName)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    refreshCandidateDuplicates(true);
  }

  function candidateClassOptions(candidate) {
    let html = '<option value="">Select class</option>';
    html += activeClasses().map((course) => `<option value="${course.id}"${candidate.classId === course.id ? " selected" : ""}>${escapeHtml(course.name)}</option>`).join("");
    if (candidate.explicitClassName) html += `<option value="new:${escapeHtml(candidate.explicitClassName)}" selected>Add ${escapeHtml(candidate.explicitClassName)}</option>`;
    return html;
  }

  function refreshCandidateDuplicates(setDefaults = false) {
    screenshotCandidates.forEach((candidate) => {
      candidate.flags = candidate.flags.filter((flag) => !/already exists|deadline changed/i.test(flag));
      const classId = candidate.classId;
      const duplicate = classId ? findDuplicate(candidate.name, classId) : null;
      candidate.duplicate = duplicate ? { taskId: duplicate.id, sameDate: duplicate.dueDate === candidate.dueDate && (duplicate.dueTime || "") === (candidate.dueTime || "") } : null;
      if (duplicate) candidate.flags.push(candidate.duplicate.sameDate ? "Already exists" : `Deadline changed from ${formatDate(duplicate.dueDate, { short: true })}`);
      const complete = candidate.name && candidate.dueDate && (candidate.classId || candidate.explicitClassName);
      if (setDefaults) candidate.selected = Boolean(complete && !duplicate);
      if (!complete || candidate.duplicate?.sameDate) candidate.selected = false;
    });
    renderCandidates();
  }

  function renderCandidates() {
    const clear = screenshotCandidates.filter((c) => c.name && c.dueDate && (c.classId || c.explicitClassName) && !c.duplicate);
    const unclear = screenshotCandidates.filter((c) => !c.name || !c.dueDate || (!c.classId && !c.explicitClassName));
    const duplicates = screenshotCandidates.filter((c) => c.duplicate?.sameDate);
    const changes = screenshotCandidates.filter((c) => c.duplicate && !c.duplicate.sameDate);
    if (!screenshotCandidates.length) {
      $("#candidateSummary").textContent = "I could not identify a reliable task row. Correct or paste the text on the left, then extract again.";
      $("#candidateList").innerHTML = '<div class="empty-column">No potential tasks found.</div>';
      $("#confirmCandidatesButton").disabled = true;
      return;
    }
    const parts = [`I found ${screenshotCandidates.length} potential ${screenshotCandidates.length === 1 ? "task" : "tasks"}.`, `${clear.length} clear`];
    if (unclear.length) parts.push(`${unclear.length} need review`);
    if (duplicates.length) parts.push(`${duplicates.length} already in the tracker`);
    if (changes.length) parts.push(`${changes.length} possible deadline ${changes.length === 1 ? "change" : "changes"}`);
    $("#candidateSummary").textContent = parts.join(" · ") + ". Check the rows you want to apply.";
    $("#candidateList").innerHTML = screenshotCandidates.map((candidate) => {
      const complete = candidate.name && candidate.dueDate && (candidate.classId || candidate.explicitClassName);
      const disabled = !complete || candidate.duplicate?.sameDate;
      return `<div class="candidate-card" data-candidate-id="${candidate.id}">
        <input class="candidate-check" data-candidate-select type="checkbox" ${candidate.selected ? "checked" : ""} ${disabled ? "disabled" : ""} aria-label="Select ${escapeHtml(candidate.name)}">
        <div class="candidate-field"><label>Task</label><input data-candidate-field="name" value="${escapeHtml(candidate.name)}"></div>
        <div class="candidate-field"><label>Class</label><select data-candidate-field="class">${candidateClassOptions(candidate)}</select></div>
        <div class="candidate-field"><label>Due date and time</label><div class="date-wrap"><input type="date" data-candidate-field="dueDate" value="${escapeHtml(candidate.dueDate)}"><input type="time" data-candidate-field="dueTime" value="${escapeHtml(candidate.dueTime)}"></div></div>
        <div class="candidate-field"><label>Type</label><select data-candidate-field="type">${optionHtml(state.types, candidate.type)}</select></div>
        <div class="candidate-flags">${candidate.flags.map((flag) => `<span class="candidate-flag ${/unclear/.test(flag) ? "warning" : /already/.test(flag) ? "duplicate" : /changed/.test(flag) ? "update" : ""}">${escapeHtml(flag)}</span>`).join("")}${!candidate.flags.length ? '<span class="candidate-flag">Ready to add</span>' : ""}</div>
        <div class="candidate-field candidate-notes"><label>Notes</label><input data-candidate-field="notes" value="${escapeHtml(candidate.notes)}" placeholder="Optional"></div>
      </div>`;
    }).join("");
    $("#confirmCandidatesButton").disabled = !screenshotCandidates.some((c) => c.selected);
    $("#confirmCandidatesButton").textContent = changes.some((c) => c.selected) ? "Apply selected changes" : "Add selected tasks";
  }

  function confirmScreenshotCandidates() {
    const selected = screenshotCandidates.filter((c) => c.selected);
    if (!selected.length) return;
    let added = 0;
    let updated = 0;
    commit(`Imported ${selected.length} ${selected.length === 1 ? "task" : "tasks"}`, () => {
      const newClasses = new Map();
      selected.forEach((candidate) => {
        let classId = candidate.classId;
        if (!classId && candidate.explicitClassName) {
          const key = normalize(candidate.explicitClassName);
          let course = state.classes.find((c) => normalize(c.name) === key) || newClasses.get(key);
          if (!course) {
            course = { id: uid(), name: candidate.explicitClassName, archived: false, color: CLASS_COLORS[(state.classes.length + newClasses.size) % CLASS_COLORS.length] };
            newClasses.set(key, course);
          }
          classId = course.id;
        }
        if (candidate.duplicate && !candidate.duplicate.sameDate) {
          const task = state.tasks.find((t) => t.id === candidate.duplicate.taskId);
          if (task) { task.dueDate = candidate.dueDate; task.dueTime = candidate.dueTime; task.updatedAt = new Date().toISOString(); updated++; }
          return;
        }
        state.tasks.push({ id: uid(), name: candidate.name.trim(), classId, dueDate: candidate.dueDate, dueTime: candidate.dueTime || "", status: "To Do", type: candidate.type, notes: candidate.notes.trim(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        added++;
      });
      state.classes.push(...newClasses.values());
    });
    $("#screenshotDialog").close();
    toast(`${added ? `Added ${added}` : ""}${added && updated ? " and " : ""}${updated ? `updated ${updated}` : ""} ${added + updated === 1 ? "task" : "tasks"}.`);
  }

  function decodeIcsText(value = "") {
    return value.replace(/\\n/gi, "\n").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\").trim();
  }

  function icsProperty(block, name) {
    const line = block.split("\n").find((item) => new RegExp(`^${name}(?:;[^:]*)?:`, "i").test(item));
    return line ? decodeIcsText(line.slice(line.indexOf(":") + 1)) : "";
  }

  function parseIcsDate(raw) {
    const value = String(raw || "").trim();
    const match = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?/);
    if (!match) return null;
    const [, y, m, d, hh, mm, ss, z] = match;
    let date;
    if (hh && z) date = new Date(Date.UTC(+y, +m - 1, +d, +hh, +(mm || 0), +(ss || 0)));
    else date = new Date(+y, +m - 1, +d, +(hh || 0), +(mm || 0), +(ss || 0));
    return { dueDate: toISO(date), dueTime: hh ? `${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}` : "" };
  }

  function parseCanvasIcs(text) {
    const unfolded = String(text).replace(/\r\n[ \t]/g, "").replace(/\r/g, "");
    const blocks = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
    const events = [];
    for (const block of blocks) {
      const rawDateLine = block.split("\n").find((line) => /^DTSTART(?:;[^:]*)?:/i.test(line));
      const parsedDate = parseIcsDate(rawDateLine ? rawDateLine.slice(rawDateLine.indexOf(":") + 1) : "");
      let summary = icsProperty(block, "SUMMARY");
      const uidValue = icsProperty(block, "UID");
      if (!summary || !uidValue || !parsedDate) continue;
      if (parsedDate.dueDate < "2026-08-01" || parsedDate.dueDate > "2026-12-31") continue;
      const url = icsProperty(block, "URL");
      const description = icsProperty(block, "DESCRIPTION");
      const category = icsProperty(block, "CATEGORIES");
      const bracket = summary.match(/\s+\[([^\]]+)\]\s*$/);
      const explicitClassName = bracket?.[1]?.trim() || "";
      if (bracket) summary = summary.slice(0, bracket.index).trim();
      summary = summary.replace(/^(assignment|quiz|event):\s*/i, "").trim();
      const courseId = (url.match(/\/courses\/(\d+)/i) || description.match(/\/courses\/(\d+)/i))?.[1] || "";
      const courseKey = courseId ? `canvas-course-${courseId}` : explicitClassName ? `canvas-name-${normalize(explicitClassName)}` : category ? `canvas-category-${normalize(category)}` : "";
      events.push({ externalId: uidValue, name: summary, ...parsedDate, type: detectType(summary), notes: "", courseKey, explicitClassName, sourceUrl: url });
    }
    return events;
  }

  function buildCanvasCandidates(icsText, syncedAt = "") {
    const events = parseCanvasIcs(icsText);
    canvasCandidates = events.map((event) => {
      let classId = event.courseKey ? state.canvasCourseMap[event.courseKey] || "" : "";
      let explicitClassName = event.explicitClassName;
      if (!classId && explicitClassName) {
        const existingCourse = state.classes.find((c) => normalize(c.name) === normalize(explicitClassName));
        if (existingCourse) { classId = existingCourse.id; explicitClassName = ""; }
      }
      let existing = state.tasks.find((task) => task.source === "canvas" && task.externalId === event.externalId);
      if (!existing && classId) existing = findDuplicate(event.name, classId);
      let action = "new";
      if (existing) {
        const changed = existing.name !== event.name || existing.dueDate !== event.dueDate || (existing.dueTime || "") !== event.dueTime || existing.classId !== classId;
        action = changed ? "changed" : "unchanged";
      }
      return { id: uid(), ...event, classId, explicitClassName, existingTaskId: existing?.id || "", action, selected: action === "new" && Boolean(classId || explicitClassName) };
    });
    state.canvasLastSync = syncedAt || new Date().toISOString();
    saveState();
    renderCanvasCandidates();
  }

  function canvasClassOptions(candidate) {
    let html = '<option value="">Select class</option>' + activeClasses().map((course) => `<option value="${course.id}"${candidate.classId === course.id ? " selected" : ""}>${escapeHtml(course.name)}</option>`).join("");
    if (candidate.explicitClassName) html += `<option value="new:${escapeHtml(candidate.explicitClassName)}" selected>Add ${escapeHtml(candidate.explicitClassName)}</option>`;
    return html;
  }

  function renderCanvasCandidates() {
    const review = $("#canvasReview");
    review.classList.remove("hidden");
    const newItems = canvasCandidates.filter((c) => c.action === "new").length;
    const changed = canvasCandidates.filter((c) => c.action === "changed").length;
    const unchanged = canvasCandidates.filter((c) => c.action === "unchanged").length;
    const unclear = canvasCandidates.filter((c) => !c.classId && !c.explicitClassName).length;
    $("#canvasCandidateSummary").textContent = canvasCandidates.length ? `Found ${canvasCandidates.length} Fall 2026 Canvas items · ${newItems} new · ${changed} changed · ${unchanged} already current${unclear ? ` · ${unclear} need a class` : ""}. Nothing changes until you approve it.` : "No Fall 2026 dated items were found in this calendar file.";
    $("#canvasCandidateList").innerHTML = canvasCandidates.length ? canvasCandidates.map((candidate) => {
      const disabled = candidate.action === "unchanged" || (!candidate.classId && !candidate.explicitClassName);
      const badge = candidate.action === "new" ? "New from Canvas" : candidate.action === "changed" ? "Changed in Canvas" : "Already current";
      return `<div class="canvas-candidate" data-canvas-candidate="${candidate.id}">
        <input class="candidate-check" type="checkbox" data-canvas-select ${candidate.selected ? "checked" : ""} ${disabled ? "disabled" : ""} aria-label="Select ${escapeHtml(candidate.name)}">
        <div><strong>${escapeHtml(candidate.name)}</strong><span class="canvas-source-badge">${badge}</span></div>
        <select data-canvas-field="class">${canvasClassOptions(candidate)}</select>
        <div class="date-wrap"><input type="date" data-canvas-field="dueDate" value="${candidate.dueDate}"><input type="time" data-canvas-field="dueTime" value="${candidate.dueTime}"></div>
        <select data-canvas-field="type">${optionHtml(state.types, candidate.type)}</select>
      </div>`;
    }).join("") : '<div class="empty-column">No dated Fall 2026 items found.</div>';
    $("#applyCanvasCandidatesButton").disabled = !canvasCandidates.some((c) => c.selected);
  }

  function bytesFromBase64(value) {
    const binary = atob(value);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  }

  async function decryptCanvasSnapshot(passphrase) {
    const response = await fetch(`canvas-sync.enc.json?cache=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("The scheduled Canvas connection has not been configured yet.");
    const encrypted = await response.json();
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: bytesFromBase64(encrypted.salt), iterations: encrypted.iterations || 250000, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytesFromBase64(encrypted.iv) }, key, bytesFromBase64(encrypted.data));
    return JSON.parse(new TextDecoder().decode(plaintext));
  }

  async function loadCanvasSync() {
    const passphrase = $("#canvasPassphrase").value;
    const status = $("#canvasSyncStatus");
    if (!passphrase) { status.className = "canvas-status error"; status.textContent = "Enter the sync passphrase first."; return; }
    status.className = "canvas-status";
    status.textContent = "Checking the encrypted Canvas snapshot…";
    try {
      const payload = await decryptCanvasSnapshot(passphrase);
      if ($("#rememberCanvasPassphrase").checked) localStorage.setItem("academicCommandCenter.canvasPassphrase", passphrase);
      else localStorage.removeItem("academicCommandCenter.canvasPassphrase");
      status.className = "canvas-status success";
      status.textContent = `Canvas snapshot retrieved${payload.fetchedAt ? ` from ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(payload.fetchedAt))}` : ""}. Review the items below.`;
      buildCanvasCandidates(payload.ics, payload.fetchedAt);
    } catch (error) {
      status.className = "canvas-status error";
      status.textContent = error.message.includes("configured") ? error.message : "The snapshot could not be decrypted. Check the passphrase or use a downloaded .ics file below.";
    }
  }

  function applyCanvasCandidates() {
    const selected = canvasCandidates.filter((c) => c.selected);
    if (!selected.length) return;
    let added = 0;
    let updated = 0;
    commit(`Applied ${selected.length} Canvas ${selected.length === 1 ? "update" : "updates"}`, () => {
      const newClasses = new Map();
      selected.forEach((candidate) => {
        let classId = candidate.classId;
        if (!classId && candidate.explicitClassName) {
          const key = normalize(candidate.explicitClassName);
          let course = state.classes.find((c) => normalize(c.name) === key) || newClasses.get(key);
          if (!course) {
            course = { id: uid(), name: candidate.explicitClassName, archived: false, color: CLASS_COLORS[(state.classes.length + newClasses.size) % CLASS_COLORS.length] };
            newClasses.set(key, course);
          }
          classId = course.id;
        }
        if (candidate.courseKey) state.canvasCourseMap[candidate.courseKey] = classId;
        const existing = state.tasks.find((t) => t.id === candidate.existingTaskId);
        if (existing) {
          Object.assign(existing, { name: candidate.name, classId, dueDate: candidate.dueDate, dueTime: candidate.dueTime, type: candidate.type, source: "canvas", externalId: candidate.externalId, updatedAt: new Date().toISOString() });
          updated++;
        } else {
          state.tasks.push({ id: uid(), name: candidate.name, classId, dueDate: candidate.dueDate, dueTime: candidate.dueTime, status: "To Do", type: candidate.type, notes: candidate.notes, source: "canvas", externalId: candidate.externalId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
          added++;
        }
      });
      state.classes.push(...newClasses.values());
    });
    $("#canvasDialog").close();
    toast(`${added} added · ${updated} updated. Manual tasks and completion statuses were preserved.`);
  }

  function openCanvasDialog() {
    const remembered = localStorage.getItem("academicCommandCenter.canvasPassphrase") || "";
    $("#canvasPassphrase").value = remembered;
    $("#rememberCanvasPassphrase").checked = Boolean(remembered);
    $("#canvasReview").classList.add("hidden");
    $("#canvasSyncStatus").className = "canvas-status";
    $("#canvasSyncStatus").textContent = state.canvasLastSync ? `Last checked ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(state.canvasLastSync))}. Check again for new or changed items.` : "Enter your passphrase to check the latest encrypted Canvas snapshot.";
    $("#canvasDialog").showModal();
    if (remembered) setTimeout(loadCanvasSync, 80);
  }

  function setView(view) {
    ui.view = view;
    $$(".view-tab").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
    $("#tasksView").classList.toggle("hidden", view !== "tasks");
    $("#calendarView").classList.toggle("hidden", view !== "calendar");
    $("#classesView").classList.toggle("hidden", view !== "classes");
    if (view === "calendar") renderCalendar();
    if (view === "classes") renderClassView();
    hydrateIcons();
  }

  function clearFilters() {
    ui.search = "";
    ui.filters = { classId: "all", status: "all", date: "all", type: "all", rangeStart: "", rangeEnd: "" };
    $("#globalSearch").value = "";
    renderAll();
  }

  function updateTaskField(taskId, field, value) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (!task) return;
    if ((field === "name" || field === "dueDate" || field === "classId") && !String(value).trim()) { toast(`${field === "name" ? "A task name" : field === "dueDate" ? "A due date" : "A class"} is required.`); renderTaskTable(); return; }
    const label = field === "status" ? `Moved “${task.name}” to ${value}` : field === "dueDate" ? `Changed deadline for “${task.name}”` : `Updated “${task.name}”`;
    commit(label, () => {
      task[field] = typeof value === "string" ? value.trim() : value;
      task.updatedAt = new Date().toISOString();
    });
  }

  function addClass(name) {
    const clean = name.trim();
    if (!clean) return;
    if (state.classes.some((c) => normalize(c.name) === normalize(clean))) { toast("That class already exists."); return; }
    const course = { id: uid(), name: clean, archived: false, color: CLASS_COLORS[state.classes.length % CLASS_COLORS.length] };
    commit(`Added class ${clean}`, () => state.classes.push(course));
    ui.selectedClassId = course.id;
    $("#newClassName").value = "";
  }

  function addType(name) {
    const clean = titleCase(name.trim());
    if (!clean) return;
    if (state.types.some((type) => normalize(type) === normalize(clean))) { toast("That task type already exists."); return; }
    commit(`Added task type ${clean}`, () => state.types.splice(Math.max(0, state.types.length - 1), 0, clean));
    $("#newTypeName").value = "";
  }

  function exportBackup() {
    const payload = { ...state, exportedAt: new Date().toISOString(), app: "Academic Command Center" };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fall-2026-academic-tracker-backup-${toISO(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast("Backup exported.");
  }

  async function restoreBackup(file) {
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.classes) || !Array.isArray(parsed.types)) throw new Error("Invalid backup");
      const validStatuses = parsed.tasks.every((task) => task.id && task.name && task.classId && task.dueDate && STATUSES.includes(task.status));
      if (!validStatuses) throw new Error("Invalid task records");
      askConfirm("Restore this backup?", `This will replace the current tracker with ${parsed.tasks.length} tasks and ${parsed.classes.length} classes. You can undo afterward.`, "Restore", () => {
        commit("Restored backup", () => {
          state = { version: 1, semester: "Fall 2026", classes: parsed.classes, types: parsed.types, tasks: parsed.tasks, chat: Array.isArray(parsed.chat) ? parsed.chat : [], canvasCourseMap: parsed.canvasCourseMap || {}, canvasLastSync: parsed.canvasLastSync || "" };
        });
      });
    } catch (_) {
      toast("That file is not a valid Academic Command Center backup.");
    }
  }

  function closeMoreMenu() {
    $("#moreMenu").classList.add("hidden");
    $("#moreButton").setAttribute("aria-expanded", "false");
  }

  function initEvents() {
    $("#addTaskButton").addEventListener("click", () => openTaskDialog());
    $("#undoButton").addEventListener("click", undo);
    $("#assistantButton").addEventListener("click", openAssistant);
    $("#closeAssistant").addEventListener("click", closeAssistant);
    $("#drawerBackdrop").addEventListener("click", closeAssistant);
    $("#importScreenshotButton").addEventListener("click", openScreenshotDialog);
    $("#syncCanvasButton").addEventListener("click", openCanvasDialog);
    $("#loadCanvasSyncButton").addEventListener("click", loadCanvasSync);
    $("#canvasIcsInput").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        $("#canvasSyncStatus").className = "canvas-status success";
        $("#canvasSyncStatus").textContent = `Loaded ${file.name}. Review the Fall 2026 items below.`;
        buildCanvasCandidates(text, new Date().toISOString());
      } catch (_) {
        $("#canvasSyncStatus").className = "canvas-status error";
        $("#canvasSyncStatus").textContent = "That calendar file could not be read.";
      }
      event.target.value = "";
    });
    $("#canvasCandidateList").addEventListener("change", (event) => {
      const row = event.target.closest("[data-canvas-candidate]");
      const candidate = canvasCandidates.find((c) => c.id === row?.dataset.canvasCandidate);
      if (!candidate) return;
      if (event.target.matches("[data-canvas-select]")) candidate.selected = event.target.checked;
      const field = event.target.dataset.canvasField;
      if (field === "class") {
        const value = event.target.value;
        const applyClass = (item) => {
          if (value.startsWith("new:")) { item.classId = ""; item.explicitClassName = value.slice(4); }
          else { item.classId = value; item.explicitClassName = ""; }
          if (item.action === "new") item.selected = Boolean(value);
        };
        if (candidate.courseKey) canvasCandidates.filter((c) => c.courseKey === candidate.courseKey).forEach(applyClass);
        else applyClass(candidate);
      } else if (field) candidate[field] = event.target.value;
      renderCanvasCandidates();
    });
    $("#applyCanvasCandidatesButton").addEventListener("click", applyCanvasCandidates);

    $$(".view-tab").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));

    $("#globalSearch").addEventListener("input", (event) => {
      ui.search = event.target.value;
      renderTaskTable(); renderCalendar(); renderClassView(); renderFilters(); hydrateIcons();
    });
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); $("#globalSearch").focus();
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z" && !["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)) {
        event.preventDefault(); undo();
      }
    });

    [["classFilter", "classId"], ["statusFilter", "status"], ["dateFilter", "date"], ["typeFilter", "type"]].forEach(([id, key]) => {
      $(`#${id}`).addEventListener("change", (event) => { ui.filters[key] = event.target.value; renderFilters(); renderTaskTable(); renderCalendar(); hydrateIcons(); });
    });
    $("#rangeStart").addEventListener("change", (event) => { ui.filters.rangeStart = event.target.value; renderTaskTable(); renderCalendar(); });
    $("#rangeEnd").addEventListener("change", (event) => { ui.filters.rangeEnd = event.target.value; renderTaskTable(); renderCalendar(); });
    $("#clearFiltersButton").addEventListener("click", clearFilters);
    $$(".summary-card").forEach((card) => card.addEventListener("click", () => {
      clearFilters();
      const filter = card.dataset.summaryFilter;
      if (filter === "today") ui.filters.date = "today";
      if (filter === "week") ui.filters.date = "week";
      if (filter === "progress") ui.filters.status = "In Progress";
      if (filter === "overdue") ui.filters.date = "overdue";
      setView("tasks"); renderAll();
    }));

    $$(".sort-button").forEach((button) => button.addEventListener("click", () => {
      const key = button.dataset.sort;
      ui.sort.direction = ui.sort.key === key && ui.sort.direction === "asc" ? "desc" : "asc";
      ui.sort.key = key; renderTaskTable();
    }));

    $("#taskTableBody").addEventListener("change", (event) => {
      const row = event.target.closest("[data-task-id]");
      if (!row) return;
      const field = event.target.dataset.field;
      if (field === "complete") updateTaskField(row.dataset.taskId, "status", event.target.checked ? "Completed" : "To Do");
      else if (field) updateTaskField(row.dataset.taskId, field, event.target.value);
    });
    $("#tasksView").addEventListener("click", (event) => {
      const edit = event.target.closest("[data-edit-task]");
      if (edit) openTaskDialog(edit.dataset.editTask);
      const emptyAction = event.target.closest("[data-empty-action]");
      if (emptyAction?.dataset.emptyAction === "clear") clearFilters();
      if (emptyAction?.dataset.emptyAction === "add") openTaskDialog();
    });

    $("#taskForm").addEventListener("submit", submitTaskForm);
    $("#deleteTaskButton").addEventListener("click", () => deleteTask($("#taskId").value));
    $$('[data-close-dialog]').forEach((button) => button.addEventListener("click", () => {
      const dialog = document.getElementById(button.dataset.closeDialog);
      if (dialog?.open) dialog.close();
    }));

    $("#moreButton").addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = $("#moreMenu");
      menu.classList.toggle("hidden");
      $("#moreButton").setAttribute("aria-expanded", String(!menu.classList.contains("hidden")));
    });
    document.addEventListener("click", (event) => { if (!event.target.closest(".menu-wrap")) closeMoreMenu(); });
    $("#manageClassesButton").addEventListener("click", () => { closeMoreMenu(); $("#classDialog").showModal(); });
    $("#manageTypesButton").addEventListener("click", () => { closeMoreMenu(); $("#typeDialog").showModal(); });
    $("#classesManageInline").addEventListener("click", () => $("#classDialog").showModal());
    $("#exportButton").addEventListener("click", () => { closeMoreMenu(); exportBackup(); });
    $("#importBackupButton").addEventListener("click", () => { closeMoreMenu(); $("#backupFileInput").click(); });
    $("#backupFileInput").addEventListener("change", (event) => { if (event.target.files[0]) restoreBackup(event.target.files[0]); event.target.value = ""; });

    $("#addClassForm").addEventListener("submit", (event) => { event.preventDefault(); addClass($("#newClassName").value); });
    $("#addTypeForm").addEventListener("submit", (event) => { event.preventDefault(); addType($("#newTypeName").value); });
    $("#classManagerList").addEventListener("change", (event) => {
      const id = event.target.dataset.renameClass;
      if (!id) return;
      const clean = event.target.value.trim();
      const course = classById(id);
      if (!clean || state.classes.some((c) => c.id !== id && normalize(c.name) === normalize(clean))) { toast("Class names must be unique and cannot be empty."); renderManagers(); return; }
      commit(`Renamed ${course.name} to ${clean}`, () => { course.name = clean; });
    });
    $("#classManagerList").addEventListener("click", (event) => {
      const archive = event.target.closest("[data-archive-class]");
      const restore = event.target.closest("[data-restore-class]");
      const remove = event.target.closest("[data-delete-class]");
      if (archive) {
        const course = classById(archive.dataset.archiveClass);
        askConfirm("Archive class?", `${course.name} will leave the active class list. Its tasks will remain available.`, "Archive", () => commit(`Archived ${course.name}`, () => { course.archived = true; }));
      }
      if (restore) { const course = classById(restore.dataset.restoreClass); commit(`Restored ${course.name}`, () => { course.archived = false; }); }
      if (remove) {
        const course = classById(remove.dataset.deleteClass);
        askConfirm("Delete class?", `${course.name} has no tasks and will be removed.`, "Delete", () => commit(`Deleted class ${course.name}`, () => { state.classes = state.classes.filter((c) => c.id !== course.id); }));
      }
    });
    $("#typeManagerList").addEventListener("change", (event) => {
      const oldType = event.target.dataset.renameType;
      if (!oldType) return;
      const newType = titleCase(event.target.value.trim());
      if (!newType || state.types.some((type) => type !== oldType && normalize(type) === normalize(newType))) { toast("Task types must be unique and cannot be empty."); renderManagers(); return; }
      commit(`Renamed task type ${oldType}`, () => {
        state.types[state.types.indexOf(oldType)] = newType;
        state.tasks.filter((t) => t.type === oldType).forEach((t) => { t.type = newType; });
      });
    });
    $("#typeManagerList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-delete-type]");
      if (!button) return;
      const type = button.dataset.deleteType;
      const usage = state.tasks.filter((t) => t.type === type).length;
      askConfirm("Delete task type?", usage ? `${usage} ${usage === 1 ? "task uses" : "tasks use"} ${type}. Those tasks will be changed to Other.` : `${type} will be removed.`, "Delete", () => commit(`Deleted task type ${type}`, () => {
        state.tasks.filter((t) => t.type === type).forEach((t) => { t.type = "Other"; });
        state.types = state.types.filter((t) => t !== type);
      }));
    });

    $("#confirmCancel").addEventListener("click", () => { confirmHandler = null; $("#confirmDialog").close(); });
    $("#confirmAction").addEventListener("click", () => { const handler = confirmHandler; confirmHandler = null; $("#confirmDialog").close(); if (handler) handler(); });

    $("#calendarPrev").addEventListener("click", () => {
      if (ui.calendarMode === "month") ui.calendarDate = new Date(ui.calendarDate.getFullYear(), ui.calendarDate.getMonth() - 1, 1);
      else ui.calendarDate = addDays(ui.calendarDate, ui.calendarMode === "week" ? -7 : -1);
      renderCalendar(); hydrateIcons();
    });
    $("#calendarNext").addEventListener("click", () => {
      if (ui.calendarMode === "month") ui.calendarDate = new Date(ui.calendarDate.getFullYear(), ui.calendarDate.getMonth() + 1, 1);
      else ui.calendarDate = addDays(ui.calendarDate, ui.calendarMode === "week" ? 7 : 1);
      renderCalendar(); hydrateIcons();
    });
    $("#calendarToday").addEventListener("click", () => { ui.calendarDate = startOfDay(new Date()); renderCalendar(); hydrateIcons(); });
    $$("[data-calendar-mode]").forEach((button) => button.addEventListener("click", () => { ui.calendarMode = button.dataset.calendarMode; renderCalendar(); hydrateIcons(); }));
    $("#calendarGrid").addEventListener("click", (event) => {
      const task = event.target.closest("[data-calendar-task]");
      const add = event.target.closest("[data-add-on-date]");
      const show = event.target.closest("[data-show-day]");
      const edit = event.target.closest("[data-edit-task]");
      if (edit) openTaskDialog(edit.dataset.editTask);
      else if (task) openTaskDialog(task.dataset.calendarTask);
      else if (add) openTaskDialog(null, add.dataset.addOnDate);
      else if (show) { ui.calendarDate = fromISO(show.dataset.showDay); ui.calendarMode = "day"; renderCalendar(); hydrateIcons(); }
      else {
        const day = event.target.closest("[data-calendar-date]");
        if (day) openTaskDialog(null, day.dataset.calendarDate);
      }
    });

    $("#classPills").addEventListener("click", (event) => { const button = event.target.closest("[data-class-focus]"); if (button) { ui.selectedClassId = button.dataset.classFocus; renderClassView(); } });
    $("#classDashboard").addEventListener("click", (event) => {
      if (event.target.closest("[data-manage-classes]")) $("#classDialog").showModal();
      const card = event.target.closest("[data-class-task]");
      if (card) openTaskDialog(card.dataset.classTask);
    });
    $("#classDateFilter").addEventListener("change", (event) => { ui.classFilters.date = event.target.value; renderClassView(); });
    $("#classTypeFilter").addEventListener("change", (event) => { ui.classFilters.type = event.target.value; renderClassView(); });
    $("#classSort").addEventListener("change", (event) => { ui.classFilters.sort = event.target.value; renderClassView(); });

    document.addEventListener("dragstart", (event) => {
      const draggable = event.target.closest("[data-task-id], [data-calendar-task], [data-class-task]");
      if (!draggable) return;
      ui.draggedTaskId = draggable.dataset.taskId || draggable.dataset.calendarTask || draggable.dataset.classTask;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", ui.draggedTaskId);
      draggable.classList.add("dragging");
      $("#statusDropbar").classList.remove("hidden");
      $("#statusDropbar").setAttribute("aria-hidden", "false");
    });
    document.addEventListener("dragend", (event) => {
      event.target.closest(".dragging")?.classList.remove("dragging");
      ui.draggedTaskId = null;
      $("#statusDropbar").classList.add("hidden");
      $$(".drag-over").forEach((node) => node.classList.remove("drag-over"));
    });
    document.addEventListener("dragover", (event) => {
      const target = event.target.closest("[data-drop-status], [data-status-column], [data-calendar-date]");
      if (!target || !ui.draggedTaskId) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      target.classList.add("drag-over");
    });
    document.addEventListener("dragleave", (event) => event.target.closest(".drag-over")?.classList.remove("drag-over"));
    document.addEventListener("drop", (event) => {
      const statusTarget = event.target.closest("[data-drop-status], [data-status-column]");
      const dateTarget = event.target.closest("[data-calendar-date]");
      const task = state.tasks.find((t) => t.id === ui.draggedTaskId);
      if (!task || (!statusTarget && !dateTarget)) return;
      event.preventDefault();
      if (statusTarget) {
        const status = statusTarget.dataset.dropStatus || statusTarget.dataset.statusColumn;
        if (status !== task.status) updateTaskField(task.id, "status", status);
      } else if (dateTarget) {
        const date = dateTarget.dataset.calendarDate;
        if (date && date !== task.dueDate) {
          const old = task.dueDate;
          commit(`Moved “${task.name}” to ${formatDate(date)}`, () => { task.dueDate = date; task.updatedAt = new Date().toISOString(); });
          toast(`Deadline changed from ${formatDate(old)} to ${formatDate(date)}.`);
        }
      }
      $("#statusDropbar").classList.add("hidden");
    });

    $("#chatForm").addEventListener("submit", (event) => { event.preventDefault(); const value = $("#chatInput").value; $("#chatInput").value = ""; handleChat(value); });
    $("#chatInput").addEventListener("keydown", (event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); $("#chatForm").requestSubmit(); } });
    $("#assistantSuggestions").addEventListener("click", (event) => { if (event.target.matches("button")) handleChat(event.target.textContent); });

    $("#screenshotInput").addEventListener("change", (event) => processScreenshot(event.target.files[0]));
    $("#uploadZone").addEventListener("dragover", (event) => { event.preventDefault(); event.currentTarget.classList.add("drag-over"); });
    $("#uploadZone").addEventListener("dragleave", (event) => event.currentTarget.classList.remove("drag-over"));
    $("#uploadZone").addEventListener("drop", (event) => { event.preventDefault(); event.currentTarget.classList.remove("drag-over"); processScreenshot(event.dataTransfer.files[0]); });
    $("#extractTasksButton").addEventListener("click", extractScreenshotCandidates);
    $("#candidateList").addEventListener("change", (event) => {
      const card = event.target.closest("[data-candidate-id]");
      const candidate = screenshotCandidates.find((c) => c.id === card?.dataset.candidateId);
      if (!candidate) return;
      if (event.target.matches("[data-candidate-select]")) candidate.selected = event.target.checked;
      const field = event.target.dataset.candidateField;
      if (field === "class") {
        if (event.target.value.startsWith("new:")) { candidate.classId = ""; candidate.explicitClassName = event.target.value.slice(4); }
        else { candidate.classId = event.target.value; candidate.explicitClassName = ""; }
      } else if (field) candidate[field] = event.target.value;
      candidate.flags = [];
      if (!candidate.classId && !candidate.explicitClassName) candidate.flags.push("Class unclear");
      if (!candidate.dueDate) candidate.flags.push("Due date unclear");
      refreshCandidateDuplicates(false);
    });
    $("#confirmCandidatesButton").addEventListener("click", confirmScreenshotCandidates);
  }

  function init() {
    hydrateIcons();
    initEvents();
    renderAll();
    setView("tasks");
  }

  init();
})();
