const nbspRegex = new RegExp(String.fromCharCode(160), 'g');

const utilAsciidoc = function (string: string) {
	string = string.replace(nbspRegex, ' ');

	let all = document.createElement('div');
	all.innerHTML = string;

	// fix for apple converted space
	let spans = all.querySelectorAll('span.Apple-converted-space');
	for (let i = 0; i < spans.length; i++) {
		let parentNode = (spans[i].parentNode as HTMLElement) || '';
		if (parentNode) parentNode.replaceChild(document.createTextNode(' '), spans[i]);
	}

	// table converter
	let tables = all.querySelectorAll('table');
	for (let i = 0; i < tables.length; i++) {
		let tableBoundary = '|====\n';
		let tableText = '';
		let table = tables[i];
		let trs = table.querySelectorAll('tr');
		let caption = table.querySelector('caption');

		tableText += '\n\n';
		if (caption) tableText += '.' + caption.innerText.replace(/Table \d+\. /, '') + '\n';
		tableText += tableBoundary;

		for (let j = 0; j < trs.length; j++) {
			let tr = trs[j];
			let columns = tr.querySelectorAll('td');
			if (columns.length == 0) columns = tr.querySelectorAll('th');
			let row = [].slice
				.call(columns)
				.map(function (e: HTMLElement) {
					return '|' + (e.innerHTML ? traverse(e.innerHTML) : '');
				})
				.join(' ');
			tableText += row + '\n';
		}

		tableText += tableBoundary;

		if (table.parentNode) table.parentNode.replaceChild(document.createTextNode(tableText), table);
	}

	// fix pre > code block
	let codes = all.querySelectorAll('pre,code,pre>code');
	for (let i = 0; i < codes.length; i++) {
		let code = codes[i] as HTMLElement;
		if (code.innerHTML.split(/\n|\r|<br>|<\/br>/).length > 1) {
			if (code.parentNode)
				code.parentNode.replaceChild(
					document.createTextNode('\n[source,java]\n----\n' + code.innerText + '\n----\n'),
					code
				);
		}
	}

	// remove anchor surrounding an img
	let images = all.querySelectorAll('img');
	for (let i = 0; i < images.length; i++) {
		let parentNode = (images[i].parentNode as HTMLElement) || '';
		if (parentNode.parentNode)
			if (parentNode.constructor === HTMLAnchorElement) parentNode.parentNode.replaceChild(images[i], parentNode);
	}
	string = traverse(all.innerHTML);

	function traverse(string: string) {
		let ELEMENTS = [
			{
				patterns: ['script', 'iframe', 'meta', 'embed'],
				replacement: function () {
					return '';
				},
			},
			{
				patterns: ['div', 'span', 'body', 'i', 'section', 'html'],
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? innerHTML : '';
				},
			},
			{
				patterns: 'p',
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '\n' + innerHTML + '\n' : '';
				},
			},
			{
				patterns: 'br',
				type: 'void',
				replacement: '  \n',
			},
			{
				patterns: 'h([1-6])',
				replacement: function (str: string, hLevel: number, attrs: string, innerHTML: string) {
					let hPrefix = '';
					for (let i = 0; i < hLevel; i++) {
						hPrefix += '=';
					}
					return '\n\n' + hPrefix + ' ' + innerHTML + '\n';
				},
			},
			{
				patterns: 'hr',
				type: 'void',
				replacement: "\n\n'''\n",
			},
			{
				patterns: 'a',
				replacement: function (str: string, attrs: string, innerHTML: string) {
					let href = attrs.match(attrRegExp('href'));

					return href ? href[1] + '[' + innerHTML + ']' : '';
					//return href ? '[' + innerHTML + ']' + '(' + href[1] + (title && title[1] ? ' "' + title[1] + '"' : '') + ')' : str;
				},
			},
			{
				patterns: ['b', 'strong'],
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '**' + innerHTML + '**' : '';
				},
			},
			{
				patterns: ['i', 'em'],
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '__' + innerHTML + '__' : '';
				},
			},
			{
				patterns: 'sub',
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '~' + innerHTML + '~' : '';
				},
			},
			{
				patterns: 'sup',
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '^' + innerHTML + '^' : '';
				},
			},
			{
				patterns: 'u',
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '[underline]#' + innerHTML + '#' : '';
				},
			},
			{
				patterns: 'del',
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '[line-through]#' + innerHTML + '#' : '';
				},
			},
			{
				patterns: 'code',
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '``' + innerHTML + '``' : '';
				},
			},
			{
				patterns: 'pre',
				replacement: function (str: string, attrs: string, innerHTML: string) {
					return innerHTML ? '\n\n----\n' + innerHTML + '\n----\n' : '';
				},
			},
			{
				patterns: 'img',
				type: 'void',
				replacement: function (str: string, attrs: string) {
					let src = attrs.match(attrRegExp('src')),
						alt = attrs.match(attrRegExp('alt'));
					return src ? '\nimage::' + src[1] + '[' + (alt && alt[1] ? alt[1] : '') + ']\n' : '';
					//return src ? '![' + (alt && alt[1] ? alt[1] : '') + ']' + '(' + src[1] + (title && title[1] ? ' "' + title[1] + '"' : '') + ')' : '';
				},
			},
		];
		let len = ELEMENTS.length;
		for (let i = 0; i < len; i++) {
			if (typeof ELEMENTS[i].patterns === 'string') {
				string = replaceEls(string, {
					tag: ELEMENTS[i].patterns,
					replacement: ELEMENTS[i].replacement,
					type: ELEMENTS[i].type,
				});
			} else {
				let pLen = ELEMENTS[i].patterns.length;
				for (let j = 0; j < pLen; j++) {
					string = replaceEls(string, {
						tag: ELEMENTS[i].patterns[j],
						replacement: ELEMENTS[i].replacement,
						type: ELEMENTS[i].type,
					});
				}
			}
		}

		function replaceEls(html: string, elProperties: any) {
			let pattern =
					elProperties.type === 'void'
						? '<' + elProperties.tag + '\\b([^>]*)\\/?>'
						: '<' + elProperties.tag + '\\b([^>]*)>([\\s\\S]*?)<\\/' + elProperties.tag + '>',
				regex = new RegExp(pattern, 'gi'),
				asciidoc = '';
			if (typeof elProperties.replacement === 'string') {
				asciidoc = html.replace(regex, elProperties.replacement);
			} else {
				asciidoc = html.replace(regex, function (str, p1, p2, p3) {
					return elProperties.replacement.call(this, str, p1, p2, p3);
				});
			}
			return asciidoc;
		}

		return string;
	}

	function strip(html: string) {
		html = html.replace(/<[/]?(meta)[^><]*>/gi, '');
		html = html.replace(/<[/]?(span)[^><]*>/gi, '');
		html = html.replace(/<[/]?(div)[^><]*>/gi, '');
		html = html.replace(/<[/]?(section)[^><]*>/gi, '');
		html = html.replace(/<[/]?(i)[^><]*>/gi, '');
		html = html.replace(/<[/]?(html:string)[^><]*>/gi, '');
		html = html.replace(/<[/]?(body)[^><]*>/gi, '');
		html = html.replace(/(&gt;)/gi, '>');
		html = html.replace(/(&lt;)/gi, '<');
		html = html.replace(/(&amp;)/gi, '&');
		html = html.replace(/(\u2014)/gi, '--');
		html = html.replace(/(\u2009)/gi, ' ');
		return html;
	}

	function attrRegExp(attr: string) {
		return new RegExp(attr + '\\s*=\\s*["\']?([^"\']*)["\']?', 'i');
	}

	// Pre code blocks

	string = string.replace(/<pre\b[^>]*>`([\s\S]*?)`<\/pre>/gi, function (str, innerHTML) {
		let text = innerHTML;
		text = text.replace(/^\t+/g, '  '); // convert tabs to spaces (you know it makes sense)
		text = text.replace(/\n/g, '\n    ');
		return '\n\n    ' + text + '\n';
	});

	// Lists

	// Escape numbers that could trigger an ol
	// If there are more than three spaces before the code, it would be in a pre tag
	// Make sure we are escaping the period not matching any character
	string = string.replace(/^(\s{0,3}\d+)\. /g, '$1\\. ');

	// Converts lists that have no child lists (of same type) first, then works its way up
	let noChildrenRegex = /<(ul|ol)\b[^>]*>(?:(?!<ul|<ol)[\s\S])*?<\/\1>/gi;
	while (string.match(noChildrenRegex)) {
		string = string.replace(noChildrenRegex, function (str) {
			return replaceLists(str);
		});
	}

	function replaceLists(html: string) {
		html = html.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, function (str, listType, innerHTML) {
			let lis = innerHTML.split('</li>');
			lis.splice(lis.length - 1, 1);
			let len = lis.length;
			for (let i = 0; i < len; i++) {
				if (lis[i]) {
					let prefix = listType === 'ol' ? i + 1 + '.  ' : '*   ';
					lis[i] = lis[i].replace(/\s*<li[^>]*>([\s\S]*)/i, function (str: string, innerHTML: string) {
						innerHTML = innerHTML.replace(/^\s+/, '');
						innerHTML = innerHTML.replace(/\n\n/g, '\n\n    ');
						// indent nested lists
						innerHTML = innerHTML.replace(/\n([ ]*)+(\*|\d+\.) /g, '\n$1    $2 ');
						return prefix + innerHTML;
					});
				}
				lis[i] = lis[i].replace(/(.) +$/m, '$1');
			}
			return lis.join('\n');
		});

		return '\n\n' + html.replace(/[ \t]+\n|\s+$/g, '');
	}

	// Blockquotes
	let deepest = /<blockquote\b[^>]*>((?:(?!<blockquote)[\s\S])*?)<\/blockquote>/gi;
	while (string.match(deepest)) {
		string = string.replace(deepest, function (str) {
			return replaceBlockquotes(str);
		});
	}

	function replaceBlockquotes(html: string) {
		html = html.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, function (str, inner) {
			inner = inner.replace(/^\s+|\s+$/g, '');
			inner = cleanUp(inner);
			inner = inner.replace(/^/gm, '> ');
			inner = inner.replace(/^(>([ \t]{2,}>)+)/gm, '> >');
			return inner;
		});
		return html;
	}

	function cleanUp(string: string) {
		string = strip(string);
		string = string.replace(/^[\t\r\n]+|[\t\r\n]+$/g, ''); // trim leading/trailing whitespace
		string = string.replace(/\n\s+\n/g, '\n\n');
		string = string.replace(/\n{3,}/g, '\n\n'); // limit consecutive linebreaks to 2
		string = strip(string);
		return string;
	}

	return cleanUp(string);
};
export default utilAsciidoc;
