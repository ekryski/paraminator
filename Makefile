# Reporter Types: dot, spec, tap, landing, list, progress, doc, json
REPORTER = spec
UNIT_TESTS = $(shell find test/unit/ -name '*test.js')

test: test-unit

test-unit:
	@NODE_ENV=development ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(UNIT_TESTS)