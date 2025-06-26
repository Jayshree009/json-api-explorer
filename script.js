// so much empty
const postList = document.getElementById('postList');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

async function fetchPosts() {
  loading.textContent = 'Loading...';
  error.textContent = '';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Failed to load posts.');
    const posts = await response.json();

    postList.innerHTML = '';
    posts.slice(0, 10).forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
      postList.appendChild(postDiv);
    });
  } catch (err) {
    error.textContent = err.message;
  } finally {
    loading.textContent = '';
  }
}

fetchPosts();

const form = document.getElementById('postForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 })
    });

    const result = await response.json();
    confirmation.textContent = `Post created with ID: ${result.id}`;
    form.reset();
  } catch (err) {
    error.textContent = 'Error creating post.';
  }
});

