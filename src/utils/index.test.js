const utils = require('./index');

describe('utils', () => {

	it('should getCredentials when no credentials passed', () => {
		const actual = utils.getCredentials();
		const expected = {
			username: undefined,
			password: undefined
		};

		expect(actual).toEqual(expected);
	});

	it('should getCredentials when concatenated input', () => {
		const actual = utils.getCredentials({
			username: 'potato:secret'
		});
		const expected = {
			username: 'potato',
			password: 'secret'
		};

		expect(actual).toEqual(expected);
	});

	it('should getNextUri when array of objects provided', () => {
		const children = [
			{ uri: '/1.2.1-SNAPSHOT' },
			{ uri: '/1.2.2-SNAPSHOT' },
			{ uri: '/1.2.10-SNAPSHOT' },
			{ uri: '/1.2.11-SNAPSHOT' }
		];
		const actual = utils.getNextUri('http://www.potatoes.com/api/storage', children);
		const expected = 'http://www.potatoes.com/api/storage/1.2.11-SNAPSHOT';

		expect(actual).toEqual(expected);
	});

});
