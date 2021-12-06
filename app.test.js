const request = require("supertest");
const app = require("./app");
describe("Test the items service", () =>{
    test("GET /items succeeds", () =>{
        return request(app)
        .get("/items")
        .expect(200);
    });
    test("GET /items returns JSON", () =>{
        return request(app)
        .get("/items")
        .expect("Content-type", /json/);
    });
    test("GET /items/:itemType succeeds", () =>{
        return request(app)
        .get("/items/gloves")
        .expect(200);
    });
    test("GET /items/:itemType returns JSON", () =>{
        return request(app)
        .get("/items/gloves")
        .expect("Content-type", /json/);
    });
    test("GET /items/:itemType with invalid item type fails", () =>{
        return request(app)
        .get("/items/glove")
        .expect(404);
    });
    test("GET /items/:itemType/:id succeeds", () =>{
        return request(app)
        .get("/items/gloves/000001")
        .expect(200);
    });
    test("GET /items/:itemType/:id returns JSON", () =>{
        return request(app)
        .get("/items/gloves/000001")
        .expect("Content-type", /json/);
    });
    test("GET /items/:itemType/:id with invalid ID fails", () =>{
        return request(app)
        .get("/items/gloves/000003")
        .expect(404);
    });
});
describe("Test the sellers service", () =>{
    test("GET /sellers succeeds", () =>{
        return request(app)
        .get("/sellers")
        .expect(200);
    });
    test("GET /sellers returns JSON", () =>{
        return request(app)
        .get("/sellers")
        .expect("Content-type", /json/);
    });
    test("GET /sellers/:id succeeds", () =>{
        return request(app)
        .get("/sellers/000001")
        .expect(200);
    });
    test("GET /sellers/:id returns JSON", () =>{
        return request(app)
        .get("/sellers/000001")
        .expect("Content-type", /json/);
    });
    test("GET /sellers/:id with invalid ID fails", () =>{
        return request(app)
        .get("/sellers/123456")
        .expect(404);
    });
});
describe("Testing 404 response page", () =>{
    test("GET invalid route fails", () =>{
        return request(app)
        .get("/football")
        .expect(404);
    });
});