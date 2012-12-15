$(document).ready(function() {
	var imageArray, firstSelectedImage, startButtonClick = false, imageClick = 0, imageCount = 30, turnCount = 0, matchedCount = 0, dialogShow1 = false, dialogShow2 = false,
	    turnCountString, previousTurnCountString, matchedCountStirng, previousMatchedCountString, firstSelectedImageID, selectedImageID, i;
	$(".game_image").bind("click", function() {
		if (startButtonClick) {
			var selectedImage, tempImage;
			// make sure it's not the same image
			if (imageClick === 0 || $(this).attr("id") !== firstSelectedImage.attr("id")) {
				imageClick += 1;
				selectedImage = $(this);
				
				$(this).css({
					'-webkit-transform' : 'rotateY(180deg)',
					'-moz-transform' : 'rotateY(180deg)'
				});

				setTimeout(function() {
					selectedImage.attr("src", imageArray[selectedImage.attr("id")]);
				}, 300);
				if (imageClick == 1) {
					firstSelectedImage = selectedImage;
				} else if (imageClick == 2) {
					// two selected elements are not identical
					if (imageArray[selectedImage.attr("id")] !== firstSelectedImage.attr("src")) {
						setTimeout(function() {
							selectedImage.css({
								'-webkit-transform' : 'rotateY(360deg)',
								'-moz-transform' : 'rotateY(360deg)'
							});
							firstSelectedImage.css({
								'-webkit-transform' : 'rotateY(360deg)',
								'-moz-transform' : 'rotateY(360deg)'
							})
						}, 1200);
						setTimeout(function() {
							firstSelectedImage.attr("src", "images/back.png");
							selectedImage.attr("src", "images/back.png");
						}, 1500);
						turnCount += 1;
						turnCountString = "".concat(turnCount);
						previousTurnCountString = "".concat(turnCount - 1);
						$('#turn_counter').addClass('counter-analog').counter({
				            initial: previousTurnCountString,
				            direction: 'up',
				            interval: '1',
				            format: '999',
				            stop: turnCountString
				        });
					// two selected elements are identical
					} else {
						setTimeout(function() {
							firstSelectedImageID = firstSelectedImage.attr("id");
							selectedImageID = selectedImage.attr("id");
							$('#'.concat(firstSelectedImageID)).hide();
							$('#'.concat(selectedImageID)).hide();
							imageCount = imageCount - 2;
							if (imageCount === 0) {
								alert("You Win the Game!");
							} 
						}, 1200);
						matchedCount += 1;
						matchedCountString = "".concat(matchedCount);
						previousMatchedCountString = "".concat(matchedCount - 1);
						$('#matched_counter').addClass('counter-analog').counter({
				            initial: previousMatchedCountString,
				            direction: 'up',
				            interval: '1',
				            format: '999',
				            stop: matchedCountString
				        });
					}
					imageClick = 0;
				}
			} else {
				// do nothing
			}
		} else {
			if (!dialogShow1) {
				$("#dialog-message1").append('<p>To Play Game, Please Click Start Button !</p>');
			}
			$("#dialog-message1").dialog({
				modal: true,
				buttons: {
					OK: function() {
						$(this).dialog("close");
					}
				}
			});
			dialogShow = true;
		}
		
	});
	
	$("#start_button").bind("click", function() {
		if (!startButtonClick) {
			var number, i, j, result;
			startButtonClick = true;
			imageArray = new Array();
			for (i = 0; i < 15; i += 1) {
				imageArray.push("images/".concat(i).concat(".png"));
			}
			for (i = 0; i < 15; i += 1) {
				imageArray.push("images/".concat(i).concat(".png"));
			}
			imageArray = shuffleArray(imageArray);

			$('#timer').attr("data-direction", "up");
			$('#timer').counter({});
		} else {
			if (!dialogShow2) {
				$("#dialog-message2").append('<p>To Restart the Game, Please Refresh the Webpage!</p>')
			}
			$("#dialog-message2").dialog({
				modal: true,
				buttons: {
					OK: function() {
						$(this).dialog("close");
					}
				}
			});
			dialogShow2 = true;
		}
	});
});

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}