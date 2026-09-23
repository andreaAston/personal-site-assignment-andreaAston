import { fetchGitHubRepositories } from "./github-api.js";

const repositoryGrid = document.querySelector("#github-repositories-grid");

function renderRepository(repository) {
  const card = document.createElement("article");
  card.className = "project-card";

  const image = document.createElement("img");
  image.className = "project-card__image";
  image.src = "assets/images/Background.jpg";
  image.alt = "";
  image.loading = "lazy";

  const title = document.createElement("h3");
  title.className = "project-card__title";
  title.textContent = repository.name;

  const description = document.createElement("p");
  description.className = "project-card__desc";
  description.textContent = repository.description || "No description provided.";

  const details = document.createElement("p");
  details.className = "project-card__desc";
  details.textContent = [
    repository.language,
    `${repository.stargazers_count} stars`,
    `${repository.forks_count} forks`,
  ]
    .filter(Boolean)
    .join(" | ");

  const link = document.createElement("a");
  link.className = "btn btn--card";
  link.href = repository.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View Repository";

  card.append(image, title, description, details, link);
  return card;
}

async function loadRepositories() {
  try {
    const repositories = await fetchGitHubRepositories();
    repositoryGrid.replaceChildren();

    if (!repositories.length) {
      const emptyState = document.createElement("p");
      emptyState.className = "projects__status";
      emptyState.textContent = "No public repositories found yet.";
      repositoryGrid.append(emptyState);
      return;
    }

    repositories.forEach((repository) => {
      repositoryGrid.append(renderRepository(repository));
    });
  } catch (error) {
    console.error("Unable to load GitHub repositories.", error);
    repositoryGrid.replaceChildren();
    const errorState = document.createElement("p");
    errorState.className = "projects__status";
    errorState.textContent = "Repositories are temporarily unavailable. Please visit GitHub directly.";
    repositoryGrid.append(errorState);
  }
}

loadRepositories();