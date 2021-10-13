const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(value) {
    this.node = addIn(this.node, value);

    function addIn(node, value) {
      if (node==null) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (value < node.data) {
        node.left = addIn(node.left, value);
      } else {
        node.right = addIn(node.right, value);
      }

      return node;
    }
  }

  find(value) {
    return searchIn(this.node, value);

    function searchIn(node, value) {
      if (node === null) {
        return null;
      }

      if (node.data == value) {
        return node;
      }

      return value < node.data ? 
        searchIn(node.left, value) : 
        searchIn(node.right, value);
    }
  }

  has(value) {
    return search(this.node, value);

    function search(node, value) {
      if (!node) {
        return false;
      }

      if (node.data === value) {
        return true;
      }

      return value < node.data ? 
        search(node.left, value) : 
        search(node.right, value);
    }
  }

  remove(value) {
    this.node = removeNode(this.node, value);
    function removeNode(node, value) {
      if (node==null) {
        return null;
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // equal - should remove this item
        if (!node.left && !node.right) {
          // put null instead of item
          return null;
        }

        if (!node.left) {
          // set right child instead of item
          node = node.right;
          return node;
        }

        if (!node.right) {
          // set left child instead of item
          node = node.left;
          return node;
        }

         // both children exists for this item
         let minFromRight = node.right;
         while (minFromRight.left) {
           minFromRight = minFromRight.left;
         }
         node.data = minFromRight.data;
 
         node.right = removeNode(node.right, minFromRight.data);
 
         return node;
      }
    }
  }

  min() {
    if (!this.node) {
      return;
    }

    let node = this.node;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.node) {
      return;
    }
    let node = this.node;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}