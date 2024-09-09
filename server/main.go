package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	echo "tkr53/grapc-web-sample/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type server struct {
	echo.UnimplementedEchoServiceServer
}

var port = flag.Int("port", 8080, "The server port")

func (s *server) Echo(ctx context.Context, in *echo.EchoRequest) (*echo.EchoResponse, error) {
	log.Printf("Received: %v", in.GetMessage())
	return &echo.EchoResponse{Message: in.GetMessage()}, nil
}

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	reflection.Register(s)
	echo.RegisterEchoServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
