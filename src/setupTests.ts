import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Enzyme from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import '@testing-library/jest-dom'

Enzyme.configure({ adapter: new Adapter() });
// @ts-ignore
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
