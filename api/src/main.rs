use actix_web::{web, App, HttpRequest, HttpServer, Responder};
use listenfd::ListenFd;

async fn index(_req: HttpRequest) -> impl Responder {
    "Hello World!"
}
async fn index2(_req: HttpRequest) -> impl Responder {
    "Hello World! again"
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(|| App::new()
        .route("/", web::get().to(index))
        .route("/again", web::get().to(index2)));

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("0.0.0.0:8000")?
    };

    server.run().await
}
