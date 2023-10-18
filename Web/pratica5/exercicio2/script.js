function showPage(pageId) {
    const pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    document.getElementById(pageId).style.display = "block";
}

function login() {
    // Add your login logic here
    // Redirect to the resume page on successful login
    showPage('resume');
}

function signup() {
    // Add your signup logic here
    // Redirect to the resume page on successful signup
    showPage('resume');
}

showPage('login');
