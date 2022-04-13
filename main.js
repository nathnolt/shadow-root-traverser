function shadowRootTraverser(rootNode, callback, onlyElements=false) {

	// 1A. call the callback on the root node (if it's not an element)
	// because it's not an element node, we don't care for it's children
	const nodeIsElement = rootNode.nodeType === Node.ELEMENT_NODE
	if (!nodeIsElement) {
		if(onlyElements) { return }
		callback(rootNode)
		return
	}
	
	// 1B. call the callback on the root node (if it's an element)
	callback(rootNode)
	
	// 2. loop through the childNodes of the rootNode
	const children = rootNode.childNodes
	if (children.length) {
		for (var i = 0; i < children.length; i++) {
			shadowRootTraverser(children[i], callback, onlyElements)
		}
	}
	
	// 3. check for shadow DOM, and loop through it's children
	const shadowRoot = rootNode.shadowRoot
	if (shadowRoot) {
		const shadowChildren = shadowRoot.childNodes
		for (var i = 0; i < shadowChildren.length; i++) {
			shadowRootTraverser(shadowChildren[i], callback, onlyElements)
		}
	}
}




// breadth traverse, so it will go 1 level down every time.
function breadthTraverse(node, callback) {
	var currentLevel = [node]
	var nextLevel = []
	var level = 0
	
	while(currentLevel.length > 0) {
		// go through the current level
		for(var i = 0; i < currentLevel.length; i++) {
			var item = currentLevel[i]
			// call the callback on the current node
			callback(item, level)
			
			// Add the children of the current node to the next level
			if(item.children) {
				// push all the children onto the next level
				Array.prototype.push.apply(nextLevel, item.childNodes)
			}
			
			// check for shadow DOM
			if(item.shadowRoot) {
				Array.prototype.push.apply(nextLevel, item.shadowRoot.childNodes)
			}
		}
		
		currentLevel = nextLevel
		nextLevel = []
		level++
	}
}

// in the following example: the execution order will be
// [<head>, <body>]
// [<meta charset="utf-8">,<meta name="viewport">, <title>, <h1>]
// ['title', 'welcome to my website']
// and also a bunch of other text nodes which are the spacings between the other nodes, where 
// the text value is just a bunch of whitespace, which we could filter of course.
breadthTraverse(document.documentElement, function(node, level) {
	console.log(node, level)
})

// this one declines nodes without any text.
breadthTraverse(document.documentElement, function(node, level) {
	
	// Decline text nodes without text
	if(node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue)) {
		return
	}
	
	console.log(node, level)
})
