const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")

const postPage = document.querySelector("#post")
const postContainer = document.querySelector("#post-container")
const commmentsContainer = document.querySelector("#comments-container")

// get is from url
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get("id")


//pegar todos os posts
async function getAllPosts() {
    const response = await fetch(url)

    const data = await response.json();

    loadingElement.classList.add("hide");

    data.map((post) => {
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = post.title;
        body.innerText = post.body
        link.innerText = "ler"
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)

        postsContainer.appendChild(div);
    });
}

//get individual post
async function getPost(id) {

    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`),
    ])

    const dataPost = await responsePost.json();
    const dataComments = await responseComments.json();

    loadingElement.classList.add("hide")
    postPage.classList.remove("hide")
}


if (!postId) {
    getAllPosts();
} else {
    getPost(postId)
}