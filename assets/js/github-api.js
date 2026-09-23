const githubUsername = "andreaAston";

export async function fetchGitHubRepositories(limit = 6) {
	const response = await fetch(
		`https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=${limit}`
	);

	if (!response.ok) {
		throw new Error(`GitHub request failed with status ${response.status}`);
	}

	return response.json();
}
