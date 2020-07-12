use actix_web::{web, App, HttpRequest, HttpServer, Responder, Result};
use listenfd::ListenFd;
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    username: String,
}

async fn index(_req: HttpRequest) -> impl Responder {
    "Hello World!"
}
async fn index2(_req: HttpRequest) -> impl Responder {
    "Hello World! again"
}
async fn index3(info: web::Json<Info>) -> Result<String> {
    let test = &info.username;
    let mut fin = String::new();
    for c in test.chars(){
        if c == ' '{
            fin.push('-')
        } else if c.is_numeric() {
            fin.push(c)
        } else if c.is_uppercase() {
            let chars: Vec<char> = c.to_lowercase().to_string().chars().collect();
            fin.push(chars[0])
        } else {
            fin.push(c)
        }
    }
    Ok(format!("{}", fin))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(|| App::new()
        .route("/api", web::get().to(index))
        .route("/api/post", web::post().to(index3))
        .route("/api/again", web::get().to(index2)));

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("0.0.0.0:8000")?
    };

    server.run().await
}
