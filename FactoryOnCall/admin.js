// ---- CONNECTION STATUS ----
const connDot = document.getElementById("connDot");
const connLabel = document.getElementById("connLabel");
const COMPANY_ID = "demo-company"; // later dynamic

function setConn(ok) {
    connDot.style.background = ok ? "#22c55e" : "#ef4444";
    connLabel.textContent = ok ? "Online" : "Offline";
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
            stationList.innerHTML = "";

            snap.forEach(doc => {
                const s = doc.data();

                const div = document.createElement("div");
                div.className = "station-row";

                div.innerHTML = `
                    <div class="station-name">${s.name || ""}</div>
                    <div class="station-cell">${s.cell || ""}</div>
                    <div class="station-roles">${Array.isArray(s.roles) ? s.roles.join(", ") : ""}</div>
                `;

                stationList.appendChild(div);
            });
        },
        err => {
            console.error("Error loading stations:", err);
            stationList.innerHTML = `<div class="station-row">Error loading stations.</div>`;
        }
    );
}

loadStations();
