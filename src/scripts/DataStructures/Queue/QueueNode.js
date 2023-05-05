

export default function QueueNode(value, next = null, prev = null) {
    this.value = value;
    this.prev = prev;
}
