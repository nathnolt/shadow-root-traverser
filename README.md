# shadow-root-traverser
Traverses the entire dom from a starting node including the shadow dom

## usage

```js
// all nodes
shadowRootTraverser(document.body, function allNodes(node){ console.log(node) })

// only elements
shadowRootTraverser(document.body, function elements(node){ console.log(node) }, true)
```
