let args = location.search.substr(1).split('&').map(e=>e.split('=')).reduce((a,b)=>{a[b[0]] = b[1]; return a;}, {}) ;
let selected_page = "No page selected";

let example_bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAALCAIAAAAStyFtAAABg2lDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUqgnYQccjQOtlFRRxrFYpQIdQKrTqYXPoFTQxJiouj4Fpw8GOx6uDirKuDqyAIfoA4OzgpukiJ/0sKLWI8OO7Hu3uPu3eA0KwxzepJAppum9l0SswXVsTQK0IIYxBxiDKzjFlJysB3fN0jwNe7BM/yP/fn6FeLFgMCInGSGaZNvE48vWkbnPeJo6wiq8TnxOMmXZD4keuKx2+cyy4LPDNq5rJzxFFisdzFSheziqkRTxHHVE2nfCHvscp5i7NWq7P2PfkLI0V9eYnrNEeRxgIWIUGEgjqqqMFGgladFAtZ2k/5+Edcv0QuhVxVMHLMYwMaZNcP/ge/u7VKkxNeUiQF9L44zkccCO0CrYbjfB87TusECD4DV3rHv9EEZj5Jb3S02BEwsA1cXHc0ZQ+43AGGnwzZlF0pSFMolYD3M/qmAjB0C/Ster2193H6AOSoq8wNcHAIjJUpe83n3eHu3v490+7vB5xzcrcCFsYUAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AcIEicefj8/qAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABiSURBVCjPY7Td/5eBgeGQAxMDA4PdgX9wBgMOsEZcH8JggmvDyoBz0UQYGBgYIXbiAch6IG6BWEtYJy7AxEAuGAidLMicW1clIQw17efIXLgI9rBFVocLIOtnFJ8iRm9/AgDvNiGxpkorPAAAAABJRU5ErkJggg==';
let example_character = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAABg2lDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUqgnYQccjQOtlFRRxrFYpQIdQKrTqYXPoFTQxJiouj4Fpw8GOx6uDirKuDqyAIfoA4OzgpukiJ/0sKLWI8OO7Hu3uPu3eA0KwxzepJAppum9l0SswXVsTQK0IIYxBxiDKzjFlJysB3fN0jwNe7BM/yP/fn6FeLFgMCInGSGaZNvE48vWkbnPeJo6wiq8TnxOMmXZD4keuKx2+cyy4LPDNq5rJzxFFisdzFSheziqkRTxHHVE2nfCHvscp5i7NWq7P2PfkLI0V9eYnrNEeRxgIWIUGEgjqqqMFGgladFAtZ2k/5+Edcv0QuhVxVMHLMYwMaZNcP/ge/u7VKkxNeUiQF9L44zkccCO0CrYbjfB87TusECD4DV3rHv9EEZj5Jb3S02BEwsA1cXHc0ZQ+43AGGnwzZlF0pSFMolYD3M/qmAjB0C/Ster2193H6AOSoq8wNcHAIjJUpe83n3eHu3v490+7vB5xzcrcCFsYUAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AcIEigcF6lCSwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABCSURBVCjPY2TABP+R2IwMeMB/fHwmBhIASYoZKXEzLreT54z/DBQCyp0xFBXjC4n/pAbZf5LCFpv4f2JtJDa6/wMAsxQRBVt+KBoAAAAASUVORK5CYII=';

let story_data = {title:'Untitled',description:'This story does not have a description.',author:'Joseppi007 (github) AKA Rose',pages:[{name:'Hello World',text:'{scene:https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.worldatlas.com%2Fr%2Fw1200%2Fupload%2F04%2Fab%2Fd1%2Ffish-species-tropical.jpg&f=1&nofb=1&ipt=59de0569334d2bfa49fb446d27052056d28a3c3f0431ca4f168a214a0871cde4&ipo=images}\n{scene_character(-1,1,A):https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.xXVVpcottGRlEH9vDdLPPwHaHM%26pid%3DApi&f=1&ipt=605c47c138d3b963699bdb363b7c0ed8ec01ff32894fa1658c47fbe94bed4c1a&ipo=images}\n{scene_character(0,0.75,B):https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.xXVVpcottGRlEH9vDdLPPwHaHM%26pid%3DApi&f=1&ipt=605c47c138d3b963699bdb363b7c0ed8ec01ff32894fa1658c47fbe94bed4c1a&ipo=images}\n{scene_character(1,0.5,C):https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.xXVVpcottGRlEH9vDdLPPwHaHM%26pid%3DApi&f=1&ipt=605c47c138d3b963699bdb363b7c0ed8ec01ff32894fa1658c47fbe94bed4c1a&ipo=images}\nThis is a placeholder.\n{b:{u:{i:Nested Formatting Test}}}\nType something here: {set:example}\n{br}\nBreak test as well.\n{get:example}',next:[{name:'Welld Horlo',text:'==>'}],first:true},{name:'Welld Horlo',text:'phir is a tlaceholdes.',next:[{name:'Hello World',text:'==>'}],first:false}]};
let special_story_data = {help:{title:'The Guide',description:'This is a guide to help users in the creation of stories using this tool.',author:'Joseppi007 (github) AKA Rose',pages:[{name:'Start',text:'Seeing as this is a textual medium, I have decided to document this tool with itself.\nClick on a button below for what section of the guide you wish to read.\n{typeRate(0.5):Please note that clicking while the type effect is playing will speed it up greatly.}',next:[{name:'Reader Guide',text:'How do I read somebody\'s story?'}, {name:'GUI',text:'Where to go?'}, {name:'Formatting',text:'How to format?'}, {name:'Sharing',text:'How to share?'}],first:true},{name:'Reader Guide',text:'{h1:How to read a story.}\nTo read a story somebody wrote, you must first copy their JSON data. This could either be stored inside a JSON file or sent to you as a strange looking mess of brackets, colons and quotes with text all over the place. Once you have the text in your clipboard, click on the {b:File} button in the header of the web page, then replace all of the JSON text present in the large rectangle with what you have in your clipboard.\nClose the Pop-Up, then press {b:Play} in the header.\nThis may be made easier in the future, as I understand this is a lot more work than most would want.',next:[{name:'Start',text:'{i:Back}'}],first:false},{name:'GUI',text:'{h1:Where things are.}\nIf you wish to load a story you or somebody else has saved earlier or save the story you currently have, go to the {b:File} menu by clicking the button in the header. The esoteric text in the text box you will be presented with is the story, and saving this text somewhere will save the story. Copy/pasting it into that text box later will load the story back. Note that you {b:must} save the story you are working on in this way before closing the tab, as your story will be lost if the page is ever unloaded.\n\nIf you wish to read the story you have loaded, then select the {b:Play} button in the header.\nThe {b:Edit} menu can also be used if you wish to start from a page that is not the title page. Simply select the page from the list that appears, then select {i:Read From Here}.\n\nIf you wish to edit the story, click on the {b:Edit} button in the header. You should start with the {i:Title Page} to put yourself as the author and alike, but you do not need to if you prefer it that way. There will probably be some pages already present; you can click on them and select {i:Delete This Page} to remove them if you wish, otherwise you could simply edit the pages. The bottom of the page editor for each page will have a place to say which page(s) come next; the endings will have no next pages. Ensure that you select which page is your first page before you or anybody else reads it!',next:[{name:'Start',text:'{i:Back}'}],first:false},{name:'Formatting',text:'{h1:Formatting}{h3:From Bold and Italics to Graphics.}{hr}\nSuppose you wish to make some text {b:bold}. You can do this by writing \\{bold:{bold:Your Text Here}\\}. The formatting consists of curly braces on the left and right, a colon to seperate the type of formatting and the text to be formatted, and said type and text.\n\n\\{bold:example\\} → {bold:example}\n\\{italics:example\\} → {italics:example}\n\\{underline:example\\} → {underline:example}\n\n\\{h1:example\\} through \\{h6:example\\} are for headers, and appear as {h1:example}{h2:example}{h3:example}{h4:example}{h5:example}{h6:example}\n\\{hr\\} appears as a horizontal line as below: (Note that you do not need the colon if there is no inner text.){hr}\nIf you want something to type more {typeRate(2):slowly}, use \\{typeRate(2):example\\} to type with twice the delay between characters typed. Using a number less than one will cause the typing to happen faster.\n\nIf you want to, say, ask for the reader\'s name, you can use \\{set:name\\} to make one of these: {set:name}. Use \\{get:name\\} in order to say the name the reader typed.\n\nIn order to end one section of a page to start a new one, type \\{br\\} to make a break. You can keep typing after it, but the reader will not see what comes next until they press an arrow button, and what was there before will no longer be visible. Here is what that looks like:{br}\nAs you can see, everything from before has been hidden, and this text is shown.\n\nBy the way, you typed {get:name} in the last input field. (I used \\{get:name\\} to figure that out.)\n\nIn the next section, I will discuss how to make a scene with a background and characters.{br}\n{scene:'+example_bg+'}\nIn order to make a scene, you need a link.\n\\{scene:{i:LINK}\\}\n{br}\nScenes persist between sections, but not pages. Recall that sections are seperated by \\{br\\} in a page.\n{br}\n{scene_remove}\\{scene_remove\\} can be used to remove the scene.\n{br}\n{scene:'+example_bg+'}{scene_character(0,0.5,Bob):'+example_character+'}While you have a scene, you can put characters in it. Again, you\'ll need a link, but you will also need to give the character a position on the scene and a name. This is in the form \\{scene_character({i:Horizontal Position}, {i:Vertical Position}, {i:Name}):{i:LINK}\\}. The horizontal position is a number between -1 and 1, where -1 is left and 1 is right. Vertical position goes between 0 and 1 where 0 is below the scene and 1 is in the scene. Everything in-between is semi-obscured by the bottom of the scene. The name will be used to move or alter the image of the character later. Names should be unique per character.\n{br}\nWithout using the link again, you can move an already placed character by using \\{scene_character({i:X}, {i:Y}, {i:Name})\\}.{scene_character(-1,1,Bob)}\n{br}\n{scene_remove_character(Bob)}\\{scene_remove_character({i:Name})\\} can be used to remove a character that is currently on screen.\n{br}\n{scene_remove}\n…and that\'s everything! I hope I covered everything well enough.',next:[{name:'Start',text:'{i:Back}'}],first:false},{name:'Sharing',text:'',next:[{name:'Start',text:'{i:Back}'}],first:false}]}}
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
    
    await populateWithText(d, page.text, part, 1);
    Array.from(story_footer.children).forEach(e=>e.remove());
    if (part == grabFormatTextPartCount(page.text) - 1) {
	for (let i = 0; i < page.next.length; i++) {
	    let btn = page.next[i];
	    let button = document.createElement('button');
	    await populateWithText(button, btn.text);
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
    
    let titleH1 = document.createElement('h1');
    let authorH3 = document.createElement('h3');
    let descP = document.createElement('p');
    story_div.appendChild(titleH1);
    story_div.appendChild(authorH3);
    story_div.appendChild(descP);
    
    close_modals();
    story_modal.showModal();
    
    await populateWithText(titleH1, used_story_data.title);
    await populateWithText(authorH3, "By "+used_story_data.author);
    await populateWithText(descP, used_story_data.description);
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

function populateWithText(domElem, text, part = 0, delayMultiplier = 1) {
    return populateWithText_(domElem, removeTrailingWhitespace(grabFormatTextPart(text, part)), delayMultiplier);
}

async function populateWithText_(domElem, formatProcessedText, delayMultiplier = 1) {
    domElem.innerText = "";
    repopulateSceneDiv(domElem);
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
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type == "italics" || piece.type == "italic" || piece.type == "i" || piece.type == "it" || piece.type == "em") {
	    let newElem = document.createElement("em");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type == "underline" || piece.type == "uline" || piece.type == "under" || piece.type == "u") {
	    let newElem = document.createElement("u");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type == "h1") {
	    let newElem = document.createElement("h1");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type == "h2") {
	    let newElem = document.createElement("h2");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type == "h3") {
	    let newElem = document.createElement("h3");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type == "h4") {
	    let newElem = document.createElement("h4");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type == "h5") {
	    let newElem = document.createElement("h5");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type == "h6") {
	    let newElem = document.createElement("h6");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier);
	}
	if (piece.type.match(/typeRate\(\d*.?\d*\)/)) {
	    let delayMultiplier1 = Number(piece.type.substr(9, piece.type.length-10));
	    let newElem = document.createElement("span");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, piece.kids, delayMultiplier*delayMultiplier1);
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
	if (piece.type == "get") {
	    let newElem = document.createElement("span");
	    domElem.appendChild(newElem);
	    await populateWithText_(newElem, [story_vars[piece.kids]], delayMultiplier);
	    continue;
	}
	if (piece.type == "set") {
	    let newElem = document.createElement("input");
	    domElem.appendChild(newElem);
	    newElem.onchange = (event) => {
		story_vars[piece.kids] = newElem.value;
	    };
	    if (story_vars[piece.kids] == undefined) {story_vars[piece.kids] = "";}
	    newElem.value = story_vars[piece.kids];
	    continue;
	}
	if (piece.type == "scene" || piece.type == "scene_background" || piece.type == "scene_bg") {
	    scene_data.bgImg = piece.kids[0];
	    repopulateSceneDiv(domElem);
	    continue;
	}
	let match = piece.type.match(/scene_character\((\d*.?\d*)\, ?(\d*.?\d*)\, ?([^,]*)\)/);
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
	    repopulateSceneDiv(domElem);
	    continue;
	}
	if (piece.type == "scene_remove" || piece.type == "scene_delete" || piece.type == "scene_del" || piece.type == "scene_rm") {
	    scene_data.bgImg = undefined;
	    scene_data.characters = [];
	    repopulateSceneDiv(domElem);
	    continue;
	}
	match = piece.type.match(/scene_(?:remove|delete|rm|del)_character\(([^,]*)\)/);
	if (match) {
	    let name = match[1];
	    scene_data.characters = scene_data.characters.filter(character=>character.name!=name);
	    repopulateSceneDiv(domElem);
	    continue;
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
function repopulateSceneDiv(baseDomElem) {
    if (scene_data.bgImg != undefined) {
	if (!document.getElementById("scene_div_div")) {
	    let newElem0 = document.createElement("div");
	    newElem0.style = "width: 100%; height: clamp(10vh,calc(56.25vw - 4.5em),calc(100vh - 11em - 30px - 5em)); background-color: var(--primary-bg); overflow: hidden;";
	    newElem0.id = "scene_div_div";
	    baseDomElem.prepend(newElem0);
	    let newElem1 = document.createElement("div");
	    newElem1.style = "aspect-ratio: 16 / 9; height: 100%; margin: auto; background-image: url("+scene_data.bgImg+"); overflow: hidden; background-repeat: no-repeat; background-size: 100% 100%; position: relative;";
	    newElem1.id = "scene_div";
	    newElem0.appendChild(newElem1);
	}
	scene_data.characters.forEach(character=>{
	    let domElem = document.getElementById("scene_character_"+character.name);
	    if (domElem == undefined) {
		domElem = document.createElement("div");
		domElem.id = "scene_character_"+character.name;
		domElem.style = "aspect-ratio: 9 / 16; height: 100%; position: absolute; background-repeat: no-repeat; background-size: 100% 100%;";
		document.getElementById("scene_div").appendChild(domElem);
	    }
	    domElem.style.backgroundImage = "url("+((character.img == undefined)?example_character:character.img)+")";
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
	if (part.type.substring(0,5) == 'scene') {
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
	if (part.type.substring(0,5) == 'scene') {
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

function open_file_menu() {
    story_data_json.value = JSON.stringify(story_data);
    close_modals();
    file_menu.showModal();
}

function figure_out_theme(theme = args.theme) {
    if (theme != undefined) { theme = theme.toLowerCase(); }
    document.body.classList.remove("dark-mode");
    document.body.classList.remove("light-mode");
    if (theme == 'l' || theme == 'light' || theme == 'light mode') {
	document.body.classList.add("light-mode");
    }
    if (theme == 'd' || theme == 'dark' || theme == 'dark mode') {
	document.body.classList.add("dark-mode");
    }
}

async function sleep(n) {
    if (n==0) return;
    await new Promise(resolve => setTimeout(resolve, n));
}
