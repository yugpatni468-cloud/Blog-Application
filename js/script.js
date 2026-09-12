// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check passwords
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Save user information
        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("blogUser", JSON.stringify(user));

        alert("Registration successful!");

        window.location.href = "login.html";
    });
}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const savedUser = JSON.parse(
            localStorage.getItem("blogUser")
        );

        if (!savedUser) {
            alert("Please register first!");
            return;
        }

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            localStorage.setItem("isLoggedIn", "true");

            alert("Login successful!");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid email or password!");

        }
    });
}


// ===============================
// CREATE BLOG
// ===============================

const blogForm = document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const title = document.getElementById("blogTitle").value;
        const category = document.getElementById("category").value;
        const content = document.getElementById("blogContent").value;

        const blog = {
            title: title,
            category: category,
            content: content,
            date: new Date().toLocaleDateString()
        };

        // Get existing blogs
        let blogs = JSON.parse(
            localStorage.getItem("blogs")
        ) || [];

        // Add new blog
        blogs.push(blog);

        // Save blogs
        localStorage.setItem(
            "blogs",
            JSON.stringify(blogs)
        );

        alert("Blog published successfully!");

        window.location.href = "dashboard.html";
    });
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
}
// ===============================
// DISPLAY BLOGS ON DASHBOARD
// ===============================

const blogList = document.getElementById("blogList");

if (blogList) {

    const blogs = JSON.parse(
        localStorage.getItem("blogs")
    ) || [];

    if (blogs.length === 0) {

        blogList.innerHTML = `
            <div class="empty-blog">
                <p>No blogs published yet.</p>
                <a href="create-blog.html">
                    Create your first blog
                </a>
            </div>
        `;

    } else {

        blogs.forEach(function (blog, index) {

            const blogRow = document.createElement("div");

            blogRow.className = "table-row";

            blogRow.innerHTML = `
                <span>${blog.title}</span>

                <span>${blog.category}</span>

                <span class="status published">
                    Published
                </span>

                <a href="#" onclick="deleteBlog(${index})">
                    Delete
                </a>
            `;

            blogList.appendChild(blogRow);
        });
    }
}


// ===============================
// DELETE BLOG
// ===============================

function deleteBlog(index) {

    let blogs = JSON.parse(
        localStorage.getItem("blogs")
    ) || [];

    blogs.splice(index, 1);

    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );

    alert("Blog deleted successfully!");

    window.location.reload();
}
// ===============================
// DISPLAY BLOGS ON HOME PAGE
// ===============================

const homeBlogList = document.getElementById("homeBlogList");

if (homeBlogList) {

    const blogs = JSON.parse(
        localStorage.getItem("blogs")
    ) || [];

    if (blogs.length === 0) {

        homeBlogList.innerHTML = `
            <p class="no-blogs">
                No blogs available yet.
            </p>
        `;

    } else {

        blogs.forEach(function (blog) {

            const blogCard = document.createElement("article");

            blogCard.className = "blog-card";

            blogCard.innerHTML = `
                <div class="blog-image">
                    📝
                </div>

                <div class="blog-content">

                    <span class="category">
                        ${blog.category}
                    </span>

                    <h3>
                        ${blog.title}
                    </h3>

                    <p>
                        ${blog.content}
                    </p>

                    <a href="#" class="read-more">
                        Read More →
                    </a>

                </div>
            `;

            homeBlogList.appendChild(blogCard);
        });
    }
}
// PROTECT LOGIN-ONLY PAGES
const protectedPages = ["dashboard.html", "create-blog.html"];

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

if (
    protectedPages.includes(currentPage) &&
    localStorage.getItem("isLoggedIn") !== "true"
) {
    window.location.href = "login.html";
}