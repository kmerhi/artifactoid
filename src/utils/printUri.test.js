const printUri = require('./printUri');

describe('printUri', () => {

	it('should export a function', () => {
		const expected = 'function';
		const actual = typeof printUri;

		expect(actual).toBe(expected);
	});

	it('should print to console the passed in value', () => {
		global.console = {
			log: jest.fn()
		};
		printUri('http://whatever.com');

		expect(console.log).toBeCalled();
	});

});