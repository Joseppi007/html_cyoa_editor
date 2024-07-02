let args = location.search.substr(1).split('&').map(e=>e.split('=')).reduce((a,b)=>{a[b[0]] = b[1]; return a;}, {}) ;
let selected_page = "No page selected";

story_data = {title:'Untitled',description:'This story does not have a description.',pages:[{name:'Hello World',text:'This is a placeholder.',next:[{name:'Welld Horlo',text:'==>'}],first:true},{name:'Welld Horlo',text:'phir is a tlaceholdes.',next:[{name:'Hello World',text:'==>'}],first:false}]};

function story_start() {
    let firsts = story_data.pages.filter(page=>page.first);
    if (firsts.length == 1) {
	read_page(firsts[0].name);
    } else {
	alert("There was an issue finding the first page. Sorry.");
    }
}

function read_page(page_name) {
    let page = get_page(page_name);
    story_div.innerText = page.text;
    Array.from(story_footer.children).forEach(e=>e.remove());
    page.next.forEach(btn=>{
	let button = document.createElement('button');
	button.innerText = btn.text;
	button.onclick = ()=>{
	    read_page(btn.name);
	};
	story_footer.appendChild(button);
    });

    close_modals();
    story_modal.showModal();
}

function story_edit() {
    Array.from(page_list.children).forEach(e=>{e.remove();});
    story_data.pages.forEach(page=>{
	let li = document.createElement('li');
	let button = document.createElement('button');
	button.innerText = page.name;
	button.onclick = (event)=>{
	    open_page_options_menu(page.name);
	}
	li.appendChild(button);
	page_list.appendChild(li);
    });
    {
	let li = document.createElement('li');
	let button = document.createElement('button');
	let em = document.createElement('em');
	em.innerText = 'New Page';
	button.appendChild(em);
	button.onclick = (event)=>{
	    open_page_options_menu(create_unnamed_page());
	}
	li.appendChild(button);
	page_list.appendChild(li);
    }
    close_modals();
    page_list_modal.showModal();
}

function open_page_options_menu(page_name) {
    selected_page = page_name;
    close_modals();
    page_options_modal.showModal();
}

function make_first_page(page_name) {
    story_data.pages.map(page=>{
	page.first = page.name == page_name;
    });
}

function create_page(page_name) {
    story_data.pages.push({name:page_name, text:'', next:[]});
}

function create_unnamed_page() {
    let name = "Unnamed";
    if (!page_exists(name)) {
	create_page(name);
    } else {
	for (let i = 2; true; i++) {
	    if (!page_exists(name+i)) {
		name += i;
		break;
	    }
	}
	create_page(name);
    }
    return name;
}

function delete_page(page_name) {
    story_data.pages = story_data.pages.filter(page=>page.name!=page_name);
}

function edit_page(page_name) {
    let page = get_page(page_name);
    page_name_input.value = page_name;
    page_text_input.value = page.text;
    page_buttons_input.value = page.next.reduce((a,b)=>{
	return a + "," + b.name + ":" + b.text;
    },"").substr(1);
    
    close_modals();
    edit_modal.showModal();
}

function page_exists(page_name) {
    return story_data.pages.reduce((a,b)=>(a || b.name == page_name), false);
}

function get_page(page_name) {
    return story_data.pages.filter(page=>page.name==page_name)[0];
}

function close_modals() {
    Array.from(document.getElementsByTagName('dialog')).map(e=>e.close());
}

function save_edit() {
    story_data.pages = story_data.pages.map(page=>{
	if (page.name != selected_page) {return page;}
	page.name = page_name_input.value;
	page.text = page_text_input.value;
	page.next = page_buttons_input.value.split(',').map(e=>e.split(':')).map(e=>{return {name: e[0], text: e[1]};});
	return page;
    });
}
