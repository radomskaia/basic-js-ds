const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootData = null;
    this.newNode = null;
  }

  root() {
    return this.rootData;
  }

  _addNode(data, node, direction) {
    if (!node[direction]) {
        node[direction] = this.newNode;
        return this;
      }
      return this.add(data, node[direction]);
  }

  add(data, node = this.rootData) {
    this.newNode = new Node(data);

    if (!this.rootData) {
      this.rootData = this.newNode;
      return this;
    }

    if (node.data > this.newNode.data) {
      this._addNode(data, node, 'left')
    }
    if (node.data < this.newNode.data) {
      this._addNode(data, node, 'right')
    }
    return this;
  }

  has(data) {
    return !!this.find(data);
  }

  find(data, node = this.rootData) {
    if (!node) {
      return node;
    }
    if (data === node.data) {
      return node;
    }
    if (data > node.data) {
      return this.find(data, node.right);
    }
    return this.find(data, node.left);
  }

  _deleteNode(node) {
    if (!node.left) {
      return node.right;
    }
    if (!node.right) {
      return node.left;
    }
    let replacementNode = node.left;
    let count = 0;
    while (replacementNode.left) {
      replacementNode = replacementNode.left;
      count++;
    }
    if (!count) {
      return replacementNode;
    }
    replacementNode.right = node.left;
    let replacementNodeRight = node.left;
    while (replacementNodeRight.right) {
      replacementNodeRight = replacementNodeRight.right;
    }
    replacementNodeRight.right = node.right;
    return replacementNode;

  }

  remove(data, node = this.rootData) {
    if (!this.rootData) {
      return null;
    }
    if (this.rootData.data === data) {
      this.rootData = this._deleteNode(this.rootData);
      return this;
    }

    const direction = node.data > data ? 'left' : 'right';

    if (!node[direction]) {
      return null
    }

    if (node[direction].data === data) {
      node[direction] = this._deleteNode(node[direction]);
      return this;
      }

    return this.remove(data,node[direction]);
  }

  min() {
    let min = this.rootData;
    while (min.left) {
      min = min.left;
    }
    return min.data;
  }

  max() {
    let max = this.rootData;
    while (max.right) {
      max = max.right;
    }
    return max.data;
  }
}

module.exports = {
  BinarySearchTree
};

