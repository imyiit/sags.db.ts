import lodash from "lodash";
import fs from "fs";
import { SagsdbError } from "./Error";
import type { SagsSetting, Input } from "../types/index";
export class Sags {
  public name: string;
  public folder: string;
  public minify: boolean;

  private folderPath: string[];
  private db;
  private saveDB;

  constructor(setting?: SagsSetting) {
    this.name = setting?.name ?? "sags";
    this.folder = setting?.folder ?? "database";
    this.minify = setting?.minify ?? true;

    this.folderPath = this.folder
      .toString()
      .toLowerCase()
      .split("/")
      .filter((x) => x != ".");

    if (!fs.existsSync(`./${this.folderPath.join("/")}`)) {
      this.folderPath.reduce((previus, current, i, a) => {
        previus += current + "/";
        if (!fs.existsSync(`.${previus}`)) {
          fs.mkdirSync(`.${previus}`);
        }
        if (i === a.length - 1) {
          fs.writeFileSync(
            `./${this.folderPath.join("/") + "/" + this.name}.json`,
            "{}"
          );
        }
        return previus;
      }, "/");
    }

    this.db = JSON.parse(
      fs
        .readFileSync(`./${this.folderPath.join("/") + "/" + this.name}.json`)
        .toString()
    );

    this.saveDB = (data: object) => {
      const json_data = this.minify
        ? JSON.stringify(data)
        : JSON.stringify(data, null, 2);

      return fs.writeFileSync(
        `./${this.folderPath.join("/") + "/" + this.name}.json`,
        json_data
      );
    };
  }

  set(key: string, data: Input) {
    const json_data = lodash.set(this.db, key, data ?? null);
    this.saveDB(json_data);
    return this;
  }

  delete(key: string) {
    const newDb = { ...this.db };
    lodash.unset(newDb, key);
    this.saveDB(newDb);
    return this;
  }

  get<T extends any = Input>(key: string) {
    return lodash.get(this.db, key) as T;
  }

  has(key: string) {
    return lodash.has(this.db, key);
  }

  all() {
    return this.db;
  }

  deleteAll() {
    this.saveDB({});
    return true;
  }

  type(key: string) {
    const type = this.get(key);
    return Array.isArray(type) ? "array" : typeof type;
  }

  push(key: string, data: Input) {
    const item = this.get(key);
    if (typeof item !== "object" && !Array.isArray(item)) {
      this.set(key, data);
      return this;
    }
    if (Array.isArray(item)) {
      item.push(data);
      this.set(key, item);
      return this;
    }

    new SagsdbError("This Key data is not an Array.");

    return this;
  }

  unpush(key: string, data: Input) {
    const item = this.get(key);
    if (item !== "object" && !Array.isArray(item))
      return new SagsdbError("This Key data is not an Array.");

    lodash.remove(item, function (n) {
      return n === data;
    });

    if (item.length === 0) {
      this.delete(key);
      return this;
    }
    this.set(key, item);
    return this;
  }

  add(key: string, number: number) {
    let item = this.get(key) ?? 0;
    if (typeof item !== "number")
      return new SagsdbError("This Key data is not an Number.");

    item += number;
    this.set(key, item);
    return this;
  }

  substract(key: string, number: number) {
    let item = this.get(key) ?? 0;
    if (typeof item !== "number")
      return new SagsdbError("This Key data is not an Number.");
    item -= number;
    this.set(key, item);
    return this;
  }

  dbSIZE() {
    return fs.statSync(`./${this.folderPath.join("/") + "/" + this.name}.json`)
      .size;
  }
}
