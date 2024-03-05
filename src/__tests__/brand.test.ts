import supertest from "supertest";
import { app } from "../app";
import mongoose from "mongoose";
import { message } from "../models/message";
import dotenv from "dotenv";
dotenv.config();
import {
  test,
  it,
  describe,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from "@jest/globals";
import { Blogs } from "../models/blogModels";

const MONGO = process.env.MONGO_URI;

beforeAll(async () => {
  mongoose.connect(MONGO);
});
afterAll(async () => {
  await mongoose.connection.close();
});
let blogId;
let token = "";

describe("MY BRAND TEST", () => {
  describe("AUTHENTICATION", () => {
    it("LOGIN SUCCESSFUL, IT SHOULD RETURN 200", async () => {
      const result = await supertest(app)
        .post("/api/auth/signin")
        .send({
          email: "ke@gmail.com",
          password: "12345",
        })
        .expect(200);
      token = "Bearer " + result.body.token;
    });
    // LOGIN FAIL
    it("LOGIN FAILED, IT SHOULD RETURN 401", async () => {
      const result = await supertest(app)
        .post("/api/auth/signin")
        .send({
          email: "ke999999999@gmail.com",
          password: "12345",
        })
        .expect(404);
      (token);
    });
    //PASSWORD FAIL
    it("LOGIN FAILED, IT SHOULD RETURN 403", async () => {
      const result = await supertest(app)
        .post("/api/auth/signin")
        .send({
          email: "cas@gmail.com",
          password: "1234567879",
        })
        .expect(403);
      (token);
    });
    //INVALID LOGIN
    it("LOGIN VALIDATION FAIL, IT SHOULD RETURN 400", async () => {
      const result = await supertest(app)
        .post("/api/auth/signin")
        .send({
          email: "",
          password: "12345",
        })
        .expect(400);
    });
    //USER SIGNUP
    it("SIGNUP VALIDATION FAIL, IT SHOULD RETURN 400", async () => {
      const result = await supertest(app)
        .post("/api/auth/signup")
        .send({
          firstName: "brice",
          password: "123456",
          email: "mia@gmail.com",
        })
        .expect(400);
    });
    //INVALID SIGNUP
    it("SIGNUP WITH EXISTING EMAIL, IT SHOULD RETURN 400", async () => {
      const result = await supertest(app)
        .post("/api/auth/signup")
        .send({
          firstName: "lava",
          secondName: "big",
          password: "09876543",
          email: "lava@gmail.com",
        })
        .expect(400);
    });
    //SIGNUP SUCCESSFULLY
    it("SIGNUP SUCCESSFULL, IT SHOULD RETURN 201", async () => {
      let randomText = (Math.random() + 1).toString(36).substring(7);
      const result = await supertest(app)
        .post("/api/auth/signup")
        .send({
          firstName: "lava",
          secondName: "big",
          password: "09876543",
          email: randomText + "lava@gmail.com",
        })
        .expect(201);
    });
  });
  describe("BLOG", () => {
    it("UNAUTHORIZED, CREADED BLOG", async () => {
      const blog = await Blogs.create({
        author: "65e1ba0effdba8154e78c0d0",
        title: "FIRST BLOG",
        description: "DESCRIPTION",
        content: "LOREM IPSUM",
      });
      blogId = blog._id;
      await supertest(app)
        .post("/api/blogs/create")
        .send({
          author: "65e1ba0effdba8154e78c0d0",
          title: "FIRST BLOG",
          description: "DESCRIPTION",
          content: "LOREM IPSUM",
        })
        .expect(401);
    });
    // it("BLOG SUCCESFUL", async () => {
    //   const pic = `${__dirname}/pic/amall-pic.jpg`;
    //   let randomText = (Math.random() + 1).toString(36).substring(5);
    //   const response = await supertest(app)
    //     .post("/api/blogs/create")
    //     .set("Authorization", token)
    //     .set("contentType", "application/octet-stream")
    //     .field("title", `Le Lorem Ipsum est test ${randomText}`)
    //     .field(
    //       "description",
    //       "Le Lorem Ipsum est simplement du faux texte employé"
    //     )
    //     .field(
    //       "content",
    //       "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.l n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. "
    //     )
    //     .attach("image", pic)
    //     .expect(200);
    // });
    it("VALIDATION FAIL", async () => {
      const pic = `${__dirname} /../pic/amall-pic.jpg`;
      let randomText = (Math.random() + 1).toString(36).substring(5);
      const response = await supertest(app)
        .post("/api/blogs/create")
        .set("Authorization", token)
        .set("contentType", "application/octet-stream")
        .field("title", `Le Lorem Ipsum est test ${randomText}`)
        .field(
          "description",
          "Le Lorem Ipsum est simplement du faux texte employé"
        )
        .field(
          "content",
          "son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. "
        )
        .expect(400);
    });
    it("UNAUTHORIZED UPDATE BLOG", async () => {
      await supertest(app)
        .patch(`/api/blogs/${blogId}/update`)
        .send({
          author: "65e1ba0effdba8154e78c0d0",
          title: "FIRST BLOG",
          description: "DESCRIPTION",
          content: "LOREM IPSUM",
        })
        .expect(401);
    });
    it("GET ALL BLOG", async () => {
      const response = await supertest(app)
        .get("/api/blogs/read/all")
        .expect(200);
    });
    it("GET SINGLE BLOG", async () => {
      const response = await supertest(app)
        .get(`/api/blogs/${blogId}/read`)
        .expect(200);
    });
    it("READ UNEXISTING BLOG", async () => {
      const response = await supertest(app)
        .get("/api/blogs/65e1e2d84b65dueiwufhiruhikjefwcb1fff0990a/rea")
        .expect(404);
    });
    it("CREATE UNAUTHORIZED COMMENT", async () => {
      const response = await supertest(app)
        .post(`/api/${blogId}/comments/create`)
        .send({ message: "hello" })
        .expect(401);
    });
    it("CREATE UNEXISTING COMMENT", async () => {
      const response = await supertest(app)
        .post("/api/65dcde6ba63a91a8769e7fVRLEKEIUIT72/comments/create")
        .set("Authorization", token)
        .send({ message: "hello" })
        .expect(404);
    });
    it("MESSAGE VALIDATION FAIL", async () => {
      const response = await supertest(app)
        .post("/api/65dcde6ba63a91a8769e7fVRLEKEIUIT72/comments/create")
        .set("Authorization", token)
        .send({ message: "" })
        .expect(400);
    });
    it("COMMENT SUCCESSFUL", async () => {
      const response = await supertest(app)
        .post(`/api/${blogId}/comments/create`)
        .set("Authorization", token)
        .send({ message: "HELLO" })
        .expect(201);
    });
    it("COMMENT SUCCESSFUL", async () => {
      const response = await supertest(app)
        .post(`/api/${blogId}/comments/create`)
        .set("Authorization", token)
        .send({ message: "HELLO" })
        .expect(201);
    });
    it("UNAUTHORIZED DELETE BLOG", async () => {
      await supertest(app).delete(`/api/blogs/${blogId}/delete`).expect(401);
    });
    it("BLOG DELETE SUCCESSFULLY", async () => {
      await supertest(app)
        .delete(`/api/blogs/${blogId}/delete`)
        .set("Authorization", token)
        .expect(204);
    });

    it("MESSAGE SUCCESSFUL", async () => {
      const response = await supertest(app)
        .post(`/api/messages/create`)
        .send({
          email: "ntiru@gmail.com",
          text: "Hey buy",
        })
        .expect(201);
    });
    it("MESSAGE VALLIDATION FAILED", async () => {
      const response = await supertest(app)
        .post(`/api/messages/create`)
        // .set("Authorization", token)
        .send({
          email: "",
          text: "Hey buy",
        })
        .expect(400);
    });
    it("READ MESSAGE", async () => {
      const response = await supertest(app)
        .get(`/api/messages/read`)
        // .set("Authorization", token)
        .expect(200);
    });
  });
});
