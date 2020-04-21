
var urlParams = new URLSearchParams(window.location.search);
var id='1';
if(urlParams.has('id')) {
    id=urlParams.get('id')
}

const getLinks = () => {

    axios.get('../urls.json')
        .then(response => {
            const categories = response.data;
            var el = document.querySelector(".categories");
            categories.forEach(v => {
                    var div = document.createElement('div');
                    div.className ="list-cat  col-md-3 col-xs-6 text-center";
                    var url= '/links/?id='+v.id
                    var a = createLink(url,v.title,'myClass');
                    div.appendChild(a);
                    el.appendChild(div);
				
					if(id==v.id) {
						var el1 = document.querySelector(".linkList");

						const childs = v.childs
						childs.forEach(v=> {

							var div1 = document.createElement('div');
							div1.className="titlecat1";
							var b1 = document.createElement('b');
							b1.className ="fontCblueBold";
							
							
							var i1 = document.createElement('i');
							i1.className ="fas fa-folder mr-1";
							b1.appendChild(i1);
							var t1 = document.createTextNode(v.title); 
							b1.appendChild(t1);
							div1.appendChild(b1);

							if(v.childs) {
								var div2 = document.createElement('div');
								div2.className="titlecat_2 ml-3 fontCYellow";
								const childs1 = v.childs
								childs1.forEach(v=> {
									var div3 = document.createElement('div');
									div3.className="mt-0 mb-0";
									var i2 = document.createElement('i');
									i2.className ="fas fa-folder-plus fontCblue mr-1";
									div3.appendChild(i2);
									var t2 = document.createTextNode(v.title); 
									div3.appendChild(t2);



									if(v.childs) {
										var div4 = document.createElement('div');
										div4.className="titlecat_2 ml-3 mt-0 mb-0";
										var div5 = document.createElement('div');
										div5.className="mt-0 mb-0";
										var ul = document.createElement('ul');
										ul.className ="mt-0 mb-0";
										const childs2 = v.urls

										childs2.forEach(v=> {
											var li = document.createElement('li');
											var a1 = createLinkNew(v.link,v.title,'myClass');
											li.appendChild(a1);
											ul.appendChild(li);
										})

										div5.appendChild(ul);
										div4.appendChild(div5);
										div3.appendChild(div4);
									}



									div2.appendChild(div3);
								})
							}
							el1.appendChild(div1);
							el1.appendChild(div2);
						})
					}

            } );
       })
        .catch(error => console.error(error));
};
/*


								<div class="titlecat_2 ml-3 mt-0 mb-0">
										<ul class="mt-0 mb-0">
											<li><a href="https://covid19.min-saude.pt/" class="fontCblue" target="_blank">Página principal</a></li>
										</ul>														
								</div>				

*/




const createLink = (url,text,cls) => {
    var a = document.createElement('a');
	a.className ="fontCblue";
    var linkText = document.createTextNode(text);
    a.appendChild(linkText);
    a.title = text;
    a.href = url;
    return a;
};

const createLinkNew = (url,text,cls) => {
    var a = document.createElement('a');
		a.className ="fontCblue font-weight-normal";
    var linkText = document.createTextNode(text);
    a.appendChild(linkText);
    a.title = text;
    a.href = url;
	a.setAttribute('target', '_blank');
    return a;
};
getLinks();