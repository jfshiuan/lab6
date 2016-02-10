'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();


	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get("/project/"+idNumber, addDetails);



}

function addDetails(result)
{
var projectHTML = '<a href="#">' +
'<img src="' + result['image'] + '" class="detailsImage">' + 
'<p>' + result['title'] + '</p>' +
'<p><small>' + result['date'] + '<br>' + result['summary'] + '</small></p></a>';

var id = result['id'];

$("#project" + id +" .details").html(projectHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	e.preventDefault();



	$.get("/palette", applyPalette);

}

function applyPalette(result)
{
var colors = result['colors']['hex'];

$("body").css("color", colors[1]);
$("body").css("background-color", colors[0]);
}