

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();
  const user_id = event.target.getAttribute("data-user")
  console.log(name,description,user_id)
  if (name  && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, user_id, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("NEWBlog",response)
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      console.log("Err")
      console.log('Failed to create project');
      
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
async function getBlog(){


const response = await fetch(`/api/blogRoutes/dashboard`);

if (response.ok) {
  document.location.replace('/profile');
  console.log(response)
} else {
  console.log('No Blogs Created');
}
}
getBlog();