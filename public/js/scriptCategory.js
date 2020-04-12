var url = 'icambackoffice:8080';

var urlParams = new URLSearchParams(window.location.search);
var ids='0';
var id='0';
if(urlParams.has('ids')) {
    ids=urlParams.get('ids')
}
if(urlParams.has('id')) {
    id=urlParams.get('id')
}


const getContent = (token) => {
            getCategory(token,id);
            getRevisions(token,ids);
};

const getCategory = (token,id) => {

         config = {
         headers: { Authorization: `Bearer ${token}`,
         'Access-Control-Allow-Origin': '*',
         'Content-Type': 'application/json'
        },
        mode: 'no-cors'
    };

    axios.get(url + '/services/icamapi/api/category-trees?id.equals='+id,
        config)
        .then(response => {
            const category = response.data[0];
            var el = document.querySelector(".page-name");
            el.textContent=category.itemName;
        })
        .catch(error => console.error(error));
};


const getRevisions = (token,ids) => {
    config = {
       headers: { Authorization: `Bearer ${token}` }
   };
   
    axios.get(url + '/services/icamapi/api/revisions?active.equals=true&ctreeId.in='+ids,
        config)
        .then(response => {
            var revisions = response.data;
            var nRec = document.querySelector("#nRecords");
                nRec.textContent = Object.keys(revisions).length;

            var el = document.querySelector("#articleList");
            revisions.forEach(v => {

                id= v.id;
                title = v.title;
                article =  v.article.articleTitle;
                date = v.article.articleDate;
                authors = v.article.citation;
				authors=authors.replace(date,'');

                var h5 = document.createElement('h5');
                h5.className ="font-weight-bold mb-3 fontCblue";
                var a = createLink('/revisions/?id='+id,title,'fontCblue');
                h5.appendChild(a);
                
                var h6 = document.createElement('h6');
                h6.className ="grey-text mb-3  font-italic";
                h6.textContent = article;
                
                var p = document.createElement('p');
                var span1 = document.createElement('span');
                span1.className ="fontCblue mr-2";
                var i = document.createElement('i');
                i.className ="fas fa-calendar-alt mr-2";
                span1.appendChild(i);
                var t = document.createTextNode(date); 
                span1.appendChild(t);
                var span2 = document.createElement('span');
                span2.className ="orange-text";
                span2.textContent = authors;
				var span3 = document.createElement('span');
				span3.className ="list-group-item";
				span3.textContent = getRevCats(v.ctrees);
                p.appendChild(span1);
                p.appendChild(span2);
                p.appendChild(span3);
           
                var div0 = document.createElement('div');
                div0.className ="col-lg-12 col-md-12 mb-3 d-md-flex ";
                var div1 = document.createElement('div');
                
				div1.className ="card  w-100";
                var div11 = document.createElement('div');
                div11.className ="card-body";

                div11.appendChild(h5);
                div11.appendChild(h6);
                div11.appendChild(p);

                div1.appendChild(div11);
                div0.appendChild(div1);

                el.appendChild(div0);
            });
        })
        .catch(error => console.error(error));
   
};

const createLink = (url,text,cls) => {
    var a = document.createElement('a');
    var linkText = document.createTextNode(text);
    a.appendChild(linkText);
    a.title = text;
    a.href = url;
    return a;
};

const getCategoryIDs = (id, child) => {
    myID=id;
    child.forEach(v => {
        myID=myID + ',' +v.id;
    });
    return myID;
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
getContent(id_token);