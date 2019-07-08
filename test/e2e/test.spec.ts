import * as React from 'react'
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
} from '@testing-library/react'

import {Test} from '../../src/web/test/test'

afterEach(cleanup);
describe('测试tsx组件', () => {
    it("测试tsx组件", () => {
        const {getByTestId, container, asFragment} = render(Test());
        const [ul, nav] = [getByTestId("js-ul"), getByTestId("js-h2")];
        expect(ul.children.length).toBe(3);
        expect(nav.textContent).toContain('hello world!');
    })
})

