const should = require("should");
const sinon = require("sinon");
const bookController = require("../controllers/booksController");

describe("book controller test", () => {
  describe("post method test", () => {
    it("shouldn't allow empty title", () => {
      const req = {
        body: {
          author: "mahmoud",
        },
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = bookController();
      controller.post(req, res);

      //first check
      res.status.calledWith(403).should.equal(true, `bad status`);

      //second check
      res.json
        .calledWith({ err: "title is required" })
        .should.equal(true, `wrong result`);
    });
  });
});
