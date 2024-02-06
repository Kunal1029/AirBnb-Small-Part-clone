const dropdown = document.querySelector(".dropdown-menu");
const togglebtn = document.querySelector(".toggle-button");
const body = document.querySelector("body")

console.log(dropdown)

togglebtn.addEventListener("click", () => {
    dropdown.classList.toggle("top-16")
    console.log(dropdown)
});

