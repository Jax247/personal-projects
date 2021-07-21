$(function () {
  $("#myBtn").click(function () {
    $(".modal").css('display', 'flex')
  });
  $(".close").click(function () {
    $(".modal").css('display', 'none')
  });


  
});

// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
  if (event.target == $(".modal")) {
    $(".modal").css('display', 'none')
  }
};