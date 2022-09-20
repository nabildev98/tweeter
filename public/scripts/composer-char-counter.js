$(document).ready(function() {
 console.log("READY");
 
 $('.tweet-text').on('input', function(e) {
  let charCount = $(this).val().length;
  let remainingChars = 140 - charCount;


  let counter = $(this).parent().next('div').children('.counter');
  counter.text(remainingChars);
  
  if (remainingChars < 0) {
    counter.addClass('redText');
  } else {
    counter.removeClass('redText');
  }
  });
  });
