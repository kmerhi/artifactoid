const printError = require('./printError');

describe('printError', () => {

	it('should export a function', () => {
		const expected = 'function';
		const actual = typeof printError;

		expect(actual).toBe(expected);
	});

	it('should print to console a decorated error message', () => {
		global.console = {
			error: jest.fn()
		};
		printError('This is an error message');

		expect(console.error).toBeCalled();
	});

});