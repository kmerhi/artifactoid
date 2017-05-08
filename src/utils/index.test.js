const utils = require('./index');

describe('getCredentials', () => {

	it('should handle no credentials passed', () => {
		const actual = utils.getCredentials();
		const expected = {
			username: undefined,
			password: undefined
		};

		expect(actual).toEqual(expected);
	});

	it('should handle concatenated input', () => {
		const actual = utils.getCredentials({
			username: 'potato:secret'
		});
		const expected = {
			username: 'potato',
			password: 'secret'
		};

		expect(actual).toEqual(expected);
	});

});
