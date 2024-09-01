import { formatHyperlink } from './formatHyperlink';

describe('FormatText', () => {
	test('empty to be empty', () => {
		expect(formatHyperlink('')).toBe('');
	});
	test('A123 to be A123', () => {
		expect(formatHyperlink('A123')).toBe('A123');
	});
	test('Format <http://link|Text> to be <http://link|Text>', () => {
		expect(formatHyperlink('<http://link|Text>')).toBe('<http://link|Text>');
	});
	test('Format "[ ](https://thecortex.cortexflex.org/) Test" to be Test', () => {
		expect(formatHyperlink('[ ](https://thecortex.cortexflex.org/) Test')).toBe('Test');
	});
	test('Format "[Open](https://thecortex.cortexflex.org/) Test" to be Test', () => {
		expect(formatHyperlink('[Open](https://thecortex.cortexflex.org/) Test')).toBe('[Open](https://thecortex.cortexflex.org/) Test');
	});
	test('render test (arabic)', () => {
		expect(formatHyperlink('[ ](https://thecortex.cortexflex.org/) اختبا')).toBe('اختبا');
	});

	test('render test (russian)', () => {
		expect(formatHyperlink('[ ](https://thecortex.cortexflex.org/) тест123')).toBe('тест123');
	});
});
