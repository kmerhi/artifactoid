import processError from './processError';

describe('processError', () => {

	global.process = {
		exit: jest.fn()
	};

	const response = {
		status: 404,
		statusText: 'Not Found'
	};

	it('should return a function', () => {
		const expected = 'function';
		const actual = typeof processError;

		expect(actual).toBe(expected);
	});

	it('should exit with error', () => {
		processError(response);
		expect(process.exit).toBeCalledWith(1);
	});

	it('should print error message', () => {
		processError({
			message: 'All your base'
		});
		expect(process.exit).toBeCalledWith(1);
	});

});