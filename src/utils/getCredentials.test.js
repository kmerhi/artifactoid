const getCredentials = require('./getCredentials');

describe('getCredentials', () => {

	it('should getCredentials when no credentials passed', () => {
		const actual = getCredentials();
		const expected = {
			user: undefined,
			pass: undefined
		};

		expect(actual).toEqual(expected);
	});

	it('should getCredentials when concatenated input', () => {
		const actual = getCredentials({
			user: 'potato:secret'
		});
		const expected = {
			user: 'potato',
			pass: 'secret'
		};

		expect(actual).toEqual(expected);
	});

});
