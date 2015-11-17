TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REGISTRY = http://registry.npm.taobao.org
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =

start: install doc fake
	@NODE_ENV=dev DEBUG=* node --harmony ./worker.js

dev:
	@NODE_ENV=dev DEBUG=* ./node_modules/.bin/node-dev --harmony ./worker.js

production_dev:
	@NODE_ENV=production DEBUG=* ./node_modules/.bin/node-dev --harmony ./worker.js

authdev:
	@NODE_ENV=test DEBUG=* ./node_modules/.bin/node-dev --harmony ./worker.js

init:
	@DEBUG=* node --harmony ./init/index.js

doc:
	@DEBUG=* node --harmony ./init/index.js
	@DEBUG=* node --harmony ./fake/index.js
	@NODE_ENV=test node --harmony ./doc/doc_android.js
	@DEBUG=* node --harmony ./init/index.js
	@DEBUG=* node --harmony ./fake/index.js
	@NODE_ENV=test node --harmony ./doc/doc_ios.js

doc_android: fake
	@NODE_ENV=test node --harmony ./doc/doc_android.js

doc_ios: fake
	@NODE_ENV=test node --harmony ./doc/doc_ios.js

fake: init
	@DEBUG=* node --harmony ./fake/index.js

install:
	@npm install \
		--registry=$(REGISTRY)

jshint:
	@./node_modules/.bin/jshint .

test: fake
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--bail \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		--require co-mocha \
		$(MOCHA_OPTS) \
		$(TESTS)

testwithoutfake:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--bail \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		--require co-mocha \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov cov: fake
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover --preserve-comments \
		./node_modules/.bin/_mocha \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		--require co-mocha \
		$(MOCHA_OPTS) \
		$(TESTS)

test-all: install jshint test cov doc

clean:
	@rm -rf node_modules
	@rm -rf coverage

autod:
	@./node_modules/.bin/autod \
		-w \
		-f "~" \
		-F "~"

cloc:
	@cloc --exclude-dir=node_modules,coverage .

.PHONY: start dev production_dev authdev init fake install jshint test testwithoutfake test-all test-cov cov clean autod doc cloc doc_android doc_ios