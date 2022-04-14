import demoTest from '../../tests/demoTest';
import * as Demos from '../demo';

demoTest(Object.entries(Demos).map(([, Demo]) => Demo));
