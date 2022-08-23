"use strict";


/* Constructor function for the mentor class */
function mentor(firstName, lastName, language, subject, zipcode, photo, map) {
   this.firstName = firstName;
   this.lastName = lastName;
   this.language = language;
   this.subject = subject;
   this.zipcode = zipcode;
   this.photo = photo;
   this.map = map;
}

/* Object literal for search results */
var searchResult = {
   mentors : [],
   sortById : function() {
      this.mentors.sort(function(a,b) {
         if (a.id < b.id) {return -1;}
         else {return 1;}
      });
   }
};


/* Event listener to retrieve and display employee records matching the search condition */
document.getElementById("searchButton").addEventListener("click", function() {
   var tableBody = document.querySelector("table#MentorTable tbody");
   var tableCaption = document.querySelector("table#MentorTable caption");

   tableBody.removeChildren();
   searchResult.mentors = [];

   staff.directory.forEach(function(record) {
     var nameSearch = document.getElementById("nameBox").value;
     var nameSearchType = document.getElementById("nameSearchType").selectedValue();
     switch (nameSearchType) {
       case "contains" : var nameRegExp = new RegExp(nameSearch, 'i');
        break;
       case "beginsWith" : var nameRegExp = new RegExp("^" + nameSearch, 'i');
        break;
       case "exact" : var nameRegExp = new RegExp("^" + nameSearch + "$", 'i');
        break;
     }

     var foundName = nameRegExp.test(record.lastName);

     var subjectSearch = document.getElementById("subjectBox").value;
     var subjectSearchType = document.getElementById("subjectSearchType").selectedValue();
     switch (subjectSearchType) {
       case "contains" : var subjectRegExp = new RegExp(subjectSearch, 'i');
        break;
       case "beginsWith" : var subjectRegExp = new RegExp("^" + subjectSearch, 'i');
        break;
       case "exact" : var subjectRegExp = new RegExp("^"+ subjectSearch + "$", 'i');
        break;
      }
     var foundSubject = subjectRegExp.test(record.subject);

     var languageSearch = document.getElementById("languageBox").selectedValue();
     if (languageSearch === "" || languageSearch === record.language) {
       var foundLanguage = true;
     }

     var zipcodeSearch = document.getElementById("zipcodeBox").value;
     if (zipcodeSearch === "" || zipcodeSearch === record.zipcode) {
       var foundZipcode = true;
     }

     if ((foundName === true) && (foundSubject === true) && (foundLanguage === true) && (foundZipcode === true)) {
       searchResult.mentors.push(new mentor(record.firstName, record.lastName, record.subject, record.language, record.zipcode, record.photo, record.map));
     }
   });

   tableCaption.textContent = searchResult.mentors.length + " records found";

   searchResult.sortById();

   searchResult.mentors.forEach(function(mentor) {
	var tr = document.createElement("tr");
      	tableBody.appendChild(tr);

  var tdPhoto = document.createElement("td");
      	tr.appendChild(tdPhoto);
  var photo = document.createElement("img");
        photo.setAttribute("src", mentor.photo);
        tdPhoto.appendChild(photo);

	var tdName = document.createElement("td");
      	tr.appendChild(tdName);
	var name = document.createTextNode(mentor.firstName + " " + mentor.lastName);
     	  tdName.appendChild(name);

	var tdSub = document.createElement("td");
      	tr.appendChild(tdSub);
	var subject = document.createTextNode(mentor.subject);
      	tdSub.appendChild(subject);

	var tdLang = document.createElement("td");
      	tr.appendChild(tdLang);
	var language = document.createTextNode(mentor.language);
      	tdLang.appendChild(language);

	var tdZip = document.createElement("td");
       tr.appendChild(tdZip);
	var zipcode = document.createTextNode(mentor.zipcode);
       tdZip.appendChild(zipcode);

  var tdMeet = document.createElement("td");
       tr.appendChild(tdMeet);
  var meetLink = document.createElement("a");
       meetLink.setAttribute("href", mentor.map);
       tdMeet.appendChild(meetLink);
	});

});

/* --- Methods added to native objects ---*/

/* Method added to any DOM element that removes all child nodes of element */
HTMLElement.prototype.removeChildren = function() {
   while (this.firstChild) {
      this.removeChild(this.firstChild);
   }
};

/* Method added to the select element to return the value of the selected option */
HTMLSelectElement.prototype.selectedValue = function() {
   var sIndex = this.selectedIndex;
   return this.options[sIndex].value;
};
