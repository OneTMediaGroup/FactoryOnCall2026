// ---- CONNECTION STATUS ----
const connDot = document.getElementById("connDot");
const connLabel = document.getElementById("connLabel");
const COMPANY_ID = "demo-company"; // later dynamic
const COMPANY_NAME = "Demo Company";

function setConn(ok) {
    if (connDot) connDot.style.background = ok ? "#22c55e" : "#ef4444";
    if (connLabel) connLabel.textContent = ok ? "Online" : "Offline";
}

setTimeout(() => setConn(true), 500);

// ---- FIRESTORE PATHS ----
const stationsRef = db
    .collection("companies")
    .doc(COMPANY_ID)
    .collection("stations");

// ---- DOM ELEMENTS ----
const nameInput = document.getElementById("stationName");
const cellInput = document.getElementById("stationCell");
const rolesInput = document.getElementById("stationRoles");
const createBtn = document.getElementById("createStationBtn");
const stationList = document.getElementById("stationList");

// ---- HELPERS ----
function buildCallUrl(stationName, cellValue) {
    const base = `${window.location.origin}${window.location.pathname.replace(/[^/]+$/, "call.html")}`;
    const params = new URLSearchParams({
        station: stationName || "",
        cells: cellValue || "",
        companyName: COMPANY_NAME
    });
    return `${base}?${params.toString()}`;
}

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert("Link copied.");
    } catch (err) {
        console.error(err);
        alert("Could not copy link.");
    }
}

// ---- CREATE STATION ----
createBtn.onclick = async () => {
    const name = nameInput.value.trim();
    const cell = cellInput.value.trim();
    const roles = rolesInput.value
        .trim()
        .split(",")
        .map(r => r.trim())
        .filter(r => r.length > 0);

    if (!name || !cell || roles.length === 0) {
        alert("Please fill all fields.");
        return;
    }

    try {
        await stationsRef.add({
            companyId: COMPANY_ID,
            name,
            cell,
            roles,
            active: true,
            createdAt: Date.now()
        });

        nameInput.value = "";
        cellInput.value = "";
        rolesInput.value = "";

        alert("Station created.");
    } catch (e) {
        console.error(e);
        alert("Error creating station.");
    }
};

// ---- LOAD STATIONS ----
function loadStations() {
    stationsRef.orderBy("name").onSnapshot(
        snap => {
            if (!stationList) return;

            stationList.innerHTML = "";

            snap.forEach(doc => {
                const s = doc.data();
                const stationName = s.name || "";
                const stationCell = s.cell || "";
                const stationRoles = Array.isArray(s.roles) ? s.roles : [];
                const callUrl = buildCallUrl(stationName, stationCell);

                const div = document.createElement("div");
                div.className = "station-row";

                div.innerHTML = `
                    <div class="station-name">${stationName}</div>
                    <div class="station-cell">${stationCell}</div>
                    <div class="station-roles">${stationRoles.join(", ")}</div>
                    <div class="station-url">
                        <input type="text" value="${callUrl}" readonly class="station-link-input" />
                    </div>
                    <div class="station-actions">
                        <button class="copy-link-btn" data-url="${callUrl}">Copy Link</button>
                        <button class="open-link-btn" data-url="${callUrl}">Open</button>
                    </div>
                `;

                stationList.appendChild(div);
            });

            wireStationButtons();
        },
        err => {
            console.error("Error loading stations:", err);
            if (stationList) {
                stationList.innerHTML = `<div class="station-row">Error loading stations.</div>`;
            }
        }
    );
}

function wireStationButtons() {
    document.querySelectorAll(".copy-link-btn").forEach(btn => {
        btn.onclick = async () => {
            const url = btn.dataset.url;
            if (!url) return;
            await copyText(url);
        };
    });

    document.querySelectorAll(".open-link-btn").forEach(btn => {
        btn.onclick = () => {
            const url = btn.dataset.url;
            if (!url) return;
            window.open(url, "_blank");
        };
    });
}

loadStations();
