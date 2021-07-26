generateProjectCards();

function generateProjectCards(e) {
    let cardList = [];
    let card;
    let img;
    let overlay;
    let icon;
  
    projects.forEach((project) => {
      // create card container
      card = document.createElement("div");
      card.className = "project-card";
      card.id = project.name;
  
      img = document.createElement("img");
      img.src = project.screenshotpath;
  
      overlay = document.createElement("div");
      overlay.className = "overlay";
  
      icon = document.createElement("img");
      icon.className = "zoom-icon";
      icon.src = "./assets/pngaaa.com-3712648.png";
  
      card.appendChild(img);
      card.appendChild(overlay);
      overlay.appendChild(icon);
  
      cardList.push(card);
    });
  
    cardList.forEach((card) => {
      $("#project-grid").append(card);
    });
  }
  
$(function () {
  $(".project-card").click(function () {
    generateModal(this);
  });

  $(".close").click(function () {
    closeModal();
  });

  $("#about-link").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#about").offset().top,
      },
      0
    );
  });

  $("#projects-link").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#projects").offset().top,
      },
      0
    );
  });

  $("#contact-link").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#contact").offset().top,
      },
      0
    );
  });
});

$(window).click(function (e) {
  if (e.target == $("#project-modal")) {
    closeModal();
  }
});

// Populate modal with data relevant to the project being passed in
function generateModal(e) {
  // get relevant divs to change data
  console.log(e);

  let project = projects.filter((p) => p.name === e.id)[0]; // comes back as array

  console.log(project);
  $("#modal-title").html(`${project.name} - ${project.type}`);
  $("#project-description").html(project.description);
  $("#project-demo").attr("src", `${project.screenshotpath}`);
  $(".github-link").attr("href", `${project.link}`)

  project.tags.forEach((tag) => {
    $("#tag-list").append(`<li>
                                <img src="./assets/tick.png" alt="check"/>
                                ${tag}
                            </li>`);
  });

  $(".modal").css("display", "flex");
}

function closeModal() {
  $("#tag-list").empty();
  $(".modal").css("display", "none");
}


