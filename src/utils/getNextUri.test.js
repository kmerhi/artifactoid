const getNextUri = require('./getNextUri');

describe('getNextUri', () => {
	it('should getNextUri when array of objects provided', () => {
		const children = [
			{ uri: '/1.2.1-SNAPSHOT' },
			{ uri: '/1.2.2-SNAPSHOT' },
			{ uri: '/1.2.10-SNAPSHOT' },
			{ uri: '/1.2.11-SNAPSHOT' }
		];
		const actual = getNextUri('http://www.potatoes.com/api/storage', children);
		const expected = 'http://www.potatoes.com/api/storage/1.2.11-SNAPSHOT';

		expect(actual).toEqual(expected);
	});
});