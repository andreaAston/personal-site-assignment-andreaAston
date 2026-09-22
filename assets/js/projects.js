import { fetchProjects } from "./supabase-client.js";

const projectGrid = document.querySelector("#project-grid");
const showAllButton = document.querySelector("#show-all-projects");
const projectsSection = document.querySelector("#projects");

function formatRichText(value) {
  const source = document.createElement("template");
  source.innerHTML = value || "";

  const allowedTags = new Set(["P", "BR", "STRONG", "B", "EM", "I", "UL", "OL", "LI", "A"]);

  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent || "");
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    if (!allowedTags.has(node.tagName)) {
      const fragment = document.createDocumentFragment();
      node.childNodes.forEach((child) => {
        const cleanedChild = cleanNode(child);
        if (cleanedChild) fragment.append(cleanedChild);
      });
      return fragment;
    }

    const cleaned = document.createElement(node.tagName.toLowerCase());

    if (node.tagName === "A") {
      const href = node.getAttribute("href") || "";
      if (/^(https?:|mailto:)/i.test(href)) {
        cleaned.href = href;
        cleaned.target = "_blank";
        cleaned.rel = "noopener noreferrer";
      }
    }

    node.childNodes.forEach((child) => {
      const cleanedChild = cleanNode(child);
      if (cleanedChild) cleaned.append(cleanedChild);
    });
    return cleaned;
  }

  const result = document.createDocumentFragment();
  source.content.childNodes.forEach((child) => {
    const cleanedChild = cleanNode(child);
    if (cleanedChild) result.append(cleanedChild);
  });
  return result;
}

function renderProject(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const image = document.createElement("img");
  image.className = "project-card__image";
  image.src = project.cover_image || project.cover_image_url || project.image_url || "assets/images/Background.jpg";
  image.alt = `${project.title} cover image`;
  image.loading = "lazy";

  const title = document.createElement("h3");
  title.className = "project-card__title";
  title.textContent = project.title;

  const description = document.createElement("div");
  description.className = "project-card__desc";
  description.append(
    formatRichText(project.short_description || project.excerpt || project.description || "")
  );

  const link = document.createElement("a");
  link.className = "btn btn--card";
  link.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
  link.textContent = "View Project";

  card.append(image, title, description, link);
  return card;
}

function renderProjects(projects) {
  projectGrid.replaceChildren();

  if (!projects.length) {
    if (showAllButton) showAllButton.hidden = true;
    const emptyState = document.createElement("p");
    emptyState.className = "projects__status";
    emptyState.textContent = "No published projects yet. Check back soon.";
    projectGrid.append(emptyState);
    return;
  }

  projects.forEach((project, index) => {
    const card = renderProject(project);
    if (index >= 3) {
      card.classList.add("project-card--hidden");
    }
    projectGrid.append(card);
  });

  if (showAllButton) {
    showAllButton.hidden = projects.length <= 3;
  }
}

async function loadProjects() {
  try {
    renderProjects(await fetchProjects());
  } catch (error) {
    console.error("Unable to load projects.", error);
    if (showAllButton) showAllButton.hidden = true;
    projectGrid.replaceChildren();
    const errorState = document.createElement("p");
    errorState.className = "projects__status";
    errorState.textContent = "Projects are temporarily unavailable. Please check back soon.";
    projectGrid.append(errorState);
  }
}

showAllButton?.addEventListener("click", () => {
  projectGrid.querySelectorAll(".project-card--hidden").forEach((card) => {
    card.classList.remove("project-card--hidden");
  });
  showAllButton.hidden = true;
  projectsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
});

loadProjects();