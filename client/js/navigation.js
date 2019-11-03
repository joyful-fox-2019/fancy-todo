function fetchFile(path, callback){
  var request = new XMLHttpRequest();
  request.onload = function () {
    callback(request.responseText);
  };
  request.open("GET", path);
  request.send(null);
}

function getContent(fragmentId, callback){
  fetchFile( fragmentId + ".html", callback );
}

function navigate(){
  var contentDiv = document.getElementById("content"),
    fragmentId = location.hash.substr(1);
    getContent(fragmentId, function (content) {
    contentDiv.innerHTML = content;
  });
  // setActiveLink(fragmentId);
}

if(!location.hash) {
  if (localStorage.getItem("jwt_token")) {
    location.hash = "#home";
  } else {
    location.hash = "#signin";
  }
}

navigate();
window.addEventListener("hashchange", navigate);

// function setActiveLink(fragmentId){
//   var navbarDiv = document.getElementById("navbar"),
//       links = navbarDiv.children,
//       i, link, pageName;
//   for(i = 0; i < links.length; i++){
//     link = links[i];
//     pageName = link.getAttribute("href").substr(1);
//     if(pageName === fragmentId) {
//       link.setAttribute("class", "active");
//     } else {
//       link.removeAttribute("class");
//     }
//   }
// }