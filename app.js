const STORAGE_KEY = "internship-tracker-board";

const STATUS_CONFIG = {
  "need to apply": {
    label: "Need to apply",
    color: "#f5a65b",
  },
  applied: {
    label: "Applied",
    color: "#4d9a8b",
  },
  interviewing: {
    label: "Interviewing",
    color: "#4f7cf2",
  },
  rejected: {
    label: "Rejected",
    color: "#cf5f5f",
  },
};

const SAMPLE_INTERNSHIPS = [
  {
    id: crypto.randomUUID(),
    company: "OpenAI",
    role: "Software Engineering Intern",
    location: "San Francisco, CA",
    website: "openai.com",
    status: "interviewing",
    notes: "Focus on systems design prep and recent API platform work.",
  },
  {
    id: crypto.randomUUID(),
    company: "Figma",
    role: "Product Design Intern",
    location: "New York, NY",
    website: "figma.com",
    status: "need to apply",
    notes: "Polish portfolio case study before submitting.",
  },
  {
    id: crypto.randomUUID(),
    company: "Stripe",
    role: "Data Science Intern",
    location: "Remote",
    website: "stripe.com",
    status: "applied",
    notes: "Submitted with referral on March 8.",
  },
];

const form = document.getElementById("internshipForm");
const internshipList = document.getElementById("internshipList");
const cardTemplate = document.getElementById("internshipCardTemplate");
const statusStrip = document.getElementById("statusStrip");
const heroStats = document.getElementById("heroStats");
const seedButton = document.getElementById("seedButton");

let internships = loadInternships();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const company = formData.get("company").trim();
  const role = formData.get("role").trim();

  if (!company || !role) {
    return;
  }

  const internship = {
    id: crypto.randomUUID(),
    company,
    role,
    location: formData.get("location").trim(),
    website: normalizeWebsite(formData.get("website").trim(), company),
    status: formData.get("status"),
    notes: formData.get("notes").trim(),
  };

  internships = [internship, ...internships];
  persistInternships();
  render();
  form.reset();
  document.getElementById("status").value = "need to apply";
});

seedButton.addEventListener("click", () => {
  if (internships.length > 0) {
    return;
  }

  internships = SAMPLE_INTERNSHIPS.map((item) => ({ ...item, id: crypto.randomUUID() }));
  persistInternships();
  render();
});

function loadInternships() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistInternships() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(internships));
}

function render() {
  renderStats();
  renderStatusStrip();
  renderCards();
}

function renderStats() {
  const total = internships.length;
  const active = internships.filter((item) => item.status !== "rejected").length;
  const interviewing = internships.filter((item) => item.status === "interviewing").length;

  heroStats.innerHTML = `
    <div class="stat-card">
      <strong>${total}</strong>
      <span>Total opportunities tracked</span>
    </div>
    <div class="stat-card">
      <strong>${active}</strong>
      <span>Still in play</span>
    </div>
    <div class="stat-card">
      <strong>${interviewing}</strong>
      <span>Currently interviewing</span>
    </div>
  `;
}

function renderStatusStrip() {
  statusStrip.innerHTML = Object.entries(STATUS_CONFIG)
    .map(([status, config]) => {
      const count = internships.filter((item) => item.status === status).length;
      return `
        <section class="status-chip ${slugify(status)}">
          <span>${config.label}</span>
          <strong>${count}</strong>
        </section>
      `;
    })
    .join("");
}

function renderCards() {
  internshipList.innerHTML = "";

  if (internships.length === 0) {
    internshipList.innerHTML = `
      <div class="empty-state">
        <p>No internships added yet.</p>
        <p>Add one from the form, or load the sample board to see the layout.</p>
      </div>
    `;
    return;
  }

  internships.forEach((internship) => {
    const node = cardTemplate.content.firstElementChild.cloneNode(true);
    const accent = node.querySelector(".card-accent");
    const logo = node.querySelector(".company-logo");
    const fallback = node.querySelector(".logo-fallback");
    const companyName = node.querySelector(".company-name");
    const roleName = node.querySelector(".role-name");
    const location = node.querySelector(".location-pill");
    const website = node.querySelector(".website-pill");
    const notes = node.querySelector(".notes-copy");
    const select = node.querySelector(".status-select");
    const deleteButton = node.querySelector(".delete-button");

    const statusClass = slugify(internship.status);
    const fallbackText = internship.company
      .split(" ")
      .slice(0, 2)
      .map((segment) => segment[0])
      .join("")
      .toUpperCase();

    node.classList.add(statusClass);
    accent.style.background = STATUS_CONFIG[internship.status].color;
    companyName.textContent = internship.company;
    roleName.textContent = internship.role;
    location.textContent = internship.location || "Location not added";
    website.textContent = internship.website || "Domain auto-guessed";
    notes.textContent = internship.notes || "No notes yet. Add deadline, contact details, or interview prep.";
    select.value = internship.status;
    fallback.textContent = fallbackText || "?";
    fallback.style.background = STATUS_CONFIG[internship.status].color;

    const logoSources = buildLogoSources(internship.website, internship.company);
    logo.alt = `${internship.company} logo`;
    logo.src = logoSources[0];
    logo.dataset.fallbackIndex = "0";
    logo.addEventListener("error", () => {
      const nextIndex = Number(logo.dataset.fallbackIndex) + 1;
      if (nextIndex < logoSources.length) {
        logo.dataset.fallbackIndex = String(nextIndex);
        logo.src = logoSources[nextIndex];
        return;
      }

      logo.hidden = true;
    });
    logo.addEventListener("load", () => {
      logo.hidden = false;
    });

    select.addEventListener("change", (event) => {
      internship.status = event.target.value;
      persistInternships();
      render();
    });

    deleteButton.addEventListener("click", () => {
      internships = internships.filter((item) => item.id !== internship.id);
      persistInternships();
      render();
    });

    internshipList.appendChild(node);
  });
}

function normalizeWebsite(rawWebsite, company) {
  if (rawWebsite) {
    return rawWebsite
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .replace(/\/.*$/, "")
      .trim()
      .toLowerCase();
  }

  const simplifiedCompany = company
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|corp|corporation|company|co)\b/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();

  return simplifiedCompany ? `${simplifiedCompany}.com` : "";
}

function buildLogoSources(website, company) {
  const domain = website || normalizeWebsite("", company);
  return [
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?sz=128&domain=${domain}`,
  ];
}

function slugify(value) {
  return value.replace(/\s+/g, "-");
}

render();
