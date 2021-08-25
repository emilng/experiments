class Node {
	constructor(data, next = null) {
		this.data = data;
		this.next = next;
	}

	setNext(next) {
		this.next = next;
	}
}

function loop_size(node){
	const nodeMap = new Map();
	let nodeCount = 0;
	let nextNode = node;
	while(true) {
		nodeMap.set(nextNode, ++nodeCount);
		nextNode = nextNode.next;
		if (nodeMap.get(nextNode)) {
			return nodeMap.size - nodeMap.get(nextNode) + 1;
		}
	}
}

(function () {
	const A = new Node();
	A.setNext(A);
	console.log(loop_size(A), 1);
})();

(function () {
	const A = new Node(), B = new Node();
	A.setNext(B), B.setNext(A);
	console.log(loop_size(A), 2);
})();

(function () {
	const A = new Node(), B = new Node(), C = new Node();
	A.setNext(B), B.setNext(C), C.setNext(C);
	console.log(loop_size(A), 1);
})();