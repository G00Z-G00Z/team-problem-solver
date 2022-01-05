import { PriorityQueue } from '../../problem-algorithms/priorityQueue'

function isSortedAscending(array: number[]) {
  for (let i = 1; i < array.length; i++)
    if (array[i - 1] > array[i]) return false;

  return true;
}

describe("Tests in priority queue", () => {
  let minHeap: PriorityQueue<number>;

  beforeEach(() => {
    minHeap = new PriorityQueue<number>((a, b) => a < b);
  });

  test("should construct well", () => {
    minHeap = new PriorityQueue<number>((a, b) => a < b);
  });
  test("should push values", () => {
    expect(minHeap.size()).toBe(0);
    minHeap.push(10);
    minHeap.push(20, 40, 70, 5);
    expect(minHeap.size()).toBe(5);
  });

  test("should peek max value", () => {
    minHeap.push(10);
    minHeap.push(20, 40, 70, 5);

    const prevLen = minHeap.size();
    expect(minHeap.peek()).toBe(5);
    expect(minHeap.size()).toBe(prevLen);
  });

  test("Should pop out the list in accending order", () => {
    minHeap.push(10);
    minHeap.push(20, 40, 70, 5);

    const orderedList: number[] = [];
    const prevLen = minHeap.size();
    do {
      orderedList.push(minHeap.pop() ?? 1);
    } while (minHeap.size());

    expect(orderedList.length).toBe(prevLen);

    expect(isSortedAscending(orderedList)).toBeTruthy();
  });

  test("Should keep the min value at the top", () => {
    minHeap.push(10, 15, 30, 1, 5);
    expect(minHeap.peek()).toBe(1);
    minHeap.push(30, 10, 4);
    expect(minHeap.peek()).toBe(1);
    minHeap.pop();
    expect(minHeap.peek()).toBe(4);
    minHeap.push(-1);
    expect(minHeap.peek()).toBe(-1);
  });
});
