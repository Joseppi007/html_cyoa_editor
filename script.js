let args = location.search.substr(1).split('&').map(e=>e.split('=')).reduce((a,b)=>{a[b[0]] = b[1]; return a;}, {}) ;
let selected_page = "No page selected";

let story_data = {title:'Untitled',description:'This story does not have a description.',author:'Joseppi007 (github) AKA Rose',pages:[{name:'Hello World',text:'This is a placeholder.',next:[{name:'Welld Horlo',text:'==>'}],first:true},{name:'Welld Horlo',text:'phir is a tlaceholdes.',next:[{name:'Hello World',text:'==>'}],first:false}]};
let story_vars = {};
let baseDelay = 10;

function story_start() {
    read_title_page();
}

async function read_page(page_name, part = 0) {
    let page = get_page(page_name);
    let d = document.createElement('div');
    story_div.innerText = "";
    story_div.appendChild(d);
    story_footer.innerText = "";

    close_modals();
    story_modal.showModal();
    
    await populateWithText(d, page.text, part);
    Array.from(story_footer.children).forEach(e=>e.remove());
    if (part == grabFormatTextPartCount(page.text) - 1) {
	for (let i = 0; i < page.next.length; i++) {
	    let btn = page.next[i];
	    let button = document.createElement('button');
	    await populateWithText(button, btn.text);
	    button.onclick = ()=>{
		read_page(btn.name);
	    };
	    story_footer.appendChild(button);
	};
    } else {
	let button = document.createElement('button');
	button.innerText = '→';
	button.onclick = ()=>{
	    read_page(page_name, part+1);
	};
	story_footer.appendChild(button);
    }
}

async function read_title_page(part = 0) {
    story_div.innerText = "";
    story_footer.innerText = "";
    
    let titleH1 = document.createElement('h1');
    let authorH3 = document.createElement('h3');
    let descP = document.createElement('p');
    story_div.appendChild(titleH1);
    story_div.appendChild(authorH3);
    story_div.appendChild(descP);
    
    close_modals();
    story_modal.showModal();
    
    await populateWithText(titleH1, story_data.title);
    await populateWithText(authorH3, "By "+story_data.author);
    await populateWithText(descP, story_data.description);
    story_div.innerText = "";
    story_div.appendChild(titleH1);
    story_div.appendChild(authorH3);
    story_div.appendChild(descP);
    Array.from(story_footer.children).forEach(e=>e.remove());
    let firsts = story_data.pages.filter(page=>page.first);
    if (firsts.length != 1) {
	alert("There was an issue finding the first page. Sorry.");
	return;
    }
    let first = firsts[0].name;
    if (part == grabFormatTextPartCount(story_data.description) - 1) {
	let button = document.createElement('button');
	button.innerText = "Begin";
	button.onclick = ()=>{
	    read_page( first );
	};
	story_footer.appendChild(button);
    } else {
	let button = document.createElement('button');
	button.innerText = "→";
	button.onclick = ()=>{
	    read_title_page(part+1);
	};
	story_footer.appendChild(button);
    }

    close_modals();
    story_modal.showModal();
}

async function populateWithText(domElem, text, part = 0, delayMultiplier = 1) {
    domElem.innerText = "";
    let ft = grabFormatTextPart(text, part);
    for (let i = 0; i < ft.length; i++) {
	piece = ft[i];
	if (piece.type == "unformatted") {
	    let newElem = document.createTextNode("");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "bold" || piece.type == "b" || piece.type == "strong") {
	    let newElem = document.createElement("strong");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "italics" || piece.type == "italic" || piece.type == "i" || piece.type == "it" || piece.type == "em") {
	    let newElem = document.createElement("em");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "underline" || piece.type == "uline" || piece.type == "under" || piece.type == "u") {
	    let newElem = document.createElement("u");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "h1") {
	    let newElem = document.createElement("h1");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "h2") {
	    let newElem = document.createElement("h2");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "h3") {
	    let newElem = document.createElement("h3");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "h4") {
	    let newElem = document.createElement("h4");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "h5") {
	    let newElem = document.createElement("h5");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type == "h6") {
	    let newElem = document.createElement("h6");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier);
	}
	if (piece.type.match(/typeRate\(\d*.?\d*\)/)) {
	    let delayMultiplier1 = Number(piece.type.substr(9, piece.type.length-10));
	    let newElem = document.createTextNode("");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece.text, delayMultiplier*delayMultiplier1);
	}
	if (piece.type == "hr" || piece.type == "horizontal rule" || piece.type == "line" || piece.type == "--") {
	    let newElem = document.createElement("hr");
	    domElem.appendChild(newElem);
	}
	if (piece.type == "newLine") {
	    let newElem = document.createElement("br");
	    domElem.appendChild(newElem);
	}
	if (piece.type == "br" || piece.type == "break") {
	    // Shouldn't show up, actually…
	}
    }
}

async function populateWithPlainText(domElem, text, delaydelayMultiplier) {
    for (let i = 0; i < text.length; i++) {
	let letter = text[i];
	if (domElem.innerText == undefined) {
	    domElem.data += letter;
	} else {
	    domElem.innerText += letter;
	}
	await sleep(delaydelayMultiplier*baseDelay);
    };
}

// Breaks on {type:"break",text:""}
function grabFormatTextPart(text, partToGet) {
    let ft = grabFormatText(text);
    let acc = [];
    let currentPart = 0;
    ft.forEach((part)=>{
	if (part.type == 'br' || part.type == 'break') {
	    currentPart++;
	} else {
	    if (currentPart == partToGet) {
		acc.push(part);
	    }
	}
    });
    return acc;
}

// Breaks on {type:"break",text:""}
function grabFormatTextPartCount(text) {
    let ft = grabFormatText(text);
    let currentPart = 0;
    ft.forEach((part)=>{
	if (part.type == 'br' || part.type == 'break') {
	    currentPart++;
	}
    });
    return currentPart+1;
}

/*
 * Format Text is in the form "Hello, {get:name}!"
 * Curly braces can be escaped with backslash.
 * This function returns the example as [{type:"unformatted",text:"Hello, "},{type:"get",text:"name"},{type:"unformatted",text:"!"}].
 */
function grabFormatText(text) {
    text = text.replace(/\n/g, "{newLine}");
    let accumulator = [];
    let indexOfLastCharProcessed = -1;
    while (true) {
	let openBraceIndex = unescapedIndexOf(text, '{', indexOfLastCharProcessed+1);
	if (openBraceIndex == -1) {
	    if (indexOfLastCharProcessed != text.length - 1) {
		accumulator.push({type:"unformatted",text:text.substr(indexOfLastCharProcessed+1)});
	    }
	    return accumulator;
	}
	let closeBraceIndex = unescapedIndexOf(text, '}', openBraceIndex+1);
	if (closeBraceIndex == -1) {
	    if (indexOfLastCharProcessed != text.length - 1) {
		accumulator.push({type:"unformatted",text:text.substr(indexOfLastCharProcessed+1)});
	    }
	    return accumulator;
	}
	let colonIndex = unescapedIndexOf(text, ':', openBraceIndex);
	if (openBraceIndex != indexOfLastCharProcessed + 1) {
	    accumulator.push({type:"unformatted",text:text.substr(indexOfLastCharProcessed+1, openBraceIndex-indexOfLastCharProcessed-1)});
	    indexOfLastCharProcessed = openBraceIndex - 1;
	}
	if (colonIndex == -1 || colonIndex > closeBraceIndex) {
	    accumulator.push({type:text.substr(openBraceIndex+1, closeBraceIndex-openBraceIndex-1), text:""});
	} else {
	    accumulator.push({type:text.substr(openBraceIndex+1, colonIndex-openBraceIndex-1), text:text.substr(colonIndex+1, closeBraceIndex-colonIndex-1)});
	}
	indexOfLastCharProcessed = closeBraceIndex;
    }
    return accumulator;
}

function unescapedIndexOf(source, search, startIndex) {
    let index = startIndex;
    while (source[index-1] == '\\' || source.substr(index, search.length) != search) {
	index = source.indexOf(search, index+1);
	if (index == -1) {return -1;}
    }
    return index;
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

async function sleep(n) {
    if (n==0) return;
    await new Promise(resolve => setTimeout(resolve, n));
}
