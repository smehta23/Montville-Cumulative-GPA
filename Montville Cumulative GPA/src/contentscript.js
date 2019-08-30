$(document).ready(function () {
  const grades_and_classes = $("table[class='list']")[0].rows
  
  let gpa_regular = {"A+":4.3,"A":4.0,"A-":3.7,"B+":3.3,"B":3.0,"B-":2.7,
    "C+":2.3,"C":2.0,"C-":1.7,"D+":1.3,"D":1.0,"D-":0.7,"F":0.0
  }
  let gpa_honors = {"A+":4.8,"A":4.5,"A-":4.2,"B+":3.8,"B":3.5,"B-":3.2,
    "C+":2.8,"C":2.5,"C-":2.2,"D+":1.8,"D":1.5,"D-":1.2,"F":0.0
  }
  let gpa_ap = {"A+":5.3,"A":5.0,"A-":4.7,"B+":4.3,"B":4.0,"B-":3.7,
    "C+":3.3,"C":3.0,"C-":2.7,"D+":2.3,"D":2.0,"D-":1.7,"F":0.0
  }
  var x = 1;
  var year = 0; 
  let qualityPoints = [];
  let total_credits = [];
  let eachFinalGPA = [];
  let sumOfQualityPoints = 0; 
  let sumOfTotalCredits = 0;
  let cumGPA = NaN; 
  let tempGrade = grades_and_classes[1].cells[1].innerText;
  while (tempGrade >= 9){
	  qualityPoints[year] = 0;
	  total_credits[year] = 0;
	  var arrayIndex = 0;
	  let grades = [];
	  let courses = [];
	  let credits = [];
	  let gpas = [];
	  while (grades_and_classes[x].cells[1].innerText == tempGrade){
		  if (grades_and_classes[x].cells[2].innerText.indexOf("Health") > -1 || grades_and_classes[x].cells[2].innerText.indexOf("Physical Ed") > -1){
			  x = x + 1;
			  continue; 
		  }
		  else{
			  courses.push(grades_and_classes[x].cells[2].innerText);
			  grades.push(grades_and_classes[x].cells[4].innerText);
			  credits.push(parseFloat(grades_and_classes[x].cells[6].innerText));
			  if(courses[arrayIndex].indexOf("AP") > -1 || courses[arrayIndex].indexOf("Science Research Program II") > -1 ||  courses[arrayIndex].indexOf("Molecular Biology") > -1){
				  gpas.push(gpa_ap[grades_and_classes[x].cells[4].innerText])
				}
			  else if (courses[arrayIndex].indexOf("Honors") > -1 || courses[arrayIndex].indexOf("Science Research Program") > -1){
				  gpas.push(gpa_honors[grades_and_classes[x].cells[4].innerText])
				}			  
			  else{
				  gpas.push(gpa_regular[grades_and_classes[x].cells[4].innerText])
				}
			 qualityPoints[year] = qualityPoints[year] + gpas[arrayIndex] * credits[arrayIndex];
			 total_credits[year] = total_credits[year] + credits[arrayIndex];
			 x = x + 1; 
			 arrayIndex = arrayIndex + 1;
		  }
		   
		  
		}	
		eachFinalGPA[year] = qualityPoints[year]/total_credits[year]
		//sumOfGPAs = sumOfGPAs + eachFinalGPA[year]		
		grades_and_classes[x].cells[1].innerHTML = "<b> <mark> Final " 
		+ parseInt(tempGrade) + "th Grade GPA: " + eachFinalGPA[year].toFixed(6) + "</mark> </b>";
		grades_and_classes[x].cells[2].innerHTML = "";
		grades_and_classes[x].cells[3].innerHTML = "";
		x = x + 2;
		tempGrade = grades_and_classes[x].cells[1].innerText;
		year = year + 1; 
	}
	var a = 0;
	for (a = 0; a < qualityPoints.length; a++){
    	sumOfQualityPoints = sumOfQualityPoints + qualityPoints[a];
    	sumOfTotalCredits = sumOfTotalCredits + total_credits[a];
	}
	cumGPA = sumOfQualityPoints/sumOfTotalCredits;
	let html = '<h1 id="gpa" style="color:#ffffff;background-color:#006400;height:10px;text-align:center;line-height:100px;width:50px;border-radius:25px;margin:0 auto;margin-top:10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, .4);"> GPA: ';
	html += cumGPA.toFixed(3);
	html += "</h1> <br>";
	$("td[class='notecardTitle']").replaceWith(html);
	gpaDiv = $("#gpa")
	gpaDiv.animate({height: '100px', opacity: '0.6'}, "slow");
	gpaDiv.animate({width: '250px', opacity: '1'}, "fast");
	
  })