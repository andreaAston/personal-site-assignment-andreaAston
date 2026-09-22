import DOMPurify from "dompurify";
import {
  fetchProjectBySlug,
  fetchProjectGallery,
  fetchProjects,
  resolveImageUrl,
} from "./supabase-client.js";

const loadingState = document.querySelector("#project-loading");
const errorState = document.querySelector("#project-error");
const content = document.querySelector("#project-content");
const otherProjects = document.querySelector("#other-projects");

function showState(message, state = errorState) {
  loadingState.hidden = true;
  content.hidden = true;
  state.textContent = message;
  state.hidden = false;
}

function renderGallery(images) {
  const section = document.querySelector("#project-gallery-section");
  const gallery = document.querySelector("#project-gallery");
  gallery.replaceChildren();

  if (!images.length) {
    section.hidden = false;
    const empty = document.createElement("p");
    empty.className = "project-gallery__empty";
    empty.textContent = "No additional project images yet.";
    gallery.append(empty);
    return;
  }

  section.hidden = false;
  images.forEach((image) => {
    const figure = document.createElement("figure");
    figure.className = "project-gallery__item";

    const element = document.createElement("img");
    element.src = image.imageUrl;
    element.alt = image.name;
    element.loading = "lazy";
    element.addEventListener("error", () => figure.remove());

    const caption = document.createElement("figcaption");
    caption.textContent = image.name;
    figure.append(element, caption);
    gallery.append(figure);
  });
}

function renderOtherProjects(project, projects) {
  otherProjects.replaceChildren();
  projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3)
    .forEach((item) => {
      const link = document.createElement("a");
      link.className = "other-projects__item";
      link.href = `project.html?slug=${encodeURIComponent(item.slug)}`;

      const image = document.createElement("img");
      image.src = resolveImageUrl(item.cover_image || item.cover_image_url || item.image_url);
      image.alt = `${item.title} cover image`;
      image.loading = "lazy";

      const title = document.createElement("h3");
      title.textContent = item.title;
      link.append(image, title);
      otherProjects.append(link);
    });

  document.querySelector("#other-projects-section").hidden = !otherProjects.children.length;
}

function renderProject(project, gallery) {
  document.querySelector("#project-title").textContent = project.title || "Untitled project";
  document.querySelector("#project-short-description").innerHTML = DOMPurify.sanitize(
    project.short_description || ""
  );
  document.querySelector("#project-date").textContent = project.created_at
    ? new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date(project.created_at))
    : "";

  const cover = document.querySelector("#project-cover");
  const coverUrl = resolveImageUrl(project.cover_image || project.cover_image_url || project.image_url);
  if (coverUrl) {
    cover.src = coverUrl;
    cover.alt = `${project.title} cover image`;
    cover.hidden = false;
    cover.addEventListener("error", () => cover.hidden = true, { once: true });
  }

  document.querySelector("#project-description").innerHTML = DOMPurify.sanitize(
    project.full_description || project.description || project.short_description || ""
  );
  renderGallery(gallery);
  content.hidden = false;
  loadingState.hidden = true;
  errorState.hidden = true;
}

async function loadProjectDetails() {
  const slug = new URLSearchParams(window.location.search).get("slug");
  if (!slug) {
    showState("No project was selected.");
    return;
  }

  try {
    const project = await fetchProjectBySlug(slug);
    if (!project) {
      showState("Project not found.");
      return;
    }

    const [gallery, projects] = await Promise.all([
      fetchProjectGallery(project),
      fetchProjects(),
    ]);
    renderProject(project, gallery);
    renderOtherProjects(project, projects);
  } catch (error) {
    console.error("Unable to load project details.", error);
    showState("Unable to load this project. Please try again later.");
  }
}

loadProjectDetails();