import 'raf/polyfill';
import 'enzyme-react-16-adapter-setup';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });