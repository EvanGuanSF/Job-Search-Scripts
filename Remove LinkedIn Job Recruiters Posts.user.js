// ==UserScript==
// @name         Remove LinkedIn Job Recruiters' Posts
// @version      1.0
// @author       Evan Guan
// @match        *://www.linkedin.com/*
// ==/UserScript==

var filterList = [
    "The Job Network",
    "MyJobHelper.com",
    "Accenture",
    "Jobspring Partners",
    "Jobs Interviewing Now from HCS",
    "Jobs Interviewing Now from MJH",
    "Revature"
]

var working = false;

function RemoveListings() {
    if(!working) {
        working = true;

        // Grab all job card elements.
        var aTags = document.getElementsByClassName("job-card-search__company-name-link");
        var searchText = "";
        var found = null;

        // Loop through and compare the company name for the postings.
        // Remove the card if the company matches our blacklist.
        for (var i = 0; i < aTags.length; i++) {
            for (var j = 0; j < filterList.length; j++) {
                searchText = filterList[j];
                if (aTags[i].innerText.toString() === searchText) {

                    // Find the nearest li element, which will be the card.
                    found = aTags[i].closest("li");
                    // Remove it from the DOM.
                    if(found) {
                        found.innerHTML = "<div></div>";
                    }
                    found = null;

                    break;
                }
            }
        }

        working = false;
    }
}

window.addEventListener("load", function() {
    setTimeout(RemoveListings, 500);
});

window.addEventListener("click", function() {
    RemoveListings();
});

window.addEventListener("scroll", function() {
    RemoveListings();
});

window.addEventListener("wheel", function() {
    RemoveListings();
});