const parseUri = require('./parseUri');

describe('parseUri', () => {

	it('should export a function', () => {
		const expected = 'function';
		const actual = typeof parseUri;

		expect(actual).toBe(expected);
	});

	it('should return url unmodified if path is already in the api format', () => {
		const expected = 'http://localhost:8081/artifactory/api/storage/builds-snapshot-local/com/shinydocs/shinydrive/shinydrive-server';
		const actual = parseUri(expected);
		
		expect(actual).toBe(expected);
	});

	it('should modify url if path is not in the api format', () => {
		const expected = 'http://localhost:8081/artifactory/api/storage/builds-snapshot-local/com/shinydocs/shinydrive/shinydrive-server';
		const actual = parseUri('http://localhost:8081/artifactory/builds-snapshot-local/com/shinydocs/shinydrive/shinydrive-server');
		
		expect(actual).toBe(expected);
	});

	it('should uri as is if the url cannot be parsed', () => {
		const expected = 'http://localhost:8081/potatoes';
		const actual = parseUri('http://localhost:8081/potatoes');
		
		expect(actual).toBe(expected);
	});

});