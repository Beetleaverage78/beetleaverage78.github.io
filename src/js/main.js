$(document).ready(function () {
  new fullpage('#fullPage', {
    autoScrolling: true,
    anchors: ['section1', 'section2', 'section3'],
    setMouseWheelScrolling: false,
  });

  $(".slider").slick({
    arrows: false,
  });
});


// Google SpreadSheets Integration for Projects
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQnuAP42qT4s1NzBa6CzxUe_usSaW6S5hUONJPZwfNBM2pCWCXmFhN6a9R8n0YuL4SMl3kPFiWv_U2Z/pub?gid=0&single=true&output=csv';


function init() {
  Papa.parse(publicSpreadsheetUrl, {
    download: true,
    header: true,
    complete: function(results) {
      showProject(results.data);
    }
  });
};

function showProject(data, tabletop) {
  console.log(data);

  var projects = document.querySelector('.js-project-section');
  var gitSvg = "";

  data.forEach(async function (e) {
    // Preliminary Check
    if (e.resumeLink != "") {
      var resumeBtn = document.querySelector('.resume-btn');
      resumeBtn.style.cursor = "pointer";
      resumeBtn.setAttribute('href', e.resumeLink);
      resumeBtn.classList.add('resume-btn-enabled');
      resumeBtn.innerHTML = "resume"
    }
    // Recreate Cards
    var columnDiv = document.createElement('div');
    columnDiv.classList.add('column', 'is-4');

    var projCardDiv = document.createElement('div');
    projCardDiv.classList.add('proj-card');

    var projCardHeaderDiv = document.createElement('div');
    projCardHeaderDiv.classList.add('proj-card-header');

    var stackIcon = document.createElement('img');
    stackIcon.setAttribute('src', "assets/stack.png");
    stackIcon.setAttribute('alt', "project");
    projCardHeaderDiv.appendChild(stackIcon);

    var gitAnch = document.createElement('a');
    var gitIcon = document.createElement('i');

    gitAnch.setAttribute('target', "_blank");
    gitAnch.setAttribute('href', e.githubLink);

    gitIcon.classList.add('fab', 'fa-github');
    gitAnch.appendChild(gitIcon);

    var Ul = document.createElement('ul');

    var gitLink = document.createElement('li');
    gitLink.classList.add('proj-card-git');
    gitLink.appendChild(gitAnch);

    Ul.appendChild(gitLink);

    var langArray = e.projLang.split(',');
    langArray.forEach(async function (lang) {
      var langLi = document.createElement('li');
      langLi.classList.add('lang');

      langLi.innerHTML = lang;
      Ul.appendChild(langLi);
    });


    projCardHeaderDiv.appendChild(Ul);
    projCardDiv.appendChild(projCardHeaderDiv);
    columnDiv.appendChild(projCardDiv);

    var title = document.createElement('h1');
    var description = document.createElement('p');

    title.innerHTML = e.projName;
    description.innerHTML = e.projDesc;

    projCardDiv.appendChild(title);
    projCardDiv.appendChild(description);

    columnDiv.appendChild(projCardDiv);
    projects.appendChild(columnDiv);
  });
};

window.addEventListener('DOMContentLoaded', init);


