import { MongoIdPipe } from "@shared/pipes";
import { Transform } from "class-transformer";

export function MongoIdTransform() {
  const pipe = new MongoIdPipe();
  return Transform(({ value }) => {
    return pipe.transform(value);
  });
}
