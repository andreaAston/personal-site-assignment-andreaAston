import { fetchSkillsGrouped } from "./supabase-client.js";

const skillsGrid = document.querySelector("#skills-grid");

function createSkillBar(skill) {
  const value = Math.min(100, Math.max(0, Number(skill.proficiency) || 0));
  const bar = document.createElement("div");
  bar.className = "skill-bar";

  const name = document.createElement("span");
  name.className = "skill-bar__name";
  name.textContent = skill.skill_name || "Unnamed skill";

  const track = document.createElement("div");
  track.className = "skill-bar__track";
  track.setAttribute("role", "progressbar");
  track.setAttribute("aria-valuenow", String(value));
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", "100");
  track.setAttribute("aria-label", `${name.textContent} proficiency`);

  const fill = document.createElement("div");
  fill.className = "skill-bar__fill";
  fill.style.width = `${value}%`;
  fill.textContent = `${value}%`;

  track.append(fill);
  bar.append(name, track);
  return bar;
}

function createCategoryCard(category, skills) {
  const card = document.createElement("article");
  card.className = "project-card skill-category";

  const title = document.createElement("h3");
  title.className = "project-card__title";
  title.textContent = category.name || "Unnamed category";
  card.append(title);

  skills.forEach((skill) => card.append(createSkillBar(skill)));
  return card;
}

function renderSkills({ categories, skills }) {
  skillsGrid.replaceChildren();

  const categorySkills = categories.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category_id === category.id),
  }));
  const uncategorized = skills.filter(
    (skill) => !categories.some((category) => skill.category_id === category.id)
  );

  categorySkills
    .filter(({ skills: categoryItems }) => categoryItems.length)
    .forEach(({ category, skills: categoryItems }) => {
      skillsGrid.append(createCategoryCard(category, categoryItems));
    });

  if (uncategorized.length) {
    skillsGrid.append(createCategoryCard({ name: "Other Skills" }, uncategorized));
  }

  if (!skillsGrid.children.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "projects__status";
    emptyState.textContent = "No skills have been published yet.";
    skillsGrid.append(emptyState);
  }
}

function renderSkillsError() {
  skillsGrid.replaceChildren();
  const errorState = document.createElement("p");
  errorState.className = "projects__status";
  errorState.textContent = "Skills are temporarily unavailable. Please check back soon.";
  skillsGrid.append(errorState);
}

async function loadSkills() {
  try {
    renderSkills(await fetchSkillsGrouped());
  } catch (error) {
    console.error("Unable to load skills.", error);
    renderSkillsError();
  }
}

loadSkills();