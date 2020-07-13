use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use serde_json::json;
// we do not need to specify a path like in main because the file that we are
// refering to are inside the same folder
mod model;
use model::Employee;
pub async fn find_all() -> impl Responder {
    HttpResponse::Ok().json(vec![
        Employee {
            id: 1,
            first_name : "Ola".to_string(),
            last_name: "John Ajiboye".to_string(),
           department: "Engineering".to_string(),
           salary: 4500,
           age: 23
        },
       Employee {
             id: 2,
            first_name : "James".to_string(),
            last_name: "Bond".to_string(),
           department: "Accounting".to_string(),
           salary: 3500,
           age: 43
        },
    ])
}
pub async fn find() -> impl Responder {
    HttpResponse::Ok().json(Employee {
       id: 2,
            first_name : "James".to_string(),
            last_name: "Bond".to_string(),
           department: "Accounting".to_string(),
           salary: 3500,
           age: 43
    })
}
