class Node {
    constructor(value = null, nextNode = null) {
      this.value = value;
      this.nextNode = nextNode;
    }
  }
 
class LinkedList {
    constructor() {
      this.headNode = null;
      this.length = 0;
    }
    append(value) {
      const newNode = new Node(value);
      if (!this.headNode) {
        this.headNode = newNode;
      } else {
        let current = this.headNode;
        while (current.nextNode) {
          current = current.nextNode;
        }
        current.nextNode = newNode;
      }
      this.length++;
    }
    prepend(value) {
      this.headNode = new Node(value, this.headNode);
      this.length++;
    }
    size() {
      return this.length;
    }
    head() {
      return this.headNode;
    }
    tail() {
      let current = this.headNode;
      if (!current) return null;
      while (current?.nextNode) {
        current = current.nextNode;
      }
      return current;
    }
    at(index) {
      if (index > this.length || index < 0 || !Number.isInteger(index))
        return 'Index invalid/out of bounds';
      let current = this.headNode;
      while (index) {
        current = current.nextNode;
        index--;
      }
      return current;
    }
    pop() {
      let current = this.headNode;
      if (!current) return null;
      while (current?.nextNode.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = null;
    }
    contains(value) {
      let current = this.headNode;
      if (!current) return false;
      while (current) {
        if (current.value == value) {
          return true;
        }
        current = current.nextNode;
      }
      return false;
    }
    find(value) {
      let current = this.headNode;
      let position = 0;
      if (!current) return null;
      while (current) {
        if (current.value == value) {
          return position;
        }
        current = current.nextNode;
        position++;
      }
      return null;
    }
    toString() {
      let string = '';
      let current = this.headNode;
      while (current) {
        string = string + `( ${current.value} ) -> `;
        current = current.nextNode;
      }
      string = string + 'null';
      return string;
    }
    insertAt(value, index) {
      if (index > this.length || index < 0 || !Number.isInteger(index)) {
        return console.log('Index invalid/out of bounds');
      }
      let newNode = new Node(value);
      if (index == 0) {
        let currentHead = this.headNode;
        newNode.nextNode = currentHead;
        this.headNode = newNode;
      }
      let current = this.headNode;
      while (index > 1) {
        current = current.nextNode;
        index--;
      }
      let newNodeFollowing = current.nextNode;
      current.nextNode = newNode;
      newNode.nextNode = newNodeFollowing;
    }
    removeAt(index) {
      if (index > this.length || index < 0 || !Number.isInteger(index)) {
        return console.log('Index invalid/out of bounds');
      }
      let current = this.headNode;
      if (index == 0) this.headNode = current.nextNode;
      while (index > 1) {
        current = current.nextNode;
        index--;
      }
      let preceding = current;
      let following = current.nextNode?.nextNode;
      preceding.nextNode = following;
    }
  }
  
class HashMap {
    constructor() {
        this.table = [];
        this.capacity = 16;
        this.loadFactor = 0.75;
        for(let i = 0; i < this.capacity; i++) {
            this.table.push(new LinkedList());
        }
    }
    hash(key){
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
    set(key, value) {
        let bucket = this.hash(key);
        let linkedList = this.table[bucket];
        let current = linkedList.head();
        while (current) {
            if (current.value[0] == key) {
                current.value[1] = value;
                console.log("Updated existing value.");
                return;
            }
            current = current.nextNode;
        }
        linkedList.append([key, value]);
        return console.log("Added to hashmap.");
    }
}

let hashMap = new HashMap();
hashMap.set("shaboingkey", "hahaha value! lol");
console.log(hashMap.table);
console.log(hashMap.table[6].toString());
