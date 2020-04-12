var url = 'icambackoffice:8080';

var urlParams = new URLSearchParams(window.location.search);
var id='0';
if(urlParams.has('id')) {
    id=urlParams.get('id')
}




const getRevision = (token,id) => {
     config = {
         headers: { Authorization: `Bearer ${token}`,
         'Access-Control-Allow-Origin': '*',
         'Content-Type': 'application/json'
        },
        mode: 'no-cors'
    };
   

    axios.get(url + '/services/icamapi/api/revisions?active.equals=true&id.equals='+id,
        config)
        .then(response => {
            var revision = response.data[0];
			console.log(revision);
               var el = document.querySelector("#title");
               el.textContent=revision.title;
               var el = document.querySelector("#article");
			   var aa = createLink(' https://www.doi.org/' + revision.article.articleDoi,revision.article.articleTitle,'fontCblue'); 
			   el.appendChild(aa);
               var el = document.querySelector("#authors");
               el.textContent=revision.article.citation.replace(revision.article.articleDate,'');
               var el = document.querySelector("#sinopse");
               el.innerHTML =revision.summary.replace(/\n/g,'<br><br>');
               var el = document.querySelector("#date");
               el.textContent=revision.article.articleDate; 
               var el = document.querySelector("#link");
               var a = createLink(' https://www.doi.org/' + revision.article.articleDoi,'Acesso ao artigo',''); 
               el.appendChild(a);
               var el = document.querySelector("#category");
               el.textContent=getRevCats(revision.ctrees); 
               var el = document.querySelector("#keywords");
               el.textContent=revision.keywords; 
               var el = document.querySelector("#reviewer");
               el.textContent=revision.reviewer; 
 

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
