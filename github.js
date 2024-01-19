async function fetchRepositories() {
            const username = document.getElementById('username').value;
            const perPage = document.getElementById('perPage').value;
            const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}`;

            // Display loader while API call is in progress
            document.getElementById('loader').style.display = 'block';

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (response.ok) {
                    displayRepositories(data);
                } else {
                    alert(`Error: ${data.message || 'Failed to fetch repositories'}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // Hide loader when API call is complete
                document.getElementById('loader').style.display = 'none';
            }
        }

        function displayRepositories(repositories) {
            const repositoriesList = document.getElementById('repositoriesList');
            repositoriesList.innerHTML = '';

            repositories.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.classList.add('repository');

                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;

                const topics = repo.topics || [];
                if (topics.length > 0) {
                    const topicsContainer = document.createElement('div');
                    topicsContainer.textContent = 'Topics: ' + topics.join(', ');
                    listItem.appendChild(topicsContainer);
                }

                listItem.appendChild(repoLink);
                repositoriesList.appendChild(listItem);
            });
        }