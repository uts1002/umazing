var bagmenu = document.getElementById("bagmenu");
var dropdownMenu = document.getElementById("dropdownMenu");

bagmenu.addEventListener("click", function () {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "none" ? "flex" : "none";
});

// 다른 곳을 클릭하면 드롭다운 메뉴 숨김
document.addEventListener("click", function (event) {
  if (!bagmenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.style.display = "none";
  }
});
