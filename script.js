let args = location.search.substr(1).split('&').map(e=>e.split('=')).reduce((a,b)=>{a[b[0]] = b[1]; return a;}, {}) ;
let selected_page = "No page selected";

story_data = {title:'Untitled',description:'This story does not have a description.',author:'Joseppi007 (github) AKA Rose',pages:[{name:'Hello World',text:'This is a placeholder.',next:[{name:'Welld Horlo',text:'==>'}],first:true},{name:'Welld Horlo',text:'phir is a tlaceholdes.',next:[{name:'Hello World',text:'==>'}],first:false}]};
story_vars = {};

function story_start() {
    read_title_page();
}

function read_page(page_name) {
    let page = get_page(page_name);
    populateWithText(story_div, page.text);
    Array.from(story_footer.children).forEach(e=>e.remove());
    page.next.forEach(btn=>{
	let button = document.createElement('button');
	populateWithText(button, btn.text);
	button.onclick = ()=>{
	    read_page(btn.name);
	};
	story_footer.appendChild(button);
    });

    close_modals();
    story_modal.showModal();
}

function read_title_page() {
    let titleH1 = document.createElement('h1');
    populateWithText(titleH1, story_data.title);
    let authorH3 = document.createElement('h3');
    populateWithText(authorH3, "By "+story_data.author);
    let descP = document.createElement('p');
    populateWithText(descP, story_data.description);
    story_div.innerText = "";
    story_div.appendChild(titleH1);
    story_div.appendChild(authorH3);
    story_div.appendChild(descP);
    Array.from(story_footer.children).forEach(e=>e.remove());
    let button = document.createElement('button');
    button.innerText = "Begin";
    let firsts = story_data.pages.filter(page=>page.first);
    if (firsts.length != 1) {
	alert("There was an issue finding the first page. Sorry.");
	return;
    }
    let first = firsts[0].name;
    button.onclick = ()=>{
	read_page( first );
    };
    story_footer.appendChild(button);

    close_modals();
    story_modal.showModal();
}

function populateWithText(domElem, text) {
    domElem.innerText = text;
}

function story_edit() {
    Array.from(page_list.children).forEach(e=>{e.remove();});
    {
	let li = document.createElement('li');
	let button = document.createElement('button');
	let em = document.createElement('em');
	em.innerText = 'Title Page';
	button.appendChild(em);
	button.onclick = (event)=>{
	    open_title_page_options_menu();
	}
	li.appendChild(button);
	page_list.appendChild(li);
    }
    story_data.pages.forEach(page=>{
	let li = document.createElement('li');
	let button = document.createElement('button');
	populateWithText(button, page.name);
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

function open_title_page_options_menu() {
    title_page_title_input.value = story_data.title;
    title_page_author_input.value = story_data.author;
    title_page_description_input.value = story_data.description;
    close_modals();
    title_edit_modal.showModal();
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
	    if (!page_exists(name+'('+i+')')) {
		name += '('+i+')';
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
    if (selected_page!=page_name_input.value && page_exists(page_name_input.value)) { // Name conflict
	for (let i = 2; true; i++) {
	    if (!page_exists(page_name_input.value+'('+i+')') || page_name_input.value+'('+i+')' == selected_page) {
		page_name_input.value += '('+i+')';
		break;
	    }
	}
    }
    story_data.pages = story_data.pages.map(page=>{
	if (page.name != selected_page) {return page;}
	page.name = page_name_input.value;
	page.text = page_text_input.value;
	page.next = page_buttons_input.value.split(',').filter(e=>e.length).map(e=>e.split(':')).map(e=>{return {name: e[0], text: e[1]};});
	return page;
    });
    selected_page = page_name_input.value;
}

function save_edit_title() {
    story_data.title = title_page_title_input.value;
    story_data.author = title_page_author_input.value;
    story_data.description = title_page_description_input.value;
}

function open_file_menu() {
    story_data_json.value = JSON.stringify(story_data);
    close_modals();
    file_menu.showModal();
}

function figure_out_theme() {
    if (args.theme != undefined) { args.theme = args.theme.toLowerCase(); }
    while (args.theme != 'l' && args.theme != 'd' && args.theme != 'light' && args.theme != 'dark' && args.theme != 'light mode' && args.theme != 'dark mode') {
	let answer = prompt("Please enter the first letter of your prefered theme:\n[L]ight mode\n[D]ark mode");
	if (answer == null) {
	    answer = (Math.random()>0.5)?'l':'d';
	}
	args.theme = answer.toLowerCase();
    }
    if (args.theme == 'l' || args.theme == 'light' || args.theme == 'light mode') { document.body.classList += ' light-mode'; }
    if (args.theme == 'd' || args.theme == 'dark' || args.theme == 'dark mode') { document.body.classList += ' dark-mode'; }
}
