import { Test, TestingModule } from "@nestjs/testing";
import { HashService } from "./hash.service";
import * as bcrypt from "bcrypt";

describe("HashService", () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = module.get<HashService>(HashService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should hash a string", async () => {
    const password = "password";

    const hashedPassword = await service.hash(password);
    const isMatch = await bcrypt.compare(password, hashedPassword);

    expect(isMatch).toBeTruthy();
  });

  it("should compare a string and a hash", async () => {
    const password = "password";
    const hashedPassword = await bcrypt.hash(password, 10);

    const isMatch = await service.compare(password, hashedPassword);

    expect(isMatch).toBeTruthy();
  });
});
