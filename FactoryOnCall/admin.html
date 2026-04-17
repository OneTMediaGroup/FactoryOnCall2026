// -------------------------------------------------------------
// FACTORY ON CALL — ADMIN PANEL
// Minimal Working Admin wired to current admin.html
// -------------------------------------------------------------

const COMPANY_ID = "demo-company";
const COMPANY_NAME = "Demo Company";

// ---------- FIRESTORE ----------
const companyRef = db.collection("companies").doc(COMPANY_ID);
const stationsRef = companyRef.collection("stations");

// ---------- CONNECTION STATUS ----------
const connDot = document.getElementById("firebaseStatusDot");
const connLabel = document.getElementById("firebaseStatusText");

function setConn(ok) {
  if (connDot) connDot.style.background = ok ? "#22c55e" : "#ef4444";
  if (connLabel) connLabel.textContent = ok ? "Online" : "Offline";
}
setTimeout(() => setConn(true), 500);

// ---------- SIDEBAR / TABS ----------
const navItems = document.querySelectorAll(".nav-item");
const tabs = document.querySelectorAll(".tab");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

function tabTitle(tabName) {
  const map = {
    dashboard: "Dashboard",
    callbuttons: "Call Buttons",
    logs: "Call Logs",
    users: "Users",
    stations: "Stations",
    roles: "Roles & Permissions",
    branding: "Branding",
    settings: "System Settings",
    analytics: "Analytics"
  };
  return map[tabName] || tabName;
}

function tabSubtitle(tabName) {
  const map = {
    dashboard: "Live overview of your factory call system.",
    callbuttons: "Generate call station URLs and static files.",
    logs: "Review and export call history.",
    users: "Manage users and login credentials.",
    stations: "Manage factory call stations.",
    roles: "Configure role-based permissions.",
    branding: "Customize branding and color system.",
    settings: "Adjust system-wide behavior.",
    analytics: "Analyze performance and usage trends."
  };
  return map[tabName] || "";
}

function activateTab(tabName) {
  tabs.forEach(tab => tab.classList.remove("active"));
  navItems.forEach(btn => btn.classList.remove("active"));

  const tab = document.getElementById(`tab-${tabName}`);
  const btn = document.querySelector(`.nav-item[data-tab="${tabName}"]`);

  if (tab) tab.classList.add("active");
  if (btn) btn.classList.add("active");
  if (pageTitle) pageTitle.textContent = tabTitle(tabName);
  if (pageSubtitle) pageSubtitle.textContent = tabSubtitle(tabName);
}

navItems.forEach(btn => {
  btn.addEventListener("click", () => {
    const tabName = btn.dataset.tab;
    if (tabName) activateTab(tabName);
  });
});

activateTab("dashboard");

// ---------- HELPERS ----------
function buildCallUrl(stationName, cells) {
  const base = `${window.location.origin}${window.location.pathname.replace(/[^/]+$/, "call.html")}`;
  const params = new URLSearchParams({
    station: stationName || "",
    cells: Array.isArray(cells) ? cells.join(",") : "",
    companyName: COMPANY_NAME
  });
  return `${base}?${params.toString()}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied.");
  } catch (err) {
    console.error(err);
    alert("Could not copy.");
  }
}

// ---------- STATIONS TAB ----------
const stationsTableBody = document.getElementById("stationsTableBody");
const stationSearch = document.getElementById("stationSearch");
const stationForm = document.getElementById("stationForm");
const stationId = document.getElementById("stationId");
const stationName = document.getElementById("stationName");
const stationDescription = document.getElementById("stationDescription");
const stationCells = document.getElementById("stationCells");
const stationActive = document.getElementById("stationActive");
const stationFormTitle = document.getElementById("stationFormTitle");
const stationFormReset = document.getElementById("stationFormReset");

let cachedStations = [];

function renderStations(rows) {
  if (!stationsTableBody) return;

  stationsTableBody.innerHTML = "";

  rows.forEach(row => {
    const s = row.data;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.name || ""}</td>
      <td>${s.description || ""}</td>
      <td>${Array.isArray(s.cells) ? s.cells.join(", ") : ""}</td>
      <td>${s.active ? "Yes" : "No"}</td>
      <td>
        <button class="btn small secondary edit-station-btn" data-id="${row.id}">Edit</button>
        <button class="btn small copy-station-link-btn" data-url="${buildCallUrl(s.name || "", s.cells || [])}">Copy Link</button>
        <button class="btn small secondary open-station-link-btn" data-url="${buildCallUrl(s.name || "", s.cells || [])}">Open</button>
      </td>
    `;
    stationsTableBody.appendChild(tr);
  });

  wireStationTableButtons();
}

function wireStationTableButtons() {
  document.querySelectorAll(".edit-station-btn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const found = cachedStations.find(x => x.id === id);
      if (!found) return;

      const s = found.data;
      stationId.value = found.id;
      stationName.value = s.name || "";
      stationDescription.value = s.description || "";
      stationCells.value = Array.isArray(s.cells) ? s.cells.join(",") : "";
      stationActive.checked = !!s.active;
      if (stationFormTitle) stationFormTitle.textContent = "Edit Station";
      activateTab("stations");
    };
  });

  document.querySelectorAll(".copy-station-link-btn").forEach(btn => {
    btn.onclick = async () => {
      const url = btn.dataset.url;
      if (!url) return;
      await copyText(url);
    };
  });

  document.querySelectorAll(".open-station-link-btn").forEach(btn => {
    btn.onclick = () => {
      const url = btn.dataset.url;
      if (!url) return;
      window.open(url, "_blank");
    };
  });
}

stationsRef.orderBy("name").onSnapshot(
  snapshot => {
    cachedStations = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    renderStations(cachedStations);
    populateCallButtonStations(cachedStations);
  },
  err => {
    console.error(err);
    setConn(false);
  }
);

stationForm?.addEventListener("submit", async e => {
  e.preventDefault();

  const payload = {
    companyId: COMPANY_ID,
    name: stationName.value.trim(),
    description: stationDescription.value.trim(),
    cells: stationCells.value
      .split(",")
      .map(x => x.trim())
      .filter(Boolean),
    active: !!stationActive.checked,
    updatedAt: Date.now()
  };

  if (!payload.name) {
    alert("Station name is required.");
    return;
  }

  try {
    if (stationId.value) {
      await stationsRef.doc(stationId.value).update(payload);
    } else {
      payload.createdAt = Date.now();
      await stationsRef.add(payload);
    }

    resetStationForm();
  } catch (err) {
    console.error(err);
    alert("Could not save station.");
  }
});

function resetStationForm() {
  if (stationForm) stationForm.reset();
  if (stationId) stationId.value = "";
  if (stationFormTitle) stationFormTitle.textContent = "Add Station";
  if (stationActive) stationActive.checked = true;
}

stationFormReset?.addEventListener("click", resetStationForm);

stationSearch?.addEventListener("input", () => {
  const q = stationSearch.value.trim().toLowerCase();
  if (!q) {
    renderStations(cachedStations);
    return;
  }

  const filtered = cachedStations.filter(x => {
    const s = x.data;
    return [
      s.name || "",
      s.description || "",
      Array.isArray(s.cells) ? s.cells.join(" ") : ""
    ]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  renderStations(filtered);
});

// ---------- CALL BUTTONS TAB ----------
const cbStation = document.getElementById("cbStation");
const cbCells = document.getElementById("cbCells");
const cbDepartment = document.getElementById("cbDepartment");
const cbOutput = document.getElementById("cbOutput");
const btnGenerateDynamic = document.getElementById("btnGenerateDynamic");
const btnCopyOutput = document.getElementById("btnCopyOutput");

const cbAutoStation = document.getElementById("cbAutoStation");
const cbAutoOutput = document.getElementById("cbAutoOutput");
const btnGenerateAllDynamic = document.getElementById("btnGenerateAllDynamic");

function populateCallButtonStations(rows) {
  if (cbStation) cbStation.innerHTML = "";
  if (cbAutoStation) cbAutoStation.innerHTML = "";
  if (cbDepartment) cbDepartment.innerHTML = `<option value="">None</option>`;

  rows.forEach(row => {
    const s = row.data;

    const opt1 = document.createElement("option");
    opt1.value = row.id;
    opt1.textContent = s.name || row.id;
    cbStation?.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = row.id;
    opt2.textContent = s.name || row.id;
    cbAutoStation?.appendChild(opt2);
  });

  populateCellsForSelectedStation();
  populateCellsForAutoStation();
}

function populateCellsForSelectedStation() {
  if (!cbStation || !cbCells) return;

  const id = cbStation.value;
  const found = cachedStations.find(x => x.id === id);

  cbCells.innerHTML = "";

  if (!found) return;

  (found.data.cells || []).forEach(cell => {
    const opt = document.createElement("option");
    opt.value = cell;
    opt.textContent = cell;
    cbCells.appendChild(opt);
  });
}

function populateCellsForAutoStation() {
  // reserved for future use
}

cbStation?.addEventListener("change", populateCellsForSelectedStation);

btnGenerateDynamic?.addEventListener("click", () => {
  const stationIdValue = cbStation?.value;
  const found = cachedStations.find(x => x.id === stationIdValue);
  if (!found) {
    alert("Select a station.");
    return;
  }

  const selectedCells = Array.from(cbCells.selectedOptions).map(o => o.value);
  const url = buildCallUrl(found.data.name || "", selectedCells);

  if (cbOutput) cbOutput.value = url;
});

btnCopyOutput?.addEventListener("click", async () => {
  if (!cbOutput?.value) return;
  await copyText(cbOutput.value);
});

btnGenerateAllDynamic?.addEventListener("click", () => {
  const stationIdValue = cbAutoStation?.value;
  const found = cachedStations.find(x => x.id === stationIdValue);
  if (!found) {
    alert("Select a station.");
    return;
  }

  const cells = found.data.cells || [];
  const lines = cells.map(cell => buildCallUrl(found.data.name || "", [cell]));
  if (cbAutoOutput) cbAutoOutput.value = lines.join("\n");
});

// ---------- PLACEHOLDER COUNTS ON DASHBOARD ----------
const statTotalCalls = document.getElementById("statTotalCalls");
const statActiveCalls = document.getElementById("statActiveCalls");
const statClosedCalls = document.getElementById("statClosedCalls");
const dashQuickList = document.getElementById("dashQuickList");

if (statTotalCalls) statTotalCalls.textContent = "0";
if (statActiveCalls) statActiveCalls.textContent = "0";
if (statClosedCalls) statClosedCalls.textContent = "0";
if (dashQuickList) {
  dashQuickList.innerHTML = `
    <li>Stations loaded from company structure.</li>
    <li>Call buttons now generate live URLs.</li>
  `;
}
