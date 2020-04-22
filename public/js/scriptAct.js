
//Workaround made to differentiate PROD from DEV api url - Consider the use of Environment Variables.
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}
var url = getCookie("API_URL");
//#################


const getCategories = (token) => {
     config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(url + '/services/icamapi/api/category-trees',
        config)
        .then(response => {
            const categories = response.data;
            var el = document.querySelector(".categories");
            categories.forEach(v => {
                if(v.hasOwnProperty('children')){
                    var div = document.createElement('div');
                    div.className ="custom-controls-stacked mb-2";
                    var div1 = document.createElement('div');
                    div1.className ="custom-control custom-checkbox";
					var cb = document.createElement('input');
                    cb.className ="custom-control-input chbx";
					cb.type = "checkbox";
					cb.name = "categoryListInput";
					cb.value = v.id;
					cb.id = "categoryList_"+v.id;
					var label = document.createElement('label')
                    label.className ="custom-control-label";
					label.htmlFor = "categoryList_"+v.id;
					label.appendChild(document.createTextNode(v.itemName));
					div1.appendChild(cb);
					div1.appendChild(label);
                    div.appendChild(div1);
                    el.appendChild(div);
				}
            } );
       })
        .catch(error => console.error(error));
};

const formActSub = (event) => {
	event.preventDefault();
	var firstName = document.querySelector("#firstName").value;
	var lastName = document.querySelector("#lastName").value;
	var email = document.querySelector("#email").value;
	var cboxes = document.getElementsByClassName('chbx');
	var len = cboxes.length;

	var isCheck=0;
	var cats = []; 
	for(var i=0; i<len;i++){
		  if(cboxes[i].checked){
				isCheck=1;
			   cat= {'id':cboxes[i].value};
			   cats.push(cat);
		  }
	}

	if(isCheck==0) {
		alert("Todos os campos sao de preenchimento obrigatorio e tem que selecionar pelo menos uma categoria!");
		return false;
	}

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); 
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;

	var act = {
	  "firstName": firstName,
	  "lastName": lastName,
	  "email": email,
	  "categoryTrees": cats,
	  "registrationDate": today,
	  "rgpdAuth": true
	};

     config = {
        headers: { Authorization: `Bearer ${id_token}` }
    };
    axios.post(url + '/services/icamapi/api/newsletters',act,config)
        .then(response => {
//            const news = response.data;
//			console.log(news);
		});

//	window.location.replace("/");
		var beforeSumbit = document.querySelector("#beforeSumbit");
		var afterSumbit = document.querySelector("#afterSumbit");

	addClass(beforeSumbit,'d-none');
	removeClass(afterSumbit,'d-none');
	return false;

};


var form = document.querySelector("#formAct");
form.addEventListener("submit", formActSub);

getCategories(id_token);




function hasClass(el, className)
{
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className)
{
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className)
{
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className))
    {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}