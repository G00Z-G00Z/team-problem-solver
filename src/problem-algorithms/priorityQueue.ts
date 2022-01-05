// Reference for heap
// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

export interface IPriorityQueue<T> {
  size(): number;
  isEmpty(): boolean;
  peek(): T | undefined;
  push(...values: T[]): number;
  pop(): T | undefined;
}

const top = 0;
const getParent: (i: number) => number = (i) => ((i + 1) >>> 1) - 1;
const getLeft: (i: number) => number = (i) => (i << 1) + 1;
const getRight: (i: number) => number = (i) => (i + 1) << 1;

/**
 * PriorityQueue (min heap) structure
 */
export class PriorityQueue<T> implements IPriorityQueue<T> {
  private _heap: T[] = [];
  private comparator: (a: T, b: T) => boolean;

  constructor(isLessThan?: (a: T, b: T) => boolean) {
    isLessThan ||= (a, b) => a < b;
    this.comparator = isLessThan;
  }

  private get heap() {
    return this._heap;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  push(...values: T[]) {
    values.forEach((value) => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }

  peek(): T | undefined {
    return this.heap[top];
  }

  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  // Private methods

  private _swap(i: number, j: number) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  private _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, getParent(node))) {
      this._swap(node, getParent(node));
      node = getParent(node);
    }
  }

  private _siftDown() {
    let node = top;
    while (
      (getLeft(node) < this.size() && this._greater(getLeft(node), node)) ||
      (getRight(node) < this.size() && this._greater(getRight(node), node))
    ) {
      let maxChild =
        getRight(node) < this.size() &&
        this._greater(getRight(node), getLeft(node))
          ? getRight(node)
          : getLeft(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }

  private _greater(i: number, j: number) {
    return this.comparator(this._heap[i], this._heap[j]);
  }
}
