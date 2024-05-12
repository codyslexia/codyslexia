use actix_cors::Cors;
use actix_web::{get, middleware::Logger, web, App, HttpResponse, HttpServer, Responder, Result};
use chrono::{DateTime, Utc};
use env_logger::Env;
use serde::Serialize;

#[derive(Serialize)]
pub struct Response {
    pub code: i16,
    pub message: String,
}

#[derive(Serialize)]
pub struct StatusResponse {
    pub app: Option<&'static str>,
    pub version: Option<&'static str>,
    pub timestamp: Option<DateTime<Utc>>,
}

#[get("/")]
async fn status() -> impl Responder {
    let response = StatusResponse {
        app: Some("rustapi"),
        version: Some("1.0.0"),
        timestamp: Some(Utc::now()),
    };
    HttpResponse::Ok().json(response)
}

async fn not_found() -> Result<HttpResponse> {
    let response = Response {
        code: 404,
        message: "Not found".to_string(),
    };
    Ok(HttpResponse::NotFound().json(response))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let addr = match std::env::var("SERVER_HOST") {
        Ok(host) => host,
        Err(_e) => "0.0.0.0:3000".to_string(),
    };

    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let server = HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(Logger::default())
            .wrap(cors)
            .service(status)
            .default_service(web::route().to(not_found))
    })
    .bind(&addr)?;

    println!("[rustapi] READY Server running at http://{}", addr);

    let _ = server.run().await;

    Ok(())
}
