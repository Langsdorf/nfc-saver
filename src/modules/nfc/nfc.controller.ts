import { Body, POST, Response } from "@decorators";
import express from "express";
import * as fs from "fs";
import * as path from "path";

export default class UserController {
  constructor() {}

  @POST()
  public async getStatus(@Response() res: express.Response, @Body() body: any) {
    const timestamp = new Date().getTime();

    //create file with timestamp as name
    const fileName = `${timestamp}.json`;

    fs.appendFileSync(
      path.join(__dirname, "data", fileName),
      JSON.stringify(body),
      { encoding: "utf8" }
    );

    res.json({ body: body });
  }
}
