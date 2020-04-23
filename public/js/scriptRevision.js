
//Workaround made to differentiate PROD from DEV api url - Consider the use of Environment Variables.
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
var url = getCookie("API_URL");
//#################

var urlParams = new URLSearchParams(window.location.search);
var id='0';
if(urlParams.has('id')) {
    id=urlParams.get('id')
}




const getRevision = (token,id) => {
     config = {
         headers: { Authorization: `Bearer ${token}`,
        },
    };
   

    axios.get(url + '/services/icamapi/api/revisions?active.equals=true&id.equals='+id,
        config)
        .then(response => {
            var revision = response.data[0];
			console.log(revision);
               var el = document.querySelector("#title");
               el.textContent=revision.title;
               var el = document.querySelector("#article");
			   var aa = createLink(revision.article.articleLink,revision.article.articleTitle,'fontCblue');
			   el.appendChild(aa);
               var el = document.querySelector("#authors");
               el.textContent=revision.article.articleCitation.replace(revision.article.articleDate,'');
               var el = document.querySelector("#sinopse");
               el.innerHTML =revision.summary.replace(/\n/g,'<br><br>');
               var el = document.querySelector("#date");
               el.textContent=revision.article.articleDate; 
               var el = document.querySelector("#link");
               var a = createLink(revision.article.articleLink,'Acesso ao artigo','');
               el.appendChild(a);
               var el = document.querySelector("#category");
               el.textContent=getRevCats(revision.ctrees); 
               var el = document.querySelector("#keywords");
               el.textContent=revision.keywords; 
               var el = document.querySelector("#author");
               el.textContent= revision.author;
               var el = document.querySelector("#reviewer");
               el.textContent= revision.reviewer;
 

        })
        .catch(error => console.error(error));
   
};

const createLink = (url,text,cls) => {
    var a = document.createElement('a');
	a.setAttribute('target', '_blank');
	a.className =cls;
    var linkText = document.createTextNode(text);
    a.appendChild(linkText);
    a.title = text;
    a.href = url;
    return a;
};

const getRevCats = (ctree) => {
	tt='';
	sep='';
	ctree.forEach( v => {
		if(v.parent===null) {
			tt=tt + sep+v.itemName;
		} else {
			tt=tt + sep +v.parent.itemName;
			tt=tt + " | "+v.itemName;
		}
		sep=" | ";
	});
	return tt;
};


 getRevision(id_token,id);
