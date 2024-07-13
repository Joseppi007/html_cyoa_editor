let args = location.search.substr(1).split('&').map(e=>e.split('=')).reduce((a,b)=>{a[b[0]] = b[1]; return a;}, {}) ;
let selected_page = "No page selected";

let example_bg = 'data:image/svg+xml;utf8,<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect fill="%230088ff" x="0" y="0" width="1600" height="900"/><path d="M0 700 c100 -100 1500 -100 1600 0 v200 h-1600 Z" fill="%2300ee66"/><ellipse cx="1500" cy="100" rx="200" ry="200" fill="%23ffff00"/><ellipse cx="500" cy="200" rx="100" ry="100" fill="%23ffffff"/><ellipse cx="600" cy="200" rx="100" ry="100" fill="%23ffffff"/><ellipse cx="550" cy="225" rx="200" ry="80" fill="%23ffffff"/></svg>';
let example_character = 'data:image/svg+xml;utf8,<svg width="900" height="1600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path stroke="%23000000" stroke-width="50" fill="%2300000000" d="M0 1600 l450 -600 l450 600"/><path stroke="%23000000" stroke-width="50" fill="%2300000000" d="M450 1000 v-600"/><path stroke="%23000000" stroke-width="50" fill="%2300000000" d="M0 500 h900"/><ellipse stroke="%23000000" stroke-width="50" fill="%2300000000" cx="450" cy="200" rx="200" ry="200"/></svg>';
let example_custom_theme = ['#99c1f1','#180d80','#8ff0a4','#0a4f21','#8ff0a4','#0a4f21','#8ff0a4','#0a4f21','#000000','#f66151','#5e0505','#f66151','#5e0505','#f66151','#5e0505','#000000','#ffffff','#ffffff','#000000','#62a0ea']

let story_data = {title:'Something Fishy',description:'A story about trying to do a fish romance.',author:'Joseppi007 (github) AKA Rose',pages:[{name:'Hello',text:'{scene:bg1}\n{scene_character(-0.9,0.9,BlubBlub):Blub-blub}\n{h1:???: HELLO!!!}\n{br}\n???: Who are you?\n{set:name}\n{br}\nBlub-blub: Hello {get:name}, I\'m Blub-blub.',next:[{name:'Hi Back',text:'“Hi.”'},{name:'Silent',text:'“…”'}],first:true},{name:'Hi Back',text:'{scene:bg1}\n{scene_character(-0.9,0.9,BlubBlub):Blub-blub}\n{get:name}: Hello.\n{br}\n{scene_rm}Ok, I\'ll let you make your own story now.',next:[],first:false},{name:'Silent',text:'{scene:bg1}\n{scene_character(-0.9,0.9,BlubBlub):Blub-blub}\n{get:name}: …\n{br}\n{scene_rm}Ok, I\'ll let you make your own story now.',next:[],first:false}],images:[{name:'bg1', link:'https://www.worldatlas.com/r/w1200/upload/04/ab/d1/fish-species-tropical.jpg'}, {name:'Blub-blub', link:'https://tse3.mm.bing.net/th?id=OIP.xXVVpcottGRlEH9vDdLPPwHaHM'}],custom_theme:example_custom_theme.map(e=>e)};

let special_story_data = {
    help:JSON.parse('{"title":"Documentation","author":"Joseppi007 (github) AKA Rose","description":"I\'ve heard that I suck at documentation.\\nI agree.\\nIf you make something better, let me know.\\nI can replace this one with yours (you\'ll get credit through the {i:author} thing.)","pages":[{"name":"Start","text":"In a nut shell, this is a passion project of mine I started after my bro used {i:Google Slides} to make a Choose Your Own Adventure (CYOA) story. I know there are better tools out there, but I like making stuff like this, so I did. More features and improvements will come (unless they won\'t). Let me know if anything needs changing, please.\\n\\nAnyways, {b:what do you need help with?}","next":[{"name":"Viewer Help","text":"I want to read."},{"name":"Editor Help","text":"I want to write."}],"first":true},{"name":"Viewer Help","text":"Ok, so you want to read.\\nI\'d recommend picking your preferred settings in the {i:Options} menu, then you\'ll need to go to the {i:File} menu and paste the story data (may be in a {mono:.json} file or just sent to you as a mess of curly braces and colons) into the text box. After that, press {i:Play}.","next":[]},{"name":"Editor Help","text":"Before you make any changes, I want to let you know that you should make sure to regularly copy the text in the text box in the {i:File} menu somewhere—A {mono:.json} file is a good choice. ({mono:.json} files are just text files, by the way.)\\nAlso, you should probably press the {i:New Story} button in that {i:File} menu before you start unless you want to edit the story that\'s already loaded. That button clears all the story data out to give you a fresh start, so {u:make sure to save {i:before} you click it} if you don\'t want to loose anything!\\n\\nWhat do you need help with?","next":[{"name":"Simple Formatting","text":"Simple Formatting"},{"name":"Scene Formatting","text":"Scene Formatting"},{"name":"How to Share","text":"How to Share"}]},{"name":"Simple Formatting","text":"When you want formatting, it takes the form \\\\{type:text\\\\}. For example, {bold:bold} text would look like \\\\{bold:this\\\\}.\\nIf you want multiple formattings at once, you can do \\\\{bold:\\\\{italics:__\\\\}\\\\}.\\n\\nI didn\'t put the alternative forms of things last time I made this document and got in trouble for it, so here\'s a comprehensive list of all the types of formatting you can do (minus scene stuff, which I\'m keeping separate.)\\n\\n\\\\{bold:__\\\\} \\\\{b:__\\\\} \\\\{strong:__\\\\}\\n{b:example}\\n\\n\\\\{italics:__\\\\} \\\\{italic:__\\\\} \\\\{i:__\\\\} \\\\{it:__\\\\} \\\\{em:__\\\\}\\n{i:example}\\n\\n\\\\{underline:__\\\\} \\\\{uline:__\\\\} \\\\{under:__\\\\} \\\\{u:__\\\\}\\n{u:example}\\n\\n\\\\{h1:__\\\\} through \\\\{h6:__\\\\} are as follows: (Use these for headings and sub-headings.)\\n{h1:example}{h2:example}{h3:example}{h4:example}{h5:example}{h6:example}\\n\\n\\\\{typeRate(2):__\\\\} multiplies the time between characters being typed by two, while \\\\{typeRate(0.5):__\\\\} halves it.\\n\\n\\\\{hr\\\\} \\\\{horizontal rule\\\\} \\\\{line\\\\} \\\\{__\\\\} create a horizontal line like below:\\n{hr}\\n\\n\\\\{set:__\\\\} \\\\{input:__\\\\} (used with get/output seen below.)\\n{set:name}\\n\\n\\\\{get:__\\\\} \\\\{output:__\\\\} (used with set/input seen above.)\\n{get:name}\\n\\nAs for how the above pair works, if you ask for a name using \\\\{input:name\\\\}, you can use the name later saying \\\\{output:name\\\\}.\\n\\n\\\\{serif:__\\\\}\\n{serif:example}\\n\\n\\\\{sans-serif:__\\\\} \\\\{sans:__\\\\}\\n{sans:example}\\n\\n\\\\{mono:__\\\\} \\\\{monospace:__\\\\}\\n{mono:example}\\n\\n\\\\{cursive:__\\\\}\\n{cursive:example}\\n\\n\\\\{fantasy:__\\\\}\\n{fantasy:example}\\n\\n\\\\{audiowide:__\\\\}\\n{audiowide:example}\\n\\n\\\\{anton sc:__\\\\}\\n{anton sc:example}\\n\\nFinally, and pretty importantly, you can take your pages and break them into sections using \\\\{br\\\\} or \\\\{break\\\\}.\\nIt would look like some text, then…\\n\\\\{br\\\\}\\n…a button press later, you would see this.\\nI\'ll demonstrate this now.\\n{br}\\nThis concludes simple formatting. Want to move towards scene formatting now?","next":[{"name":"Scene Formatting","text":"Yes"},{"name":"Simple Formatting","text":"No"}]},{"name":"Scene Formatting","text":"Let\'s prepare a scene. To start, we\'ll want to put in the background.\\nFirst, go to the page titled {i:List of Image Links Page} in the {i:Edit} menu.\\nYou\'ll want a link and a short, unique reference name for each image that will appear in your story.\\nEach of these are on their own line in the following form:\\n{i:REF}:{i:LINK}\\n\\nOnce we have that, we\'ll put the following into our page.\\nI recommend it is put in the top of a section, so the start of a page or just after a \\\\{br\\\\} or \\\\{break\\\\}.\\n\\\\{scene:{i:REF}\\\\} \\\\{scene_background:{i:REF}\\\\} \\\\{scene_bg:{i:REF}\\\\} \\\\{s:{i:REF}\\\\} \\\\{sb:{i:REF}\\\\}\\n{br}\\n{scene:example_bg}\\nHere\'s the background I\'ll use as an example.\\n{br}\\nYou\'ll need to put this on each page if you want a scene there, but everything in a scene will persist between sections.\\nIn other words, scenes only last as long as a page does, and that\'s a page as in what you\'re entering in the text box in the edit menu.\\n{br}\\n{scene_remove}\\nIf you ever want to remove a scene, you can use:\\n\\\\{scene_remove\\\\} \\\\{scene_rm\\\\} \\\\{scene_delete\\\\} \\\\{scene_del\\\\} \\\\{sr\\\\} \\\\{sd\\\\}\\n{br}\\n{scene:example_bg}\\nBy the way, if you want to change the background image while you already have one, you can just use the below as though there weren\'t anything.\\n\\\\{scene:{i:REF}\\\\} \\\\{scene_background:{i:REF}\\\\} \\\\{scene_bg:{i:REF}\\\\} \\\\{s:{i:REF}\\\\} \\\\{sb:{i:REF}\\\\}\\nI\'m too lazy to make another background to demonstrate this, tho.\\n{br}\\n{scene_character(-1, 1, A):example_character}\\n{scene_character(0, 0.75, B):example_character}\\n{scene_character(1, 0.5, C):example_character}\\nTime to add a character! Same reference system as for the background.\\n\\\\{scene_character({i:X}, {i:Y}, {i:NAME}):{i:REF}\\\\} \\\\{sc({i:X}, {i:Y}, {i:NAME}):{i:REF}\\\\} \\\\{c({i:X}, {i:Y}, {i:NAME}):{i:REF}\\\\} \\\\{char({i:X}, {i:Y}, {i:NAME}):{i:REF}\\\\} \\\\{character({i:X}, {i:Y}, {i:NAME}):{i:REF}\\\\}\\nThe {i:X} goes between -1 and 1, determining a position to the left and right respectively. Numbers between go somewhere between.\\nThe {i:Y} goes between 0 and 1, determining a position below the screen to completely on screen respectively.\\n{i:NAME}s are used to differentiate characters. Note that characters can be moved / change sprites if you use the same name with the command.\\nYou can leave out the colon and {i:REF} (\\\\{sc({i:X}, {i:Y}, {i:NAME})\\\\}) if you want to keep the same sprite, by the way.\\n{hr}\\nShown above, you can see the following:\\n\\\\{scene_character(-1, 1, A):example_character\\\\}\\n\\\\{scene_character(0, 0.75, B):example_character\\\\}\\n\\\\{scene_character(1, 0.5, C):example_character\\\\}\\n{br}\\n{rc(B)}\\nI don\'t like the middle guy, so I\'ll remove him. Here\'s how I can do that:\\n\\\\{scene_remove_character({i:REF})\\\\} \\\\{scene_remove_char({i:REF})\\\\} \\\\{scene_remove_c({i:REF})\\\\} \\\\{scene_rm_character({i:REF})\\\\} \\\\{scene_rm_char({i:REF})\\\\} \\\\{scene_rm_c({i:REF})\\\\} \\\\{scene_delete_character({i:REF})\\\\} \\\\{scene_delete_char({i:REF})\\\\} \\\\{scene_delete_c({i:REF})\\\\} \\\\{scene_del_character({i:REF})\\\\} \\\\{scene_del_char({i:REF})\\\\} \\\\{scene_del_c({i:REF})\\\\} \\\\{src({i:REF})\\\\} \\\\{sdc({i:REF})\\\\} \\\\{remove_character({i:REF})\\\\} \\\\{remove_char({i:REF})\\\\} \\\\{remove_c({i:REF})\\\\} \\\\{rm_character({i:REF})\\\\} \\\\{rm_char({i:REF})\\\\} \\\\{rm_c({i:REF})\\\\} \\\\{delete_character({i:REF})\\\\} \\\\{delete_char({i:REF})\\\\} \\\\{delete_c({i:REF})\\\\} \\\\{del_character({i:REF})\\\\} \\\\{del_char({i:REF})\\\\} \\\\{del_c({i:REF})\\\\} \\\\{rc({i:REF})\\\\} \\\\{dc({i:REF})\\\\}\\n{br}\\nOk, that\'s everything you need to know for now.\\nI haven\'t gotten to any sort of effects yet.","next":[{"name":"Scene Formatting","text":"Read Again"}]},{"name":"How to Share","text":"Sharing is pretty simple. You remember that {mono:.json} file you\'ve been keeping updated by copying from the {i:File} menu\'s text box? Just send that to whoever! (You can even just send the text itself if you don\'t want to send a file.)","next":[]}],"images":[{"name":"example_bg","link":"data:image/svg+xml;utf8,<svg width=\\"1600\\" height=\\"900\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\"><rect fill=\\"%230088ff\\" x=\\"0\\" y=\\"0\\" width=\\"1600\\" height=\\"900\\"/><path d=\\"M0 700 c100 -100 1500 -100 1600 0 v200 h-1600 Z\\" fill=\\"%2300ee66\\"/><ellipse cx=\\"1500\\" cy=\\"100\\" rx=\\"200\\" ry=\\"200\\" fill=\\"%23ffff00\\"/><ellipse cx=\\"500\\" cy=\\"200\\" rx=\\"100\\" ry=\\"100\\" fill=\\"%23ffffff\\"/><ellipse cx=\\"600\\" cy=\\"200\\" rx=\\"100\\" ry=\\"100\\" fill=\\"%23ffffff\\"/><ellipse cx=\\"550\\" cy=\\"225\\" rx=\\"200\\" ry=\\"80\\" fill=\\"%23ffffff\\"/></svg>"},{"name":"example_character","link":"data:image/svg+xml;utf8,<svg width=\\"900\\" height=\\"1600\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\"><path stroke=\\"%23000000\\" stroke-width=\\"50\\" fill=\\"%2300000000\\" d=\\"M0 1600 l450 -600 l450 600\\"/><path stroke=\\"%23000000\\" stroke-width=\\"50\\" fill=\\"%2300000000\\" d=\\"M450 1000 v-600\\"/><path stroke=\\"%23000000\\" stroke-width=\\"50\\" fill=\\"%2300000000\\" d=\\"M0 500 h900\\"/><ellipse stroke=\\"%23000000\\" stroke-width=\\"50\\" fill=\\"%2300000000\\" cx=\\"450\\" cy=\\"200\\" rx=\\"200\\" ry=\\"200\\"/></svg>"}],"custom_theme":["#99c1f1","#180d80","#8ff0a4","#0a4f21","#8ff0a4","#0a4f21","#8ff0a4","#0a4f21","#000000","#f66151","#5e0505","#f66151","#5e0505","#f66151","#5e0505","#000000","#ffffff","#ffffff","#000000","#62a0ea"]}')
};
let story_vars = {};
let scene_data = {bgImg: undefined, characters: []};
let baseBaseDelay = 0; // Default base delay
let baseDelay = baseBaseDelay;

function story_start(used_story_data = story_data) {
    read_title_page(0, used_story_data);
}

async function read_page(page_name, part = 0, used_story_data = story_data) {
    let page = get_page(page_name, used_story_data);
    let d = document.createElement('div');
    story_div.innerText = "";
    story_div.appendChild(d);
    story_footer.innerText = "";

    close_modals();
    story_modal.showModal();
    
    await populateWithText(d, page.text, part, 1, used_story_data.images);
    Array.from(story_footer.children).forEach(e=>e.remove());
    if (part == grabFormatTextPartCount(page.text) - 1) {
	for (let i = 0; i < page.next.length; i++) {
	    let btn = page.next[i];
	    let button = document.createElement('button');
	    await populateWithText(button, btn.text, 0, 1, used_story_data.images);
	    button.onclick = ()=>{
		scene_data.bgImg = undefined;
		scene_data.characters = [];
		read_page(btn.name, 0, used_story_data);
	    };
	    story_footer.appendChild(button);
	};
    } else {
	let button = document.createElement('button');
	button.innerText = '→';
	button.onclick = ()=>{
	    read_page(page_name, part+1, used_story_data);
	};
	story_footer.appendChild(button);
    }
}

async function read_title_page(part = 0, used_story_data = story_data) {
    story_div.innerText = "";
    story_footer.innerText = "";
    scene_data.bgImg = undefined;
    scene_data.characters = [];
    update_custom_theme(used_story_data);
    
    let titleH1 = document.createElement('h1');
    let authorH3 = document.createElement('h3');
    let descP = document.createElement('p');
    story_div.appendChild(titleH1);
    story_div.appendChild(authorH3);
    story_div.appendChild(descP);
    
    close_modals();
    story_modal.showModal();
    
    await populateWithText(titleH1, used_story_data.title, 0, 1, used_story_data.images);
    await populateWithText(authorH3, "By "+used_story_data.author, 0, 1, used_story_data.images);
    await populateWithText(descP, used_story_data.description, 0, 1, used_story_data.images);
    story_div.innerText = "";
    story_div.appendChild(titleH1);
    story_div.appendChild(authorH3);
    story_div.appendChild(descP);
    Array.from(story_footer.children).forEach(e=>e.remove());
    let firsts = used_story_data.pages.filter(page=>page.first);
    if (firsts.length != 1) {
	alert("There was an issue finding the first page. Sorry.");
	return;
    }
    let first = firsts[0].name;
    if (part == grabFormatTextPartCount(used_story_data.description) - 1) {
	let button = document.createElement('button');
	button.innerText = "Begin";
	button.onclick = ()=>{
	    scene_data.bgImg = undefined;
	    scene_data.characters = [];
	    read_page( first, 0, used_story_data );
	};
	story_footer.appendChild(button);
    } else {
	let button = document.createElement('button');
	button.innerText = "→";
	button.onclick = ()=>{
	    read_title_page(part+1, used_story_data);
	};
	story_footer.appendChild(button);
    }

    close_modals();
    story_modal.showModal();
}

function populateWithText(domElem, text, part = 0, delayMultiplier = 1, imgList = []) {
    return populateWithText_(domElem, removeTrailingWhitespace(grabFormatTextPart(text, part)), delayMultiplier, imgList);
}

async function populateWithText_(domElem, formatProcessedText, delayMultiplier = 1, imgList = []) {
    domElem.innerText = "";
    repopulateSceneDiv(domElem, imgList);
    for (let i = 0; i < formatProcessedText.length; i++) {
	let piece = formatProcessedText[i];
	if (typeof(piece) == "string") {
	    let newElem = document.createTextNode("");
	    domElem.appendChild(newElem);
	    await populateWithPlainText(newElem, piece, delayMultiplier);
	    continue;
	}
	if (typeof(piece) != "object") {
	    console.log(piece, "is", typeof(piece));
	    continue;
	}
	if (piece.type == undefined) {
	    console.log(piece, "type is undefined");
	    continue;
	}
	if (piece.type == "bold" || piece.type == "b" || piece.type == "strong") {
	    let newElem = document.createElement("strong");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "italics" || piece.type == "italic" || piece.type == "i" || piece.type == "it" || piece.type == "em") {
	    let newElem = document.createElement("em");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "underline" || piece.type == "uline" || piece.type == "under" || piece.type == "u") {
	    let newElem = document.createElement("u");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "h1") {
	    let newElem = document.createElement("h1");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "h2") {
	    let newElem = document.createElement("h2");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "h3") {
	    let newElem = document.createElement("h3");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "h4") {
	    let newElem = document.createElement("h4");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "h5") {
	    let newElem = document.createElement("h5");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "h6") {
	    let newElem = document.createElement("h6");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type.match(/typeRate\(\d*.?\d*\)/)) {
	    let delayMultiplier1 = Number(piece.type.substr(9, piece.type.length-10));
	    let newElem = document.createElement("span");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier*delayMultiplier1, imgList);
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
	if (piece.type == "get" || piece.type == "input") {
	    let newElem = document.createElement("span");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, [story_vars[piece.kids]], delayMultiplier, imgList);
	    continue;
	}
	if (piece.type == "set" || piece.type == "output") {
	    let newElem = document.createElement("input");
	    domElem.appendChild(newElem);
	    newElem.onchange = (event) => {
		story_vars[piece.kids] = newElem.value;
	    };
	    if (story_vars[piece.kids] == undefined) {story_vars[piece.kids] = "";}
	    newElem.value = story_vars[piece.kids];
	    continue;
	}
	if (piece.type == "scene" || piece.type == "scene_background" || piece.type == "scene_bg" || piece.type == "s" || piece.type == "sb") {
	    scene_data.bgImg = piece.kids[0];
	    repopulateSceneDiv(domElem, imgList);
	    continue;
	}
	let match = piece.type.match(/(?:scene_character|sc|c|char|character)\((-?\d*.?\d*)\, ?(-?\d*.?\d*)\, ?([^,]*)\)/);
	if (match) {
	    let x = match[1];
	    x = Number(x);
	    let y = match[2];
	    y = Number(y);
	    let name = match[3];
	    let character_list = scene_data.characters.filter(character=>character.name==name);
	    if (character_list.length > 1) { // There can be only one, so we'll keep the most recent one.
		let saved_character = character_list[character_list.length-1];
		scene_data.characters = scene_data.characters.filter(character=>character.name!=name);
		scene_data.push(saved_character);
	    }
	    if (character_list.length == 0) { // We should create the character if they don't exist yet, eh?
		scene_data.characters.push({name:name, x:x, y:y, img:piece.kids[0]});
	    }
	    if (character_list.length == 1) { // We should create the character if they don't exist yet, eh?
		scene_data.characters = scene_data.characters.map(character=>{
		    if (character.name == name) {
			character.x = x;
			character.y = y;
			if (piece.kids[0] != undefined) {
			    character.img = piece.kids[0];
			}
			return character;
		    }
		    return character;
		});
	    }
	    repopulateSceneDiv(domElem, imgList);
	    continue;
	}
	if (piece.type == "scene_remove" || piece.type == "scene_delete" || piece.type == "scene_del" || piece.type == "scene_rm" || piece.type == "sr" || piece.type == "sd") {
	    scene_data.bgImg = undefined;
	    scene_data.characters = [];
	    repopulateSceneDiv(domElem, imgList);
	    continue;
	}
	match = piece.type.match(/(?:(?:scene_)?(?:remove|delete|rm|del)_(?:character|char|c)|s?rc|s?dc)\(([^,]*)\)/);
	if (match) {
	    let name = match[1];
	    scene_data.characters = scene_data.characters.filter(character=>character.name!=name);
	    repopulateSceneDiv(domElem, imgList);
	    continue;
	}
	if (piece.type == "sans" || piece.type == "sans-serif") {
	    let newElem = document.createElement("span");
	    newElem.classList.add("sans");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "serif") {
	    let newElem = document.createElement("span");
	    newElem.classList.add("serif");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "mono" || piece.type == "monospace") {
	    let newElem = document.createElement("span");
	    newElem.classList.add("mono");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "cursive") {
	    let newElem = document.createElement("span");
	    newElem.classList.add("cursive");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "fantasy") {
	    let newElem = document.createElement("span");
	    newElem.classList.add("fantasy");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "audiowide") {
	    let newElem = document.createElement("span");
	    newElem.classList.add("audiowide");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
	}
	if (piece.type == "anton sc") {
	    let newElem = document.createElement("span");
	    newElem.classList.add("anton-sc");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier, imgList);
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

// TODO
function repopulateSceneDiv(baseDomElem, imgList = []) {
    if (scene_data.bgImg != undefined) {
	if (!document.getElementById("scene_div_div")) {
	    let newElem0 = document.createElement("div");
	    newElem0.style = "width: 100%; height: clamp(10vh,calc(56.25vw - 4.5em),calc(100vh - 11em - 30px - 5em)); background-color: var(--primary-bg); overflow: hidden;";
	    newElem0.id = "scene_div_div";
	    baseDomElem.prepend(newElem0);
	    let newElem1 = document.createElement("div");
	    newElem1.style.aspectRatio = "16 / 9";
	    newElem1.style.height = "100%";
	    newElem1.style.margin = "auto";
	    newElem1.style.overflow = "hidden";
	    newElem1.style.backgroundRepeat = "no-repeat";
	    newElem1.style.backgroundSize = "100% 100%";
	    newElem1.style.position = "relative";
	    newElem1.id = "scene_div";
	    newElem0.appendChild(newElem1);
	}
	document.getElementById("scene_div").style.backgroundImage = "url('"+(imgList.filter(e=>e.name == scene_data.bgImg)[0] || {link: example_bg}).link+"')";
	scene_data.characters.forEach(character=>{
	    let domElem = document.getElementById("scene_character_"+character.name);
	    if (domElem == undefined) {
		domElem = document.createElement("div");
		domElem.id = "scene_character_"+character.name;
		domElem.style = "aspect-ratio: 9 / 16; height: 100%; position: absolute; background-repeat: no-repeat; background-size: 100% 100%;";
		document.getElementById("scene_div").appendChild(domElem);
	    }
	    domElem.style.backgroundImage = "url('"+(imgList.filter(e=>e.name == character.img)[0] || {link: example_character}).link+"')";
	    domElem.style.left = 68.359375*(((character.x == undefined)?0:character.x)/2+0.5)+"%";
	    domElem.style.top = 100*(1-((character.y == undefined)?0.75:character.y))+"%";
	});
	// Remove all divs associated with a character that has been removed.
	Array.from(scene_div.children).forEach(characterDiv=>{
	    if (!scene_data.characters.map(character=>"scene_character_"+character.name).includes(characterDiv.id)) {
		characterDiv.remove();
	    }
	});
    } else {
	if (document.getElementById("scene_div_div")) {
	    document.getElementById("scene_div_div").remove();
	}
    }
}

function removeTrailingWhitespace(formattedText) {
    let sceneStuff = [/scene|scene_background|scene_bg|s|sb/, /(?:scene_character|sc|c|char|character)\(.*\)/, /scene_remove|scene_delete|scene_del|scene_rm|sr|sd/, /(?:(?:scene_)?(?:remove|delete|rm|del)_(?:character|char|c)|s?rc|s?dc)\(.*\)/];
    let inWhiteSpacePart = true;
    let ft = formattedText.filter((part)=>{
	if (typeof(part) == 'string') {
	    inWhiteSpacePart = false;
	    return true;
	}
	if (typeof(part) != 'object') {
	    inWhiteSpacePart = false;
	    return true;
	}
	if (sceneStuff.map(e=>part.type.match(e)==part.type).includes(true)) {
	    return true;
	}
	if (part.type != 'newLine') {
	    inWhiteSpacePart = false;
	    return true;
	}
	return !inWhiteSpacePart;
    });
    ft = ft.reverse();
    inWhiteSpacePart = true;
    ft = ft.filter((part)=>{
	if (typeof(part) == 'string') {
	    inWhiteSpacePart = false;
	    return true;
	}
	if (typeof(part) != 'object') {
	    inWhiteSpacePart = false;
	    return true;
	}
	if (sceneStuff.map(e=>part.type.match(e)==part.type).includes(true)) {
	    return true;
	}
	if (part.type != 'newLine') {
	    inWhiteSpacePart = false;
	    return true;
	}
	return !inWhiteSpacePart;
    });
    ft = ft.reverse();
//    if (typeof(ft[0]) == 'string') {
//	ft[0] = ft[0].match(/[^\s].*/)[0];
//    }
//    if (typeof(ft[ft.length-1]) == 'string') {
//	ft[ft.length-1] = ft[ft.length-1].match(/.*[^\s]/)[0];
//    }
    ft = ft.map((part)=>{
	if (typeof(part) != 'string') {
	    return {type:part.type, kids:removeTrailingWhitespace(part.kids)};
	}
//	return part.match(/[^\s].*[^\s]/)[0];
	return part;
    });
    return ft;
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
 * This function returns the example as ["Hello, ",{type:"get",kids:["name"]},"!"].
 */
function grabFormatText(text) {
    text = text.replace(/\n/g, "{newLine}");
    let accumulator = [];
    let indexOfLastCharProcessed = -1;
    while (true) {
	let openBraceIndex = unescapedIndexOf(text, '{', indexOfLastCharProcessed+1);
	if (openBraceIndex == -1) {
	    if (indexOfLastCharProcessed != text.length - 1) {
		accumulator.push(text.substr(indexOfLastCharProcessed+1));
	    }
	    break;
	}
	let closeBraceIndex = unescapedMatchingIndexOf(text, '}', ['{', '}'], openBraceIndex);
	if (closeBraceIndex == -1) {
	    if (indexOfLastCharProcessed != text.length - 1) {
		accumulator.push(text.substr(indexOfLastCharProcessed+1));
	    }
	    break;
	}
	let colonIndex = unescapedIndexOf(text, ':', openBraceIndex);
	if (openBraceIndex != indexOfLastCharProcessed + 1) {
	    accumulator.push(text.substr(indexOfLastCharProcessed+1, openBraceIndex-indexOfLastCharProcessed-1));
	    indexOfLastCharProcessed = openBraceIndex - 1;
	}
	if (colonIndex == -1 || colonIndex > closeBraceIndex) {
	    accumulator.push({type:text.substr(openBraceIndex+1, closeBraceIndex-openBraceIndex-1), kids:[]});
	} else {
	    accumulator.push({type:text.substr(openBraceIndex+1, colonIndex-openBraceIndex-1), kids:grabFormatText(text.substr(colonIndex+1, closeBraceIndex-colonIndex-1))});
	}
	indexOfLastCharProcessed = closeBraceIndex;
    }
    accumulator = accumulator.map(e=>{
	if (typeof(e) == 'string') {
	    return e.replace(/\\\{/g, '{').replace(/\\\}/g, '}').replace(/\\\\/g, '\\');
	}
	return e;
    });
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

// If searching for '{', pair should be ['{', '}']
function unescapedMatchingIndexOf(source, search, pair, startIndex) {
    let count = 0;
    for (let i = startIndex; i < source.length; i++) {
	if (source.substr(i, pair[1].length) == pair[1]) {count--;}
	if (source.substr(i, search.length) == search && count == 0) {
	    return i;
	}
	if (source.substr(i, pair[0].length) == pair[0]) {count++;}
    }
    return -1;
}

function story_edit(used_story_data = story_data) {
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
    {
	let li = document.createElement('li');
	let button = document.createElement('button');
	let em = document.createElement('em');
	em.innerText = 'List of Image Links Page';
	button.appendChild(em);
	button.onclick = (event)=>{
	    open_image_links_page_options_menu();
	}
	li.appendChild(button);
	page_list.appendChild(li);
    }
    {
	let li = document.createElement('li');
	let button = document.createElement('button');
	let em = document.createElement('em');
	em.innerText = 'Custom Theme Colors Page';
	button.appendChild(em);
	button.onclick = (event)=>{
	    open_custom_theme_page_options_menu();
	}
	li.appendChild(button);
	page_list.appendChild(li);
    }
    used_story_data.pages.forEach(page=>{
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

function open_image_links_page_options_menu() {
    image_links_edit_input.value = story_data.images.reduce((a,i)=>{
	return a+'\n'+i.name+':'+i.link;
    }, '').substr(1);
    close_modals();
    image_links_edit_modal.showModal();
}

function open_custom_theme_page_options_menu() {
    if (story_data.custom_theme == undefined) {
	story_data.custom_theme = example_custom_theme.map(e=>e);
    }
    for (let i = 0; i < 20; i++) {
	document.getElementById('custom_theme_color'+i).value = story_data.custom_theme[i];
    }
    
    close_modals();
    custom_theme_edit_modal.showModal();
}

function random_color(alpha = false) {
    let a = '#';
    for (let i = 0; i < ((alpha)?8:6); i++) {
	a += '0123456789abcdef'.charAt(Math.floor(Math.random()*16));
    }
    return a;
}

function make_first_page(page_name, used_story_data = story_data) {
    used_story_data.pages.map(page=>{
	page.first = page.name == page_name;
    });
}

function create_page(page_name, used_story_data = story_data) {
    used_story_data.pages.push({name:page_name, text:'', next:[]});
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

function delete_page(page_name, used_story_data = story_data) {
    story_data.pages = used_story_data.pages.filter(page=>page.name!=page_name);
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

function page_exists(page_name, used_story_data = story_data) {
    return used_story_data.pages.reduce((a,b)=>(a || b.name == page_name), false);
}

function get_page(page_name, used_story_data = story_data) {
    return used_story_data.pages.filter(page=>page.name==page_name)[0];
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

function save_edit_image_links() {
    story_data.images = image_links_edit_input.value.split('\n').map(e=>{
	let i = e.indexOf(':');
	if (i == -1) {return  false;}
	return {name: e.substring(0, i), link: e.substring(i+1)};
    }).filter(e=>e);
}

function open_file_menu() {
    story_data_json.value = JSON.stringify(story_data);
    close_modals();
    file_menu.showModal();
}

function update_custom_theme(used_story_data = story_data) {
    let root = document.querySelector(':root');
    ['--custom-main-bg', '--custom-main-fg', '--custom-primary-bg', '--custom-primary-fg', '--custom-secondary-bg', '--custom-secondary-fg', '--custom-tertiary-bg', '--custom-tertiary-fg', '--custom-transparent', '--custom-close-bg', '--custom-close-fg', '--custom-close2-bg', '--custom-close2-fg', '--custom-close3-bg', '--custom-close3-fg', '--custom-contrast-bg', '--custom-contrast-fg', '--custom-ta-bg', '--custom-ta-fg', '--custom-header-bg'].forEach((e, i)=>{
	root.style.setProperty(e, used_story_data.custom_theme[i]);
    });
}

function figure_out_theme(theme = args.theme) {
    update_custom_theme(story_data);
    
    if (theme != undefined) { theme = theme.toLowerCase(); }
    document.body.classList.remove("dark-mode");
    document.body.classList.remove("light-mode");
    document.body.classList.remove("high-contrast-mode");
    document.body.classList.remove("haxor-mode");
    document.body.classList.remove("custom-mode");
    if (theme == 'l' || theme == 'light' || theme == 'light mode') {
	document.body.classList.add("light-mode");
    }
    if (theme == 'd' || theme == 'dark' || theme == 'dark mode') {
	document.body.classList.add("dark-mode");
    }
    if (theme == 'hc' || theme == 'high contrast' || theme == 'contrast' || theme == 'high contrast mode') {
	document.body.classList.add("high-contrast-mode");
    }
    if (theme == 'h' || theme == 'haxor' || theme == 'h4x0r' || theme == 'haxor mode' || theme == 'h4x0r m0d3') {
	document.body.classList.add("haxor-mode");
    }
    if (theme == 'c' || theme == 'custom' || theme == 'custom mode') {
	document.body.classList.add("custom-mode");
    }
}

async function sleep(n) {
    if (n==0) return;
    await new Promise(resolve => setTimeout(resolve, n));
}
