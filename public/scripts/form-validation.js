$(function () {
  $(".error-message").hide();
  $(".tweet-entry").submit(function (event) {
    event.preventDefault();


    //error for > 140 char
    if ($("#tweet-text").val().length > 140) {
      $(".error-message").html(`
      <i class="fa-solid fa-triangle-exclamation"></i>
      Hum is too long! Please keep it to 140 characters
        <i i class= "fa-solid fa-triangle-exclamation" ></i > `);
      $(".error-message").slideDown();

      //error for 0 char
    } else if ($("#tweet-text").val() === null
      || $("#tweet-text").val() === "") {
      $(".error-message").html(`
      <i class="fa-solid fa-triangle-exclamation"></i>
      Hum cannot be empty
        <i i class= "fa-solid fa-triangle-exclamation" ></i > `);
      $(".error-message").slideDown();
      //valid post
    } else {
      $(".error-message").slideUp();
      $.ajax({
        url: "/tweets",
        data: $(this).serialize(),
        method: "POST"
      }).done(() => {
        loadTweets();
        this.reset();
      });
    }
  });
});


$('.error').slideUp(400).text('');

if (!$(this).children().find('textarea').val()) {
  return $('error').text('Valid tweet must be entered').slideDown();

}
if ($(this).children().find('textarea').val().length > 140) {
  return $('.error').text('Maximum limit exceeded').slideDown();
}
