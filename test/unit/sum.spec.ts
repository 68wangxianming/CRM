import sum from '../../src/web/test/sum';

describe('adds 1 + 2 to equal 3', () => {
    test('sum 函数基础测试', () => {
        expect(sum(1, 2)).toBe(3)
    })
});
