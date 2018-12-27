import test from 'tape';
import location, { locations } from '../';
import { isFunction, isPlainObject } from 'lodash-es';

test('location', assert => {
	assert.doesNotThrow(() => location('/foo/:bar'));
	assert.doesNotThrow(() => location('*'));
	assert.throws(() => location());
	assert.ok(isFunction(location('/foo/:bar')));
	assert.ok(isFunction(location('/foo/:bar').query));

	assert.is(location('/foo/:bar')({ bar: 'foo' }), '/foo/foo');
	assert.is(location('/foo/:bar').query({ bar: 'baz' })({ bar: 'buzz' }), '/foo/buzz?bar=baz');
	assert.throws(() => location('/foo/:bar')());

	assert.ok(isFunction(location('/foo/:bar').get));
	assert.is(location('/foo/:bar').get(), '/foo/:bar');
	
	assert.ok(isFunction(location('/foo/:bar').match));
	assert.deepEquals(location('/foo/:bar').match('/foo/baz'), { bar: 'baz' });

	assert.end();
});

test('locations', assert => {
	assert.throws(() => locations());
	
	// array 
	assert.ok(Array.isArray(locations(['/foo/:bar'])));
	assert.is(locations(['/foo/:bar']).length, 1);
	assert.is(locations(['/foo/:bar'])[0]({ bar: 'baz' }), '/foo/baz');
	
	// object
	assert.ok(isPlainObject(locations({ foo: '/foo/:bar' })));
	assert.is(Object.keys(locations({ foo: '/foo/:bar' })).length, 1);
	assert.is(locations({ foo: '/foo/:bar' }).foo({ bar: 'baz' }), '/foo/baz');

	assert.end();
});