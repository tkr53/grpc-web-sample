OUT_DIR="./src/gen"

grpc-gen:
					protoc -I=.. echo.proto \
					--js_out=import_style=commonjs:$(OUT_DIR) \
					--grpc-web_out=import_style=commonjs,mode=grpcwebtext:$(OUT_DIR)