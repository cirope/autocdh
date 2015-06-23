ifeq ($(SERVER),testing)
PRODUCTION_ACCOUNT=deployer@prueba.autocdh.com
PRODUCTION_ROOT_ACCOUNT=root@prueba.autocdh.com
APP_DIR=/var/www/autocdh.com
SERVICE_NAME=meteor
else ifeq ($(SERVER),demo)
PRODUCTION_ACCOUNT=deployer@demo.autocdh.com
PRODUCTION_ROOT_ACCOUNT=root@demo.autocdh.com
APP_DIR=/var/www/demo.autocdh.com
SERVICE_NAME=meteor_demo
else
PRODUCTION_ACCOUNT=deployer@app.autocdh.com
PRODUCTION_ROOT_ACCOUNT=root@app.autocdh.com
APP_DIR=/var/www/autocdh.com
SERVICE_NAME=meteor
endif

SANDBOX_ACCOUNT=deployer@localhost
SANDBOX_ROOT_ACCOUNT=root@localhost
APP_BUNDLE=autocdh.tar.gz

.PHONY : deploy sandbox-deploy

deploy:
	meteor build .
	scp $(APP_BUNDLE) $(PRODUCTION_ACCOUNT):
	rm $(APP_BUNDLE)
	ssh $(PRODUCTION_ACCOUNT) \
		"tar -zxf $(APP_BUNDLE); \
		rm $(APP_BUNDLE); \
		rm -rf $(APP_DIR)_old; \
		test -d $(APP_DIR) && mv $(APP_DIR) $(APP_DIR)_old/; \
		mkdir -p $(APP_DIR); \
		mv bundle/* $(APP_DIR); \
		rmdir bundle; \
		cd $(APP_DIR)/programs/server; \
		npm install"
	ssh $(PRODUCTION_ROOT_ACCOUNT) "service $(SERVICE_NAME) restart"

sandbox-deploy:
	meteor build .
	scp -P 2222 $(APP_BUNDLE) $(SANDBOX_ACCOUNT):
	rm $(APP_BUNDLE)
	ssh -p 2222 $(SANDBOX_ACCOUNT) \
		"tar -zxf $(APP_BUNDLE); \
		rm $(APP_BUNDLE); \
		rm -rf $(APP_DIR)_old; \
		test -d $(APP_DIR) && mv $(APP_DIR) $(APP_DIR)_old/; \
		mkdir -p $(APP_DIR); \
		mv bundle/* $(APP_DIR); \
		rmdir bundle; \
		cd $(APP_DIR)/programs/server; \
		npm install"
	ssh -p 2222 $(SANDBOX_ROOT_ACCOUNT) "service $(SERVICE_NAME) restart"
