import QueueNode from "./QueueNode";


export default function Queue() {
    this._front = null;
    this._back = null;
    this.length = 0;
}


Queue.prototype.front = function() {
    if (this._front)
        return this._front.value;

    return null
}


Queue.prototype.back = function() {
    if (this._back)
        return this._back.value;

    return null;
}


Queue.prototype.push = function(value) {
    let node = new QueueNode(value, this._back);
    
    if (this._back)
        this._back.prev = node;
    this._back = node;

    if (this.length == 0)
        this._front = node;

    this.length++;
}


Queue.prototype.pop = function() {
    if (this.length == 0)
        throw new Error("Can't pop from empty queue");

    this.length--;

    if (this.length == 0) {
        this._front = null;
        this._back = null;
        return;
    }

    this._front = this._front.prev;
}


Queue.prototype.empty = function() {
    return this._front == null && this._back == null;
}
